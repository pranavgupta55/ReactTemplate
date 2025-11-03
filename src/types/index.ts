// Core Data Models

export type JobStatus = 'new' | 'queued' | 'analyzing' | 'applying' | 'submitted' | 'rejected' | 'interview' | 'accepted'
export type JobSource = 'github' | 'handshake' | 'manual'
export type PipelineStep = 'analyze' | 'match' | 'customize' | 'review' | 'fill' | 'submit' | 'track'
export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped'
export type AgentStatus = 'idle' | 'running' | 'paused' | 'error'
export type LogType = 'thought' | 'tool_call' | 'observation' | 'decision' | 'error' | 'success'
export type PresetType = 'resume' | 'coverLetter' | 'template'

export interface Job {
  id: string
  company: string
  position: string
  location: string
  url: string
  source: JobSource
  postedDate: Date
  scrapedDate: Date
  requirements: {
    required: string[]
    preferred: string[]
    keywords: string[]
    description?: string
  }
  matchScore?: number
  status: JobStatus
  tags?: string[]
}

export interface Application {
  id: string
  jobId: string
  status: JobStatus
  currentStep: PipelineStep
  steps: ApplicationStep[]
  resumeUsed?: string
  coverLetterUsed?: string
  customizations: string[]
  submittedAt?: Date
  confirmationId?: string
  logs: AgentLog[]
  createdAt: Date
  updatedAt: Date
}

export interface ApplicationStep {
  name: PipelineStep
  status: StepStatus
  output?: any
  error?: string
  timestamp: Date
  duration: number
  retries: number
}

export interface Preset {
  id: string
  type: PresetType
  name: string
  description?: string
  content: string
  skills: string[]
  usageCount: number
  lastUsed?: Date
  createdAt: Date
  variables?: Record<string, string>
  tags?: string[]
}

export interface AgentLog {
  id: string
  agentName: string
  applicationId?: string
  timestamp: Date
  type: LogType
  content: string
  metadata?: any
  duration?: number
}

export interface Agent {
  id: string
  name: string
  description: string
  status: AgentStatus
  currentTask?: string
  tasksCompleted: number
  errors: number
  lastActive?: Date
  tools: string[]
}

export interface ToolCall {
  id: string
  agentId: string
  toolName: string
  input: any
  output?: any
  error?: string
  timestamp: Date
  duration: number
}

export interface WorkflowNode {
  id: string
  type: PipelineStep
  label: string
  status: StepStatus
  position: { x: number; y: number }
  data: any
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  animated?: boolean
}

export interface DashboardStats {
  totalJobs: number
  activeApplications: number
  submitted: number
  successRate: number
  avgTimePerApplication: number
  apiCallsToday: number
  errorsToday: number
}

export interface Filter {
  search?: string
  location?: string[]
  skills?: string[]
  companies?: string[]
  status?: JobStatus[]
  dateFrom?: Date
  dateTo?: Date
  matchScoreMin?: number
}

export interface Settings {
  openaiApiKey?: string
  autoApply: boolean
  requireManualReview: boolean
  maxApplicationsPerDay: number
  minMatchScore: number
  preferredLocations: string[]
  blacklistedCompanies: string[]
  notifications: {
    email?: string
    webhook?: string
  }
}

// State Types

export interface JobsState {
  jobs: Job[]
  loading: boolean
  error?: string
  lastFetched?: Date
  filter: Filter
}

export interface ApplicationsState {
  applications: Application[]
  loading: boolean
  error?: string
}

export interface PresetsState {
  presets: Preset[]
  loading: boolean
  error?: string
}

export interface AgentsState {
  agents: Agent[]
  toolCalls: ToolCall[]
  logs: AgentLog[]
}

export interface AppState {
  jobs: JobsState
  applications: ApplicationsState
  presets: PresetsState
  agents: AgentsState
  settings: Settings
}

// Action Types

export type JobsAction =
  | { type: 'JOBS_FETCH_START' }
  | { type: 'JOBS_FETCH_SUCCESS'; payload: Job[] }
  | { type: 'JOBS_FETCH_ERROR'; payload: string }
  | { type: 'JOBS_ADD'; payload: Job }
  | { type: 'JOBS_UPDATE'; payload: { id: string; updates: Partial<Job> } }
  | { type: 'JOBS_DELETE'; payload: string }
  | { type: 'JOBS_SET_FILTER'; payload: Partial<Filter> }
  | { type: 'JOBS_CLEAR_FILTER' }

export type ApplicationsAction =
  | { type: 'APPLICATIONS_ADD'; payload: Application }
  | { type: 'APPLICATIONS_UPDATE'; payload: { id: string; updates: Partial<Application> } }
  | { type: 'APPLICATIONS_DELETE'; payload: string }
  | { type: 'APPLICATIONS_ADD_LOG'; payload: { id: string; log: AgentLog } }
  | { type: 'APPLICATIONS_UPDATE_STEP'; payload: { id: string; step: PipelineStep; updates: Partial<ApplicationStep> } }

export type PresetsAction =
  | { type: 'PRESETS_ADD'; payload: Preset }
  | { type: 'PRESETS_UPDATE'; payload: { id: string; updates: Partial<Preset> } }
  | { type: 'PRESETS_DELETE'; payload: string }
  | { type: 'PRESETS_INCREMENT_USAGE'; payload: string }

export type AgentsAction =
  | { type: 'AGENTS_UPDATE_STATUS'; payload: { id: string; status: AgentStatus; currentTask?: string } }
  | { type: 'AGENTS_ADD_TOOL_CALL'; payload: ToolCall }
  | { type: 'AGENTS_ADD_LOG'; payload: AgentLog }
  | { type: 'AGENTS_CLEAR_LOGS' }

// API Response Types

export interface GitHubJobsResponse {
  jobs: Job[]
  lastUpdate: string
}

export interface HandshakeJobResponse {
  job: Job
}

export interface AgentResponse {
  success: boolean
  output: any
  logs: AgentLog[]
  error?: string
}

// Component Props Types

export interface JobCardProps {
  job: Job
  onApply?: (job: Job) => void
  onView?: (job: Job) => void
}

export interface ApplicationCardProps {
  application: Application
  onView?: (application: Application) => void
  onCancel?: (id: string) => void
}

export interface PresetCardProps {
  preset: Preset
  onEdit?: (preset: Preset) => void
  onDelete?: (id: string) => void
  onDuplicate?: (preset: Preset) => void
}

export interface AgentMonitorProps {
  agent: Agent
  logs: AgentLog[]
  toolCalls: ToolCall[]
}

export interface WorkflowVisualizerProps {
  application: Application
  onStepClick?: (step: ApplicationStep) => void
}

export interface FilterPanelProps {
  filter: Filter
  onChange: (filter: Partial<Filter>) => void
  onClear: () => void
}
