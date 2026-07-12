import { Briefcase, Percent, ListChecks, BarChart3 } from 'lucide-react'
import DashboardCard from './DashboardCard'

const cards = [
  {
    icon: Briefcase,
    title: 'İlan Ekle',
    description: 'Başvurmak istediğin iş ilanlarını buraya kaydet.',
  },
  {
    icon: Percent,
    title: 'Uygunluk Skoru',
    description: 'Becerilerini ilan gereksinimleriyle karşılaştır.',
  },
  {
    icon: ListChecks,
    title: 'Başvuru Takibi',
    description: 'Başvurularının durumunu tek yerden izle.',
  },
  {
    icon: BarChart3,
    title: 'İstatistikler',
    description: 'Başvuru sürecine dair genel görünümünü gör.',
  },
]

export default function DashboardSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Kontrol Paneli</h2>
          <p className="mt-1 text-sm text-slate-500">
            Uygulama geliştikçe bu alanlar aktif hale gelecek.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <DashboardCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
