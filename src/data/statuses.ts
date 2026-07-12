import type { ApplicationStatus } from '../types/job'

export interface StatusInfo {
  value: ApplicationStatus
  label: string
  description: string
  badgeClass: string
}

export const STATUSES: StatusInfo[] = [
  {
    value: 'Saved',
    label: 'Kaydedildi',
    description: 'İlan kaydedildi, henüz başvuru yapılmadı.',
    badgeClass: 'bg-slate-100 text-slate-600',
  },
  {
    value: 'Applied',
    label: 'Başvuruldu',
    description: 'Başvuru yapıldı, yanıt bekleniyor.',
    badgeClass: 'bg-blue-100 text-blue-700',
  },
  {
    value: 'Interview',
    label: 'Görüşme',
    description: 'İK ya da ön görüşme aşamasında.',
    badgeClass: 'bg-purple-100 text-purple-700',
  },
  {
    value: 'Technical',
    label: 'Teknik Görüşme',
    description: 'Teknik mülakat veya vaka çalışması aşamasında.',
    badgeClass: 'bg-amber-100 text-amber-700',
  },
  {
    value: 'Offer',
    label: 'Teklif',
    description: 'İş teklifi alındı.',
    badgeClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    value: 'Rejected',
    label: 'Olumsuz',
    description: 'Başvuru olumsuz sonuçlandı.',
    badgeClass: 'bg-red-100 text-red-700',
  },
]
