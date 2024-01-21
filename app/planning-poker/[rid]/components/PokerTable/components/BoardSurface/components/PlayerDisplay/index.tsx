import React from 'react'
import { PlayerState } from '@/app/firestore/room/documentData'
import CardWithExit from './components/CardWithExist'

type Props = {
  playerState: PlayerState
  isTurnOver: boolean
}
export const PlayerDisplay = ({ playerState, isTurnOver }: Props) => {
  const card = playerState.card

  return (
    <div className="flex flex-col items-center">
      <CardWithExit selected={!!card} onClick={() => {}}>{isTurnOver ? card : "?"}</CardWithExit>
      {playerState.nickname !== '' ? playerState.nickname : 'NOT NAME'}
    </div>
  )
}
