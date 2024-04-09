import { useCallback, useContext, useRef } from 'react'
import { doc, getFirestore, onSnapshot, serverTimestamp } from '@firebase/firestore'
import { CardId, DocumentData, initPlayerState, PlayerState, shapingData } from '@/app/firestore/room/documentData'
import { useFirestore } from '@/app/hooks/useFirestore'
import { useRouter } from 'next/navigation'
import { useToast } from '@/app/context/ToastContext'
import { RoomContext, RoomDispatchContext, RoomIdContext } from '@/app/planning-poker/[rid]/contexts/RoomContext'
import { app } from '@/app/lib/firebase/init'

export const useRoom = () => {
  const rid = useContext(RoomIdContext)
  const { runTransaction } = useFirestore()
  const room = useContext(RoomContext)
  const dispatch = useContext(RoomDispatchContext)
  const roomDocRef = useRef(doc(getFirestore(app), 'room', rid))
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
        dispatch({ type: 'set', payload: { room: preData }})
        if (uid in preData.players) {
          return
        }
        const nextPlayers = { ...preData.players, [uid]: initPlayerState}
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
        dispatch({ type: 'updatePlayers', payload: { players: nextPlayers }})
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
          // NOTE: 他プレイヤーによって部屋を削除された場合、その旨を伝えて/planning-pokerへリダイレクト
          showToast('部屋が見つかりません', 'warning')
          router.replace('/planning-poker')
          throw 'Document does not exists!'
        }
        const docData = shapingData(docSnap)
        dispatch({ type: 'set', payload: { room: docData }})
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
  }, [dispatch, router, runTransaction, showToast])

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
        dispatch({ type: 'updatePlayers', payload: { players: nextPlayers }})
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [dispatch, runTransaction])

  const showdown = useCallback(async () => {
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        transaction.update(roomDocRef.current, { isReveal: true, updatedAt: serverTimestamp() })
        dispatch({ type: 'showdown' })
      })
      return 'ok'
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [dispatch, runTransaction])

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
        dispatch({ type: 'reset', payload: { players: nextPlayers }})
      })
      return 'ok'
    }
    catch (error) {
      console.error('Transaction failed: ', error)
    }
  }, [dispatch, runTransaction])

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
        dispatch({ type: 'updatePlayers', payload: { players: nextPlayers }})
      })
      showToast('ニックネームを変更しました', 'success')
    }
    catch (error) {
      console.error('Transaction failed: ', error)
      showToast('ニックネームを変更できませんでした', 'error')
    }
  }, [dispatch, runTransaction, showToast])

  const ejectPlayer = useCallback(async (pid: string) => {
    try {
      await runTransaction(async (transaction) => {
        const docSnap = await transaction.get(roomDocRef.current)
        if (!docSnap.exists()) {
          throw 'Document does not exists!'
        }
        const preData = shapingData(docSnap)
        const { [pid]: _, ...nextPlayers } = preData.players
        transaction.update(roomDocRef.current, { players: nextPlayers, updatedAt: serverTimestamp() })
        dispatch({ type: 'updatePlayers', payload: { players: nextPlayers }})
      })
    }
    catch (error) {
      console.error('Transaction failed: ', error)
      showToast('ユーザーを退席させられませんでした', 'error')
    }
  }, [dispatch, runTransaction, showToast])

  return {
    room,
    entry,
    selectCard,
    showdown,
    resetGame,
    setNickname,
    ejectPlayer,
  }
}