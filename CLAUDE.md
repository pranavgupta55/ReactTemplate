# React + Tailwind + API Project

## Tech Stack
- React 18 + TypeScript
- Vite for build/dev
- TailwindCSS for styling
- OpenAI, LangChain, Supabase, Pinecone for backend services

## Commands
- `npm install` - Install dependencies
- `npm run dev` - Start dev server (usually http://localhost:5173)
- `npm run build` - Production build
- `npm run typecheck` - Check TypeScript types
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Environment Variables
Required in `.env`:
- `VITE_OPENAI_API_KEY` - OpenAI API key
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key
- `VITE_PINECONE_API_KEY` - Pinecone API key
- `VITE_PINECONE_ENVIRONMENT` - Pinecone environment

IMPORTANT: Never commit `.env` - always use `.env.example` for templates

## Code Patterns
- Store API clients in `src/lib/` (openai.ts, supabase.ts, etc.)
- Components in `src/components/`
- Pages/routes in `src/pages/`
- Utilities in `src/utils/`
- Types in `src/types/`

## Tailwind Preferences
- Use utility classes over custom CSS
- Mobile-first responsive design
- Use Tailwind's built-in colors and spacing scale
- Extract common patterns to components, not @apply directives

## Git Workflow
- Branch naming: `feat/description`, `fix/description`, `chore/description`
- All PRs require passing lint, typecheck, and tests
- Squash commits before merging
