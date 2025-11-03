# Internship Application Bot - Architecture

## Overview
A semi-autonomous agent system that applies to internships using AI-powered workflows, preset management, and real-time monitoring.

## System Architecture

### Frontend Layer (React + TypeScript)
```
Dashboard
├── Agent Monitor (real-time status, active agents, tool calls)
├── Job Feed (scraped from GitHub + Handshake)
├── Application Pipeline (n8n-style workflow visualization)
├── Preset Manager (resumes, cover letters, skills)
└── Execution Logs (detailed agent reasoning and outputs)
```

### Agent Layer (LangChain + OpenAI)
```
Workflow Orchestration
├── Job Scraper Agent (GitHub README parser, Handshake scraper)
├── Job Analyzer Agent (extract requirements, skills, keywords)
├── Preset Matcher Agent (match job to best resume/CL preset)
├── Resume Customizer Agent (slight tweaks to match job)
├── Cover Letter Generator Agent (use preset + customize)
├── Application Form Agent (navigate and fill forms)
└── Submission Agent (submit + track confirmation)
```

### Data Layer
```
LocalStorage/State Management
├── Jobs Database (company, position, location, link, status, requirements)
├── Applications (job_id, status, pipeline_step, logs, timestamp)
├── Presets (resumes[], coverLetters[], skills[], templates[])
├── Agent Logs (tool_calls[], reasoning[], outputs[], errors[])
└── Settings (api_keys, preferences, filters)
```

## Core Features

### 1. Job Scraping & Aggregation
- **GitHub Integration**: Parse SimplifyJobs Summer2026 repo README markdown table
- **Handshake Integration**: Accept Handshake URLs, scrape job details
- **Auto-refresh**: Poll GitHub every hour for new postings
- **Filters**: Location, skills, company, posted date, application status

### 2. Intelligent Preset System
- **Resume Presets**: Multiple versions targeting different skills (e.g., "backend-heavy", "frontend-focused", "ML-focused")
- **Cover Letter Presets**: Templates with variables {{company}}, {{position}}, {{reason}}
- **Skill Tags**: Each preset tagged with skills it highlights
- **Quick Creator**: AI-assisted preset generation from base resume
- **Skill Gap Detector**: Identify when job requires skills not in any preset → prompt creation

### 3. Application Workflow Pipeline
```
Step 1: Job Analysis
  ↓ Extract requirements, skills, keywords, tone
Step 2: Preset Matching
  ↓ Score each preset against job requirements
Step 3: Customization
  ↓ AI tweaks resume/CL to match specific job
Step 4: Review (optional manual gate)
  ↓ User can approve/edit before submission
Step 5: Form Filling
  ↓ Navigate application portal, fill fields
Step 6: Submission
  ↓ Submit and capture confirmation
Step 7: Tracking
  ↓ Monitor status, follow-ups
```

### 4. Real-Time Monitoring Dashboard
- **Agent Activity Panel**: Live status of each agent (idle, running, paused, error)
- **Tool Call Logger**: Real-time feed of tools being called (webSearch, readURL, generateText, etc.)
- **Pipeline Visualizer**: n8n-style node graph showing current step for each application
- **Metrics**: Success rate, avg time per application, API usage, error rate
- **Execution Logs**: Expandable view of agent reasoning for each step

### 5. Developer-Style Interface
- **Terminal-like logs**: Monospace font, syntax highlighting for JSON
- **Real-time streaming**: WebSocket-like updates (simulated with polling for MVP)
- **Node graph**: Drag-and-drop workflow builder (Phase 2)
- **Debug mode**: View raw API calls, responses, prompts
- **Performance profiler**: Time taken per step, bottleneck identification

## Component Specifications

### Pages

#### Dashboard.tsx
- 4x3 grid layout
- Agent status cards (with circular progress indicators)
- Recent applications list
- Active pipeline visualizations
- Quick actions (start batch apply, pause all, view logs)

#### Jobs.tsx
- Master-detail layout
- Left: Job list with filters (searchable, sortable)
- Right: Job details with "Apply" button
- Each job card shows: company logo, position, location, posted date, match score
- Tilting card effect from React Bits

#### Applications.tsx
- Kanban-style board: Queued → In Progress → Review → Submitted → Response
- Each card shows pipeline progress
- Click to expand execution logs
- Filter by status, date, company

#### Presets.tsx
- Left sidebar: List of presets (resumes, cover letters)
- Center: Preview/editor
- Right: Skill tags, usage stats
- Quick create wizard
- AI preset generator

#### AgentMonitor.tsx (overlay/modal)
- Real-time agent thoughts streaming
- Tool calls with inputs/outputs
- Decision tree visualization
- Pause/resume/stop controls

### Components

#### Sidebar.tsx
- Fixed left navigation
- Icons + labels
- Active page indicator
- Quick stats

#### AgentCard.tsx
- Status indicator (green/yellow/red)
- Agent name and current task
- Progress bar
- Last tool call
- Error count

#### WorkflowNode.tsx
- n8n-style node
- Input/output connectors
- Status indicator
- Execution time
- Click to view details

#### PresetCard.tsx
- Preview thumbnail
- Skill tags
- Usage count
- Edit/delete/duplicate buttons

#### TiltCard.tsx (React Bits)
- 3D tilt effect on hover
- Used for job cards

#### BubbleMenu.tsx
- Floating action menu
- Quick actions context menu

