'use client'

import { useRoom } from '@/app/planning-poker/[rid]/components/hooks/useRoom'
import React, { useEffect, useRef } from 'react'
import { useMe } from '@/app/hooks/useMe'
import { BoardSurface } from '@/app/planning-poker/[rid]/components/BoardSurface'
import { Button } from '@/app/components/Button'
import { showdownResult } from '@/app/planning-poker/[rid]/components/utils/showdownResult'
import { Nickname } from '@/app/planning-poker/[rid]/components/Nickname'
import { PocketCards } from '@/app/planning-poker/[rid]/components/PocketCards'

export const PokerTable = ({ rid }: { rid: string }) => {
  const ridRef = useRef(rid)
  const { me } = useMe()
  const {
    room,
    playerStateWithoutMe,
    entry,
    myPlayerState,
    selectCard,
    showdown,
    resetGame,
    setNickname,
  } = useRoom(ridRef.current)
  const initRef = useRef(false)

  //NOTE: 部屋に入室する
  useEffect(() => {
    if (!me || initRef.current) {
      return
    }
    initRef.current = true
    entry(me.uid)
  }, [entry, me])

  const submitNickname = async (nickname: string) => {
    if (!me) {
      return
    }
    await setNickname(me.uid, nickname)
  }

  const handleActionButton = () => {
    room?.isReveal ? resetGame() : showdown()
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
