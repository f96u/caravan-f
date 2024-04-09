'use client'

import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { Button } from '@/app/components/Button'
import { PlayerState } from '@/app/firestore/room/documentData'
import { BoardSurface } from '@/app/planning-poker/[rid]/components/PokerTable/components/BoardSurface'
import { PocketCards } from '@/app/planning-poker/[rid]/components/PokerTable/components/PoketCard'
import { useRoom } from '@/app/planning-poker/[rid]/hooks/useRoom'
import { Nickname } from '@/app/planning-poker/[rid]/components/PokerTable/components/Nickname'
import { UserContext } from '@/app/context/UserContext'

export const PokerTable = () => {
  const user = useContext(UserContext)
  const {
    room,
    entry,
    selectCard,
    showdown,
    resetGame,
    setNickname,
  } = useRoom()
  const initRef = useRef(false)

  //NOTE: 部屋に入室する
  useEffect(() => {
    if (!user || initRef.current) {
      return
    }
    initRef.current = true
    entry(user.uid)
  }, [entry, user])

  const submitNickname = async (nickname: string) => {
    if (!user) {
      return
    }
    await setNickname(user.uid, nickname)
  }

  const handleActionButton = () => {
    room?.isReveal ? resetGame() : showdown()
  }

  const myPlayerState = useMemo((): PlayerState | undefined => {
    if (!room || !user || !(user.uid in room.players)) {
      return undefined
    } else {
      return room.players[user.uid]
    }
  }, [user, room])

  const canShowdown = useMemo(() => {
    if (!room || Object.values(room.players).length < 2) {
      return false
    }
    return Object.values(room.players).every(ps => ps.card !== null)
  }, [room])

  return user ? (
    <>
      <BoardSurface>
        <Button className="h-fit w-full" onClick={handleActionButton} disabled={!canShowdown}>
          {room?.isReveal ? 'リセット' : 'ショーダウン'}
        </Button>
        <Nickname nickname={myPlayerState?.nickname ?? ''} onSubmit={submitNickname} />
      </BoardSurface>
      <PocketCards isReveal={!!room?.isReveal} selectCardId={myPlayerState?.card ?? null} onClick={cid => selectCard(user.uid, cid)} />
    </>
  ) : null
}
