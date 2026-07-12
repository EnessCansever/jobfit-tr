export type WorkType = 'Remote' | 'Hybrid' | 'Office'

export type ApplicationStatus =
  | 'Saved'
  | 'Applied'
  | 'Interview'
  | 'Technical'
  | 'Offer'
  | 'Rejected'

export interface JobApplication {
  id: string
  company: string
  position: string
  location: string
  workType: WorkType
  status: ApplicationStatus
  jobUrl?: string
  description: string
  notes?: string
  createdAt: string
  requiredSkills: string[]
  matchedSkills: string[]
  missingSkills: string[]
  fitScore: number
}

export interface UserProfile {
  skills: string[]
}
