import { User } from '@firebase/auth'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { db } from '@/app/firebaseApp'
import { doc, onSnapshot, serverTimestamp } from '@firebase/firestore'
import { DocumentData, initPlayerState, PlayerState, shapingData } from '@/app/firestore/room/documentData'
import { getKeys } from '@/app/planning-poker/[rid]/components/utils/getKey'
import { useFirestore } from '@/app/hooks/useFirestore'

export const useRoom = (me: User | null | undefined, rid: string) => {
  const { runTransaction } = useFirestore()
  const [room, setRoom] = useState<DocumentData | undefined>(undefined)
  const roomDocRef = useRef(doc(db, 'room', rid))

  // NOTE: Room情報をサブスクリプション開始
  useEffect(() => {
    if (!me) {
      return
    }

    const unsub = onSnapshot(
      roomDocRef.current,
      docSnap => {
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const docData = shapingData(docSnap)
        setRoom(docData)
      }
    )
    return () => unsub()
  }, [me, rid])

  const players = useMemo(() => {
    return room?.players
  }, [room?.players])

  const entry = useCallback(async () => {
    if (!me) {
      return
    }
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        if (me.uid in preData.players) {
          return
        }
        const nextPlayers = { ...preData.players, [me.uid]: initPlayerState}
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, runTransaction])

  const exit = useCallback(async () => {
    if (!me) {
      return
    }
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        const nextPlayers = Object.keys(preData.players)
          .filter(key => key !== me.uid)
          .reduce((obj, key) => {
            return { ...obj, [key]: preData.players[key]}
          }, {} as DocumentData['players'])
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, runTransaction])

  const playerStateWithoutMe = useMemo(() => {
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

  const selectCard = useCallback(async (id: string) => {
    if (!me) {
      return
    }
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        const nextPlayers = {
          ...preData.players,
          [me.uid]: { nickname: preData.players[me.uid].nickname, card: id }
        }
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, runTransaction])

  const showdown = useCallback(async () => {
    if (!me) {
      return
    }

    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        transaction.update(roomDocRef.current, { showdown: true, updatedAt: serverTimestamp() })
      })
      return 'ok'
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, runTransaction])

  const resetGame = useCallback(async () => {
    if (!me) {
      return
    }
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        const nextPlayers: DocumentData["players"] = Object.keys(preData.players).reduce((acc, cur) => {
          return { ...acc, [cur]: {...initPlayerState, nickname: preData.players[cur].nickname }}
        }, {})
        transaction.update(roomDocRef.current, { players: nextPlayers, showdown: false, updatedAt: serverTimestamp() })
      })
      return 'ok'
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, runTransaction])

  const setNickname = useCallback(async (nickname: string) => {
    if (!me) {
      return
    }
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        const nextPlayers = {
          ...preData.players,
          [me.uid]: { card: preData.players[me.uid].card, nickname }
        }
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [me, runTransaction])

  const canTurnOver = useMemo(() => {
    if (players === undefined) {
      return false
    }
    const playersIds = players ? getKeys(players) : []
    return playersIds.some(pid => players[pid].card === null)
  }, [players])

  return {
    room,
    entry,
    exit,
    playerStateWithoutMe,
    myPlayerState,
    selectCard,
    showdown,
    resetGame,
    setNickname,
    canTurnOver
  }
}