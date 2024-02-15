const Months = ({ year, month }: { year: number; month: number }) => (
  <div className="mx-1.5 grid grid-cols-5 items-center gap-x-3 pb-3">
      <div className="col-span-1">
        <button type="button" className="flex size-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50">
          <svg className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      </div>
      <div className="col-span-3 flex items-center justify-center gap-x-1">
        <div className="relative">
          <select data-hs-select='{
            "placeholder": "Select month",
            "toggleTag": "<button type=\"button\"></button>",
            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 before:absolute before:inset-0 before:z-[1]",
            "dropdownClasses": "mt-2 z-50 w-32 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
            "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-gray-800\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
          }' className="hidden">
            {Array.from({ length: 12 }).map((_, idx) => (
              <option key={idx} value={idx} selected={idx === month}>{idx + 1}月</option>
            ))}
          </select>
        </div>
        <span className="text-gray-800">/</span>
        <div className="relative">
          <select data-hs-select='{
            "placeholder": "Select year",
            "toggleTag": "<button type=\"button\"></button>",
            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 before:absolute before:inset-0 before:z-[1]",
            "dropdownClasses": "mt-2 z-50 w-20 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
            "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-gray-800\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
          }' className="hidden">
            {Array.from({ length: 3 }).map((_, idx) => (
              <option key={idx} selected={year === idx + 2023}>{idx + 2023}</option>
            ))}
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
}

export const DatePicker = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  return (
    <>
      <div className="grid justify-items-center space-y-0.5">
        <Months year={year} month={month} />
        <Weeks />
        <Days year={year} month={month} />
      </div>

    </>
  )
}