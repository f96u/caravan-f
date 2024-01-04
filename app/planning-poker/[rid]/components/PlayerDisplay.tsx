import React from 'react'
import { getKeys } from '@/app/planning-poker/[rid]/components/utils/getKey'
import { DocumentData } from '@/app/firestore/room/documentData'
import CardWithExit from '@/app/planning-poker/[rid]/components/CardWithExit'

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
  players: DocumentData["players"]
  mapping: 'A' | 'B' | 'C' | 'D' | 'F' | 'G' | 'I'
  isTurnOver: boolean
}
export const PlayerDisplay = ({ players, mapping, isTurnOver }: Props) => {
  const otherPlayerIds = getKeys(players)
  const numPlayer = otherPlayerIds.length
  const displayMap = displayMapData[numPlayer]
  const elementNum = displayMap['B']
  if (elementNum === undefined) {
    return null
  }

  const playerState = players[otherPlayerIds[elementNum]]
  const card = playerState.card

  return displayMap[mapping] !== undefined ? (
    <div className="flex flex-col items-center">
      <CardWithExit selected={!!card} onClick={() => {}}>{isTurnOver ? card : "?"}</CardWithExit>
      {playerState.nickname !== '' ? playerState.nickname : 'NOT NAME'}
    </div>
  ): null
}
