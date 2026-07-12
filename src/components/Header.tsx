import { SearchCheck } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-slate-900 to-indigo-800 shadow-sm">
            <SearchCheck className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            JobFit TR
          </span>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 sm:inline-flex">
          Local-first MVP
        </span>
      </div>
    </header>
  )
}
