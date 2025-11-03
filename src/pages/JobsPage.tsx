import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import { fetchGitHubJobs } from '../services/githubService'
import { FadeIn } from '../components/FadeIn'
import { GradientText } from '../components/GradientText'
import { TiltCard } from '../components/TiltCard'
import type { Job } from '../types'
import clsx from 'clsx'

export function JobsPage() {
  const { state, dispatch } = useApp()
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    // Auto-fetch jobs on mount if empty
    if (state.jobs.jobs.length === 0) {
      handleRefresh()
    }
  }, [])

  const handleRefresh = async () => {
    dispatch({ type: 'JOBS_FETCH_START' })
    try {
      const jobs = await fetchGitHubJobs()
      dispatch({ type: 'JOBS_FETCH_SUCCESS', payload: jobs })
    } catch (error) {
      dispatch({
        type: 'JOBS_FETCH_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to fetch jobs',
      })
    }
  }

  const filteredJobs = state.jobs.jobs.filter((job) => {
    const matchesSearch =
      searchTerm === '' ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || job.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Jobs List */}
      <div className="flex-1 p-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-white">
                <GradientText>Jobs</GradientText>
              </h1>
              <p className="text-gray-400">
                {filteredJobs.length} of {state.jobs.jobs.length} jobs
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={state.jobs.loading}
              className="rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-primary-600 disabled:opacity-50"
            >
              {state.jobs.loading ? '🔄 Loading...' : '🔄 Refresh'}
            </button>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <div className="mb-6 flex gap-4">
            <input
              type="text"
              placeholder="Search companies, positions, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="queued">Queued</option>
              <option value="applying">Applying</option>
              <option value="submitted">Submitted</option>
            </select>
          </div>
        </FadeIn>

        {/* Jobs Grid */}
        <div className="grid gap-4">
          {state.jobs.loading ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center">
              <div className="mb-4 text-4xl">⏳</div>
              <div className="text-gray-400">Fetching jobs from GitHub...</div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center">
              <div className="mb-4 text-4xl">💼</div>
              <div className="mb-2 font-semibold text-white">No jobs found</div>
              <div className="text-gray-400">Try adjusting your filters or refresh</div>
            </div>
          ) : (
            filteredJobs.map((job, idx) => (
              <FadeIn key={job.id} delay={idx * 0.05}>
                <TiltCard>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className={clsx(
                      'w-full rounded-2xl border p-6 text-left transition-all',
                      selectedJob?.id === job.id
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-xl font-bold text-white">{job.position}</h3>
                          <span
                            className={clsx(
                              'rounded-full px-3 py-1 text-xs font-semibold',
                              job.status === 'new'
                                ? 'bg-blue-500/20 text-blue-400'
                                : job.status === 'submitted'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-gray-500/20 text-gray-400'
                            )}
                          >
                            {job.status}
                          </span>
                        </div>
                        <div className="mb-3 text-lg text-gray-300">{job.company}</div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-gray-400">📍 {job.location}</span>
                          {job.requirements.keywords.map((keyword) => (
                            <span
                              key={keyword}
                              className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-400"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.matchScore && (
                          <div className="rounded-full bg-primary-500/20 px-3 py-1 text-sm font-semibold text-primary-400">
                            {job.matchScore}% match
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </TiltCard>
              </FadeIn>
            ))
          )}
        </div>
      </div>

      {/* Job Details Sidebar */}
      {selectedJob && (
        <div className="w-96 border-l border-gray-800 bg-gray-900 p-8">
          <FadeIn>
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold text-white">{selectedJob.position}</h2>
              <div className="mb-4 text-xl text-gray-300">{selectedJob.company}</div>
              <div className="mb-4 text-gray-400">📍 {selectedJob.location}</div>

              <a
                href={selectedJob.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 inline-block text-primary-400 hover:underline"
              >
                🔗 View original posting →
              </a>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 font-semibold text-white">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.requirements.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 font-semibold text-white">Status</h3>
              <div className="rounded-xl bg-gray-950 p-4">
                <div className="text-sm text-gray-400">
                  {selectedJob.status === 'new' && '📋 Ready to apply'}
                  {selectedJob.status === 'queued' && '⏳ Queued for application'}
                  {selectedJob.status === 'applying' && '🚀 Application in progress'}
                  {selectedJob.status === 'submitted' && '✅ Application submitted'}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105">
                🚀 Apply Now
              </button>
              <button className="w-full rounded-xl border border-gray-700 bg-gray-950 px-6 py-3 font-semibold text-white transition-all hover:bg-gray-800">
                📋 Add to Queue
              </button>
              <button className="w-full rounded-xl border border-gray-700 bg-gray-950 px-6 py-3 font-semibold text-white transition-all hover:bg-gray-800">
                🗑️ Remove
              </button>
            </div>
          </FadeIn>
        </div>
      )}
    </div>
  )
}
