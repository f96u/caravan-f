import { routes } from '@/app/routes'
import { NavigationButton } from '@/app/components/Navigation/components/NavigationButton'
import React from 'react'
import { AuthButton } from '@/app/components/Navigation/components/AuthButton'
import { Caravan } from '@/app/svg/Caravan'
import { MobileMenu } from '@/app/components/Navigation/components/MobileMenu'

export const Navigation = () => {
  return (
    <nav className="sticky">
      <div className="mx-auto bg-main sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <MobileMenu />
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <span className="size-6 text-white"><Caravan /></span>
            <div className="hidden w-full sm:ml-6 sm:block">
              <div className="flex flex-row justify-between">
                <div className="flex space-x-4">
                  {routes.map(route => (
                    <NavigationButton key={route.path} route={route} />
                  ))}
                </div>
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}