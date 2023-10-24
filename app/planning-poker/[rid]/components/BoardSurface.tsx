import { DocumentData } from '@/app/firestore/room/documentData'
import React from 'react'
import { getKeys } from '@/app/planning-poker/[rid]/components/utils/getKey'
import { PlayerDisplay } from '@/app/planning-poker/[rid]/components/PlayerDisplay'

type Props = {
  players: DocumentData["players"]
  result: string
  children: React.ReactNode
  isTurnOver: boolean
}

export const BoardSurface = ({ players, isTurnOver, result, children }: Props) => {
  const numPlayer = getKeys(players).length

  return (
    <>
      <div className={`mb-4 grid gap-4 ${numPlayer % 2 ? 'grid-cols-3' : 'grid-cols-2' }`}>
        {!!(numPlayer % 2) && <div className="min-h-[6rem]">
          <PlayerDisplay players={players} mapping="A" isTurnOver={isTurnOver} />
        </div>}
        <div className="min-h-[6rem]">
          <PlayerDisplay players={players} mapping="B" isTurnOver={isTurnOver} />
        </div>
        <div className="min-h-[6rem]">
          <PlayerDisplay players={players} mapping="C" isTurnOver={isTurnOver} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="min-h-[6rem]">
          <PlayerDisplay players={players} mapping="D" isTurnOver={isTurnOver} />
        </div>
        <div className="flex items-center justify-center rounded-md bg-indigo-100 p-8 text-5xl font-semibold shadow-sm">
          {isTurnOver ? result : '?'}
        </div>
        <div className="min-h-[6rem]">
          <PlayerDisplay players={players} mapping="F" isTurnOver={isTurnOver} />
        </div>
        <div className="min-h-[6rem]">
          <PlayerDisplay players={players} mapping="G" isTurnOver={isTurnOver} />
        </div>
        <div className="flex flex-col justify-center gap-2">
          {children}
        </div>
        <div className="min-h-[6rem]">
          <PlayerDisplay players={players} mapping="I" isTurnOver={isTurnOver} />
        </div>
      </div>
    </>
  )
}