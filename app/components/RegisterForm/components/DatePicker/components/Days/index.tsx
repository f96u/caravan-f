import { memo } from 'react'
import { CalendarDate } from '@/app/components/RegisterForm/types/CalendarDate'

type Props = {
  calendarDate: CalendarDate
  displayingYear: number
  displayingMonth: number
  onChange: (date: number) => void
}

export const Days = memo(function Days({ calendarDate: { year, month, date }, displayingYear, displayingMonth, onChange }: Props) {
  const startDay = new Date(displayingYear, displayingMonth, 1).getDay() // 月の最初の日の曜日を取得
  const endDate = new Date(displayingYear, displayingMonth + 1,  0) // 月の最後の日を取得
  const weeks = (weekNum: number ): { day: number, isThisMonth: boolean }[] => Array.from({ length: 7 }).map((_, idx) => {
    // NOTE: 第1周目の処理
    if (weekNum === 0) {
      if (idx >= startDay) {
        return { day: idx -startDay + 1, isThisMonth: true }
      } else {
        // NOTE: 前月の日を表示する
        return { day: new Date(displayingYear, displayingMonth, 0).getDate() - startDay + idx + 1, isThisMonth: false}
      }
    }
    // NOTE: 第2週目以降の処理
    const oneDay = idx - startDay + 1 + (7 * weekNum)
    if (oneDay > endDate.getDate()) {
      // NOTE: 次月の表示をする
      return { day: oneDay -endDate.getDate(), isThisMonth: false }
    }
    return { day: oneDay, isThisMonth: true }
  })

  const isCalendarDate = (day: number) => {
    return displayingYear === year && displayingMonth === month && day === date
  }

  return (
    <>
      {Array.from({ length: 6 }).map((_, weekNum) => (
        <div key={weekNum} className="flex">
          {weeks(weekNum).map(({ day, isThisMonth }) => (
            <div key={day}>
              <button
                disabled={!isThisMonth}
                onClick={() => !isCalendarDate(day) && onChange(day)}
                type="button"
                className={`m-px flex size-10 items-center justify-center rounded-full border border-transparent text-sm hover:border-accent disabled:pointer-events-none disabled:text-gray-300 ${isCalendarDate(day) && isThisMonth ? 'pointer-events-none bg-accent font-medium text-white': 'text-gray-800 hover:text-accent'}`}>
                {day}
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  )
})