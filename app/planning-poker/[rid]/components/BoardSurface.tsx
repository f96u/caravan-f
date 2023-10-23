import { DocumentData, PlayerState } from '@/app/firestore/room/documentData'
import Card from '@/app/planning-poker/[rid]/components/Card'
import { showdownResult } from '@/app/planning-poker/[rid]/components/utils/showdownResult'
import { Button } from '@/app/components/Button'
import React, { useCallback, useMemo, useState } from 'react'
import { useToast } from '@/app/context/ToastContext'

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
  setNickname: (nickname: string) => Promise<void>
}

export const BoardSurface = ({ players, isTurnOver, onActionButton, setNickname }: Props) => {
  const playerIds = getKeys(players)
  const numPlayer = playerIds.length
  const displayMap = displayMapData[numPlayer]
  const disabledButton = playerIds.some(pid => players[pid].card === null)

  const { showToast } = useToast()
  const [draftNickname, setDraftNickname] = useState('')

  const changeNickname = useCallback((event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    event && setDraftNickname(event.target.value)
  }, [])

  const submitNickname = useCallback(() => {
    setNickname(draftNickname)
      .then(() => {
        setDraftNickname('')
        showToast('ニックネームを変更しました', 'success')
      })
  }, [draftNickname, setNickname, showToast])

  return (
    <>
      <div className={`mb-4 grid gap-4 ${numPlayer % 2 ? 'grid-cols-3' : 'grid-cols-2' }`}>
        {!!(numPlayer % 2) && <div className="min-h-[6rem]">
          {displayMap['A'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['A']]]} isTurnOver={isTurnOver} />
          )}
        </div>}
        <div className="min-h-[6rem]">
          {displayMap['B'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['B']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['C'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['C']]]} isTurnOver={isTurnOver} />
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="min-h-[6rem]">
          {displayMap['D'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['D']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="flex items-center justify-center rounded-md bg-indigo-100 p-8 text-5xl font-semibold shadow-sm">
          {isTurnOver ? showdownResult(players) : '?'}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['F'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['F']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="min-h-[6rem]">
          {displayMap['G'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['G']]]} isTurnOver={isTurnOver} />
          )}
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Button className="h-fit w-full" disabled={disabledButton} onClick={onActionButton}>
            {isTurnOver ? 'リセット' : '表示'}
          </Button>
          <div className="flex">
            <input
              id="nickname"
              name="nickname"
              placeholder="ニックネーム"
              value={draftNickname}
              onChange={changeNickname}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <Button onClick={submitNickname}>変更</Button>
          </div>
        </div>
        <div className="min-h-[6rem]">
          {displayMap['I'] !== undefined && (
            <PlayerDisplay playerState={players[playerIds[displayMap['I']]]} isTurnOver={isTurnOver} />
          )}
        </div>
      </div>
    </>
  )
}