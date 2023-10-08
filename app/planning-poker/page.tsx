import React from 'react'
import { Rooms } from '@/app/planning-poker/components/Rooms'
import { Navigation } from '@/app/components/Navigation'
import { routeMap } from '@/app/routes'
import { ToastProvider } from '@/app/context/ToastContext'

export default function PlanningPoker() {
  return (
    <main>
      <Navigation currentPathname={routeMap.planningPoker.path} />
      <h1 className="text-2xl text-center my-10">プランニングポーカー</h1>
      <Rooms />
    </main>
  )
}