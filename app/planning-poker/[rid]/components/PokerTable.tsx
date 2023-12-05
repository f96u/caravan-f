'use client'

import { useRoom } from '@/app/planning-poker/[rid]/components/hooks/useRoom'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { doc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useMe } from '@/app/hooks/useMe'
import { useToast } from '@/app/context/ToastContext'
import { BoardSurface } from '@/app/planning-poker/[rid]/components/BoardSurface'
import { Button } from '@/app/components/Button'
import { showdownResult } from '@/app/planning-poker/[rid]/components/utils/showdownResult'
import { Nickname } from '@/app/planning-poker/[rid]/components/Nickname'
import { PocketCards } from '@/app/planning-poker/[rid]/components/PocketCards'
import { useFirestore } from '@/app/hooks/useFirestore'

export const PokerTable = ({ rid }: { rid: string }) => {
  const ridRef = useRef(rid)
  const { getDoc } = useFirestore()
  const { me } = useMe()
  const {
    room,
    playerStateWithoutMe,
    entry,
    exit,
    myPlayerState,
    selectCard,
    showdown,
    resetGame,
    setNickname,
    canTurnOver,
  } = useRoom(me, ridRef.current)
  const [isTurnOver, setIsTurnOver] = useState(false)
  const router = useRouter()
  const { showToast } = useToast()
  const initRef = useRef(false)

  // NOTE: 初期化
  useEffect(() => {
    if (initRef.current) {
      return
    }
    //NOTE: 部屋の存在チェック
    const docRef = doc(db, 'room', rid)
    getDoc(docRef)
      .then(docSnap => {
        if (!docSnap.exists()) {
          // NOTE: 部屋は存在しないので退室
          router.replace('/planning-poker')
        }
      })
    //NOTE: 部屋に入室する
    entry()
      .catch(error => {
        showToast('入室できませんでした', 'error')
        router.replace('/planning-poker')
        console.error(error)
      })
    initRef.current = true
    return () => {
      (async () => await exit())()
    }
  }, [entry, exit, getDoc, rid, router, showToast])

  // NOTE: 他のプレイヤーがshowdownした際の処理
  useEffect(() => {
    // setIsTurnOver(!!room?.showdown)
  }, [room?.showdown])

  const submitNickname = (nickname: string) => {
    return setNickname(nickname)
      .then(() => {
        showToast('ニックネームを変更しました', 'success')
      })
  }

  const handleActionButton = () => {
    if (isTurnOver) {
      resetGame().then(r => r && setIsTurnOver(false))
    } else {
      showdown().then(r => r && setIsTurnOver(true))
    }
  }

  return (
    <>
      <BoardSurface players={playerStateWithoutMe ?? {}} result={showdownResult(room?.players ?? {})} isTurnOver={isTurnOver}>
        <Button className="h-fit w-full" disabled={canTurnOver} onClick={handleActionButton}>
          {isTurnOver ? 'リセット' : '表示'}
        </Button>
        <Nickname nickname={myPlayerState.nickname} onSubmit={submitNickname} />
      </BoardSurface>
      <PocketCards isTurnOver={isTurnOver} selectCardId={myPlayerState.card} onClick={selectCard} />
    </>
  )
}
