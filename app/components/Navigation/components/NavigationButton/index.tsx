'use client'
import { Route } from '@/app/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { UserContext } from '@/app/context/UserContext'

type Props = {
  route: Route
}

export const NavigationButton = ({ route }: Props) => {
  const user = useContext(UserContext)
  const pathname = usePathname()

  return route.limit === undefined || route.limit === user?.uid ? (
    <Link
      href={route.path}
      className={`rounded-md px-3 py-2 text-sm font-medium ${route.path === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-sub hover:text-white'}`}
      { ...(route.path === pathname ? { "aria-current": "page" } : {}) }
    >
      {route.name}
    </Link>
  ) : null
}
