export type CompletionResponse = {
  id: string
  object: string
  created: number
  model: string
  choices: {
    text: string
    index: number
    logprobs: {
      text_offset: number[]
      token_logprobs: number[]
      tokens: string[]
      top_logprobs: {
        [key: string]: number
      }[]
      text: string
    } | null
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}
