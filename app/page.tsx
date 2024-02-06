import { routeMap } from '@/app/routes'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect(routeMap.planningPoker.path)
}
