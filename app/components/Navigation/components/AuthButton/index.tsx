'use client'
import React, { useContext, useState } from 'react'
import { Login } from '@/app/svg/Login'
import { Dialog as HeadlessDialog } from '@headlessui/react'
import { UserContext, UserDispatchContext } from '@/app/context/UserContext'
import { Logout } from '@/app/svg/Logout'
import { getAuth, signInWithEmailAndPassword, signOut } from '@firebase/auth'
import { Input } from '@/app/components/Input'
import { Button } from '@/app/components/Button'
import { app } from '@/app/lib/firebase/init'
import { Dialog } from '@/app/components/Dialog'
import { useToast } from '@/app/context/ToastContext'

export const AuthButton = () => {
  const user = useContext(UserContext)
  const dispatch = useContext(UserDispatchContext)
  const { showToast } = useToast()
  const [open, setOpen] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const openDialog = () => {
    setIsLoginForm(user !== null)
    setOpen(true)
  }

  const login = () => {
    signInWithEmailAndPassword(getAuth(app), email, password)
      .then(userCredential => {
        // 登録完了
        const user = userCredential.user
        setOpen(false)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        showToast(`errorCode: ${errorCode} errorMessage: ${errorMessage}`, 'error')
      })
  }

  const logout = () => {
    signOut(getAuth(app))
      .then(() => {
        dispatch({ type: 'logout' })
        setOpen(false)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  return user !== undefined ? (
    <>
      <button className="rounded-md p-1 text-sm text-gray-300 hover:bg-sub hover:text-white" onClick={openDialog}>
        {user ? <Logout /> : <Login />}
      </button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        {isLoginForm ? (
          <>
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-main text-white sm:mx-0 sm:size-10">
                  <Logout />
                </div>
                <div className="mt-3 grow text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <HeadlessDialog.Title as="h3" className="font-semibold leading-6 text-black">
                    ログアウトしますか
                  </HeadlessDialog.Title>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-2 bg-base px-4 py-3 sm:flex sm:flex-row sm:px-6">
              <Button onClick={logout}>ログアウト</Button>
              <Button onClick={() => setOpen(false)}>キャンセル</Button>
            </div>
          </>
        ) : (
          <>
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-main text-white sm:mx-0 sm:size-10">
                  <Login />
                </div>
                <div className="mt-3 grow text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <HeadlessDialog.Title as="h3" className="font-semibold leading-6 text-black">
                    ログイン
                  </HeadlessDialog.Title>
                  <div className="mt-2">
                    <div className="my-4 flex flex-col">
                      ID:<Input type="email" value={email} onChange={val => setEmail(val)} />
                      PASS:<Input type="password" value={password} onChange={val => setPassword(val)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-end space-x-2 bg-base px-4 py-3 sm:flex sm:flex-row sm:px-6">
              <Button
                onClick={login}
              >
                ログイン
              </Button>
              <Button
                onClick={() => setOpen(false)}
              >
                キャンセル
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </>
  ) : null
}
