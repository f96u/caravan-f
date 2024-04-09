import * as admin from 'firebase-admin'
import {FieldValue} from 'firebase-admin/firestore'

/**
 * 特定のイベントがすでにトリガーされているかをチェックする。
 * Firestoreにイベントのステータスを保持しているため、これを確認してトリガー状態を確認する。
 *
 * @param {string} funcName イベントが関連づけられている関数の名前
 * @param {string} eId イベントID
 * @return {Promise<boolean>} ドキュメントが存在している、かつtriggeredフラグがtrueの時にtrueを返す
 */
export const hasAlreadyTriggered = (funcName: string, eId: string): Promise<boolean> => {
  return admin.firestore().runTransaction(async (transaction) => {
    const ref = admin.firestore().collection('functions').doc('triggerEvents').collection(funcName).doc(eId)
    const doc = await transaction.get(ref)
    if (!doc.exists) {
      transaction.set(
        ref,
        {
          triggered: false,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        }
      )
      return false
    } else {
      const data = doc.data()
      if (data) {
        return data.triggered
      }
    }
  })
}
