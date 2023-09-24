'use client'

import React, { createContext, useContext, useRef, useState } from 'react'
import { ToastType } from '@/app/type/ToastType'
import { Toast } from '@/app/components/Toast'

const DISPLAY_TIME = 500000

type ToastContext = {
  showToast: (message: string, type: ToastType) => void
  closeToast: () => void
}

export const ToastContext = createContext<ToastContext>({
  showToast: () => {},
  closeToast: () => {}
})

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<ToastType>('success')
  const [isShowToast, setIsShowToast] = useState(false)
  const timerIdRef = useRef<number>()

  const showToast = (message: string, type: ToastType) => {
    window.clearTimeout(timerIdRef.current)
    setToastMessage(message)
    setToastType(type)
    setIsShowToast(true)
    timerIdRef.current = window.setTimeout(() => {
      setIsShowToast(false)
    }, DISPLAY_TIME)
  }

  const closeToast = () => {
    window.clearTimeout(timerIdRef.current)
    setIsShowToast(false)
  }

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {isShowToast && <Toast message={toastMessage} toastType={toastType} />}
      {children}
    </ToastContext.Provider>
  )
}
