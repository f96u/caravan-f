import { PokerTable } from '@/app/planning-poker/[rid]/components/PokerTable'
import React from 'react'
import { CheckRoom } from './components/CheckRoom'
import { RoomProvider } from '@/app/planning-poker/[rid]/Provider/RoomProvider'

export default function PokerRoom({ params }: { params: { rid: string }}) {
  return (
    <>
      <CheckRoom rid={params.rid} />
      <h1 className="my-10 text-center text-2xl">ポーカールーム</h1>
      <RoomProvider rid={params.rid}>
        <PokerTable />
      </RoomProvider>
    </>
  )
}
