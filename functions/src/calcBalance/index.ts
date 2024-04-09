/**
 * Journalが更新された際に発火する関数
 *
 * 残高の計算結果は`/households/{householdId}/balances/{userId}`に保存される
 */
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import {onDocumentWritten} from 'firebase-functions/v2/firestore'
import {hasAlreadyTriggered} from './hasAlreadyTriggered'
import {operateBalanceData} from './operateBalanceData'
import {FieldValue} from 'firebase-admin/firestore'
import {markTriggered} from './markTriggered'

const balanceDocRef = (householdId: string) =>
  admin
    .firestore()
    .collection('householdAccounts')
    .doc(householdId)
    .collection('aggregate')
    .doc('balance')

export const calcBalance =
  onDocumentWritten(
    '/householdAccounts/{householdId}/journal/{journalId}',
    async (event) => {
      const {householdId, journalId} = event.params
      functions.logger.info(
        'calcBalance関数が開始しました。 eventId: ',
        event.id,
        'journalId: ',
        journalId
      )
      const eventData = event.data
      if (!eventData) {
        functions.logger.warn('event.dataにデータがありません。処理を中断しました。')
        return null
      }

      functions.logger.debug('functionが二重に発火しているかを確認します。')
      const triggered = await hasAlreadyTriggered('calcBalance', event.id)
      if (triggered) {
        functions.logger.warn('functionsが2度発火したことを検知したため、処理を中断しました。')
        return null
      }

      await admin
        .firestore()
        .runTransaction(async (transaction) => {
          const balanceDocSnapShot = await transaction.get(balanceDocRef(householdId))
          if (!balanceDocSnapShot.exists) {
            functions.logger.log('balanceドキュメントが存在しないため、新たに作成します。')
          } else {
            functions.logger.log(
              'balanceドキュメントを取得しました。balanceDocSnapShot.data(): ',
              balanceDocSnapShot.data()
            )
          }

          // NOTE: balanceドキュメント作成
          const balanceDoc = {
            balanceData: balanceDocSnapShot.data()?.balanceData || {},
            createdAt: balanceDocSnapShot.data()?.createdAt || FieldValue.serverTimestamp(),
          }

          // NOTE: 残高の計算
          const calculated =
            operateBalanceData(balanceDoc.balanceData, eventData.before.data(), eventData.after.data())

          functions.logger.log('balanceドキュメント書き込みを開始します。calculated: ', calculated)
          transaction.set(balanceDocRef(householdId), {
            balanceData: calculated,
            updatedAt: FieldValue.serverTimestamp(),
            createdAt: balanceDoc.createdAt,
            version: '24.4.2',
          })
        })
      functions.logger.log('balanceドキュメントを保存しました。journalId: ', journalId, 'eventId: ', event.id)
      await markTriggered('calcBalance', event.id)
      return Promise.resolve('正常終了')
    }
  )
