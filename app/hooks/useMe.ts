import { useCallback, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signInAnonymously, User, signOut as fbSignOut } from '@firebase/auth'
import { app } from '@/app/firebaseApp'

export const useMe = () => {
  const [me, setMe] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    if (me !== undefined) {
      return
    }
    onAuthStateChanged(getAuth(app), user => {
      user && setMe(user)
    })
  }, [me])

  const signIn = useCallback(() => {
    signInAnonymously(getAuth())
      .then(credentials => {
        setMe(credentials.user)
      })
      .catch(error => {
        console.log(error.code, ': ', error.message)
      })
  }, [setMe])

  const signOut = useCallback(() => {
    fbSignOut(getAuth())
      .then(() => {
        setMe(null)
      })
      .catch(error => {
        console.log(error.code, ': ', error.message)
      })
  }, [setMe])

  return { me, signIn, signOut }
}