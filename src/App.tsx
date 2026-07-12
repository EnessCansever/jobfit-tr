import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillSelector from './components/SkillSelector'
import JobForm from './components/JobForm'
import AnalysisSummary from './components/AnalysisSummary'
import DashboardSection from './components/DashboardSection'
import type { JobApplication } from './types/job'
import { analyzeJobFit } from './utils/analyzeJob'

function App() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [applications, setApplications] = useState<JobApplication[]>([])

  function handleJobSubmit(formData: {
    company: string
    position: string
    location: string
    workType: JobApplication['workType']
    jobUrl: string
    description: string
    notes: string
  }) {
    const { requiredSkills, matchedSkills, missingSkills, fitScore } =
      analyzeJobFit(formData.description, selectedSkills)

    const newApplication: JobApplication = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString(),
      company: formData.company,
      position: formData.position,
      location: formData.location,
      workType: formData.workType,
      status: 'Saved',
      jobUrl: formData.jobUrl,
      description: formData.description,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      requiredSkills,
      matchedSkills,
      missingSkills,
      fitScore,
    }

    setApplications((prev) => [...prev, newApplication])
  }

  const lastApplication =
    applications.length > 0 ? applications[applications.length - 1] : null

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <SkillSelector
          selectedSkills={selectedSkills}
          onChange={setSelectedSkills}
        />
        <JobForm onSubmit={handleJobSubmit} />
        <AnalysisSummary
          application={lastApplication}
          hasUserSkills={selectedSkills.length > 0}
        />
        <DashboardSection />
      </main>
    </div>
  )
}

export default App
