import React, { ReactNode, useMemo } from 'react'
import { useMe } from '@/app/hooks/useMe'
import { getKeys } from '@/app/planning-poker/[rid]/utils/getKey'
import { PlayerDisplay } from './components/PlayerDisplay'
import { useRoom } from '@/app/planning-poker/[rid]/hooks/useRoom'
import { showdownResult } from '@/app/planning-poker/[rid]/utils/showdownResult'

const displayMapData = [
  {},
  { B: 0 },
  { B: 0, C: 1 },
  { B: 0, D: 1, F: 2 },
  { B: 0, C: 1, D: 2, F: 3 },
  { A: 1, B: 0, C: 2, D: 3, F: 4 },
  { B: 0, C: 1, D: 2, F: 3, G: 4, I: 5 },
  { A: 1, B: 0, C: 2, D: 3, F: 4, G: 5, I: 6 },
]

type Props = {
  children: ReactNode
}

export const BoardSurface = ({ children }: Props) => {
  const { room, ejectPlayer } = useRoom()
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

  const displayMap = useMemo(() => displayMapData[numPlayer], [numPlayer])

  const otherPlayerIds = Object.keys(playerStateWithoutMe).sort()
  return (
    <>
      {numPlayer < 1 && <div className="rounded-md bg-indigo-300 px-3.5 py-1 text-sm text-white">他のプレイヤーの参加を待っています。</div>}
      <div className={`mb-4 grid gap-4 ${numPlayer % 2 ? 'grid-cols-3' : 'grid-cols-2' }`}>
        {!!(numPlayer % 2) && <div className="min-h-[6rem]">
          {displayMap['A'] !== undefined && <PlayerDisplay playerState={playerStateWithoutMe[otherPlayerIds[displayMap['A']]]} isTurnOver={isReveal} onClick={() => ejectPlayer(otherPlayerIds[displayMap['A']])} />}
        </div>}
        <div className="min-h-[6rem]">
          {displayMap['B'] !== undefined && <PlayerDisplay playerState={playerStateWithoutMe[otherPlayerIds[displayMap['B']]]} isTurnOver={isReveal} onClick={() => ejectPlayer(otherPlayerIds[displayMap['B']])} />}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['C'] !== undefined && <PlayerDisplay playerState={playerStateWithoutMe[otherPlayerIds[displayMap['C']]]} isTurnOver={isReveal} onClick={() => ejectPlayer(otherPlayerIds[displayMap['C']])} />}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="min-h-[6rem]">
          {displayMap['D'] !== undefined && <PlayerDisplay playerState={playerStateWithoutMe[otherPlayerIds[displayMap['D']]]} isTurnOver={isReveal} onClick={() => ejectPlayer(otherPlayerIds[displayMap['D']])} />}
        </div>
        <div className="flex items-center justify-center rounded-md bg-indigo-100 p-8 text-5xl font-semibold shadow-sm">
          {isReveal ? result : '-'}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['F'] !== undefined && <PlayerDisplay playerState={playerStateWithoutMe[otherPlayerIds[displayMap['F']]]} isTurnOver={isReveal} onClick={() => ejectPlayer(otherPlayerIds[displayMap['F']])} />}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['G'] !== undefined && <PlayerDisplay playerState={playerStateWithoutMe[otherPlayerIds[displayMap['G']]]} isTurnOver={isReveal} onClick={() => ejectPlayer(otherPlayerIds[displayMap['G']])} />}
        </div>
        <div className="flex flex-col justify-center gap-2">
          {children}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['I'] !== undefined && <PlayerDisplay playerState={playerStateWithoutMe[otherPlayerIds[displayMap['I']]]} isTurnOver={isReveal} onClick={() => ejectPlayer(otherPlayerIds[displayMap['I']])} />}
        </div>
      </div>
    </>
  )
}
