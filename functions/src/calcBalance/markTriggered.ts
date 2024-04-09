import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import {FieldValue} from 'firebase-admin/firestore'

export const markTriggered = (functionName: string, eventId: string) => {
  return admin.firestore().runTransaction(async (transaction) => {
    const ref = admin.firestore().collection('functions').doc('triggerEvents').collection(functionName).doc(eventId)
    const doc = await transaction.get(ref)
    if (!doc.exists) {
      functions.logger.warn(
        `markTriggered関数で予期しない処理が発生しました。/functions/triggerEvents/${functionName}/${eventId}ファイルが見つかりません。`
      )
      return
    }
    transaction.update(ref, {triggered: true, updatedAt: FieldValue.serverTimestamp()})
  })
}
