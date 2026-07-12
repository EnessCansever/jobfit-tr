import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillSelector from './components/SkillSelector'
import DashboardSection from './components/DashboardSection'

function App() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <SkillSelector
          selectedSkills={selectedSkills}
          onChange={setSelectedSkills}
        />
        <DashboardSection />
      </main>
    </div>
  )
}

export default App
