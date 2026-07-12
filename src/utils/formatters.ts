export function getFitScoreLabel(score: number): string {
  if (score === 0) return 'Analiz edilemedi'
  if (score >= 80) return 'Güçlü uyum'
  if (score >= 50) return 'Orta uyum'
  return 'Düşük uyum'
}

export function getFitScoreClass(score: number): string {
  if (score === 0) return 'bg-slate-100 text-slate-500'
  if (score >= 80) return 'bg-emerald-100 text-emerald-700'
  if (score >= 50) return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}