## Agent Implementations

### LangChain Agent Structure
```typescript
interface Agent {
  name: string
  model: ChatOpenAI
  tools: Tool[]
  memory: BufferMemory
  execute: (input: AgentInput) => Promise<AgentOutput>
}

class JobScraperAgent extends Agent {
  tools = [fetchGitHub, parseMarkdown, extractJobData]
  execute: async (repoURL) => {
    // Fetch README, parse table, return jobs[]
  }
}

class JobAnalyzerAgent extends Agent {
  tools = [extractText, identifySkills, scoreRequirements]
  execute: async (jobDescription) => {
    // Return { requiredSkills, preferredSkills, keywords, tone }
  }
}

class PresetMatcherAgent extends Agent {
  tools = [compareSkills, scoreMatch, rankPresets]
  execute: async (jobAnalysis, presets) => {
    // Return { topResume, topCoverLetter, matchScore, gaps }
  }
}

class ResumeCustomizerAgent extends Agent {
  tools = [analyzeResume, tweakBullets, reorderSections]
  execute: async (baseResume, jobRequirements) => {
    // Return customized resume PDF/text
  }
}

class CoverLetterGeneratorAgent extends Agent {
  tools = [fillTemplate, generateParagraph, adjustTone]
  execute: async (template, jobDetails, companyResearch) => {
    // Return cover letter text
  }
}
```

### Tool Definitions
```typescript
const tools = [
  // Web Tools
  new WebBrowserTool({ name: "navigateURL", description: "Open URL and return content" }),
  new WebSearchTool({ name: "searchWeb", description: "Search the web" }),

  // Data Tools
  new ReadFileTool({ name: "readFile" }),
  new WriteFileTool({ name: "writeFile" }),

  // AI Tools
  new OpenAITool({ name: "generateText", model: "gpt-4" }),
  new OpenAITool({ name: "analyzeDocument", model: "gpt-4" }),

  // Custom Tools
  new GitHubFetchTool(),
  new HandshakeScraperTool(),
  new PDFGeneratorTool(),
  new FormFillerTool()
]
```

## Data Models

### Job
```typescript
interface Job {
  id: string
  company: string
  position: string
  location: string
  url: string
  source: 'github' | 'handshake'
  postedDate: Date
  scrapedDate: Date
  requirements: {
    required: string[]
    preferred: string[]
    keywords: string[]
  }
  matchScore?: number
  status: 'new' | 'queued' | 'applying' | 'submitted' | 'rejected' | 'interview'
}
```

### Application
```typescript
interface Application {
  id: string
  jobId: string
  status: PipelineStep
  currentStep: number
  steps: {
    name: string
    status: 'pending' | 'running' | 'completed' | 'failed'
    output?: any
    error?: string
    timestamp: Date
    duration: number
  }[]
  resumeUsed: string
  coverLetterUsed: string
  customizations: string[]
  submittedAt?: Date
  confirmationId?: string
  logs: AgentLog[]
}
```

### Preset
```typescript
interface Preset {
  id: string
  type: 'resume' | 'coverLetter'
  name: string
  content: string
  skills: string[]
  usageCount: number
  lastUsed?: Date
  variables?: Record<string, string>
}
```

### AgentLog
```typescript
interface AgentLog {
  id: string
  agentName: string
  timestamp: Date
  type: 'thought' | 'tool_call' | 'observation' | 'decision' | 'error'
  content: string
  metadata?: any
}
```

## UI/UX Specifications

### Dark Mode Theme
```
Background: #0a0a0a
Surface: #1a1a1a
Border: #2a2a2a
Primary: #0ea5e9
Secondary: #a855f7
Accent: #ef4444
Text: #ededed
Text Secondary: #9ca3af
Success: #10b981
Warning: #f59e0b
Error: #ef4444
```

### Typography
- Headlines: Inter/SF Pro Display, 700
- Body: Inter/SF Pro Text, 400
- Mono: JetBrains Mono, 400 (for logs)

### Animations
- Fade in: 0.3s ease-out
- Scale: 0.2s ease-out
- Slide: 0.4s ease-in-out
- Agent pulse: 2s infinite

### Layout
- Sidebar: 280px fixed
- Main: flex-1
- Max width: 1920px
- Grid gap: 24px
- Card padding: 24px
- Border radius: 12px

## Implementation Priority

### Phase 1: Foundation (MVP)
1. Basic UI layout with sidebar
2. Job scraping from GitHub
3. Simple preset management
4. Manual application flow
5. Basic logging

### Phase 2: Agents
1. LangChain integration
2. Job analyzer agent
3. Preset matcher agent
4. Basic automation

### Phase 3: Advanced Features
1. Real-time monitoring
2. Pipeline visualization
3. Form filling automation
4. Skill gap detection

### Phase 4: Polish
1. React Bits components
2. Animations and transitions
3. Performance optimization
4. Error handling

## Technical Decisions

- **State Management**: React Context + useReducer (avoid external deps)
- **Styling**: Tailwind CSS (already set up)
- **API Calls**: Fetch API with exponential backoff
- **Storage**: LocalStorage for MVP, migrate to Supabase later
- **Agent Framework**: LangChain.js with OpenAI
- **Build Tool**: Vite (already configured)

## Security Considerations

- API keys stored in .env (never committed)
- No PII logged
- Sanitize all user inputs
- Rate limiting on API calls
- Resume/CL data encrypted in storage
