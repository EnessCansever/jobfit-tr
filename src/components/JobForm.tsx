import { useState } from 'react'
import type { FormEvent } from 'react'
import type { WorkType } from '../types/job'

interface JobFormData {
  company: string
  position: string
  location: string
  workType: WorkType
  jobUrl: string
  description: string
  notes: string
}

interface JobFormProps {
  onSubmit: (formData: JobFormData) => void
}

const EMPTY_FORM: JobFormData = {
  company: '',
  position: '',
  location: '',
  workType: 'Remote',
  jobUrl: '',
  description: '',
  notes: '',
}

type FormErrors = Partial<Record<'company' | 'position' | 'description', string>>

const inputBaseClass =
  'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:ring-2'

function getInputClass(hasError: boolean) {
  return `${inputBaseClass} ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
      : 'border-slate-200 focus:border-slate-900 focus:ring-slate-900/10'
  }`
}

export default function JobForm({ onSubmit }: JobFormProps) {
  const [formData, setFormData] = useState<JobFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})

  function updateField<K extends keyof JobFormData>(
    field: K,
    value: JobFormData[K],
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {}

    if (!formData.company.trim()) {
      nextErrors.company = 'Şirket adı boş olamaz.'
    }
    if (!formData.position.trim()) {
      nextErrors.position = 'Pozisyon adı boş olamaz.'
    }
    if (!formData.description.trim()) {
      nextErrors.description = 'İlan metni boş olamaz.'
    }

    return nextErrors
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSubmit(formData)
    setFormData(EMPTY_FORM)
    setErrors({})
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-black/2 sm:p-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            İş İlanı Ekle
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Başvurmak istediğin ilanı ekle, sonraki adımda becerilerinle
            uygunluğunu analiz edelim.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="company"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Şirket Adı
              </label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="Örn: Trendyol"
                className={getInputClass(Boolean(errors.company))}
              />
              {errors.company && (
                <p className="mt-1.5 text-xs text-red-500">{errors.company}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="position"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Pozisyon Adı
              </label>
              <input
                id="position"
                type="text"
                value={formData.position}
                onChange={(e) => updateField('position', e.target.value)}
                placeholder="Örn: Junior Frontend Developer"
                className={getInputClass(Boolean(errors.position))}
              />
              {errors.position && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.position}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Lokasyon
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="Örn: İstanbul / Remote"
                className={getInputClass(false)}
              />
            </div>

            <div>
              <label
                htmlFor="workType"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Çalışma Tipi
              </label>
              <select
                id="workType"
                value={formData.workType}
                onChange={(e) =>
                  updateField('workType', e.target.value as WorkType)
                }
                className={getInputClass(false)}
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Office">Office</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="jobUrl"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                İlan Linki
              </label>
              <input
                id="jobUrl"
                type="text"
                value={formData.jobUrl}
                onChange={(e) => updateField('jobUrl', e.target.value)}
                placeholder="https://..."
                className={getInputClass(false)}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                İlan Metni
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="İlan metnini buraya yapıştır..."
                rows={5}
                className={`${getInputClass(Boolean(errors.description))} resize-none`}
              />
              {errors.description && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Notlar
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Bu ilanla ilgili kişisel notlarını yaz..."
                rows={3}
                className={`${getInputClass(false)} resize-none`}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-linear-to-r from-slate-900 to-indigo-800 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-lg hover:shadow-indigo-900/20 active:opacity-90"
            >
              İlanı Kaydet
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
