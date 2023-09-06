import { useCallback, useEffect, useState } from 'react'
import { doc, onSnapshot, runTransaction } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { User } from '@firebase/auth'

// TODO: roomIDを固定値で設定
const roomId = '8IO7nldb1Zm0IOwQJMYs'

export const useSelectCard = (me: User | null) => {
  const [selectCardId, setSelectCardId] = useState<null | string>(null)

  useEffect(() => {
    if (!me) {
      return
    }
    const roomDocRef = doc(db, 'room', roomId)
    const unsub = onSnapshot(
      roomDocRef,
      docSnap => {
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }

        const selectCardId = docSnap.data().selectCard[me.uid].card ?? null
        setSelectCardId(selectCardId)
      },
      error => {
        console.error('listen error: ', error)
      }
    )
    return () => unsub()
  }, [me])

  const selected = useCallback(async (id: string) => {
    if (!me) {
      return
    }
    try {
      await runTransaction(db, async (transaction) => {
        const roomDocRef = doc(db, 'room', roomId)
        const docSnap = await transaction.get(roomDocRef)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }

        const nextSelectCard = {...docSnap.data().selectCard, [me.uid]: { card: id }}
        transaction.update(roomDocRef, { selectCard: nextSelectCard })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me])

  return { selectCardId, selected }
}