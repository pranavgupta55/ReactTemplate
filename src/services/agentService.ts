import type { Job, Application, Preset, AgentLog, PipelineStep, ApplicationStep } from '../types'
import { openai } from '../lib/openai'

/**
 * Agent Service - Orchestrates the application workflow using AI agents
 * Currently simulated - will integrate with LangChain + OpenAI when keys are configured
 */

// Utility to create agent logs
function createLog(
  agentName: string,
  type: AgentLog['type'],
  content: string,
  applicationId?: string
): AgentLog {
  return {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    agentName,
    applicationId,
    timestamp: new Date(),
    type,
    content,
  }
}

// Simulate async agent work with realistic delays
async function simulateWork(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Job Analyzer Agent
 * Analyzes job description to extract requirements, skills, and keywords
 */
export async function analyzeJob(
  job: Job,
  onLog?: (log: AgentLog) => void
): Promise<{
  required: string[]
  preferred: string[]
  keywords: string[]
  description: string
}> {
  const logs: AgentLog[] = []

  logs.push(
    createLog('job-analyzer', 'thought', `Analyzing job posting for ${job.company} - ${job.position}`)
  )
  onLog?.(logs[logs.length - 1])

  await simulateWork(1000)

  logs.push(
    createLog('job-analyzer', 'tool_call', `Fetching job description from ${job.url}`, undefined)
  )
  onLog?.(logs[logs.length - 1])

  await simulateWork(2000)

  // Simulate extraction
  const description = `We are seeking a talented ${job.position} to join our team at ${job.company}.`

  const required = [
    ...job.requirements.keywords,
    'problem solving',
    'communication',
    'teamwork',
  ]

  const preferred = ['cloud platforms', 'agile', 'version control']

  const keywords = [...required, ...preferred, job.company.toLowerCase(), job.location.toLowerCase()]

  logs.push(
    createLog(
      'job-analyzer',
      'observation',
      `Extracted ${required.length} required skills and ${preferred.length} preferred skills`
    )
  )
  onLog?.(logs[logs.length - 1])

  logs.push(
    createLog(
      'job-analyzer',
      'decision',
      `Job analysis complete. Match criteria: ${required.slice(0, 3).join(', ')}`
    )
  )
  onLog?.(logs[logs.length - 1])

  return {
    required,
    preferred,
    keywords,
    description,
  }
}

/**
 * Preset Matcher Agent
 * Scores and ranks presets against job requirements
 */
export async function matchPresets(
  jobRequirements: { required: string[]; preferred: string[]; keywords: string[] },
  presets: Preset[],
  onLog?: (log: AgentLog) => void
): Promise<{
  topResume?: Preset
  topCoverLetter?: Preset
  matchScore: number
  skillGaps: string[]
}> {
  const logs: AgentLog[] = []

  logs.push(
    createLog(
      'preset-matcher',
      'thought',
      `Evaluating ${presets.length} presets against job requirements`
    )
  )
  onLog?.(logs[logs.length - 1])

  await simulateWork(1500)

  const resumes = presets.filter((p) => p.type === 'resume')
  const coverLetters = presets.filter((p) => p.type === 'coverLetter')

  // Score resumes
  const scoredResumes = resumes.map((resume) => {
    const matchedSkills = resume.skills.filter((skill) =>
      jobRequirements.required.some((req) => req.toLowerCase().includes(skill.toLowerCase()))
    )
    const score = (matchedSkills.length / jobRequirements.required.length) * 100
    return { preset: resume, score }
  })

  scoredResumes.sort((a, b) => b.score - a.score)

  logs.push(
    createLog(
      'preset-matcher',
      'tool_call',
      `Scored ${resumes.length} resume presets. Top score: ${scoredResumes[0]?.score.toFixed(0) || 0}%`
    )
  )
  onLog?.(logs[logs.length - 1])

  await simulateWork(1000)

  // Find skill gaps
  const allPresetSkills = new Set(presets.flatMap((p) => p.skills))
  const skillGaps = jobRequirements.required.filter((req) => !allPresetSkills.has(req))

  if (skillGaps.length > 0) {
    logs.push(
      createLog(
        'preset-matcher',
        'observation',
        `⚠️ Skill gaps detected: ${skillGaps.join(', ')}. Consider creating a new preset.`
      )
    )
    onLog?.(logs[logs.length - 1])
  }

  const topResume = scoredResumes[0]?.preset
  const topCoverLetter = coverLetters[0] // Simple selection for now

  logs.push(
    createLog(
      'preset-matcher',
      'success',
      `Selected preset: "${topResume?.name || 'None'}" with ${scoredResumes[0]?.score.toFixed(0) || 0}% match`
    )
  )
  onLog?.(logs[logs.length - 1])

  return {
    topResume,
    topCoverLetter,
    matchScore: scoredResumes[0]?.score || 0,
    skillGaps,
  }
}

/**
 * Resume Customizer Agent
 * Customizes resume to better match job requirements
 */
export async function customizeResume(
  preset: Preset,
  job: Job,
  requirements: { required: string[]; keywords: string[] },
  onLog?: (log: AgentLog) => void
): Promise<string> {
  const logs: AgentLog[] = []

  logs.push(
    createLog(
      'resume-customizer',
      'thought',
      `Customizing resume "${preset.name}" for ${job.company}`
    )
  )
  onLog?.(logs[logs.length - 1])

  await simulateWork(2000)

  logs.push(
    createLog(
      'resume-customizer',
      'tool_call',
      `Adjusting resume to emphasize: ${requirements.required.slice(0, 3).join(', ')}`
    )
  )
  onLog?.(logs[logs.length - 1])

  await simulateWork(1500)

  // Simulate customization
  const customized = preset.content

  logs.push(createLog('resume-customizer', 'success', 'Resume customization complete'))
  onLog?.(logs[logs.length - 1])

  return customized
}

/**
 * Cover Letter Generator Agent
 * Generates personalized cover letter using preset template
 */
export async function generateCoverLetter(
  preset: Preset,
  job: Job,
  onLog?: (log: AgentLog) => void
): Promise<string> {
  const logs: AgentLog[] = []

  logs.push(
    createLog(
      'cover-letter-generator',
      'thought',
      `Generating cover letter for ${job.position} at ${job.company}`
    )
  )
  onLog?.(logs[logs.length - 1])

  await simulateWork(2500)

  logs.push(
    createLog('cover-letter-generator', 'tool_call', `Researching ${job.company} background`)
  )
  onLog?.(logs[logs.length - 1])

  await simulateWork(1500)

  // Fill template variables
  let coverLetter = preset.content
    .replace(/\{\{company\}\}/g, job.company)
    .replace(/\{\{position\}\}/g, job.position)
    .replace(/\{\{location\}\}/g, job.location)

  logs.push(createLog('cover-letter-generator', 'success', 'Cover letter generated successfully'))
  onLog?.(logs[logs.length - 1])

  return coverLetter
}

/**
 * Application Agent
 * Handles form filling and submission (simulated for now)
 */
export async function submitApplication(
  application: Application,
  job: Job,
  onLog?: (log: AgentLog) => void
): Promise<{ success: boolean; confirmationId?: string; error?: string }> {
  const logs: AgentLog[] = []

  logs.push(createLog('application-agent', 'thought', `Navigating to ${job.url}`, application.id))
  onLog?.(logs[logs.length - 1])

  await simulateWork(2000)

  logs.push(createLog('application-agent', 'tool_call', 'Filling application form', application.id))
  onLog?.(logs[logs.length - 1])

  await simulateWork(3000)

  logs.push(
    createLog('application-agent', 'tool_call', 'Uploading resume and cover letter', application.id)
  )
  onLog?.(logs[logs.length - 1])

  await simulateWork(2000)

  // Simulate 90% success rate
  const success = Math.random() > 0.1

  if (success) {
    const confirmationId = `CONF-${Date.now().toString(36).toUpperCase()}`
    logs.push(
      createLog(
        'application-agent',
        'success',
        `✅ Application submitted successfully! Confirmation: ${confirmationId}`,
        application.id
      )
    )
    onLog?.(logs[logs.length - 1])

    return { success: true, confirmationId }
  } else {
    const error = 'Failed to submit application: Form validation error'
    logs.push(createLog('application-agent', 'error', `❌ ${error}`, application.id))
    onLog?.(logs[logs.length - 1])

    return { success: false, error }
  }
}

/**
 * Execute full application pipeline
 */
export async function executeApplicationPipeline(
  job: Job,
  presets: Preset[],
  onStepUpdate: (step: PipelineStep, status: ApplicationStep) => void,
  onLog: (log: AgentLog) => void
): Promise<Application> {
  const applicationId = `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const steps: ApplicationStep[] = [
    { name: 'analyze', status: 'pending', timestamp: new Date(), duration: 0, retries: 0 },
    { name: 'match', status: 'pending', timestamp: new Date(), duration: 0, retries: 0 },
    { name: 'customize', status: 'pending', timestamp: new Date(), duration: 0, retries: 0 },
    { name: 'review', status: 'pending', timestamp: new Date(), duration: 0, retries: 0 },
    { name: 'submit', status: 'pending', timestamp: new Date(), duration: 0, retries: 0 },
  ]

  const application: Application = {
    id: applicationId,
    jobId: job.id,
    status: 'analyzing',
    currentStep: 'analyze',
    steps,
    customizations: [],
    logs: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  try {
    // Step 1: Analyze job
    const startAnalyze = Date.now()
    onStepUpdate('analyze', { ...steps[0], status: 'running' })

    const analysis = await analyzeJob(job, onLog)

    onStepUpdate('analyze', {
      ...steps[0],
      status: 'completed',
      duration: Date.now() - startAnalyze,
      output: analysis,
    })

    // Step 2: Match presets
    const startMatch = Date.now()
    onStepUpdate('match', { ...steps[1], status: 'running' })

    const match = await matchPresets(analysis, presets, onLog)

    if (!match.topResume) {
      throw new Error('No suitable resume preset found')
    }

    application.resumeUsed = match.topResume.id
    application.coverLetterUsed = match.topCoverLetter?.id

    onStepUpdate('match', {
      ...steps[1],
      status: 'completed',
      duration: Date.now() - startMatch,
      output: match,
    })

    // Step 3: Customize
    const startCustomize = Date.now()
    onStepUpdate('customize', { ...steps[2], status: 'running' })

    await customizeResume(match.topResume, job, analysis, onLog)

    if (match.topCoverLetter) {
      await generateCoverLetter(match.topCoverLetter, job, onLog)
    }

    onStepUpdate('customize', {
      ...steps[2],
      status: 'completed',
      duration: Date.now() - startCustomize,
    })

    // Step 4: Review (skipped for auto-apply)
    onStepUpdate('review', { ...steps[3], status: 'skipped', duration: 0 })

    // Step 5: Submit
    const startSubmit = Date.now()
    onStepUpdate('submit', { ...steps[4], status: 'running' })

    const result = await submitApplication(application, job, onLog)

    if (result.success) {
      application.submittedAt = new Date()
      application.confirmationId = result.confirmationId
      application.status = 'submitted'

      onStepUpdate('submit', {
        ...steps[4],
        status: 'completed',
        duration: Date.now() - startSubmit,
        output: result,
      })
    } else {
      throw new Error(result.error || 'Submission failed')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    application.status = 'rejected'

    onLog(
      createLog('pipeline', 'error', `Pipeline failed: ${errorMessage}`, application.id)
    )

    // Update current step as failed
    const currentStepIndex = steps.findIndex((s) => s.name === application.currentStep)
    if (currentStepIndex !== -1) {
      onStepUpdate(application.currentStep, {
        ...steps[currentStepIndex],
        status: 'failed',
        error: errorMessage,
      })
    }
  }

  return application
}
