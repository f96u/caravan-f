import 'client-only'

import { ReactNode, useCallback } from 'react'

type Props = {
  id: string
  children: ReactNode
  selected: boolean
  onClick: (id: string) => void
}
export default function Card({ id, children, selected, onClick }: Props) {
  const handleClick = useCallback(() => onClick(id), [onClick, id])

  return (
    <button
      className={`rounded-md px-4 py-6 text-lg font-semibold shadow-sm border-blue-500 border hover:bg-blue-50 ${selected ? 'bg-blue-500' : 'bg-white '}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}