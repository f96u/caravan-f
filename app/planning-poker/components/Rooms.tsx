'use client'
import { useCallback, useEffect } from 'react'
import { useRoom } from '@/app/planning-poker/components/hooks/useRoom'
import { Button } from '@/app/components/Button'
import Link from 'next/link'
import { useMe } from '@/app/hooks/useMe'
import { XMark } from '@/app/svg/XMark'

export const Rooms = () => {
  const { me, signIn, signOut } = useMe()
  const { roomList, checkRoom, createRoom, deleteRoom } = useRoom()

  useEffect(() => {
    if (me?.uid) {
      checkRoom()
    }
  }, [checkRoom, me?.uid])

  const delRoom = useCallback((rid: string) => {
    deleteRoom(rid)
  }, [deleteRoom])

  return me !== undefined ? (
    <div className="flex flex-col items-center">
      {me === null && (
        <Button onClick={signIn}>ゲストログイン</Button>
      )}
      {me !== null && (
        <>
          <div className="flex flex-col gap-1">
            <Button onClick={signOut}>ログアウト</Button>
            <Button onClick={createRoom}>部屋を作成する</Button>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <div className="divide-y divide-gray-100">
              {roomList.map((rid, idx) => (
                <div key={rid} className="flex px-4 py-6 sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <span className="mx-4 text-sm font-semibold leading-6 text-gray-900">Room {idx+1}</span>
                  <Link className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" href={`/planning-poker/${rid}`}>{rid}</Link>
                  <button className="ml-auto cursor-pointer" onClick={() => delRoom(rid)}><XMark /></button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  ) : null
}