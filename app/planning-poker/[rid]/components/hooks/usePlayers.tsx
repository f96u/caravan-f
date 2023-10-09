import { useCallback, useEffect, useMemo, useState } from 'react'
import { doc, onSnapshot, runTransaction, serverTimestamp } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { DocumentData, initPlayerState, shapingData } from '@/app/firestore/room/documentData'
import { Me } from '@/app/planning-poker/type/Me'

export const usePlayers = (me: Me | null | undefined, rid: string) => {
  const [players, setPlayers] = useState<DocumentData['players'] | undefined>(undefined)

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
        if (me.user.uid in preData.players) {
          return
        }
        const nextPlayers = { ...preData.players, [me.user.uid]: initPlayerState}
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
          .filter(key => key !== me.user.uid)
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
    if (!!me && !!players && (me.user.uid in players)) {
      return players[me.user.uid].card
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
        const preData = shapingData(docSnap)
        const nextPlayers = {...preData.players, [me.user.uid]: { nickname: preData.players[me.user.uid].nickname, card: id }}
        transaction.update(roomDocRef, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, rid])

  const reset = useCallback(async () => {
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
        const nextPlayers: DocumentData["players"] = Object.keys(preData.players).reduce((acc, cur) => {
          return { ...acc, [cur]: {...initPlayerState, nickname: preData.players[cur].nickname }}
        }, {})
        transaction.update(roomDocRef, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, rid])

  const setNickname = useCallback(async (nickname: string) => {
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
        const nextPlayers = {...preData.players, [me.user.uid]: { card: preData.players[me.user.uid].card, nickname }}
        transaction.update(roomDocRef, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, rid])

  return { players, entry, exit, selectCardId, selected, reset, setNickname }
}
