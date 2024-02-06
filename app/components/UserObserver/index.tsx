'use client'
import { useContext, useEffect } from 'react'
import { auth } from '@/app/firebaseApp'
import { onAuthStateChanged } from '@firebase/auth'
import { UserDispatchContext } from '@/app/context/UserContext'

export const UserObserver = () => {
  const dispatch = useContext(UserDispatchContext)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'login', payload: { user }})
      } else {
        dispatch({ type: 'logout' })
      }
    })
  }, [dispatch])

  return null
}