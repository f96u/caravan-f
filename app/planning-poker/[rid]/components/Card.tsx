import 'client-only'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  selected: boolean
}
export default function Card({ selected, children }: Props) {
  return (
    <div
      className={`rounded-md w-12 h-20 flex justify-center items-center text-lg font-semibold shadow-sm border-indigo-500 border ${selected ? 'bg-indigo-500 text-white' : 'hover:bg-indigo-50 bg-white'}`}
    >
      {children}
    </div>
  )
}