import { Days } from '@/app/household-account/components/DatePicker/components/Days'
import { useCallback, useState } from 'react'
import { CalendarDate } from '@/app/household-account/components/DatePicker/types/CalendarDate'

type Props = {
  calendarDate: CalendarDate
  onChange: (cDate: CalendarDate) => void
}

export const DatePicker = ({ calendarDate, onChange }: Props) => {
  const [displayingYear, setDisplayingYear] = useState(calendarDate.year)
  const [displayingMonth, setDisplayingMonth] = useState(calendarDate.month)
  const prevMonth = () => {
    const { year, month, date } = calendarDate
    if (month === 0) {
      setDisplayingYear(prev => prev - 1)
      setDisplayingMonth(11)
    } else {
      setDisplayingMonth(prev => prev - 1)
    }
  }

  const nextMonth = () => {
    const { year, month, date } = calendarDate
    if (month === 11) {
      setDisplayingYear(prev => prev + 1)
      setDisplayingMonth(0)
    } else {
      setDisplayingMonth(prev => prev + 1)
    }
  }

  const selectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayingYear(Number(event.target.value))
  }

  const selectMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayingMonth(Number(event.target.value))
  }

  const changeDate = useCallback((date: number) => onChange({ year: displayingYear, month: displayingMonth, date }), [displayingMonth, displayingYear, onChange])

  return (
    <div className="grid justify-items-center space-y-0.5">
      <div className="mx-1.5 grid grid-cols-5 items-center gap-x-3 pb-3">
        <div className="col-span-1">
          <button onClick={prevMonth} type="button" className="flex size-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50">
            <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        </div>
        <div className="col-span-3 flex items-center justify-center gap-x-1">
          <div className="relative">
            <select value={displayingYear} onChange={selectYear} className="h-full border-0 bg-transparent bg-none px-1 focus:ring-0 sm:text-sm">
              {Array.from({ length: 3 }).map((_, idx) => (
                <option value={idx + 2023} key={idx}>{idx + 2023}</option>
              ))}
            </select>
          </div>
          <span className="text-gray-800">/</span>
          <div className="relative">
            <select value={displayingMonth} onChange={selectMonth} className="h-full border-0 bg-transparent bg-none px-1 focus:ring-0 sm:text-sm">
              {Array.from({ length: 12 }).map((_, idx) => (
                <option key={idx} value={idx}>{idx + 1}月</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-1 flex justify-end">
          <button onClick={nextMonth} type="button" className="flex size-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50">
            <svg className="size-4 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      <div className="flex pb-1.5">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <span key={day} className="m-px block w-10 text-center text-sm text-gray-500">
            {day}
          </span>
        ))}
      </div>
      <Days calendarDate={calendarDate} displayingYear={displayingYear} displayingMonth={displayingMonth} onChange={changeDate} />
    </div>
  )
}