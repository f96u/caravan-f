'use client'

import { Input } from '@/app/components/Input'
import { useState } from 'react'
import { DatePicker } from '@/app/household-account/components/DatePicker'
import { CalendarDate } from '@/app/household-account/components/DatePicker/types/CalendarDate'

const currentDate = new Date()

export const RegisterForm = () => {
  const [calendarDate, setCalendarDate] = useState<CalendarDate>({ year: currentDate.getFullYear(), month: currentDate.getMonth(), date: currentDate.getDate()})

  return (
    <div>
      <DatePicker calendarDate={calendarDate} onChange={cDate => setCalendarDate(cDate)} />
      日付
      適用
      借方
      金額
      貸方
      金額
    </div>
  )
}