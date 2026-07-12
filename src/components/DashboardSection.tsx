import { Briefcase, Percent, Users, AlertTriangle } from 'lucide-react'
import type { JobApplication } from '../types/job'
import DashboardCard from './DashboardCard'
import { calculateDashboardStats } from '../utils/calculateStats'

interface DashboardSectionProps {
  applications: JobApplication[]
}

export default function DashboardSection({
  applications,
}: DashboardSectionProps) {
  const stats = calculateDashboardStats(applications)

  const cards = [
    {
      icon: Briefcase,
      title: 'Toplam İlan',
      value: stats.totalApplications,
      description: 'Kaydettiğin iş ilanı sayısı',
    },
    {
      icon: Percent,
      title: 'Ortalama Uygunluk',
      value: `${stats.averageFitScore}%`,
      description: 'Eklediğin ilanların ortalama uyum skoru',
    },
    {
      icon: Users,
      title: 'Görüşme Aşaması',
      value: stats.interviewCount,
      description: 'Görüşme veya teknik görüşme durumundaki ilanlar',
    },
    {
      icon: AlertTriangle,
      title: 'En Çok Eksik Beceri',
      value: stats.mostMissingSkill,
      description: 'İlanlarda en sık eksik görünen beceri',
      footnote: `Teklif: ${stats.offerCount} · Olumsuz: ${stats.rejectedCount}`,
    },
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Kontrol Paneli
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Eklediğin ilanlara göre güncellenen özet istatistikler.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <DashboardCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              value={card.value}
              description={card.description}
              footnote={card.footnote}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
