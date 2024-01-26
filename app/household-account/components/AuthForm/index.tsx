'use client'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from '@/app/firebaseApp'
import { useState } from 'react'
import { Input } from '@/app/components/Input'
import { Button } from '@/app/components/Button'

export const AuthForm = () => {
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

  const signIn = () => {
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
  return (
    <div>
      <Input value={email} onChange={e => setEmail(e.target.value)} />
      <Input value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={createUser}>新規作成</Button>
      <Button onClick={signIn}>ログイン</Button>
    </div>

  )
}