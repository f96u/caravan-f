'use client'

import { usePlayers } from '@/app/planning-poker/[rid]/components/hooks/usePlayers'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useMe } from '@/app/hooks/useMe'
import { useToast } from '@/app/context/ToastContext'
import { BoardSurface } from '@/app/planning-poker/[rid]/components/BoardSurface'
import { Button } from '@/app/components/Button'
import { showdownResult } from '@/app/planning-poker/[rid]/components/utils/showdownResult'
import { Nickname } from '@/app/planning-poker/[rid]/components/Nickname'
import { PocketCards } from '@/app/planning-poker/[rid]/components/PocketCards'

export const PokerTable = ({ rid }: { rid: string }) => {
  const { me } = useMe()
  const {
    players,
    otherPlayers,
    entry,
    exit,
    myPlayerState,
    selected,
    reset,
    setNickname,
    canTurnOver,
  } = usePlayers(me, rid)
  const [isTurnOver, setIsTurnOver] = useState(false)
  const router = useRouter()
  const { showToast } = useToast()

  useEffect(() => {
    entry()
      .catch(error => {
        showToast('入室できませんでした', 'error')
        router.replace('/planning-poker')
        console.error(error)
      })
    return () => {
      (async () => await exit())()
    }
  }, [entry, exit, router, showToast])

  useEffect(() => {
    const docRef = doc(db, 'room', rid)
    getDoc(docRef)
      .then(docSnap => {
        if (!docSnap.exists()) {
          // NOTE: 部屋は存在しないので退室
          router.replace('/planning-poker')
        }
      })
  }, [rid, router])

  const submitNickname = (nickname: string) => {
    return setNickname(nickname)
      .then(() => {
        showToast('ニックネームを変更しました', 'success')
      })
  }

  const handleActionButton = () => {
    if (isTurnOver) {
      reset().then(r => r && setIsTurnOver(false))
    } else {
      setIsTurnOver(true)
    }
  }

  return (
    <>
      <BoardSurface players={otherPlayers ?? {}} result={showdownResult(players ?? {})} isTurnOver={isTurnOver}>
        <Button className="h-fit w-full" disabled={canTurnOver} onClick={handleActionButton}>
          {isTurnOver ? 'リセット' : '表示'}
        </Button>
        <Nickname nickname={myPlayerState.nickname} onSubmit={submitNickname} />
      </BoardSurface>
      <PocketCards isTurnOver={isTurnOver} selectCardId={myPlayerState.card} onClick={selected} />
    </>
  )
}
