import { Breadcrumb } from '@/app/components/Breadcrumb'
import React from 'react'
import { routeMap } from '@/app/routes'

export default function PokerRoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumb parents={[routeMap.planningPoker]} current="ポーカールーム" />
      {children}
    </>
  )
}
