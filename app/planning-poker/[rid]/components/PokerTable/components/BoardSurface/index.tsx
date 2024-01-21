import React, { ReactNode, useMemo } from 'react'
import { useMe } from '@/app/hooks/useMe'
import { getKeys } from '@/app/planning-poker/[rid]/utils/getKey'
import { PlayerDisplay } from './components/PlayerDisplay'
import { useRoom } from '@/app/planning-poker/[rid]/hooks/useRoom'
import { showdownResult } from '@/app/planning-poker/[rid]/utils/showdownResult'

type Props = {
  children: ReactNode
}

export const BoardSurface = ({ children }: Props) => {
  const { room } = useRoom()
  const { me } = useMe()

  const playerStateWithoutMe = useMemo(() => {
    if (room?.players === undefined || !me) {
      return {}
    }
    const players = Object.fromEntries(
      Object.entries(room.players)
        .filter(([pid]) => pid !== me.uid)
        .map(([pid, playerState]) => [pid, playerState])
    )
    return Object.keys(players).length ? players : {}
  }, [me, room?.players])

  const result = useMemo(() => {
    return showdownResult(room?.players ?? {})
  }, [room?.players])

  const isReveal = useMemo(() => !!room?.isReveal, [room?.isReveal])

  const numPlayer = getKeys(playerStateWithoutMe).length
  return (
    <>
      {numPlayer < 1 && <div className="rounded-md bg-indigo-300 px-3.5 py-1 text-sm text-white">他のプレイヤーの参加を待っています。</div>}
      <div className={`mb-4 grid gap-4 ${numPlayer % 2 ? 'grid-cols-3' : 'grid-cols-2' }`}>
        {!!(numPlayer % 2) && <div className="min-h-[6rem]">
          <PlayerDisplay players={playerStateWithoutMe} mapping="A" isTurnOver={isReveal} />
        </div>}
        <div className="min-h-[6rem]">
          <PlayerDisplay players={playerStateWithoutMe} mapping="B" isTurnOver={isReveal} />
        </div>
        <div className="min-h-[6rem]">
          <PlayerDisplay players={playerStateWithoutMe} mapping="C" isTurnOver={isReveal} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="min-h-[6rem]">
          <PlayerDisplay players={playerStateWithoutMe} mapping="D" isTurnOver={isReveal} />
        </div>
        <div className="flex items-center justify-center rounded-md bg-indigo-100 p-8 text-5xl font-semibold shadow-sm">
          {isReveal ? result : '-'}
        </div>
        <div className="min-h-[6rem]">
          <PlayerDisplay players={playerStateWithoutMe} mapping="F" isTurnOver={isReveal} />
        </div>
        <div className="min-h-[6rem]">
          <PlayerDisplay players={playerStateWithoutMe} mapping="G" isTurnOver={isReveal} />
        </div>
        <div className="flex flex-col justify-center gap-2">
          {children}
        </div>
        <div className="min-h-[6rem]">
          <PlayerDisplay players={playerStateWithoutMe} mapping="I" isTurnOver={isReveal} />
        </div>
      </div>
    </>
  )
}