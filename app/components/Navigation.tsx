import { routes } from '@/app/routes'
import { MobileMenu } from '@/app/components/MobileMenu'

type Props = {
  currentPathname: string
}

export const Navigation = ({ currentPathname }: Props) => {
  return (
    <nav className="sticky">
      <div className="bg-gray-800 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <MobileMenu currentPathname={currentPathname} />
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {routes.map(route => (
                  <a
                    key={route.path}
                    href={route.path}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${route.path === currentPathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    { ...(route.path === currentPathname ? { "aria-current": "page" } : {}) }
                  >
                    {route.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}