import 'client-only'
import { ReactNode } from 'react'

type Props = {
  onClick: () => void
  children: ReactNode
}

export const Button = ({ onClick, children }: Props) => {
  return (
    <button
      className="whitespace-nowrap rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
