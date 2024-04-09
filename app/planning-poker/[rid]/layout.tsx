import React from 'react'
import { routeMap } from '@/app/routes'
import { Breadcrumb } from '@/app/planning-poker/[rid]/components/Breadcrumb'

export default function PokerRoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumb parents={[routeMap.planningPoker]} current="ポーカールーム" />
      {children}
    </>
  )
}
