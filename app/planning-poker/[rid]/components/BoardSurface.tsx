import { DocumentData, PlayerState } from '@/app/firestore/room/documentData'
import Card from '@/app/planning-poker/[rid]/components/Card'
import React, { useMemo } from 'react'
import { getKeys } from '@/app/planning-poker/[rid]/components/utils/getKey'

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


const PlayerDisplay = React.memo<{ playerState: PlayerState, isTurnOver: boolean }>(function Component({ playerState, isTurnOver }) {
  const card = useMemo(() => playerState.card, [playerState.card])
  return (
    <div className="flex flex-col items-center">
      <Card selected={!!card}>{isTurnOver ? card : "?"}</Card>
      {playerState.nickname !== '' ? playerState.nickname : 'NOT NAME'}
    </div>
  )
})

type Props = {
  players: DocumentData["players"]
  result: string
  children: React.ReactNode
  isTurnOver: boolean
}

export const BoardSurface = ({ players, isTurnOver, result, children }: Props) => {
  const otherPlayerIds = getKeys(players)
  const numPlayer = otherPlayerIds.length
  const displayMap = displayMapData[numPlayer]

  return (
    <>
      <div className={`mb-4 grid gap-4 ${numPlayer % 2 ? 'grid-cols-3' : 'grid-cols-2' }`}>
        {!!(numPlayer % 2) && <div className="min-h-[6rem]">
          {displayMap['A'] !== undefined && (
            <PlayerDisplay playerState={players[otherPlayerIds[displayMap['A']]]} isTurnOver={isTurnOver} />
          )}
        </div>}
        <div className="min-h-[6rem]">
          {displayMap['B'] !== undefined && (
            <PlayerDisplay playerState={players[otherPlayerIds[displayMap['B']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['C'] !== undefined && (
            <PlayerDisplay playerState={players[otherPlayerIds[displayMap['C']]]} isTurnOver={isTurnOver} />
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="min-h-[6rem]">
          {displayMap['D'] !== undefined && (
            <PlayerDisplay playerState={players[otherPlayerIds[displayMap['D']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="flex items-center justify-center rounded-md bg-indigo-100 p-8 text-5xl font-semibold shadow-sm">
          {isTurnOver ? result : '?'}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['F'] !== undefined && (
            <PlayerDisplay playerState={players[otherPlayerIds[displayMap['F']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['G'] !== undefined && (
            <PlayerDisplay playerState={players[otherPlayerIds[displayMap['G']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="flex flex-col justify-center gap-2">
          {children}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['I'] !== undefined && (
            <PlayerDisplay playerState={players[otherPlayerIds[displayMap['I']]]} isTurnOver={isTurnOver} />
          )}
        </div>
      </div>
    </>
  )
}