import { Inbox, SearchX } from 'lucide-react'
import type { ApplicationStatus, JobApplication } from '../types/job'
import JobApplicationCard from './JobApplicationCard'
import FilterTabs from './FilterTabs'
import type { ApplicationFilter } from './FilterTabs'

interface SavedApplicationsProps {
  applications: JobApplication[]
  totalApplications: number
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: ApplicationStatus) => void
  activeFilter: ApplicationFilter
  onFilterChange: (filter: ApplicationFilter) => void
}

export default function SavedApplications({
  applications,
  totalApplications,
  onDelete,
  onStatusChange,
  activeFilter,
  onFilterChange,
}: SavedApplicationsProps) {
  const hasApplications = totalApplications > 0

  return (
    <section className="mx-auto max-w-6xl px-6 pb-8">
      <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Kaydedilen İlanlar
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Eklediğin ilanları, uygunluk skorlarını ve eksik becerilerini
            buradan takip edebilirsin.
          </p>
        </div>

        <div className="mb-6">
          <FilterTabs activeFilter={activeFilter} onChange={onFilterChange} />
        </div>

        {!hasApplications ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white py-14 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <Inbox className="h-5 w-5 text-slate-400" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Henüz kaydedilen ilan yok.
              </p>
              <p className="mt-1 text-sm text-slate-400">
                İlk ilanını ekleyerek uygunluk analizini başlat.
              </p>
            </div>
          </div>
        ) : applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white py-14 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <SearchX className="h-5 w-5 text-slate-400" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Bu filtreye uygun ilan bulunamadı.
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Farklı bir filtre seçerek diğer ilanları görüntüleyebilirsin.
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-3 text-sm text-slate-400">
              {applications.length} ilan gösteriliyor
            </p>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {applications.map((application) => (
                <JobApplicationCard
                  key={application.id}
                  application={application}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
