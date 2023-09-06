import { useCallback, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signInAnonymously, User } from '@firebase/auth'

export const useAuth = () => {
  const [me, setMe] = useState<null | User>(null)

  useEffect(() => {
    onAuthStateChanged(getAuth(), user => {
      setMe(user)
    })
  }, [])

  const signIn = useCallback(() => {
    signInAnonymously(getAuth())
      .then(credentials => {
        setMe(credentials.user)
      })
      .catch(error => {
        console.log(error.code, ': ', error.message)
      })
  }, [])

  return { me, signIn }
}