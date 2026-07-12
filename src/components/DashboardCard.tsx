import type { LucideIcon } from 'lucide-react'

interface DashboardCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  description: string
  footnote?: string
}

export default function DashboardCard({
  icon: Icon,
  title,
  value,
  description,
  footnote,
}: DashboardCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5">
          <Icon className="h-5 w-5 text-slate-700" strokeWidth={1.75} />
        </div>
        <span className="text-2xl font-bold text-slate-900">{value}</span>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      </div>
      {footnote && (
        <p className="mt-auto text-xs text-slate-400">{footnote}</p>
      )}
    </div>
  )
}
