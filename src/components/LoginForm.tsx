import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { GradientText } from './GradientText'
import { FadeIn } from './FadeIn'
import { GlareHover } from './GlareHover'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        setMessage('Successfully logged in!')
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) throw error
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  return (
    <FadeIn className="w-full max-w-lg">
      <div className="rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-10 shadow-2xl dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
        <h2 className="mb-8 text-center text-4xl font-bold">
          <GradientText>{isSignUp ? 'Create Account' : 'Welcome Back'}</GradientText>
        </h2>
        <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
          {isSignUp ? 'Join thousands of developers building amazing projects' : 'Sign in to continue to your account'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>

          <GlareHover>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 px-4 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </GlareHover>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
        </div>

        <GlareHover>
          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 font-semibold shadow-md transition-all hover:scale-105 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </GlareHover>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary-600 hover:underline dark:text-primary-400"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>

        {message && (
          <div className="mt-4 rounded-lg bg-gray-100 p-3 text-center text-sm dark:bg-gray-800">
            {message}
          </div>
        )}
      </div>
    </FadeIn>
  )
}
