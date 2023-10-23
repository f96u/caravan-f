import { PokerTable } from '@/app/planning-poker/[rid]/components/PokerTable'
import { routeMap } from '@/app/routes'
import { Navigation } from '@/app/components/Navigation'
import React from 'react'

export default function PokerRoom({ params }: { params: { rid: string }}) {
  return (
    <main>
      <h1 className="my-10 text-center text-2xl">ポーカールーム</h1>
      <PokerTable rid={params.rid} />
    </main>
  )
}
