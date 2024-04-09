import * as functions from 'firebase-functions'

type ItemAndAmount = {
  item: string
  amount: number
}

type JournalOperation = 'registered' | 'removed' | 'offset'

type Journal = {
  date: Date
  debit: ItemAndAmount[]
  credit: ItemAndAmount[]
  operation: JournalOperation
}

type BalanceDebitAndCredit = {
  debit: number
  credit: number
}

const convertFirestore = () => ({
  journal: {
    fromFirestore: (documentData: FirebaseFirestore.DocumentData): Journal => {
      const converter = (account: { item: string; amount: string }[]) =>
        account.map((v) => ({item: v.item, amount: Number(v.amount)}))
      return {
        date: documentData.date.toDate(),
        debit: converter(documentData.debit),
        credit: converter(documentData.credit),
        operation: documentData.operation,
      }
    },
  },
})

const calcBalanceData = (
  journalDocData: FirebaseFirestore.DocumentData,
  balanceDataMap: { [key: string]: BalanceDebitAndCredit },
  addOrSub: 'addition' | 'subtraction'
): { [key: string]: BalanceDebitAndCredit } => {
  const journal = convertFirestore().journal.fromFirestore(journalDocData)
  const journalDate = journal.date
  const prefixKey = `${journalDate.getFullYear()}${(journalDate.getMonth() + 1).toString().padStart(2, '0')}`
  const balanceDataCalc = (debitOrCredit: keyof BalanceDebitAndCredit) => {
    journal[debitOrCredit].forEach((debitOrCreditItem: ItemAndAmount) => {
      const balanceDataKey = `${prefixKey}-${debitOrCreditItem.item}`
      const originVal = balanceDataMap[balanceDataKey] || {debit: 0, credit: 0}
      const target = debitOrCredit === 'debit' ? 'credit' : 'debit'
      const changeBalance =
        addOrSub === 'addition' ?
          originVal[debitOrCredit] + debitOrCreditItem.amount :
          originVal[debitOrCredit] - debitOrCreditItem.amount
      const balanceDataMapVal = {
        [debitOrCredit]: changeBalance,
        [target]: originVal[target],
      } as BalanceDebitAndCredit
      functions.logger.log('balanceDataKey: ', balanceDataKey, ', change ', originVal, '->', balanceDataMapVal)
      // NOTE: 不正値が登録されていることを検知するためにチェックを入れておく
      if (
        debitOrCreditItem.item === 'undefined' ||
        Number.isNaN(balanceDataMapVal.debit) ||
        Number.isNaN(balanceDataMapVal.credit)
      ) {
        functions.logger.error('!!不正なデータが登録されます!!')
      }
      balanceDataMap[balanceDataKey] = balanceDataMapVal
    })
  }
  balanceDataCalc('debit')
  balanceDataCalc('credit')
  return balanceDataMap
}

/**
 * 引数に提供されたデータに基づき、残高データを再算出します。
 * Journalに行われた操作（作成・変更・削除）に応じて残高データを更新します。
 *
 * @param {object} balanceData 算出前の残高データ。キーは文字列、値はBalanceDebitAndCredit型のオブジェクトです。
 * @param {FirebaseFirestore.DocumentData} beforeDocData - 更新前のJournalデータです。省略可能です。
 * @param {FirebaseFirestore.DocumentData} afterDocData - 更新後のJournalデータです。省略可能です。
 *
 * @return {object} 算出後の残高データ。キーは文字列、値はBalanceDebitAndCredit型のオブジェクトです。
 */
export const operateBalanceData = (
  balanceData: { [key: string]: BalanceDebitAndCredit },
  beforeDocData?: FirebaseFirestore.DocumentData,
  afterDocData?: FirebaseFirestore.DocumentData
): { [key: string]: BalanceDebitAndCredit } => {
  if (afterDocData) {
    if (beforeDocData) {
      functions.logger.log('Journalドキュメントが更新されたため、残高に計算処理を開始します。')
      // NOTE: operationの値を読み取って、`removed`となっていた場合は削除処理をする。それ以外は更新処理として扱う。
      const subtractedBalanceDataMap = calcBalanceData(beforeDocData, balanceData, 'subtraction')

      const afterJournalObj = convertFirestore().journal.fromFirestore(afterDocData)
      if (afterJournalObj.operation === 'removed') {
        return subtractedBalanceDataMap
      } else {
        return calcBalanceData(afterDocData, subtractedBalanceDataMap, 'addition')
      }
    } else {
      functions.logger.log('Journalドキュメントが追加されたため、残高に加算処理を開始します。')
      return calcBalanceData(afterDocData, balanceData, 'addition')
    }
  } else if (beforeDocData) {
    /* NOTE:
     * Journalドキュメントは物理削除しない仕様のため、この処理は基本的には発火しない想定。
     * そのため、logger.warnとして出力している。
     * balanceドキュメントとの整合性を取るため、
     * 管理画面より直接Journalドキュメントを削除した場合に限りこの分岐に入り削除に伴う処理を実行する。
     */
    functions.logger.log('Journalドキュメントが削除されたため、残高の減算処理を開始します。')
    return calcBalanceData(beforeDocData, balanceData, 'subtraction')
  } else {
    // NOTE: beforeもafterもないことは発生しない想定
    functions.logger.error('beforeDocData及びafterDocDataが存在しなかったため、計算処理をスキップしました。')
    return balanceData
  }
}
