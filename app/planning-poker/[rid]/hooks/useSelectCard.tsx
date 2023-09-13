import { useCallback, useEffect, useState } from 'react'
import { doc, onSnapshot, runTransaction, serverTimestamp } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { User } from '@firebase/auth'
import { DocumentData, shapingData } from '@/app/firestore/room/documentData'

export const useSelectCard = (me: User | null, rid: string) => {
  const [selectCardId, setSelectCardId] = useState<null | string>(null)

  useEffect(() => {
    if (!me) {
      return
    }
    const roomDocRef = doc(db, 'room', rid)
    const unsub = onSnapshot(
      roomDocRef,
      docSnap => {
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const docData = shapingData(docSnap)
        const selectCard = docData.selectCard
        if (me.uid in selectCard) {
          setSelectCardId(selectCard[me.uid].card)
        }
      },
      error => {
        console.error('listen error: ', error)
      }
    )
    return () => unsub()
  }, [me, rid])

  const selected = useCallback(async (id: string) => {
    if (!me) {
      return
    }
    try {
      await runTransaction(db, async (transaction) => {
        const roomDocRef = doc(db, 'room', rid)
        const docSnap = await transaction.get(roomDocRef)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = docSnap.data()
        const nextSelectCard = {...preData.selectCard, [me.uid]: { card: id }}
        transaction.update(roomDocRef, { selectCard: nextSelectCard, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, rid])

  return { selectCardId, selected }
}