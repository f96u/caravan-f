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
    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
      <span key={day} className="m-px block w-10 text-center text-sm text-gray-500">
        {day}
      </span>
    ))}
  </div>
)

const Days = ({ weeks }: {weeks: number[]}) => (
  <div className="flex">
    {weeks.map(day => (
      <div key={day}>
        <button type="button" className="m-px flex size-10 items-center justify-center rounded-full border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 disabled:pointer-events-none disabled:text-gray-300 dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>
          {day}
        </button>
      </div>
    ))}
  </div>
)

export const DatePicker = () => {
  return (
    <>
      <div className="grid justify-items-center space-y-0.5">
        <Months />
        <Weeks />
        <Days weeks={[26, 27, 28, 29, 30, 1, 2]} />
        <Days weeks={[3, 4, 5, 6, 7, 8, 9]} />
        <Days weeks={[10, 11, 12, 13, 14, 15, 16]} />
        <Days weeks={[17, 18, 19, 20, 21, 22, 23]} />
        <Days weeks={[24, 25, 26, 27, 28, 29, 30]} />
        <Days weeks={[31, 1, 2, 3, 4, 5, 6]} />
      </div>

    </>
  )
}