import Header from './components/Header'
import Footer from './components/Footer'
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
    <div className="relative min-h-screen overflow-x-hidden bg-linear-to-b from-indigo-50/70 via-white to-slate-50">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 h-80 w-2xl -translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute top-152 right-0 h-72 w-96 translate-x-1/3 rounded-full bg-emerald-200/30 blur-3xl" />
      </div>
      <Header />
      <main className="relative">
        <Hero />
        <DashboardSection applications={applications} />
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
      </main>
      <Footer />
    </div>
  )
}

export default App
