'use client'
import { Dialog } from '@/app/components/Dialog'
import React, { useState } from 'react'
import { Login } from '@/app/svg/Login'
import { Dialog as HeadlessDialog } from '@headlessui/react'
import { AuthForm } from '@/app/household-account/components/AuthForm'

export const AuthButton = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className="rounded-md p-2 text-sm text-gray-300 hover:bg-sub hover:text-white" onClick={() => setOpen(true)}><Login /></button>
      <Dialog open={open} onSubmit={() => setOpen(false)} onCancel={() => setOpen(false)}>
        <div className="bg-base px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-main text-white sm:mx-0 sm:size-10">
              <Login />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <HeadlessDialog.Title as="h3" className="font-semibold leading-6 text-black">
                ログイン
              </HeadlessDialog.Title>
              <div className="mt-2">
                <AuthForm />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}