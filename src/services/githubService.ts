import type { Job } from '../types'

const REPO_URL = 'https://api.github.com/repos/SimplifyJobs/Summer2026-Internships/contents/README.md'
const RAW_README_URL =
  'https://raw.githubusercontent.com/SimplifyJobs/Summer2026-Internships/dev/README.md'

interface ParsedJob {
  company: string
  position: string
  location: string
  url: string
  postedDate?: string
}

/**
 * Fetches and parses jobs from the SimplifyJobs Summer 2026 Internships GitHub repo
 */
export async function fetchGitHubJobs(): Promise<Job[]> {
  try {
    // Fetch the raw README content
    const response = await fetch(RAW_README_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub repo: ${response.statusText}`)
    }

    const content = await response.text()
    const jobs = parseMarkdownTable(content)

    return jobs.map((job) => ({
      id: generateJobId(job),
      company: job.company,
      position: job.position,
      location: job.location,
      url: job.url,
      source: 'github' as const,
      postedDate: job.postedDate ? new Date(job.postedDate) : new Date(),
      scrapedDate: new Date(),
      requirements: {
        required: [],
        preferred: [],
        keywords: extractKeywords(job.position),
      },
      status: 'new' as const,
    }))
  } catch (error) {
    console.error('Error fetching GitHub jobs:', error)
    throw error
  }
}

/**
 * Parses the markdown table from the README
 */
function parseMarkdownTable(markdown: string): ParsedJob[] {
  const jobs: ParsedJob[] = []

  // Find the table section (typically starts with "| Company |")
  const tableRegex = /\|.*Company.*\|.*Role.*\|.*Location.*\|[\s\S]*?\n\n/g
  const tableMatch = markdown.match(tableRegex)

  if (!tableMatch) {
    console.warn('No table found in README')
    return jobs
  }

  const table = tableMatch[0]
  const rows = table.split('\n').filter((row) => row.trim().startsWith('|'))

  // Skip header rows (first 2 rows: header and separator)
  for (let i = 2; i < rows.length; i++) {
    const row = rows[i]
    if (!row.trim()) continue

    try {
      const parsed = parseTableRow(row)
      if (parsed) {
        jobs.push(parsed)
      }
    } catch (error) {
      console.warn('Failed to parse row:', row, error)
    }
  }

  return jobs
}

/**
 * Parses a single table row
 * Expected format: | Company | Position | Location | Link | Date |
 */
function parseTableRow(row: string): ParsedJob | null {
  // Split by | and clean up
  const cells = row
    .split('|')
    .map((cell) => cell.trim())
    .filter((cell) => cell.length > 0)

  if (cells.length < 3) {
    return null
  }

  // Extract data from cells
  const company = extractTextFromMarkdown(cells[0])
  const position = extractTextFromMarkdown(cells[1])
  const location = extractTextFromMarkdown(cells[2])

  // Extract URL from the Link column (or Position/Company columns)
  let url = extractUrlFromMarkdown(cells[3] || cells[1] || cells[0])

  // Some tables might have date in last column
  const postedDate = cells[4] ? extractTextFromMarkdown(cells[4]) : undefined

  if (!company || !position || !url) {
    return null
  }

  return {
    company,
    position,
    location: location || 'Not specified',
    url,
    postedDate,
  }
}

/**
 * Extracts plain text from markdown (removes links, emphasis, etc.)
 */
function extractTextFromMarkdown(text: string): string {
  return (
    text
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove emphasis
      .replace(/[*_~`]/g, '')
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      .trim()
  )
}

/**
 * Extracts URL from markdown link
 */
function extractUrlFromMarkdown(text: string): string {
  const linkMatch = text.match(/\[([^\]]+)\]\(([^)]+)\)/)
  if (linkMatch) {
    return linkMatch[2]
  }

  // Try to find raw URL
  const urlMatch = text.match(/(https?:\/\/[^\s)]+)/)
  if (urlMatch) {
    return urlMatch[1]
  }

  return ''
}

/**
 * Generates a unique ID for a job based on company and position
 */
function generateJobId(job: ParsedJob): string {
  const cleanStr = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '-')
  return `${cleanStr(job.company)}-${cleanStr(job.position)}-${Date.now().toString(36)}`
}

/**
 * Extracts keywords from job title for initial matching
 */
function extractKeywords(title: string): string[] {
  const keywords: string[] = []

  const titleLower = title.toLowerCase()

  // Programming languages
  const languages = [
    'java',
    'python',
    'javascript',
    'typescript',
    'c++',
    'c#',
    'go',
    'rust',
    'swift',
    'kotlin',
    'ruby',
    'php',
  ]
  languages.forEach((lang) => {
    if (titleLower.includes(lang)) keywords.push(lang)
  })

  // Roles/skills
  const roles = [
    'frontend',
    'backend',
    'fullstack',
    'full-stack',
    'devops',
    'mobile',
    'ios',
    'android',
    'ml',
    'machine learning',
    'data',
    'security',
    'cloud',
    'ai',
  ]
  roles.forEach((role) => {
    if (titleLower.includes(role)) keywords.push(role)
  })

  // Technologies
  const tech = ['react', 'vue', 'angular', 'node', 'aws', 'azure', 'gcp', 'docker', 'kubernetes']
  tech.forEach((t) => {
    if (titleLower.includes(t)) keywords.push(t)
  })

  return [...new Set(keywords)]
}

/**
 * Manually add a job (from Handshake or other source)
 */
export function createManualJob(data: Partial<Job>): Job {
  return {
    id: generateJobId({
      company: data.company || 'Unknown',
      position: data.position || 'Unknown',
      location: data.location || 'Unknown',
      url: data.url || '',
    }),
    company: data.company || 'Unknown Company',
    position: data.position || 'Internship',
    location: data.location || 'Not specified',
    url: data.url || '',
    source: data.source || 'manual',
    postedDate: data.postedDate || new Date(),
    scrapedDate: new Date(),
    requirements: data.requirements || {
      required: [],
      preferred: [],
      keywords: [],
    },
    matchScore: data.matchScore,
    status: data.status || 'new',
    tags: data.tags,
  }
}
