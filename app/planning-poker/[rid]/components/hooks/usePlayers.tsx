import { useCallback, useEffect, useMemo, useState } from 'react'
import { doc, onSnapshot, runTransaction, serverTimestamp } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { User } from '@firebase/auth'
import { DocumentData, shapingData } from '@/app/firestore/room/documentData'

export const usePlayers = (me: User | null | undefined, rid: string) => {
  const [players, setPlayers] = useState<DocumentData['players']>({})

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
        setPlayers(docData.players)
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
        if (me.uid in preData.players) {
          return
        }
        const nextPlayers = { ...preData.players, [me.uid]: { card: 'none' }}
        transaction.update(roomDocRef, { players: nextPlayers, updatedAt: serverTimestamp() })
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
        const nextPlayers = Object.keys(preData.players)
          .filter(key => key !== me.uid)
          .reduce((obj, key) => {
            return { ...obj, [key]: preData.players[key]}
        }, {} as DocumentData['players'])
        transaction.update(roomDocRef, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, rid])

  const selectCardId = useMemo(() => {
    if (!!me && (me.uid in players)) {
      return players[me.uid].card
    }
    return 'none'
  }, [me, players])

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
        const nextPlayers = {...docSnap.data().players, [me.uid]: { card: id }}
        transaction.update(roomDocRef, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, rid])

  return { players, entry, exit, selectCardId, selected }
}
