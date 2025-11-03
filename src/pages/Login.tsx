import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { LoginForm } from '../components/LoginForm'
import { BlobCursor } from '../components/BlobCursor'
import { CubesBackground } from '../components/CubesBackground'

export function Login() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <BlobCursor />
      <CubesBackground />
      <Navbar />

      <div className="flex min-h-screen items-center justify-center px-4 py-24">
        <LoginForm />
      </div>

      <Footer />
    </div>
  )
}
