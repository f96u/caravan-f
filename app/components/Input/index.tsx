import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>
export const Input = ({ ...rest }: Props) => (
  <input
    { ...rest }
    className="rounded-sm px-2 py-1 outline-0 ring-1 ring-sub focus:ring-2 focus:ring-main"
  />
)
