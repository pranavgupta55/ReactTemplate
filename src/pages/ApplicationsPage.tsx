import { useApp } from '../context/AppContext'
import { FadeIn } from '../components/FadeIn'
import { GradientText } from '../components/GradientText'
import { TiltCard } from '../components/TiltCard'
import type { Application } from '../types'
import clsx from 'clsx'

export function ApplicationsPage() {
  const { state } = useApp()

  const groupedApps = {
    queued: state.applications.applications.filter((a) => a.status === 'queued'),
    inProgress: state.applications.applications.filter((a) =>
      ['analyzing', 'applying'].includes(a.status)
    ),
    submitted: state.applications.applications.filter((a) => a.status === 'submitted'),
    rejected: state.applications.applications.filter((a) => a.status === 'rejected'),
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      {/* Header */}
      <FadeIn>
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">
            <GradientText>Applications</GradientText>
          </h1>
          <p className="text-gray-400">Track your application pipeline</p>
        </div>
      </FadeIn>

      {/* Kanban Board */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Queued Column */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-white">📋 Queued</h2>
              <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-semibold text-blue-400">
                {groupedApps.queued.length}
              </span>
            </div>
            <div className="space-y-3">
              {groupedApps.queued.length === 0 ? (
                <div className="rounded-xl bg-gray-950 p-6 text-center text-sm text-gray-500">
                  No queued applications
                </div>
              ) : (
                groupedApps.queued.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))
              )}
            </div>
          </div>
        </FadeIn>

        {/* In Progress Column */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-white">⚡ In Progress</h2>
              <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-400">
                {groupedApps.inProgress.length}
              </span>
            </div>
            <div className="space-y-3">
              {groupedApps.inProgress.length === 0 ? (
                <div className="rounded-xl bg-gray-950 p-6 text-center text-sm text-gray-500">
                  No applications in progress
                </div>
              ) : (
                groupedApps.inProgress.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))
              )}
            </div>
          </div>
        </FadeIn>

        {/* Submitted Column */}
        <FadeIn delay={0.3}>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-white">✅ Submitted</h2>
              <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-400">
                {groupedApps.submitted.length}
              </span>
            </div>
            <div className="space-y-3">
              {groupedApps.submitted.length === 0 ? (
                <div className="rounded-xl bg-gray-950 p-6 text-center text-sm text-gray-500">
                  No submitted applications
                </div>
              ) : (
                groupedApps.submitted.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))
              )}
            </div>
          </div>
        </FadeIn>

        {/* Rejected Column */}
        <FadeIn delay={0.4}>
          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-white">❌ Rejected</h2>
              <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-semibold text-red-400">
                {groupedApps.rejected.length}
              </span>
            </div>
            <div className="space-y-3">
              {groupedApps.rejected.length === 0 ? (
                <div className="rounded-xl bg-gray-950 p-6 text-center text-sm text-gray-500">
                  No rejections yet
                </div>
              ) : (
                groupedApps.rejected.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

function ApplicationCard({ application }: { application: Application }) {
  const { state } = useApp()
  const job = state.jobs.jobs.find((j) => j.id === application.jobId)

  const completedSteps = application.steps.filter((s) => s.status === 'completed').length
  const progress = (completedSteps / application.steps.length) * 100

  return (
    <TiltCard>
      <div className="rounded-xl border border-gray-800 bg-gray-950 p-4 transition-colors hover:border-gray-700">
        <div className="mb-2 text-sm font-semibold text-white">{job?.company || 'Unknown'}</div>
        <div className="mb-3 text-xs text-gray-400">{job?.position || 'Position'}</div>

        {/* Progress Bar */}
        <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-gray-800">
          <div
            className={clsx(
              'h-full rounded-full transition-all',
              application.status === 'submitted'
                ? 'bg-green-500'
                : application.status === 'rejected'
                  ? 'bg-red-500'
                  : 'bg-primary-500'
            )}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-gray-500">
            {completedSteps}/{application.steps.length} steps
          </span>
          <span className="text-gray-600">
            {new Date(application.updatedAt).toLocaleDateString()}
          </span>
        </div>

        {application.confirmationId && (
          <div className="mt-2 rounded bg-gray-900 p-2 text-xs text-gray-400">
            Confirmation: {application.confirmationId}
          </div>
        )}
      </div>
    </TiltCard>
  )
}
