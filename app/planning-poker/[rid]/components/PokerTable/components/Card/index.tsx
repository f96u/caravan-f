import 'client-only'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  selected: boolean
  clickable?: boolean
}
export default function Card({ selected, children, clickable = false }: Props) {
  return (
    <div
      className={`flex h-20 w-12 items-center justify-center rounded-md border-2 border-indigo-600 text-lg font-semibold shadow-sm ${clickable ? 'hover:bg-indigo-50' : ''} ${selected ? 'bg-indigo-500 text-white hover:bg-indigo-500' : 'bg-white'}`}
    >
      {children}
    </div>
  )
}