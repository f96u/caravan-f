import { DocumentData, PlayerState } from '@/app/firestore/room/documentData'
import Card from '@/app/planning-poker/[rid]/components/Card'
import { showdownResult } from '@/app/planning-poker/[rid]/components/utils/showdownResult'
import { Button } from '@/app/components/Button'
import React, { useMemo } from 'react'

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

const getKeys = <T extends {[key: string]: unknown}>(obj: T): (keyof T)[] => {
  return Object.keys(obj)
}

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
  players: DocumentData["players"],
  isTurnOver: boolean
  onActionButton: () => void
}

export const BoardSurface = ({ players, isTurnOver, onActionButton }: Props) => {
  const playerIds = getKeys(players)
  const numPlayer = playerIds.length
  const displayMap = displayMapData[numPlayer]
  const disabledButton = playerIds.some(pid => players[pid].card === null)

  return (
    <>
      <div className={`grid gap-4 mb-4 ${numPlayer % 2 ? 'grid-cols-3' : 'grid-cols-2' }`}>
        {!!(numPlayer % 2) && <div className="bg-amber-50">
          {displayMap['A'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['A']]]} isTurnOver={isTurnOver} />
          )}
        </div>}
        <div className="bg-amber-100">
          {displayMap['B'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['B']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="bg-amber-200">
          {displayMap['C'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['C']]]} isTurnOver={isTurnOver} />
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-amber-300">
          {displayMap['D'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['D']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="bg-indigo-100 p-8 rounded-md flex justify-center items-center text-5xl font-semibold shadow-sm">{isTurnOver ? showdownResult(players) : '?'}</div>
        <div className="bg-amber-500">
          {displayMap['F'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['F']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="bg-amber-600">
          {displayMap['G'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['G']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="flex justify-center"><Button className="w-full" disabled={disabledButton} onClick={onActionButton}>{isTurnOver ? 'リセット' : '表示'}</Button></div>
        <div className="bg-amber-800">
          {displayMap['I'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['I']]]} isTurnOver={isTurnOver} />
          )}
        </div>
      </div>
    </>
  )
}