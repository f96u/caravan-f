import { ToastProvider } from '@/app/context/ToastContext'
import React from 'react'
import { routeMap } from '@/app/routes'
import { Navigation } from '@/app/components/Navigation'

export default function PlanningPokerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <Navigation currentPathname={routeMap.planningPoker.path} />
      <div className="m-4">
        {children}
      </div>
    </ToastProvider>
  )
}