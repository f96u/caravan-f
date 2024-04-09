'use client'
import { useContext, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { UserDispatchContext } from '@/app/context/UserContext'
import { app } from '@/app/lib/firebase/init'

export const UserObserver = () => {
  const dispatch = useContext(UserDispatchContext)
  useEffect(() => {
    onAuthStateChanged(getAuth(app), (user) => {
      if (user) {
        dispatch({ type: 'login', payload: { user }})
      } else {
        dispatch({ type: 'logout' })
      }
    })
  }, [dispatch])

  return null
}