import 'client-only'

import { ReactNode, useCallback } from 'react'
import Card from '@/app/planning-poker/[rid]/components/Card'

type Props = {
  id: string
  children: ReactNode
  selected: boolean
  isLock: boolean
  onClick: (id: string) => void
}
export default function CardButton({ id, children, selected, isLock, onClick }: Props) {
  const handleClick = useCallback(() => onClick(id), [isLock, onClick, id])

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