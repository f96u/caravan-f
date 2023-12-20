import { useCallback, useRef, useState } from 'react'
import { db } from '@/app/firebaseApp'
import { doc, onSnapshot, serverTimestamp } from '@firebase/firestore'
import { CardId, DocumentData, initPlayerState, PlayerState, shapingData } from '@/app/firestore/room/documentData'
import { useFirestore } from '@/app/hooks/useFirestore'
import { useRouter } from 'next/navigation'
import { useToast } from '@/app/context/ToastContext'

export const useRoom = (rid: string) => {
  const { runTransaction } = useFirestore()
  const [room, setRoom] = useState<DocumentData | undefined>(undefined)
  const roomDocRef = useRef(doc(db, 'room', rid))
  const router = useRouter()
  const { showToast } = useToast()

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
        setRoom({ ...preData, players: nextPlayers, updatedAt: serverTimestamp() })
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
      showToast('入室できませんでした', 'error')
      router.replace('/planning-poker')
      return
    }
    // NOTE: roomのサブスク開始
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
    return async () => {
      unsub()
      // NOTE: roomからの退室処理
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
              return {...obj, [key]: preData.players[key]}
            }, {} as DocumentData['players'])
          transaction.update(roomDocRef.current, {players: nextPlayers, updatedAt: serverTimestamp()})
        })
      } catch (error) {
        console.error('Transaction failed: ', error)
      }
    }
  }, [router, runTransaction, showToast])

  const playerStateWithoutMe = useCallback((uid: string) => {
    if (room?.players === undefined) {
      return undefined
    }
    return Object.fromEntries(
      Object.entries(room.players)
        .filter(([pid]) => pid !== uid)
        .map(([pid, playerState]) => [pid, playerState])
    )
  }, [room?.players])

  const myPlayerState = useCallback((uid: string): PlayerState | null => {
    if (room && uid in room.players) {
      return room.players[uid]
    }

    return null
  }, [room])

  const selectCard = useCallback(async (uid: string, cardId: CardId) => {
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        const nextPlayers: { [key: string]: PlayerState } = {
          ...preData.players,
          [uid]: { nickname: preData.players[uid].nickname, card: cardId }
        }
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
        setRoom({ ...preData, players: nextPlayers, updatedAt: serverTimestamp() })
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
        transaction.update(roomDocRef.current, { isReveal: true, updatedAt: serverTimestamp() })
        setRoom({ ...preData, isReveal: true, updatedAt: serverTimestamp() })
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
        transaction.update(roomDocRef.current, { players: nextPlayers, isReveal: false, updatedAt: serverTimestamp() })
        setRoom({ ...preData, players: nextPlayers, isReveal: false, updatedAt: serverTimestamp() })
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
        setRoom({ ...preData, players: nextPlayers, updatedAt: serverTimestamp() })
      })
      showToast('ニックネームを変更しました', 'success')
    }
    catch (error) {
      console.error('Transaction failed: ', error)
      showToast('ニックネームを変更できませんでした', 'error')
    }
  }, [runTransaction])

  return {
    room,
    entry,
    playerStateWithoutMe,
    myPlayerState,
    selectCard,
    showdown,
    resetGame,
    setNickname
  }
}