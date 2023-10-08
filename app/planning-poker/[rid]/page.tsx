import { PokerTable } from '@/app/planning-poker/[rid]/components/PokerTable'
import { routeMap } from '@/app/routes'
import { Navigation } from '@/app/components/Navigation'
import React from 'react'

export default function PokerRoom({ params }: { params: { rid: string }}) {
  return (
    <main>
      <h1 className="text-2xl text-center my-10">ポーカールーム</h1>
      <PokerTable rid={params.rid} />
    </main>
  )
}
