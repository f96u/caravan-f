import React, { useState } from 'react'
import { Button } from '@/app/components/Button'

type Props = {
  onSubmit: (nickname: string) => Promise<void>
}
export const Nickname = ({ onSubmit }: Props) => {
  const [draftNickname, setDraftNickname] = useState('')
  const changeNickname = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    event && setDraftNickname(event.target.value)
  }

  const handleChange = () => {
    onSubmit(draftNickname)
      .then(() => {
        setDraftNickname('')
      })
  }

  return (
    <div className="flex gap-1">
      <input
        id="nickname"
        name="nickname"
        placeholder="ニックネーム"
        value={draftNickname}
        onChange={changeNickname}
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <Button onClick={handleChange}>変更</Button>
    </div>
  )
}