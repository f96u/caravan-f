'use client'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export default function Card({ children }: Props) {

  return (
    <button className="bg-white rounded-md px-4 py-6 text-lg font-semibold shadow-sm border-blue-500 border hover:bg-blue-50">{children}</button>
  )
}