'use client'

import { useToast } from '@/app/context/ToastContext'
import { XMark } from '@/app/svg/XMark'
import { ToastType } from '@/app/context/ToastContext/types/ToastType'

type Props = {
  message: string
  toastType: ToastType
}

const SuccessToast = ({message, onCloseToast}: { message: string, onCloseToast: () => void }) => {
  return (
    <div
      className="pointer-events-auto absolute bottom-5 left-5 flex w-72 animate-fade-out items-center rounded-xl border-green-700 bg-green-200 px-2 py-4 text-green-700">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      </div>
      <p className="p-1">{message}</p>
      <div className="ml-auto cursor-pointer" onClick={onCloseToast}>
        <XMark />
      </div>
    </div>
  )
}

const WarningToast = ({ message, onCloseToast }: { message: string, onCloseToast: () => void }) => {
  return (
    <div
      className="
        absolute bottom-5 left-5 flex w-72 animate-fade-out items-center rounded-xl border-yellow-700
        bg-yellow-200 px-2 py-4 text-yellow-700
      "
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
      </div>
      <p className="pl-1">{message}</p>
      <div className="ml-auto cursor-pointer" onClick={onCloseToast}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  )
}

const ErrorToast = ({ message, onCloseToast }: { message: string, onCloseToast: () => void }) => {
  return (
    <div
      className="
        absolute bottom-5 left-5 flex w-72 animate-fade-out items-center rounded-xl border-red-700
        bg-red-200 px-2 py-4 text-red-700"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <p className="pl-1">{message}</p>
      <div className="ml-auto cursor-pointer" onClick={onCloseToast}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  )
}

export const Toast = ({ message, toastType }: Props) => {
  const { closeToast } = useToast()

  switch (toastType) {
    case 'success':
      return (
        <div className="pointer-events-none">
          <SuccessToast message={message} onCloseToast={closeToast} />
        </div>
      )
    case 'warning':
      return (
        <div className="pointer-events-none">
          <WarningToast message={message} onCloseToast={closeToast} />
        </div>
      )
    case 'error':
      return (
        <div className="pointer-events-none">
          <ErrorToast message={message} onCloseToast={closeToast} />
        </div>
      )
  }
}
