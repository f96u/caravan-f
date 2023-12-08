import { useCallback } from 'react'
import { useToast } from '@/app/context/ToastContext'
import { CompletionResponse } from '@/app/tourist/components/type/CompletionResponse'

export const useOpenAi = () => {
  const { showToast } = useToast()

  const sendPrompt = useCallback(async (prompt: string): Promise<CompletionResponse> => {
    const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY
    if (!apiKey || !prompt) {
      showToast('必要な情報がありません', 'warning')
      return Promise.reject()
    }
    try {
      const res = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          'model': 'gpt-3.5-turbo-instruct',
          'prompt': prompt,
          'max_tokens': 150,
          'temperature': 1
        })
      })
      return await res.json()
    } catch (error) {
      showToast('AIとの対話に失敗しました', 'error')
      console.error(error)
      return Promise.reject()
    }
  }, [showToast])

  return { sendPrompt }
}