import { memo } from 'react'

/**
 * 指定されたyearとmonthからカレンダーを表示する
 * @param year 年を示す。2024など
 * @param month 月を示す0から11の数字
 * @constructor
 */
export const Days = memo(function Days({ year, month }: { year: number; month: number}) {
  const startDay = new Date(year, month, 1).getDay() // 月の最初の日の曜日を取得
  const endDate = new Date(year, month + 1,  0) // 月の最後の日を取得
  // 前月の最後の日の情報
  // 前月の末日
  const weeks = (weekNum: number ): { day: number, isThisMonth: boolean }[] => Array.from({ length: 7 }).map((_, idx) => {
    // NOTE: 第1周目の処理
    if (weekNum === 0) {
      if (idx >= startDay) {
        return { day: idx -startDay + 1, isThisMonth: true }
      } else {
        // NOTE: 前月の日を表示する
        return { day: new Date(year, month, 0).getDate() - startDay + idx + 1, isThisMonth: false}
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

  return (
    <>
      {Array.from({ length: 6 }).map((_, weekNum) => (
        <div key={weekNum} className="flex">
          {weeks(weekNum).map(({ day, isThisMonth }) => (
            <div key={day}>
              <button disabled={!isThisMonth} type="button" className="m-px flex size-10 items-center justify-center rounded-full border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 disabled:pointer-events-none disabled:text-gray-300">
                {day}
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  )
})