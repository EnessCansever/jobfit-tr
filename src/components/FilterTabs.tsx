import type { ApplicationStatus } from '../types/job'
import { STATUSES } from '../data/statuses'

export type ApplicationFilter = 'All' | ApplicationStatus | 'HighFit'

interface FilterTabsProps {
  activeFilter: ApplicationFilter
  onChange: (filter: ApplicationFilter) => void
}

const FILTER_OPTIONS: { value: ApplicationFilter; label: string }[] = [
  { value: 'All', label: 'Tümü' },
  ...STATUSES.map((status) => ({ value: status.value, label: status.label })),
  { value: 'HighFit', label: '%70+ Uygun' },
]

export default function FilterTabs({
  activeFilter,
  onChange,
}: FilterTabsProps) {
  return (
    <div className="-mx-1 flex snap-x gap-2 overflow-x-auto scroll-smooth px-1 pb-1">
      {FILTER_OPTIONS.map((option) => {
        const isActive = option.value === activeFilter
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`shrink-0 snap-start whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
