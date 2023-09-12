'use client'
import { useEffect } from 'react'
import { useRooms } from '@/app/planning-poker/components/hooks/useRooms'
import { useRoom } from '@/app/planning-poker/components/hooks/useRoom'
import { Button } from '@/app/components/Button'
import Link from 'next/link'
import { useMe } from '@/app/hooks/useMe'

export const Rooms = () => {
  const { me, signIn } = useMe()
  const { rooms, checkRooms } = useRooms()
  const { createRoom } = useRoom()

  useEffect(() => {
    if (me !== null) {
      checkRooms()
    }
  }, [checkRooms, me])

  return (
    <div className="flex flex-col items-center">
      {me === null && (
        <Button onClick={signIn}>ゲストログイン</Button>
      )}
      現在のログイン状態:{ me === null ? 'ログアウト中' : `ログイン中: ${me.uid}`}
      {me !== null && (
        <>
          <button className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={createRoom}>部屋を作成する</button>
          {rooms.map(rid => (
            <Link key={rid} href={`/planning-poker/${rid}`}>{rid}</Link>
          ))}
        </>
      )}
    </div>
  )
}