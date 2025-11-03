import { ChatOpenAI } from 'langchain/chat_models/openai'
import { HumanMessage, SystemMessage } from 'langchain/schema'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

if (!apiKey) {
  throw new Error('VITE_OPENAI_API_KEY is not set in environment variables')
}

// Initialize LangChain with OpenAI
export const chat = new ChatOpenAI({
  openAIApiKey: apiKey,
  temperature: 0.7,
  modelName: 'gpt-4',
})

// Example helper function to send a message
export async function sendMessage(systemPrompt: string, userMessage: string) {
  const messages = [
    new SystemMessage(systemPrompt),
    new HumanMessage(userMessage),
  ]

  const response = await chat.call(messages)
  return response.content
}
