import { Pinecone } from '@pinecone-database/pinecone'

const apiKey = import.meta.env.VITE_PINECONE_API_KEY

if (!apiKey) {
  throw new Error('VITE_PINECONE_API_KEY is not set in environment variables')
}

export const pinecone = new Pinecone({
  apiKey,
})
