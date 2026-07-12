import type { JobApplication } from '../types/job'

export interface DashboardStats {
  totalApplications: number
  averageFitScore: number
  activeApplications: number
  interviewCount: number
  offerCount: number
  rejectedCount: number
  mostMissingSkill: string
}

export function calculateDashboardStats(
  applications: JobApplication[],
): DashboardStats {
  const totalApplications = applications.length

  const averageFitScore =
    totalApplications === 0
      ? 0
      : Math.round(
          applications.reduce(
            (sum, application) => sum + application.fitScore,
            0,
          ) / totalApplications,
        )

  const activeApplications = applications.filter(
    (application) => application.status !== 'Rejected',
  ).length

  const interviewCount = applications.filter(
    (application) =>
      application.status === 'Interview' ||
      application.status === 'Technical',
  ).length

  const offerCount = applications.filter(
    (application) => application.status === 'Offer',
  ).length

  const rejectedCount = applications.filter(
    (application) => application.status === 'Rejected',
  ).length

  const missingSkillCounts = new Map<string, number>()
  for (const application of applications) {
    for (const skill of application.missingSkills) {
      missingSkillCounts.set(skill, (missingSkillCounts.get(skill) ?? 0) + 1)
    }
  }

  let mostMissingSkill = 'Yok'
  let highestCount = 0
  for (const [skill, count] of missingSkillCounts) {
    if (count > highestCount) {
      highestCount = count
      mostMissingSkill = skill
    }
  }

  return {
    totalApplications,
    averageFitScore,
    activeApplications,
    interviewCount,
    offerCount,
    rejectedCount,
    mostMissingSkill,
  }
}
