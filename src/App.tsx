import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import { AppSidebar } from './components/AppSidebar'
import { DashboardPage } from './pages/DashboardPage'
import { JobsPage } from './pages/JobsPage'
import { ApplicationsPage } from './pages/ApplicationsPage'
import { PresetsPage } from './pages/PresetsPage'
import { BlobCursor } from './components/BlobCursor'
import { CubesBackground } from './components/CubesBackground'

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />
      case 'jobs':
        return <JobsPage />
      case 'applications':
        return <ApplicationsPage />
      case 'presets':
        return <PresetsPage />
      case 'agents':
        return <DashboardPage />
      case 'settings':
        return <DashboardPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      <BlobCursor />
      <CubesBackground />
      <AppSidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        stats={{
          activeJobs: 0,
          inProgress: 0,
          activeAgents: 0,
        }}
      />
      <div className="ml-72 flex-1">{renderPage()}</div>
    </div>
  )
}

export default App
