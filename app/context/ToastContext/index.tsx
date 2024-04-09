'use client'

import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import { Toast } from '@/app/components/Toast'
import { ToastType } from '@/app/context/ToastContext/types/ToastType'

const DISPLAY_TIME = 5000

type ToastContextType = {
  showToast: (message: string, type: ToastType) => void
  closeToast: () => void
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  closeToast: () => {}
})

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<ToastType>('success')
  const [isShowToast, setIsShowToast] = useState(false)
  const timerIdRef = useRef<number>()

  const showToast = useCallback((message: string, type: ToastType) => {
    window.clearTimeout(timerIdRef.current)
    setToastMessage(message)
    setToastType(type)
    setIsShowToast(true)
    timerIdRef.current = window.setTimeout(() => {
      setIsShowToast(false)
    }, DISPLAY_TIME)
  }, [])

  const closeToast = useCallback(() => {
    window.clearTimeout(timerIdRef.current)
    setIsShowToast(false)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {isShowToast && <Toast message={toastMessage} toastType={toastType} />}
      {children}
    </ToastContext.Provider>
  )
}
