import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import type {
  AppState,
  JobsAction,
  ApplicationsAction,
  PresetsAction,
  AgentsAction,
  Job,
  Application,
  Preset,
  Agent,
  Settings,
} from '../types'

// Initial State
const initialState: AppState = {
  jobs: {
    jobs: [],
    loading: false,
    filter: {},
  },
  applications: {
    applications: [],
    loading: false,
  },
  presets: {
    presets: [],
    loading: false,
  },
  agents: {
    agents: [
      {
        id: 'job-scraper',
        name: 'Job Scraper',
        description: 'Fetches jobs from GitHub and Handshake',
        status: 'idle',
        tasksCompleted: 0,
        errors: 0,
        tools: ['fetchGitHub', 'parseMarkdown', 'scrapeHandshake'],
      },
      {
        id: 'job-analyzer',
        name: 'Job Analyzer',
        description: 'Analyzes job requirements and extracts skills',
        status: 'idle',
        tasksCompleted: 0,
        errors: 0,
        tools: ['extractText', 'identifySkills', 'scoreRequirements'],
      },
      {
        id: 'preset-matcher',
        name: 'Preset Matcher',
        description: 'Matches jobs to best resume/cover letter presets',
        status: 'idle',
        tasksCompleted: 0,
        errors: 0,
        tools: ['compareSkills', 'scoreMatch', 'rankPresets'],
      },
      {
        id: 'resume-customizer',
        name: 'Resume Customizer',
        description: 'Customizes resume to match job requirements',
        status: 'idle',
        tasksCompleted: 0,
        errors: 0,
        tools: ['analyzeResume', 'tweakBullets', 'reorderSections'],
      },
      {
        id: 'cover-letter-generator',
        name: 'Cover Letter Generator',
        description: 'Generates customized cover letters',
        status: 'idle',
        tasksCompleted: 0,
        errors: 0,
        tools: ['fillTemplate', 'generateParagraph', 'adjustTone'],
      },
      {
        id: 'application-agent',
        name: 'Application Agent',
        description: 'Submits applications and tracks confirmations',
        status: 'idle',
        tasksCompleted: 0,
        errors: 0,
        tools: ['navigateURL', 'fillForm', 'submitApplication'],
      },
    ],
    toolCalls: [],
    logs: [],
  },
  settings: {
    autoApply: false,
    requireManualReview: true,
    maxApplicationsPerDay: 10,
    minMatchScore: 70,
    preferredLocations: ['Remote', 'San Francisco', 'New York'],
    blacklistedCompanies: [],
    notifications: {},
  },
}

// Reducers
function jobsReducer(state: AppState['jobs'], action: JobsAction): AppState['jobs'] {
  switch (action.type) {
    case 'JOBS_FETCH_START':
      return { ...state, loading: true, error: undefined }
    case 'JOBS_FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        jobs: action.payload,
        lastFetched: new Date(),
      }
    case 'JOBS_FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'JOBS_ADD':
      return { ...state, jobs: [...state.jobs, action.payload] }
    case 'JOBS_UPDATE':
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.payload.id ? { ...job, ...action.payload.updates } : job
        ),
      }
    case 'JOBS_DELETE':
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
      }
    case 'JOBS_SET_FILTER':
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      }
    case 'JOBS_CLEAR_FILTER':
      return { ...state, filter: {} }
    default:
      return state
  }
}

function applicationsReducer(
  state: AppState['applications'],
  action: ApplicationsAction
): AppState['applications'] {
  switch (action.type) {
    case 'APPLICATIONS_ADD':
      return {
        ...state,
        applications: [...state.applications, action.payload],
      }
    case 'APPLICATIONS_UPDATE':
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.id ? { ...app, ...action.payload.updates } : app
        ),
      }
    case 'APPLICATIONS_DELETE':
      return {
        ...state,
        applications: state.applications.filter((app) => app.id !== action.payload),
      }
    case 'APPLICATIONS_ADD_LOG':
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.id
            ? { ...app, logs: [...app.logs, action.payload.log] }
            : app
        ),
      }
    case 'APPLICATIONS_UPDATE_STEP':
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.id
            ? {
                ...app,
                steps: app.steps.map((step) =>
                  step.name === action.payload.step
                    ? { ...step, ...action.payload.updates }
                    : step
                ),
              }
            : app
        ),
      }
    default:
      return state
  }
}

