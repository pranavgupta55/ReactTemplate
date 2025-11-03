import { useState } from 'react'
import { GradientText } from './GradientText'
import clsx from 'clsx'

interface NavItem {
  id: string
  label: string
  icon: string
  badge?: number
}

interface AppSidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
  stats?: {
    activeJobs: number
    inProgress: number
    activeAgents: number
  }
}

export function AppSidebar({ currentPage, onNavigate, stats }: AppSidebarProps) {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'jobs', label: 'Jobs', icon: '💼', badge: stats?.activeJobs },
    { id: 'applications', label: 'Applications', icon: '📝', badge: stats?.inProgress },
    { id: 'presets', label: 'Presets', icon: '📄' },
    { id: 'agents', label: 'Agents', icon: '🤖', badge: stats?.activeAgents },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-72 border-r border-gray-800 bg-gray-950 p-6">
      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold">
          <GradientText>InternBot</GradientText>
        </h1>
        <p className="mt-1 text-sm text-gray-500">Auto-Application Agent</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={clsx(
              'group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-medium transition-all',
              currentPage === item.id
                ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white shadow-lg shadow-primary-500/10'
                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-primary-500 px-2 text-xs font-bold text-white">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Status Indicator */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium text-white">System Active</span>
          </div>
          <p className="text-xs text-gray-500">All agents operational</p>
        </div>
      </div>
    </div>
  )
}
