import React, { useState } from 'react'
import { Button } from '@/app/components/Button'

type Props = {
  nickname: string
  onSubmit: (nickname: string) => Promise<void>
}
export const Nickname = ({ nickname, onSubmit }: Props) => {
  const [draftNickname, setDraftNickname] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const changeNickname = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    event && setDraftNickname(event.target.value)
  }

  const handleChange = () => {
    onSubmit(draftNickname)
      .then(() => {
        setDraftNickname('')
        setIsEdit(false)
      })
  }

  const handleEdit = () => {
    setDraftNickname(nickname)
    setIsEdit(true)
  }

  return (
    <div className="flex gap-1">
      {isEdit ? (
        <>
          <input
            id="nickname"
            name="nickname"
            placeholder="ニックネーム"
            value={draftNickname}
            onChange={changeNickname}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <Button onClick={handleChange}>変更</Button>
        </>
      ) : (
        <div className="flex h-[40px] w-full gap-1">
          <div className="flex h-fit grow cursor-pointer items-center border-b-2 border-b-indigo-600 p-1 hover:border-b-indigo-200" onClick={handleEdit}>
            {nickname === '' ? 'NOT NAME' : nickname}
          </div>
        </div>
      )}
    </div>
  )
}