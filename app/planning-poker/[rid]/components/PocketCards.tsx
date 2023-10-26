import { cardIds, PlayerState } from '@/app/firestore/room/documentData'
import CardButton from '@/app/planning-poker/[rid]/components/CardButton'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  isTurnOver: boolean
  selectCardId: PlayerState["card"]
  onClick: (id: string) => void
}
export const PocketCards = ({ isTurnOver, selectCardId, onClick }: Props) => {
  const [tmpSelectId, setTmpSelectId] = useState<string | null>(null)

  useEffect(() => {
    if (tmpSelectId === selectCardId) {
      setTmpSelectId(null)
    }
  }, [selectCardId, tmpSelectId])

  const handleSelect = (id: string) => {
    if (!tmpSelectId) {
      setTmpSelectId(id)
      onClick(id)
    }
  }

  const selected = (id: string) => {
    return tmpSelectId === null ? selectCardId === id : tmpSelectId === id
  }

  return (
    <div className="m-1 flex flex-wrap items-center justify-center gap-2 rounded-md bg-indigo-100 p-3">
      {cardIds.map(cid => (
        <CardButton key={cid} id={cid} selected={selected(cid)} isLock={isTurnOver} onClick={handleSelect}>{cid}</CardButton>
      ))}
    </div>
  )
}
