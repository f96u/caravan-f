import React from 'react'
import { DatePicker } from './components/DatePicker'

export default function HouseholdAccount() {
  return (
    <main>
      <h1 className="my-10 text-center text-2xl">複式家計簿</h1>
      <DatePicker />
    </main>
  )
}