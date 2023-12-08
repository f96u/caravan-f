import { User } from '@firebase/auth'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { db } from '@/app/firebaseApp'
import { doc, onSnapshot, serverTimestamp } from '@firebase/firestore'
import { DocumentData, initPlayerState, PlayerState, shapingData } from '@/app/firestore/room/documentData'
import { getKeys } from '@/app/planning-poker/[rid]/components/utils/getKey'
import { useFirestore } from '@/app/hooks/useFirestore'

export const useRoom = (rid: string) => {
  const { runTransaction } = useFirestore()
  const [room, setRoom] = useState<DocumentData | undefined>(undefined)
  const roomDocRef = useRef(doc(db, 'room', rid))

  const startRoomSubscription = useCallback(() => {
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
  }, [])

  const players = useMemo(() => {
    return room?.players || {}
  }, [room?.players])

  const entry = useCallback(async (uid: string) => {
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {

          console.error('Document does not exists!')
        }
        const preData = shapingData(docSnap)
        if (uid in preData.players) {
          return
        }
        const nextPlayers = { ...preData.players, [uid]: initPlayerState}
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [runTransaction])

  const exit = useCallback(async (uid: string) => {
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        const nextPlayers = Object.keys(preData.players)
          .filter(key => key !== uid)
          .reduce((obj, key) => {
            return { ...obj, [key]: preData.players[key]}
          }, {} as DocumentData['players'])
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [runTransaction])

  const playerStateWithoutMe = useCallback((uid: string) => {
    if (players === undefined) {
      return undefined
    }
    return Object.fromEntries(
      Object.entries(players)
        .filter(([pid]) => pid !== uid)
        .map(([pid, playerState]) => [pid, playerState])
    )
  }, [players])

  const myPlayerState = useCallback((uid: string): PlayerState => {
    if (uid in players) {
      return players[uid]
    }
    // NOTE: ロジック上、ここに処理はこないが型を合わせるためにinitPlayerStateを置く
    return initPlayerState
  }, [players])

  const selectCard = useCallback(async (uid: string, cardId: string) => {
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        const nextPlayers = {
          ...preData.players,
          [uid]: { nickname: preData.players[uid].nickname, card: cardId }
        }
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [runTransaction])

  const showdown = useCallback(async () => {
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
  }, [runTransaction])

  const resetGame = useCallback(async () => {
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
  }, [runTransaction])

  const setNickname = useCallback(async (uid: string, nickname: string) => {
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        const nextPlayers = {
          ...preData.players,
          [uid]: { card: preData.players[uid].card, nickname }
        }
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [runTransaction])

  const canTurnOver = useMemo(() => {
    if (players === undefined) {
      return false
    }
    const playersIds = players ? getKeys(players) : []
    return playersIds.some(pid => players[pid].card === null)
  }, [players])

  return {
    startRoomSubscription,
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