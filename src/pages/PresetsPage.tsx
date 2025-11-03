import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FadeIn } from '../components/FadeIn'
import { GradientText } from '../components/GradientText'
import { TiltCard } from '../components/TiltCard'
import type { Preset } from '../types'

export function PresetsPage() {
  const { state, dispatch } = useApp()
  const [showCreator, setShowCreator] = useState(false)
  const [newPreset, setNewPreset] = useState({
    type: 'resume' as const,
    name: '',
    content: '',
    skills: [] as string[],
    skillInput: '',
  })

  const handleCreatePreset = () => {
    const preset: Preset = {
      id: `preset-${Date.now()}`,
      type: newPreset.type,
      name: newPreset.name,
      content: newPreset.content,
      skills: newPreset.skills,
      usageCount: 0,
      createdAt: new Date(),
    }

    dispatch({ type: 'PRESETS_ADD', payload: preset })
    setShowCreator(false)
    setNewPreset({
      type: 'resume',
      name: '',
      content: '',
      skills: [],
      skillInput: '',
    })
  }

  const handleAddSkill = () => {
    if (newPreset.skillInput.trim()) {
      setNewPreset({
        ...newPreset,
        skills: [...newPreset.skills, newPreset.skillInput.trim()],
        skillInput: '',
      })
    }
  }

  const resumes = state.presets.presets.filter((p) => p.type === 'resume')
  const coverLetters = state.presets.presets.filter((p) => p.type === 'coverLetter')

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      {/* Header */}
      <FadeIn>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-white">
              <GradientText>Presets</GradientText>
            </h1>
            <p className="text-gray-400">Manage your resumes and cover letters</p>
          </div>
          <button
            onClick={() => setShowCreator(true)}
            className="rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-primary-600"
          >
            ➕ New Preset
          </button>
        </div>
      </FadeIn>

      {/* Create Modal */}
      {showCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8">
          <FadeIn>
            <div className="w-full max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-8">
              <h2 className="mb-6 text-2xl font-bold text-white">Create New Preset</h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Type</label>
                  <select
                    value={newPreset.type}
                    onChange={(e) =>
                      setNewPreset({ ...newPreset, type: e.target.value as 'resume' | 'coverLetter' })
                    }
                    className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white"
                  >
                    <option value="resume">Resume</option>
                    <option value="coverLetter">Cover Letter</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    value={newPreset.name}
                    onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                    placeholder="e.g., Backend-Focused Resume"
                    className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Content</label>
                  <textarea
                    value={newPreset.content}
                    onChange={(e) => setNewPreset({ ...newPreset, content: e.target.value })}
                    placeholder="Paste your resume or cover letter content here..."
                    rows={8}
                    className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 font-mono text-sm text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Skills</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPreset.skillInput}
                      onChange={(e) => setNewPreset({ ...newPreset, skillInput: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      placeholder="Add a skill..."
                      className="flex-1 rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-500"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="rounded-xl bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {newPreset.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-2 rounded-full bg-primary-500/20 px-3 py-1 text-sm text-primary-400"
                      >
                        {skill}
                        <button
                          onClick={() =>
                            setNewPreset({
                              ...newPreset,
                              skills: newPreset.skills.filter((_, i) => i !== idx),
                            })
                          }
                          className="hover:text-primary-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleCreatePreset}
                  disabled={!newPreset.name || !newPreset.content}
                  className="flex-1 rounded-xl bg-primary-500 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-600 disabled:opacity-50"
                >
                  Create Preset
                </button>
                <button
                  onClick={() => setShowCreator(false)}
                  className="rounded-xl border border-gray-700 px-6 py-3 font-semibold text-white hover:bg-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      )}

      {/* Resumes */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold text-white">📄 Resumes ({resumes.length})</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((preset, idx) => (
            <FadeIn key={preset.id} delay={idx * 0.05}>
              <PresetCard preset={preset} />
            </FadeIn>
          ))}
          {resumes.length === 0 && (
            <div className="col-span-full rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center">
              <div className="mb-4 text-4xl">📄</div>
              <div className="mb-2 font-semibold text-white">No resumes yet</div>
              <div className="text-gray-400">Create your first resume preset</div>
            </div>
          )}
        </div>
      </div>

      {/* Cover Letters */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-white">
          💌 Cover Letters ({coverLetters.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coverLetters.map((preset, idx) => (
            <FadeIn key={preset.id} delay={idx * 0.05}>
              <PresetCard preset={preset} />
            </FadeIn>
          ))}
          {coverLetters.length === 0 && (
            <div className="col-span-full rounded-2xl border border-gray-800 bg-gray-900 p-12 text-center">
              <div className="mb-4 text-4xl">💌</div>
              <div className="mb-2 font-semibold text-white">No cover letters yet</div>
              <div className="text-gray-400">Create your first cover letter preset</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PresetCard({ preset }: { preset: Preset }) {
  const { dispatch } = useApp()

  return (
    <TiltCard>
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-white">{preset.name}</h3>
          <div className="mb-3 flex flex-wrap gap-2">
            {preset.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-primary-500/20 px-2 py-1 text-xs text-primary-400"
              >
                {skill}
              </span>
            ))}
            {preset.skills.length > 3 && (
              <span className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-400">
                +{preset.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-gray-950 p-3 font-mono text-xs text-gray-400">
          {preset.content.substring(0, 100)}...
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Used {preset.usageCount} times</span>
          <div className="flex gap-2">
            <button className="text-primary-400 hover:text-primary-300">Edit</button>
            <button
              onClick={() => dispatch({ type: 'PRESETS_DELETE', payload: preset.id })}
              className="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}
