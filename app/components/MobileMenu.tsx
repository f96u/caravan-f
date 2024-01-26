'use client'

// NOTE: モバイル用のメニュー表示の高さとして十分に高い数値を指定
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { routes } from '@/app/routes'

const MOBILE_MENU_HEIGHT_FALL_BACK = 2000

const getHeight = (elementRef: RefObject<HTMLDivElement>) => {
  const height = elementRef.current?.getBoundingClientRect().height
  return typeof height === 'number' ? height : MOBILE_MENU_HEIGHT_FALL_BACK
}

type Props = {
  currentPathname: string
}

export const MobileMenu = ({ currentPathname }: Props) => {
  const [mobileMenuState, setMobileMenuState] = useState({
    show: false,
    enableAnimate: false,
    height: MOBILE_MENU_HEIGHT_FALL_BACK
  })

  const mobileMenuElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMobileMenuState(prev => ({ ...prev, enableAnimate: false, height: getHeight(mobileMenuElementRef) }))
  }, [])

  useEffect(() => {
    const resizeEventType: keyof WindowEventMap = 'resize'
    const orientationEventType: keyof WindowEventMap = 'orientationchange'
    const listener = () => {
      setMobileMenuState(prev => ({ ...prev, enableAnimate: false, height: getHeight(mobileMenuElementRef) }))
    }
    window.addEventListener(resizeEventType, listener)
    window.addEventListener(orientationEventType, listener)
    return () => {
      window.removeEventListener(resizeEventType, listener)
      window.removeEventListener(orientationEventType, listener)
    }
  }, [])

  const mobileMenu = useCallback(() => {
    setMobileMenuState(prev => ({ ...prev, show: !prev.show, enableAnimate: true }))
  }, [])

  return (
    <div className="absolute w-full sm:hidden">
      <div className="inset-y-0 left-0 flex items-center px-2">
        <button
          type="button"
          className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={mobileMenu}
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
          <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="pointer-events-none relative">
        <div
          className={`absolute mt-1 w-full bg-gray-800 sm:hidden ${mobileMenuState.enableAnimate ? 'delay-5 transition-all ease-in ' : ' '}${mobileMenuState.show ? 'pointer-events-auto opacity-100' : `pointer-events-none opacity-0` }`}
          id="mobile-menu"
          ref={mobileMenuElementRef}
          style={mobileMenuState.show ? { marginTop: 0 } : { marginTop: -(mobileMenuState.height * 0.1) }}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {routes.map(route => (
              <a
                key={route.path}
                href={route.path}
                className={`block rounded-md px-3 py-2 text-base font-medium ${route.path === currentPathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                { ...(route.path === currentPathname ? { "aria-current": "page" } : {}) }
              >
                {route.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}