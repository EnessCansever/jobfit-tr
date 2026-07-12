import Header from './components/Header'
import Hero from './components/Hero'
import DashboardSection from './components/DashboardSection'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <DashboardSection />
      </main>
    </div>
  )
}

export default App
