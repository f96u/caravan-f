'use client'

import { useOpenAi } from '@/app/tourist/components/hooks/useOpenAi'
import { Button } from '@/app/components/Button'
import { ChangeEvent, useCallback, useState } from 'react'
import { CompletionResponse } from '@/app/tourist/components/type/CompletionResponse'

export const Lounge = () => {
  const { sendPrompt } = useOpenAi()
  const [draftPrompt, setDraftPrompt] = useState('')
  const [reply, setReply] = useState<CompletionResponse | null>(null)

  const changeDraftPrompt = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setDraftPrompt(event.target.value)
  }, [])

  const send = useCallback(() => {
    sendPrompt(draftPrompt)
      .then(json => setReply(json))
  }, [draftPrompt, sendPrompt])

  return (
    <>
      <div className="col-span-full">
        今日どこいく？
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">都道府県</span>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="janesmith"
              />
            </div>
          </div>
        </div>
        <label htmlFor="prompt" className="block text-sm font-medium leading-6 text-gray-900">プロンプト</label>
        <div className="mt-2">
          <textarea
            id="prompt"
            name="about"
            rows={3}
            onChange={changeDraftPrompt}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <Button onClick={send}>送る</Button>
      <>{JSON.stringify(reply)}</>
    </>
  )
}