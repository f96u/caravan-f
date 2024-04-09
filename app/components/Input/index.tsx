import React, { useEffect, useState } from 'react'

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
  value: string
  onChange: (val: string) => void
  variant?: 'amount'
}

export const Input = ({ className, variant, onChange, onFocus, onBlur, value, ...rest }: Props) => {
  const [inValue, setInValue] = useState('')

  useEffect(() => {
    if (variant === 'amount') {
      setInValue(value ? Number(value).toLocaleString() : '')
    } else {
      setInValue(value === undefined ? '' : `${value}`)
    }
  }, [variant, value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInValue(event.target.value)
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const trimValue = inValue.replace(/,/g, '')
    setInValue(trimValue)
    onFocus?.(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (variant === 'amount') {
      const value = event.target.value
      const halfWithStr = value.replace(
        /[０-９]/g,
        (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0)
      )

      if (value !== '' && isFinite(Number(halfWithStr))) {
        const fixValue = Number(halfWithStr).toLocaleString()
        setInValue(fixValue)
        onChange(halfWithStr)
      } else {
        setInValue('')
      }
    } else {
      onChange(event.target.value)
    }
    onBlur?.(event)
  }

  return (
    <input
      value={inValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      {...rest}
      className={`block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    />
  )
}