import 'client-only'
import { ReactNode } from 'react'

type Props = {
  onClick: () => void
  children: ReactNode
  disabled: boolean
  className?: string
}

export const Button = ({ onClick, children, disabled, className }: Props) => {
  return (
    <button
      className={`whitespace-nowrap rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white ${disabled ? 'bg-gray-400' : 'hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
