import 'client-only'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  selected?: boolean
}
export default function Card({ selected, children }: Props) {
  return (
    <div
      className={`rounded-md w-12 h-20 flex justify-center items-center text-lg font-semibold shadow-sm border-blue-500 border hover:bg-blue-50 ${selected ? 'bg-blue-500' : 'bg-white '}`}
    >
      {children}
    </div>
  )
}