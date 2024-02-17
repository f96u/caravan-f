import { MonthPicker } from '@/app/household-account/components/DatePicker/components/MonthPicker'
import { Days } from '@/app/household-account/components/DatePicker/components/Days'
import { useCallback } from 'react'
import { CalendarDate } from '@/app/household-account/components/DatePicker/types/CalendarDate'

type Props = {
  calendarDate: CalendarDate
  onChange: (cDate: CalendarDate) => void
}

export const DatePicker = ({ calendarDate, onChange }: Props) => {
  const changeMonth = useCallback((year: number, month: number) => onChange({ year, month, date: calendarDate.date }), [calendarDate, onChange])
  return (
    <>
      <div className="grid justify-items-center space-y-0.5">
        <MonthPicker year={calendarDate.year} month={calendarDate.month} onChange={changeMonth} />
        <div className="flex pb-1.5">
          {['日', '月', '火', '水', '木', '金', '土'].map(day => (
            <span key={day} className="m-px block w-10 text-center text-sm text-gray-500">
              {day}
            </span>
          ))}
        </div>
        <Days year={calendarDate.year} month={calendarDate.month} />
      </div>
    </>
  )
}