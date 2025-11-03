import { useState } from 'react'
import { Landing } from './pages/Landing'
import { Contact } from './pages/Contact'
import { Login } from './pages/Login'

function App() {
  // Simple client-side routing
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  // Listen to popstate for browser back/forward
  window.addEventListener('popstate', () => {
    setCurrentPath(window.location.pathname)
  })

  // Override link clicks
  const navigate = (path: string) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  // Make navigate available globally for components
  ;(window as any).navigate = navigate

  const renderPage = () => {
    switch (currentPath) {
      case '/contact':
        return <Contact />
      case '/login':
        return <Login />
      default:
        return <Landing />
    }
  }

  return renderPage()
}

export default App
