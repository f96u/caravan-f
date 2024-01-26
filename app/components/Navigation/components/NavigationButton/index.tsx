'use client'
import { Route } from '@/app/routes'
import Link from 'next/link'

type Props = {
  route: Route
}

export const NavigationButton = ({ route }: Props) => {
  const currentPathname = window.location.pathname
  return (
    <Link
      href={route.path}
      className={`rounded-md px-3 py-2 text-sm font-medium ${route.path === currentPathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
      { ...(route.path === currentPathname ? { "aria-current": "page" } : {}) }
    >
      {route.name}
    </Link>
  )
}