function presetsReducer(state: AppState['presets'], action: PresetsAction): AppState['presets'] {
  switch (action.type) {
    case 'PRESETS_ADD':
      return {
        ...state,
        presets: [...state.presets, action.payload],
      }
    case 'PRESETS_UPDATE':
      return {
        ...state,
        presets: state.presets.map((preset) =>
          preset.id === action.payload.id ? { ...preset, ...action.payload.updates } : preset
        ),
      }
    case 'PRESETS_DELETE':
      return {
        ...state,
        presets: state.presets.filter((preset) => preset.id !== action.payload),
      }
    case 'PRESETS_INCREMENT_USAGE':
      return {
        ...state,
        presets: state.presets.map((preset) =>
          preset.id === action.payload
            ? { ...preset, usageCount: preset.usageCount + 1, lastUsed: new Date() }
            : preset
        ),
      }
    default:
      return state
  }
}

function agentsReducer(state: AppState['agents'], action: AgentsAction): AppState['agents'] {
  switch (action.type) {
    case 'AGENTS_UPDATE_STATUS':
      return {
        ...state,
        agents: state.agents.map((agent) =>
          agent.id === action.payload.id
            ? {
                ...agent,
                status: action.payload.status,
                currentTask: action.payload.currentTask,
                lastActive: new Date(),
                tasksCompleted:
                  action.payload.status === 'idle' ? agent.tasksCompleted + 1 : agent.tasksCompleted,
              }
            : agent
        ),
      }
    case 'AGENTS_ADD_TOOL_CALL':
      return {
        ...state,
        toolCalls: [...state.toolCalls, action.payload],
      }
    case 'AGENTS_ADD_LOG':
      return {
        ...state,
        logs: [...state.logs, action.payload],
      }
    case 'AGENTS_CLEAR_LOGS':
      return {
        ...state,
        logs: [],
        toolCalls: [],
      }
    default:
      return state
  }
}

// Combined Reducer
type AppAction = JobsAction | ApplicationsAction | PresetsAction | AgentsAction

function appReducer(state: AppState, action: AppAction): AppState {
  // Route actions to appropriate reducers
  if (action.type.startsWith('JOBS_')) {
    return { ...state, jobs: jobsReducer(state.jobs, action as JobsAction) }
  }
  if (action.type.startsWith('APPLICATIONS_')) {
    return {
      ...state,
      applications: applicationsReducer(state.applications, action as ApplicationsAction),
    }
  }
  if (action.type.startsWith('PRESETS_')) {
    return { ...state, presets: presetsReducer(state.presets, action as PresetsAction) }
  }
  if (action.type.startsWith('AGENTS_')) {
    return { ...state, agents: agentsReducer(state.agents, action as AgentsAction) }
  }
  return state
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('app-state')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Restore jobs and presets
        if (parsed.jobs) {
          dispatch({ type: 'JOBS_FETCH_SUCCESS', payload: parsed.jobs })
        }
        if (parsed.presets) {
          parsed.presets.forEach((preset: Preset) => {
            dispatch({ type: 'PRESETS_ADD', payload: preset })
          })
        }
      } catch (e) {
        console.error('Failed to restore state:', e)
      }
    }
  }, [])

  useEffect(() => {
    // Save to localStorage
    const toSave = {
      jobs: state.jobs.jobs,
      presets: state.presets.presets,
      applications: state.applications.applications,
    }
    localStorage.setItem('app-state', JSON.stringify(toSave))
  }, [state.jobs.jobs, state.presets.presets, state.applications.applications])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// Hook
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
