import { SKILLS } from '../data/skills'

export function extractRequiredSkills(description: string): string[] {
  const normalizedDescription = description.toLowerCase()

  return SKILLS.filter((skill) =>
    normalizedDescription.includes(skill.toLowerCase()),
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
