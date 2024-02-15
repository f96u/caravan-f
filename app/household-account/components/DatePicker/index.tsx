const Months = () => (
  <div className="mx-1.5 grid grid-cols-5 items-center gap-x-3 pb-3">
      <div className="col-span-1">
        <button type="button" className="flex size-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50">
          <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      </div>
      <div className="col-span-3 flex items-center justify-center gap-x-1">
        <div className="relative">
          <select>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6" selected>July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>
        </div>
        <span className="text-gray-800">/</span>
        <div className="relative">
          <select>
            <option selected>2023</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
            <option>2027</option>
          </select>
        </div>
      </div>
      <div className="col-span-1 flex justify-end">
        <button type="button" className="flex size-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50">
          <svg className="size-4 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
)

const Weeks = () => (
  <div className="flex pb-1.5">
    {['日', '月', '火', '水', '木', '金', '土'].map(day => (
      <span key={day} className="m-px block w-10 text-center text-sm text-gray-500">
        {day}
      </span>
    ))}
  </div>
)

/**
 * 指定されたyearとmonthからカレンダーを表示する
 * @param year 年を示す。2024など
 * @param month 月を示す0から11の数字
 * @constructor
 */
const Days = ({ year, month }: { year: number; month: number}) => {
  const startDay = new Date(year, month, 1).getDay() // 月の最初の日の曜日を取得
  const endDate = new Date(year, month + 1,  0) // 月の最後の日を取得
   // 前月の最後の日の情報
   // 前月の末日
  const weeks = (weekNum: number ) => Array.from({ length: 7 }).map((_, idx) => {
    // NOTE: 第1周目の処理
    if (weekNum === 0) {
      if (idx >= startDay) {
        return idx - startDay + 1
      } else {
        // NOTE: 前月の日を表示する
        return new Date(year, month, 0).getDate() - startDay + idx + 1
      }
    }
    // NOTE: 第2週目以降の処理
    const oneDay = idx - startDay + 1 + (7 * weekNum)
    if (oneDay > endDate.getDate()) {
      // NOTE: 次月の表示をする
      return oneDay - endDate.getDate()
    }
    return oneDay
  })

  return (
    <>
      {Array.from({ length: 6 }).map((_, weekNum) => (
        <div key={weekNum} className="flex">
          {weeks(weekNum).map(day => (
            <div key={day}>
              <button type="button" className="m-px flex size-10 items-center justify-center rounded-full border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 disabled:pointer-events-none disabled:text-gray-300 dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>
                {day}
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export const DatePicker = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  return (
    <>
      <div className="grid justify-items-center space-y-0.5">
        <Months />
        <Weeks />
        <Days year={year} month={month} />
      </div>

    </>
  )
}