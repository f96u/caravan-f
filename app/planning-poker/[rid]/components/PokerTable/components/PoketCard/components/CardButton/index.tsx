import { ReactNode, useCallback } from 'react'
import { CardId } from '@/app/firestore/room/documentData'
import Card from '@/app/planning-poker/[rid]/components/PokerTable/components/Card'

type Props = {
  id: CardId
  children: ReactNode
  selected: boolean
  isLock: boolean
  onClick: (id: CardId) => void
}

export default function CardButton({ id, children, selected, isLock, onClick }: Props) {
  const handleClick = useCallback(() => onClick(id), [onClick, id])

  return (
    <button
      disabled={isLock}
      onClick={handleClick}
    >
      <Card selected={selected} clickable={!isLock}>
        {children}
      </Card>
    </button>
  )
}