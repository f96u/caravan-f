'use client'

import { useRoom } from '@/app/planning-poker/[rid]/components/hooks/useRoom'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useMe } from '@/app/hooks/useMe'
import { useToast } from '@/app/context/ToastContext'
import { BoardSurface } from '@/app/planning-poker/[rid]/components/BoardSurface'
import { Button } from '@/app/components/Button'
import { showdownResult } from '@/app/planning-poker/[rid]/components/utils/showdownResult'
import { Nickname } from '@/app/planning-poker/[rid]/components/Nickname'
import { PocketCards } from '@/app/planning-poker/[rid]/components/PocketCards'

export const PokerTable = ({ rid }: { rid: string }) => {
  const ridRef = useRef(rid)
  const { me } = useMe()
  const {
    startRoomSubscription,
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
  } = useRoom(ridRef.current)
  const [isTurnOver, setIsTurnOver] = useState(false)
  const router = useRouter()
  const { showToast } = useToast()
  const initRef = useRef(false)

  useEffect(() => {
    //NOTE: 部屋に入室する
    if (!me || !!myPlayerState(me.uid)) {
      return
    }
    entry(me.uid)
      .then(() => {
        // NOTE: 情報のサブクス開始
        startRoomSubscription()
      })
      .catch(error => {
        showToast('入室できませんでした', 'error')
        router.replace('/planning-poker')
        console.error(error)
      })
    initRef.current = true
    return () => {
      (async () => await exit(me.uid))()
    }
  }, [entry, exit, me, myPlayerState, router, showToast, startRoomSubscription])

  useEffect(() => {
    // NOTE: 他のプレイヤーがshowdownした際の処理
    setIsTurnOver(!!room?.showdown)
  }, [room?.showdown])

  const submitNickname = async (nickname: string) => {
    if (!me) {
      return
    }
    try {
      await setNickname(me.uid, nickname)
      showToast('ニックネームを変更しました', 'success')
    } catch (e) {
      console.error(e)
      showToast('ニックネームを変更できませんでした', 'error')
    }
  }

  const handleActionButton = () => {
    if (isTurnOver) {
      resetGame().then(r => r && setIsTurnOver(false))
    } else {
      showdown().then(r => r && setIsTurnOver(true))
    }
  }

  return me ? (
    <>
      <BoardSurface players={playerStateWithoutMe(me.uid) ?? {}} result={showdownResult(room?.players ?? {})} isTurnOver={isTurnOver}>
        <Button className="h-fit w-full" disabled={canTurnOver} onClick={handleActionButton}>
          {isTurnOver ? 'リセット' : '表示'}
        </Button>
        <Nickname nickname={myPlayerState(me.uid)?.nickname ?? ''} onSubmit={submitNickname} />
      </BoardSurface>
      <PocketCards isTurnOver={isTurnOver} selectCardId={myPlayerState(me.uid)?.card ?? null} onClick={cid => selectCard(me.uid, cid)} />
    </>
  ) : null
}
