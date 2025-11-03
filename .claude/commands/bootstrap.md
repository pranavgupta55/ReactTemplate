---
description: Bootstrap new React + Tailwind + API project
---

Create a new React + TypeScript + Tailwind project with all our standard APIs and components:

1. If package.json doesn't exist, scaffold with Vite:
   - `npm create vite@latest . -- --template react-ts`
   - `npm install`

2. Install and configure TailwindCSS v4:
   - `npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss`
   - Configure postcss.config.js with @tailwindcss/postcss
   - Configure content paths and dark mode in tailwind.config.js
   - Add @import "tailwindcss" and custom theme to src/index.css

3. Install dependencies:
   - API clients: `npm install openai langchain @supabase/supabase-js @pinecone-database/pinecone`
   - Animation: `npm install framer-motion clsx`

4. Create directory structure:
   - `src/lib/` for API clients
   - `src/components/` for React components
   - `src/pages/` for routes
   - `src/types/` for TypeScript types
   - `src/utils/` for utilities

5. Create API client files in src/lib/:
   - openai.ts - OpenAI client setup
   - supabase.ts - Supabase client setup
   - pinecone.ts - Pinecone client setup
   - langchain.ts - LangChain setup

6. Create React Bits-inspired components in src/components/:
   - BlobCursor.tsx - Animated blob cursor follower
   - GradientText.tsx - Gradient text effect
   - InfiniteScroll.tsx - Infinite scrolling component
   - DarkVeil.tsx - Dark veil background overlay
   - CubesBackground.tsx - Animated floating cubes
   - FadeIn.tsx - Fade in animation wrapper
   - GlareHover.tsx - Glare hover effect
   - Carousel.tsx - Carousel component
   - Navbar.tsx - Navigation bar with dark mode toggle
   - Footer.tsx - Footer with contact info
   - LoginForm.tsx - Supabase authentication form

7. Create pages in src/pages/:
   - Landing.tsx - Landing page with all effects
   - Contact.tsx - Contact form page
   - Login.tsx - Login/signup page

8. CSS Boilerplate:
   - Custom color palettes (primary: blue, secondary: purple, accent: red)
   - Dark mode support with prefers-color-scheme
   - Custom animations (fade-in, slide-up, glare)
   - Responsive design patterns

9. Copy .env.example to .env and remind user to add real keys

10. Update package.json scripts to include:
    - "typecheck": "tsc --noEmit"
    - "lint": "eslint . --ext ts,tsx"

11. Create .gitignore entries for .env and other sensitive files

When done, run `npm run dev` to verify everything works.
