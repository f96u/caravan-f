import { memo } from 'react'

type Props = {
  year: number,
  month: number,
  onChange: (year: number, month: number) => void
}
export const MonthPicker = memo(function MonthPicker({ year, month, onChange }: Props) {
  const prevMonth = () => {
    month === 0 ? onChange(year - 1, 11) : onChange(year, month - 1)
  }

  const nextMonth = () => {
    month === 11 ? onChange(year + 1, 0) : onChange(year, month + 1)
  }
  console.log(year, month)
  return (
    <div className="mx-1.5 grid grid-cols-5 items-center gap-x-3 pb-3">
      <div className="col-span-1">
        <button onClick={prevMonth} type="button" className="flex size-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50">
          <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      </div>
      <div className="col-span-3 flex items-center justify-center gap-x-1">
        <div className="relative">
          <select value={year} onChange={event => onChange(Number(event.target.value), month)} className="h-full border-0 bg-transparent bg-none px-1 focus:ring-0 sm:text-sm">
            {Array.from({ length: 3 }).map((_, idx) => (
              <option value={idx + 2023} key={idx}>{idx + 2023}</option>
            ))}
          </select>
        </div>
        <span className="text-gray-800">/</span>
        <div className="relative">
          <select value={month} onChange={event => onChange(year, Number(event.target.value))} className="h-full border-0 bg-transparent bg-none px-1 focus:ring-0 sm:text-sm">
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
  )
})