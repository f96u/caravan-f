import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ className, ...rest }: Props) => (
  <input
    { ...rest }
    className={`block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 ${className}`}
  />
)
