import { routes } from '@/app/routes'
import { MobileMenu } from '@/app/components/MobileMenu'
import { NavigationButton } from '@/app/components/Navigation/components/NavigationButton'

export const Navigation = () => {
  return (
    <nav className="sticky">
      <div className="mx-auto max-w-7xl bg-gray-800 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <MobileMenu />
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {routes.map(route => (
                  <NavigationButton key={route.path} route={route} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}