'use client'
import { useCallback, useState } from 'react'
import { Button } from '@/app/components/Button'

const formatTime = (count: number) => {
  const date = new Date(count * 1000)
  return `${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
}

export const Timer = () => {
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null)
  const [count, setCount] = useState(0)

  const handleStartAndStop = useCallback(() => {
    if (timerId === null) {
      setCount(0)
      const id = setInterval(() => {
        setCount(prev => prev + 1)
      }, 1000)
      setTimerId(id)
    } else {
      // @ts-ignore
      clearInterval(timerId)
      setTimerId(null)
    }
  }, [timerId])

  return (
    <div className="flex items-center flex-col">
      <p className="text-3xl font-bold p-8">{formatTime(count)}</p>
      <Button onClick={handleStartAndStop}>Start and Stop</Button>
    </div>
  )
}
