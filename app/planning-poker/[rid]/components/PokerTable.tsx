'use client'

import { useRoom } from '@/app/planning-poker/[rid]/components/hooks/useRoom'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useMe } from '@/app/hooks/useMe'
import { BoardSurface } from '@/app/planning-poker/[rid]/components/BoardSurface'
import { Button } from '@/app/components/Button'
import { showdownResult } from '@/app/planning-poker/[rid]/components/utils/showdownResult'
import { Nickname } from '@/app/planning-poker/[rid]/components/Nickname'
import { PocketCards } from '@/app/planning-poker/[rid]/components/PocketCards'
import { PlayerState } from '@/app/firestore/room/documentData'

export const PokerTable = ({ rid }: { rid: string }) => {
  const ridRef = useRef(rid)
  const { me } = useMe()
  const {
    room,
    entry,
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

  const playerStateWithoutMe = useMemo(() => {
    if (room?.players === undefined || !me) {
      return undefined
    }
    const players = Object.fromEntries(
      Object.entries(room.players)
        .filter(([pid]) => pid !== me.uid)
        .map(([pid, playerState]) => [pid, playerState])
    )
    return Object.keys(players).length ? players : null
  }, [me, room?.players])

  const myPlayerState = useMemo((): PlayerState | undefined => {
    if (!room || !me || !(me.uid in room.players)) {
      return undefined
    } else {
      return room.players[me.uid]
    }
  }, [me, room])

  return me ? (
    <>
      <BoardSurface players={playerStateWithoutMe ?? {}} result={showdownResult(room?.players ?? {})} isReveal={!!room?.isReveal}>
        <Button className="h-fit w-full" onClick={handleActionButton}>
          {room?.isReveal ? 'リセット' : '表示'}
        </Button>
        <Nickname nickname={myPlayerState?.nickname ?? ''} onSubmit={submitNickname} />
      </BoardSurface>
      <PocketCards isReveal={!!room?.isReveal} selectCardId={myPlayerState?.card ?? null} onClick={cid => selectCard(me.uid, cid)} />
    </>
  ) : null
}
