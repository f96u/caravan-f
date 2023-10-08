import { Navigation } from '@/app/components/Navigation'
import { routeMap } from '@/app/routes'

export default function Home() {
  return (
    <main>
      <Navigation currentPathname={routeMap.top.path} />
    </main>
  )
}
