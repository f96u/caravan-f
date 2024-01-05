'use client'

import { useRoom } from '@/app/planning-poker/[rid]/components/hooks/useRoom'
import React, { useEffect, useMemo, useRef } from 'react'
import { useMe } from '@/app/hooks/useMe'
import { BoardSurface } from '@/app/planning-poker/[rid]/components/BoardSurface'
import { Button } from '@/app/components/Button'
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

  const myPlayerState = useMemo((): PlayerState | undefined => {
    if (!room || !me || !(me.uid in room.players)) {
      return undefined
    } else {
      return room.players[me.uid]
    }
  }, [me, room])

  const canShowdown = useMemo(() => {
    if (!room || Object.values(room.players).length < 2) {
      return false
    }
    return Object.values(room.players).every(ps => ps.card !== null)
  }, [room])

  return me ? (
    <>
      <BoardSurface rid={ridRef.current}>
        <Button className="h-fit w-full" onClick={handleActionButton} disabled={!canShowdown}>
          {room?.isReveal ? 'リセット' : 'ショーダウン'}
        </Button>
        <Nickname nickname={myPlayerState?.nickname ?? ''} onSubmit={submitNickname} />
      </BoardSurface>
      <PocketCards isReveal={!!room?.isReveal} selectCardId={myPlayerState?.card ?? null} onClick={cid => selectCard(me.uid, cid)} />
    </>
  ) : null
}
