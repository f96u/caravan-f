'use client'

import { usePlayers } from '@/app/planning-poker/[rid]/components/hooks/usePlayers'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '@/app/firebaseApp'
import { useMe } from '@/app/hooks/useMe'
import CardButton from '@/app/planning-poker/[rid]/components/CardButton'
import { useToast } from '@/app/context/ToastContext'
import { cardIds } from '@/app/firestore/room/documentData'
import { BoardSurface } from '@/app/planning-poker/[rid]/components/BoardSurface'
import { Button } from '@/app/components/Button'
import { showdownResult } from '@/app/planning-poker/[rid]/components/utils/showdownResult'
import { Nickname } from '@/app/planning-poker/[rid]/components/Nickname'

export const PokerTable = ({ rid }: { rid: string }) => {
  const { me } = useMe()
  const {
    players,
    otherPlayers,
    entry,
    exit,
    myChoiceCard,
    selected,
    reset,
    setNickname,
    turnOver,
    isTurnOver,
    canTurnOver,
  } = usePlayers(me, rid)
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

  const submitNickname = useCallback((nickname: string) => {
    return setNickname(nickname)
      .then(() => {
        showToast('ニックネームを変更しました', 'success')
      })
  }, [setNickname, showToast])

  return (
    <>
      <BoardSurface players={otherPlayers ?? {}} result={showdownResult(players ?? {})} isTurnOver={isTurnOver}>
        <Button className="h-fit w-full" disabled={canTurnOver} onClick={isTurnOver ? reset : turnOver}>
          {isTurnOver ? 'リセット' : '表示'}
        </Button>
        <Nickname onSubmit={submitNickname} />
      </BoardSurface>
      <div className="m-1 flex items-center justify-center rounded-md bg-indigo-100 p-1 [&>:nth-child(n+2)]:ml-4">
        {cardIds.map(cardId => (
          <CardButton key={cardId} id={cardId} selected={myChoiceCard === cardId} isLock={isTurnOver} onClick={selected}>{cardId}</CardButton>
        ))}
      </div>
    </>
  )
}
