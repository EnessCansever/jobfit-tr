import Header from './components/Header'
import Hero from './components/Hero'
import SkillSelector from './components/SkillSelector'
import JobForm from './components/JobForm'
import AnalysisSummary from './components/AnalysisSummary'
import SavedApplications from './components/SavedApplications'
import DashboardSection from './components/DashboardSection'
import type { ApplicationFilter } from './components/FilterTabs'
import { STATUSES } from './data/statuses'
import type { ApplicationStatus, JobApplication } from './types/job'
import { analyzeJobFit } from './utils/analyzeJob'
import { useLocalStorage } from './hooks/useLocalStorage'

const VALID_FILTERS: ApplicationFilter[] = [
  'All',
  ...STATUSES.map((status) => status.value),
  'HighFit',
]

function isApplicationFilter(value: unknown): value is ApplicationFilter {
  return (
    typeof value === 'string' &&
    VALID_FILTERS.includes(value as ApplicationFilter)
  )
}

function App() {
  const [selectedSkills, setSelectedSkills] = useLocalStorage<string[]>(
    'jobfit-selected-skills',
    [],
  )
  const [applications, setApplications] = useLocalStorage<JobApplication[]>(
    'jobfit-applications',
    [],
  )
  const [activeFilter, setActiveFilter] = useLocalStorage<ApplicationFilter>(
    'jobfit-active-filter',
    'All',
    isApplicationFilter,
  )

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

  function handleDeleteApplication(id: string) {
    setApplications((prev) => prev.filter((application) => application.id !== id))
  }

  function handleStatusChange(id: string, status: ApplicationStatus) {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === id ? { ...application, status } : application,
      ),
    )
  }

  const lastApplication =
    applications.length > 0 ? applications[applications.length - 1] : null

  const filteredApplications = applications.filter((application) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'HighFit') return application.fitScore >= 70
    return application.status === activeFilter
  })

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
        <SavedApplications
          applications={filteredApplications}
          totalApplications={applications.length}
          onDelete={handleDeleteApplication}
          onStatusChange={handleStatusChange}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <DashboardSection applications={applications} />
      </main>
    </div>
  )
}

export default App
