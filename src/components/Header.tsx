import { Target } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900">
            <Target className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            JobFit TR
          </span>
        </div>
        <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:inline-block">
          Junior Geliştiriciler İçin
        </span>
      </div>
    </header>
  )
}
