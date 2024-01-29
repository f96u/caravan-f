import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, User } from '@firebase/auth'
import { auth } from '@/app/firebaseApp'
import { useContext, useEffect, useState } from 'react'
import { Input } from '@/app/components/Input'
import { Button } from '@/app/components/Button'
import { UserContext, UserDispatchContext } from '@/app/context/UserContext'

export const AuthForm = () => {
  const user = useContext(UserContext)
  const dispatch = useContext(UserDispatchContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // 登録完了
        const user = userCredential.user
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // 登録完了
        const user = userCredential.user
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'logout' })
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }
  return (
    <div>
      <div className="my-4 flex flex-col">
        ID:<Input value={email} onChange={e => setEmail(e.target.value)} />
        PASS:<Input value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="space-x-1">
        <Button onClick={createUser}>新規作成</Button>
        <Button onClick={login}>ログイン</Button>
        <Button onClick={logout}>ログアウト</Button>
      </div>
    </div>

  )
}