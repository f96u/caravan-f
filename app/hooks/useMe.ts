import { useCallback, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signInAnonymously, User } from '@firebase/auth'
import { app } from '@/app/firebaseApp'

export const useMe = () => {
  const [me, setMe] = useState<User | null>(null)

  useEffect(() => {
    if (me !== null) {
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

  return { me, signIn }
}