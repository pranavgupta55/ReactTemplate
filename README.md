# InternBot - AI-Powered Internship Application Bot

An intelligent, semi-autonomous application system that applies to internships on your behalf using AI agents, smart preset matching, and real-time monitoring.

## 🚀 Features

### Core Functionality

- **Automated Job Scraping**: Fetches internship postings from SimplifyJobs GitHub repo
- **AI-Powered Agents**: LangChain-based agents for analysis, matching, and application
- **Smart Preset System**: Manage multiple resume/cover letter versions with skill tagging
- **Real-Time Monitoring**: Dev-style dashboard showing agent status, tool calls, and execution logs
- **Pipeline Visualization**: n8n-style workflow view for each application
- **Skill Gap Detection**: Identifies when jobs require skills not covered by existing presets

### Agent Pipeline

1. **Job Scraper Agent**: Fetches and parses job postings
2. **Job Analyzer Agent**: Extracts requirements, skills, and keywords
3. **Preset Matcher Agent**: Scores and ranks resume/cover letter presets
4. **Resume Customizer Agent**: Tweaks resume to match specific job
5. **Cover Letter Generator Agent**: Customizes cover letters with job details
6. **Application Agent**: Navigates portals and submits applications

## 📸 Screenshots

### Dashboard
- Real-time agent status
- Application statistics
- Recent activity logs
- Quick actions

### Jobs Page
- Searchable job listings
- Status filters
- Match scores
- Job details sidebar

### Applications Page
- Kanban-style board
- Pipeline progress tracking
- Execution logs
- Confirmation IDs

### Presets Page
- Resume/cover letter management
- Skill tagging
- Usage statistics
- Quick preset creator

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context + useReducer
- **AI**: OpenAI GPT-4 (via LangChain.js)
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **APIs**: Supabase, Pinecone, LangChain

## 🏗️ Architecture

### Frontend Layer
```
Dashboard (Stats, Agent Monitor, Quick Actions)
├── Jobs Page (Search, Filter, Details)
├── Applications Page (Kanban Board, Pipeline View)
├── Presets Page (Resume/CL Management, Skill Matcher)
└── Agents Page (Real-time Monitoring, Logs)
```

### Agent Layer
```
LangChain Orchestration
├── Job Scraper (GitHub, Handshake)
├── Job Analyzer (Requirements Extraction)
├── Preset Matcher (Skill Scoring)
├── Resume Customizer (AI Tweaks)
├── Cover Letter Generator (Template Filling)
└── Application Agent (Form Submission)
```

### Data Layer
```
LocalStorage (MVP)
├── Jobs Database
├── Applications Tracker
├── Presets Collection
└── Agent Logs
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/pranavgupta55/ReactTemplate.git
cd ReactTemplate

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API keys to .env:
# - VITE_OPENAI_API_KEY
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
# - VITE_PINECONE_API_KEY

# Start development server
npm run dev

# Open http://localhost:5173
```

## 🚦 Usage

### 1. Create Presets

1. Navigate to **Presets** page
2. Click **"New Preset"**
3. Choose type (Resume or Cover Letter)
4. Add name, content, and skill tags
5. Save preset

**Tip**: Create multiple resume versions (e.g., "Backend-Focused", "Frontend-Heavy", "ML-Oriented")

### 2. Fetch Jobs

1. Go to **Jobs** page
2. Click **"Refresh"** to fetch from GitHub
3. Use search/filters to find relevant positions
4. View job details in the sidebar

### 3. Auto-Apply

#### Option A: Single Application
1. Select a job from the Jobs page
2. Click **"Apply Now"**
3. Agent pipeline will:
   - Analyze job requirements
   - Match best preset
   - Customize resume/cover letter
   - Submit application
4. Track progress in Applications page

#### Option B: Batch Apply
1. Go to Dashboard
2. Set filters (location, skills, match score)
3. Click **"Batch Apply"**
4. Agents will process all matched jobs

### 4. Monitor Progress

**Dashboard View**:
- Active agents count
- Applications in progress
- Success rate
- Recent activity

**Applications View**:
- Kanban board (Queued → In Progress → Submitted → Response)
- Pipeline step status
- Execution logs
- Confirmation IDs

