import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

if (!apiKey) {
  throw new Error('VITE_OPENAI_API_KEY is not set in environment variables')
}

export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true, // Only for development - use a backend in production
})
