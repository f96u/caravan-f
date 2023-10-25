import { useCallback, useEffect, useMemo, useState } from 'react'
import { doc, onSnapshot, runTransaction, serverTimestamp } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { DocumentData, initPlayerState, PlayerState, shapingData } from '@/app/firestore/room/documentData'
import { User } from '@firebase/auth'
import { getKeys } from '@/app/planning-poker/[rid]/components/utils/getKey'

export const usePlayers = (me: User | null | undefined, rid: string) => {
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
        if (me.uid in preData.players) {
          return
        }
        const nextPlayers = { ...preData.players, [me.uid]: initPlayerState}
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

  const otherPlayers = useMemo(() => {
    if (players === undefined) {
      return undefined
    }
    return Object.fromEntries(
      Object.entries(players)
        .filter(([pid]) => pid !== me?.uid)
        .map(([pid, playerState]) => [pid, playerState])
    )
  }, [me?.uid, players])

  const myPlayerState: PlayerState = useMemo(() => {
    if (!!me && !!players && (me.uid in players)) {
      return players[me.uid]
    }
    // NOTE: ロジック上、ここに処理はこないが型を合わせるためにinitPlayerStateを置く
    return initPlayerState
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
        const nextPlayers = {
          ...preData.players,
          [me.uid]: { nickname: preData.players[me.uid].nickname, card: id }
        }
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
      return 'ok'
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
        const nextPlayers = {
          ...preData.players,
          [me.uid]: { card: preData.players[me.uid].card, nickname }
        }
        transaction.update(roomDocRef, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, rid])

  const canTurnOver = useMemo(() => {
    if (players === undefined) {
      return false
    }
    const playersIds = players ? getKeys(players) : []
    return playersIds.some(pid => players[pid].card === null)
  }, [players])

  return { players, otherPlayers, entry, exit, myPlayerState, selected, reset, setNickname, canTurnOver }
}