**Agent Monitor** (Click any agent):
- Real-time agent thoughts
- Tool calls with inputs/outputs
- Decision reasoning
- Error handling

## 🔧 Configuration

### Settings Page

- **Auto-Apply**: Enable/disable automatic submissions
- **Manual Review**: Require manual approval before submission
- **Max Applications/Day**: Rate limiting
- **Min Match Score**: Threshold for auto-apply (0-100%)
- **Preferred Locations**: Filter by location
- **Blacklist Companies**: Skip specific companies

### Preset Management

**Resume Presets**:
- Multiple versions targeting different skills
- Skill tags for automated matching
- Usage tracking

**Cover Letter Presets**:
- Template variables: `{{company}}`, `{{position}}`, `{{location}}`
- Skill emphasis tags
- Tone customization

## 📊 Agent System

### How Agents Work

Each agent is a LangChain agent with:
- **Model**: GPT-4 for reasoning
- **Tools**: Specialized functions (web scraping, text analysis, etc.)
- **Memory**: Context across pipeline steps
- **Logs**: Detailed execution traces

### Agent Types

**Job Scraper**:
- Tools: `fetchGitHub`, `parseMarkdown`, `scrapeHandshake`
- Output: Structured job data

**Job Analyzer**:
- Tools: `extractText`, `identifySkills`, `scoreRequirements`
- Output: Required/preferred skills, keywords

**Preset Matcher**:
- Tools: `compareSkills`, `scoreMatch`, `rankPresets`
- Output: Top resume/CL, match score, skill gaps

**Resume Customizer**:
- Tools: `analyzeResume`, `tweakBullets`, `reorderSections`
- Output: Customized resume

**Cover Letter Generator**:
- Tools: `fillTemplate`, `generateParagraph`, `adjustTone`
- Output: Personalized cover letter

**Application Agent**:
- Tools: `navigateURL`, `fillForm`, `submitApplication`
- Output: Confirmation ID or error

## 🎨 UI Components

### React Bits-Inspired

- **TiltCard**: 3D tilt effect on hover
- **BlobCursor**: Large gradient cursor follower
- **CubesBackground**: Floating animated cubes
- **FadeIn**: Scroll-triggered animations
- **GradientText**: Multi-color gradients
- **InfiniteScroll**: Seamless scrolling tech logos

### Custom Components

- **AppSidebar**: Navigation with badges
- **AgentMonitor**: Real-time agent activity
- **PipelineVisualizer**: n8n-style workflow
- **PresetEditor**: WYSIWYG resume/CL editor
- **SkillMatcher**: Gap analysis tool

## 🔐 Security

- API keys stored in `.env` (never committed)
- No PII logged to browser console
- Resume/cover letter data encrypted in localStorage
- Rate limiting on API calls
- Sanitized user inputs

## 🐛 Debugging

### View Agent Logs

1. Go to Dashboard
2. Click on any agent card
3. See real-time logs, tool calls, and errors

### Check Application Status

1. Go to Applications page
2. Click on an application card
3. View:
   - Pipeline step status
   - Execution time per step
   - Error messages
   - Retry attempts

### Common Issues

**No jobs showing**:
- Click "Refresh" on Jobs page
- Check network connection
- Verify GitHub repo is accessible

**Application failed**:
- Check application logs
- Verify preset content is valid
- Ensure API keys are configured

**Low match scores**:
- Add more skill tags to presets
- Create specialized presets for different job types

## 📈 Future Enhancements

- [ ] Supabase integration for persistent storage
- [ ] Email notifications for application updates
- [ ] Advanced analytics and insights
- [ ] Multi-source job scraping (LinkedIn, Indeed, etc.)
- [ ] Interview scheduling automation
- [ ] Response tracking and follow-up automation
- [ ] Team collaboration features
- [ ] Mobile app

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Open an issue or PR.

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- [SimplifyJobs](https://github.com/SimplifyJobs/Summer2026-Internships) for the job postings repo
- [React Bits](https://reactbits.dev) for UI component inspiration
- [LangChain](https://js.langchain.com) for agent orchestration
- [OpenAI](https://openai.com) for GPT-4 API

## 📧 Contact

Built by Pranav Gupta

---

**⚠️ Disclaimer**: This tool is for personal use. Always review applications before submission. Respect company application policies and rate limits.
