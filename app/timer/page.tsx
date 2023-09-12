import { Counter } from '@/app/timer/components/Counter'
import { Navigation } from '@/app/components/Navigation'
import { routeMap } from '@/app/routes'

export default function Timer() {
  return (
    <>
      <Navigation currentPathname={routeMap.timer.path} />
      <Counter />
    </>
  )
}