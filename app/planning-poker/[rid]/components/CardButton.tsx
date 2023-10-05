import 'client-only'

import { ReactNode, useCallback } from 'react'
import Card from '@/app/planning-poker/[rid]/components/Card'

type Props = {
  id: string
  children: ReactNode
  selected: boolean
  onClick(id: number): void
}
export default function CardButton({ id, children, selected, onClick }: Props) {
  const handleClick = useCallback(() => onClick(id), [onClick, id])

  return (
    <button
      onClick={handleClick}
    >
      <Card selected={selected}>
      {children}
      </Card>
    </button>
  )
}