import { SKILLS } from '../data/skills'

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function extractRequiredSkills(description: string): string[] {
  // Longer skills (e.g. "Tailwind CSS") are matched and consumed first so
  // that shorter skills contained within them (e.g. "CSS") aren't
  // separately re-matched from the same text span.
  const sortedByLength = [...SKILLS].sort((a, b) => b.length - a.length)

  let workingText = description
  const found: string[] = []

  for (const skill of sortedByLength) {
    const regex = new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'gi')
    let matched = false

    workingText = workingText.replace(regex, (match) => {
      matched = true
      return ' '.repeat(match.length)
    })

    if (matched) {
      found.push(skill)
    }
  }

  const normalizedDescription = description.toLowerCase()
  return found.sort(
    (a, b) =>
      normalizedDescription.indexOf(a.toLowerCase()) -
      normalizedDescription.indexOf(b.toLowerCase()),
  )
}

export interface JobFitAnalysis {
  requiredSkills: string[]
  matchedSkills: string[]
  missingSkills: string[]
  fitScore: number
}

export function analyzeJobFit(
  description: string,
  userSkills: string[],
): JobFitAnalysis {
  const requiredSkills = extractRequiredSkills(description)
  const normalizedUserSkills = userSkills.map((skill) => skill.toLowerCase())

  const matchedSkills = requiredSkills.filter((skill) =>
    normalizedUserSkills.includes(skill.toLowerCase()),
  )
  const missingSkills = requiredSkills.filter(
    (skill) => !matchedSkills.includes(skill),
  )

  const fitScore =
    requiredSkills.length === 0
      ? 0
      : Math.round((matchedSkills.length / requiredSkills.length) * 100)

  return {
    requiredSkills,
    matchedSkills,
    missingSkills,
    fitScore,
  }
}
