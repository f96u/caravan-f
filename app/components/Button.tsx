import 'client-only'
import { ReactNode } from 'react'

type Props = {
  onClick: () => void
  children: ReactNode
  disabled?: boolean
  className?: string
}

export const Button = ({ onClick, children, disabled = false, className }: Props) => {
  return (
    <button
      className={`whitespace-nowrap rounded-md px-3.5 py-2.5 text-sm font-semibold text-white ${disabled ? 'bg-gray-400' : 'bg-main hover:bg-sub'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
