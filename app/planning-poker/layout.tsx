import { ToastProvider } from '@/app/context/ToastContext'

export default function PlanningPokerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  )
}