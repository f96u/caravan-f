import { PokerTable } from '@/app/planning-poker/[rid]/components/PokerTable'
import React from 'react'
import { CheckRoom } from './components/CheckRoom'

export default function PokerRoom({ params }: { params: { rid: string }}) {
  return (
    <main>
      <CheckRoom rid={params.rid} />
      <h1 className="my-10 text-center text-2xl">ポーカールーム</h1>
      <PokerTable rid={params.rid} />
    </main>
  )
}
