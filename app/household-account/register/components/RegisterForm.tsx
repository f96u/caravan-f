'use client'

import { Input } from '@/app/components/Input'
import { useState } from 'react'
import { DatePicker } from '@/app/household-account/components/DatePicker'
import { CalendarDate } from '@/app/household-account/components/DatePicker/types/CalendarDate'

const currentDate = new Date()

export const RegisterForm = () => {
  const [calendarDate, setCalendarDate] = useState<CalendarDate>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate(),
  })
  const [describe, setDescribe] = useState('')
  const [debit, setDebit] = useState('')
  const [credit, setCredit] = useState('')
  const [debitAmount, setDebitAmount] = useState('')
  const [creditAmount, setCreditAmount] = useState('')

  return (
    <div className="sm:flex">
      <DatePicker calendarDate={calendarDate} onChange={cDate => setCalendarDate(cDate)} />
      <div className="flex flex-1 flex-col gap-1">
        <Input placeholder="摘要" value={describe} onChange={event => setDescribe(event.target.value)} />
        <div className="flex flex-col gap-1 md:flex-row">
          <div className="flex gap-1">
            <Input placeholder="借方" value={debit} onChange={event => setDebit(event.target.value)} />
            <Input className="max-w-32" placeholder="金額" value={debitAmount} onChange={event => setDebitAmount(event.target.value)} type="number" />
          </div>
          <div className="flex gap-1">
            <Input placeholder="貸方" value={credit} onChange={event => setCredit(event.target.value)} />
            <Input className="max-w-32" placeholder="金額" value={creditAmount} onChange={event => setCreditAmount(event.target.value)} type="number" />
          </div>
        </div>
      </div>
    </div>
  )
}