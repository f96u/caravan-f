'use client'
import { Route } from '@/app/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  route: Route
}

export const NavigationButton = ({ route }: Props) => {
  const pathname = usePathname()
  return (
    <Link
      href={route.path}
      className={`rounded-md px-3 py-2 text-sm font-medium ${route.path === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-sub hover:text-white'}`}
      { ...(route.path === pathname ? { "aria-current": "page" } : {}) }
    >
      {route.name}
    </Link>
  )
}