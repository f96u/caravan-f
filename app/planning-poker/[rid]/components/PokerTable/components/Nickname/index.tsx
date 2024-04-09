import React, { useState } from 'react'
import { Button } from '@/app/components/Button'
import { Input } from '@/app/components/Input'

type Props = {
  nickname: string
  onSubmit: (nickname: string) => Promise<void>
}
export const Nickname = ({ nickname, onSubmit }: Props) => {
  const [draftNickname, setDraftNickname] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const changeNickname = (val: string) => {
    setDraftNickname(val)
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
          <Input
            id="nickname"
            name="nickname"
            placeholder="ニックネーム"
            value={draftNickname}
            onChange={changeNickname}
          />
          <Button onClick={handleChange}>変更</Button>
        </>
      ) : (
        <div className="flex h-[40px] w-full gap-1">
          <div className="flex h-fit grow cursor-pointer items-center border-b-2 border-b-indigo-600 p-1 hover:border-b-indigo-500" onClick={handleEdit}>
            {nickname === '' ? 'NOT NAME' : nickname}
          </div>
        </div>
      )}
    </div>
  )
}