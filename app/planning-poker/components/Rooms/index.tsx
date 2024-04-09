'use client'
import { useCallback, useContext, useEffect } from 'react'
import { Button } from '@/app/components/Button'
import Link from 'next/link'
import { XMark } from '@/app/svg/XMark'
import { useRoom } from '@/app/planning-poker/components/Rooms/hooks/useRoom'
import { UserContext } from '@/app/context/UserContext'
import { getAuth, signInAnonymously, signOut as fbSignOut } from '@firebase/auth'
import { useToast } from '@/app/context/ToastContext'

export const Rooms = () => {
  const { showToast } = useToast()
  const user = useContext(UserContext)
  const { roomList, checkRoom, createRoom, deleteRoom } = useRoom()

  useEffect(() => {
    if (user?.uid) {
      checkRoom()
    }
  }, [checkRoom, user?.uid])

  const delRoom = useCallback((rid: string) => {
    deleteRoom(rid)
  }, [deleteRoom])

  const signIn = useCallback(() => {
    signInAnonymously(getAuth())
      .then(() => {
        showToast('ゲストログインしました', 'success')
      })
      .catch(error => {
        console.log(error.code, ': ', error.message)
      })
  }, [showToast])

  const signOut = () => {
    fbSignOut(getAuth())
      .then(() => {
        showToast('ログアウトしました', 'success')
      })
      .catch(error => {
        console.log(error.code, ': ', error.message)
      })
  }

  return user !== undefined ? (
    <div className="flex flex-col items-center">
      {user === null && (
        <Button onClick={signIn}>ゲストログイン</Button>
      )}
      {user !== null && (
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