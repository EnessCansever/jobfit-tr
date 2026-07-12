import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillSelector from './components/SkillSelector'
import JobForm from './components/JobForm'
import DashboardSection from './components/DashboardSection'

function App() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [applications, setApplications] = useState<any[]>([])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <SkillSelector
          selectedSkills={selectedSkills}
          onChange={setSelectedSkills}
        />
        <JobForm
          onSubmit={(formData) =>
            setApplications((prev) => [...prev, formData])
          }
        />
        <p className="mx-auto max-w-6xl px-6 pb-4 text-sm text-slate-400">
          Eklenen ilan sayısı: {applications.length}
        </p>
        <DashboardSection />
      </main>
    </div>
  )
}

export default App
