type Props = {
  label: string
  children: React.ReactNode
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  value: string
  className?: string
}

export const Select = ({ label, children, onChange, value, className }: Props) => {
  return (
    <div className={`relative w-full ${className}`}>
      <select
        className="peer block w-full rounded-lg border-gray-200 p-4 pe-9 text-sm autofill:pb-2 autofill:pt-6 focus:border-blue-500 focus:pb-2 focus:pt-6 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-6"
        onChange={onChange}
        value={value}
      >
        {children}
      </select>
      <label
        className="pointer-events-none absolute start-0 top-0 h-full truncate border border-transparent p-4 transition duration-100 ease-in-out peer-focus:-translate-y-1.5 peer-focus:text-xs peer-focus:text-gray-500 peer-disabled:pointer-events-none peer-disabled:opacity-50 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500"
      >
        {label}
      </label>
    </div>
  )
}