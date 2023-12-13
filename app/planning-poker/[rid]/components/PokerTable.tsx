'use client'

import { useRoom } from '@/app/planning-poker/[rid]/components/hooks/useRoom'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
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
  } = useRoom(ridRef.current)
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
    if (room?.isReveal) {
      resetGame()
    } else {
      showdown()
    }
  }

  return me ? (
    <>
      <BoardSurface players={playerStateWithoutMe(me.uid) ?? {}} result={showdownResult(room?.players ?? {})} isReveal={!!room?.isReveal}>
        <Button className="h-fit w-full" onClick={handleActionButton}>
          {room?.isReveal ? 'リセット' : '表示'}
        </Button>
        <Nickname nickname={myPlayerState(me.uid)?.nickname ?? ''} onSubmit={submitNickname} />
      </BoardSurface>
      <PocketCards isReveal={!!room?.isReveal} selectCardId={myPlayerState(me.uid)?.card ?? null} onClick={cid => selectCard(me.uid, cid)} />
    </>
  ) : null
}
