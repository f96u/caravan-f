import { ReactNode, useCallback } from 'react'
import { XMark } from '@/app/svg/XMark'
import Card from '@/app/planning-poker/[rid]/components/PokerTable/components/Card'

type Props = {
  children: ReactNode
  selected: boolean
  onClick: () => void
}

export default function CardWithExit({ children, selected, onClick }: Props) {
  const handleClick = useCallback(() => onClick(), [onClick])

  return (
    <div className="relative">
      <button
        className="absolute flex size-full items-center justify-center rounded-md bg-gray-700 text-white opacity-0 hover:opacity-100"
        onClick={handleClick}
      >
        <XMark />
      </button>
      <Card selected={selected} clickable={false}>
        {children}
      </Card>
    </div>
  )
}