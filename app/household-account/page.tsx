import React from 'react'
import { AuthForm } from '@/app/household-account/components/AuthForm'

export default function HouseholdAccount() {
  return (
    <main>
      <h1 className="my-10 text-center text-2xl">複式家計簿</h1>
      <AuthForm />
    </main>
  )
}