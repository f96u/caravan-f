import { useCallback, useEffect, useMemo, useState } from 'react'
import { doc, onSnapshot, runTransaction, serverTimestamp } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { User } from '@firebase/auth'
import { DocumentData, shapingData } from '@/app/firestore/room/documentData'

export const usePlayer = (me: User | null, rid: string) => {
  const [player, setPlayer] = useState<DocumentData['player']>({})

  // NOTE: カード情報の更新をする
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
        setPlayer(docData.player)
      },
      error => {
        console.error('listen error: ', error)
      }
    )
    return () => unsub()
  }, [me, rid])

  const entry = useCallback(async () => {
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
        const preData = shapingData(docSnap)
        const nextPlayer = { ...preData.player, [me.uid]: { card: 'none' }}
        transaction.update(roomDocRef, { player: nextPlayer, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, rid])

  const exit = useCallback(async () => {
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
        const preData = shapingData(docSnap)
        const nextPlayer = Object.keys(preData.player)
          .filter(key => key !== me.uid)
          .reduce((obj, key) => {
            return { ...obj, [key]: preData.player[key]}
        }, {} as DocumentData['player'])
        transaction.update(roomDocRef, { player: nextPlayer, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, rid])

  const selectCardId = useMemo(() => {
    if (me !== null && (me.uid in player)) {
      return player[me.uid]
    }
    return 'none'
  }, [me, player])

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
        const nextPlayer = {...docSnap.data().player, [me.uid]: { card: id }}
        transaction.update(roomDocRef, { player: nextPlayer, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, rid])

  return { entry, exit, selectCardId, selected }
}
