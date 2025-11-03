import { useApp } from '../context/AppContext'
import { FadeIn } from '../components/FadeIn'
import { GradientText } from '../components/GradientText'
import { TiltCard } from '../components/TiltCard'
import clsx from 'clsx'

export function DashboardPage() {
  const { state } = useApp()

  const stats = {
    totalJobs: state.jobs.jobs.length,
    newJobs: state.jobs.jobs.filter((j) => j.status === 'new').length,
    inProgress: state.applications.applications.filter((a) =>
      ['analyzing', 'applying'].includes(a.status)
    ).length,
    submitted: state.applications.applications.filter((a) => a.status === 'submitted').length,
    successRate:
      state.applications.applications.length > 0
        ? (state.applications.applications.filter((a) => a.status === 'submitted').length /
            state.applications.applications.length) *
          100
        : 0,
  }

  const activeAgents = state.agents.agents.filter((a) => a.status === 'running')
  const recentLogs = state.agents.logs.slice(-10).reverse()

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      {/* Header */}
      <FadeIn>
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">
            <GradientText>Dashboard</GradientText>
          </h1>
          <p className="text-gray-400">Real-time application monitoring and agent status</p>
        </div>
      </FadeIn>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <FadeIn delay={0.1}>
          <TiltCard>
            <div className="rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-transparent p-6">
              <div className="mb-2 text-3xl">💼</div>
              <div className="mb-1 text-3xl font-bold text-white">{stats.totalJobs}</div>
              <div className="text-sm text-gray-400">Total Jobs</div>
              {stats.newJobs > 0 && (
                <div className="mt-2 text-xs text-primary-400">+{stats.newJobs} new</div>
              )}
            </div>
          </TiltCard>
        </FadeIn>

        <FadeIn delay={0.2}>
          <TiltCard>
            <div className="rounded-2xl border border-secondary-500/20 bg-gradient-to-br from-secondary-500/10 to-transparent p-6">
              <div className="mb-2 text-3xl">⚡</div>
              <div className="mb-1 text-3xl font-bold text-white">{stats.inProgress}</div>
              <div className="text-sm text-gray-400">In Progress</div>
              {stats.inProgress > 0 && (
                <div className="mt-2 flex items-center gap-1 text-xs text-secondary-400">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary-400" />
                  Active
                </div>
              )}
            </div>
          </TiltCard>
        </FadeIn>

        <FadeIn delay={0.3}>
          <TiltCard>
            <div className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent p-6">
              <div className="mb-2 text-3xl">✅</div>
              <div className="mb-1 text-3xl font-bold text-white">{stats.submitted}</div>
              <div className="text-sm text-gray-400">Submitted</div>
            </div>
          </TiltCard>
        </FadeIn>

        <FadeIn delay={0.4}>
          <TiltCard>
            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent p-6">
              <div className="mb-2 text-3xl">📊</div>
              <div className="mb-1 text-3xl font-bold text-white">
                {stats.successRate.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </TiltCard>
        </FadeIn>
      </div>

      {/* Agent Status */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.5}>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">🤖 Active Agents</h2>
            <div className="space-y-3">
              {state.agents.agents.map((agent, idx) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between rounded-xl bg-gray-950 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={clsx(
                        'h-3 w-3 rounded-full',
                        agent.status === 'running'
                          ? 'animate-pulse bg-green-500'
                          : agent.status === 'error'
                            ? 'bg-red-500'
                            : 'bg-gray-600'
                      )}
                    />
                    <div>
                      <div className="font-medium text-white">{agent.name}</div>
                      <div className="text-xs text-gray-500">
                        {agent.currentTask || agent.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary-400">
                      {agent.tasksCompleted}
                    </div>
                    <div className="text-xs text-gray-500">completed</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Recent Activity */}
        <FadeIn delay={0.6}>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">📋 Recent Activity</h2>
            <div className="space-y-2">
              {recentLogs.length > 0 ? (
                recentLogs.map((log) => (
                  <div key={log.id} className="rounded-lg bg-gray-950 p-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-400">{log.agentName}</span>
                      <span className="text-xs text-gray-600">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span
                        className={clsx(
                          'text-xs',
                          log.type === 'error'
                            ? 'text-red-400'
                            : log.type === 'success'
                              ? 'text-green-400'
                              : log.type === 'tool_call'
                                ? 'text-blue-400'
                                : 'text-gray-400'
                        )}
                      >
                        {log.type === 'error'
                          ? '❌'
                          : log.type === 'success'
                            ? '✅'
                            : log.type === 'tool_call'
                              ? '🔧'
                              : '💭'}
                      </span>
                      <span className="text-sm text-gray-300">{log.content}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg bg-gray-950 p-6 text-center text-gray-500">
                  No recent activity
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Quick Actions */}
      <FadeIn delay={0.7}>
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xl font-bold text-white">⚡ Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="rounded-xl border border-primary-500/30 bg-primary-500/10 p-4 text-left transition-all hover:scale-105 hover:border-primary-500/50 hover:bg-primary-500/20">
              <div className="mb-2 text-2xl">🔄</div>
              <div className="font-semibold text-white">Refresh Jobs</div>
              <div className="text-xs text-gray-400">Fetch latest postings</div>
            </button>

            <button className="rounded-xl border border-secondary-500/30 bg-secondary-500/10 p-4 text-left transition-all hover:scale-105 hover:border-secondary-500/50 hover:bg-secondary-500/20">
              <div className="mb-2 text-2xl">🚀</div>
              <div className="font-semibold text-white">Batch Apply</div>
              <div className="text-xs text-gray-400">Auto-apply to matched jobs</div>
            </button>

            <button className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-left transition-all hover:scale-105 hover:border-green-500/50 hover:bg-green-500/20">
              <div className="mb-2 text-2xl">📄</div>
              <div className="font-semibold text-white">New Preset</div>
              <div className="text-xs text-gray-400">Create resume/cover letter</div>
            </button>

            <button className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-left transition-all hover:scale-105 hover:border-blue-500/50 hover:bg-blue-500/20">
              <div className="mb-2 text-2xl">📊</div>
              <div className="font-semibold text-white">View Reports</div>
              <div className="text-xs text-gray-400">Analytics & insights</div>
            </button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
