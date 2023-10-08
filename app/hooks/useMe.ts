import { useCallback, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signInAnonymously, User, signOut as fbSignOut } from '@firebase/auth'
import { app } from '@/app/firebaseApp'
import { Me } from '@/app/planning-poker/type/Me'

export const useMe = () => {
  const [me, setMe] = useState<Me | null | undefined>(undefined)

  useEffect(() => {
    if (me !== undefined) {
      return
    }
    onAuthStateChanged(getAuth(app), user => {
      user ?  setMe({ user, nickname: '' }) : setMe(null)
    })
  }, [me])

  const signIn = useCallback(() => {
    signInAnonymously(getAuth())
      .then(credentials => {
        setMe({ user: credentials.user, nickname: '' })
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

  const setNickname = useCallback((nickname: string) => {
    // TODO: ローカルストレージにnicknameを保存する
    me && setMe({ user: me.user, nickname })
  }, [me])

  return { me, signIn, signOut, setNickname }
}