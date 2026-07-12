import { ClipboardList } from 'lucide-react'
import type { JobApplication } from '../types/job'
import {
  getFitScoreLabelWithContext,
  getFitScoreClass,
} from '../utils/formatters'

interface AnalysisSummaryProps {
  application: JobApplication | null
  hasUserSkills?: boolean
}

function SkillBadgeList({
  skills,
  emptyText,
  badgeClass,
}: {
  skills: string[]
  emptyText: string
  badgeClass: string
}) {
  if (skills.length === 0) {
    return <p className="text-sm text-slate-400">{emptyText}</p>
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <span
          key={skill}
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass}`}
        >
          {skill}
        </span>
      ))}
    </div>
  )
}

export default function AnalysisSummary({
  application,
  hasUserSkills = true,
}: AnalysisSummaryProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-black/2 sm:p-7">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Son Analiz Özeti
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Son eklediğin ilanın uyum sonucu burada görünür.
          </p>
        </div>

        {application === null ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 py-10 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <ClipboardList className="h-5 w-5 text-slate-400" strokeWidth={1.75} />
            </div>
            <p className="text-sm text-slate-400">
              Henüz analiz edilmiş ilan yok.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {application.position}
                </h3>
                <p className="text-sm text-slate-500">{application.company}</p>
              </div>
              <div
                className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 ${getFitScoreClass(
                  application.fitScore,
                )}`}
              >
                <span className="text-3xl font-bold">
                  {application.fitScore}%
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                  {getFitScoreLabelWithContext(
                    application.fitScore,
                    application.requiredSkills.length > 0,
                  )}
                </span>
              </div>
            </div>

            {!hasUserSkills && (
              <p className="rounded-xl bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
                Daha doğru analiz için beceri profilini doldur.
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tespit Edilen Beceriler
                </h4>
                <SkillBadgeList
                  skills={application.requiredSkills}
                  emptyText="İlan metninde beceri tespit edilemedi."
                  badgeClass="bg-slate-50 text-slate-600 border border-slate-200"
                />
              </div>
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Eşleşen Beceriler
                </h4>
                <SkillBadgeList
                  skills={application.matchedSkills}
                  emptyText="Eşleşen beceri yok."
                  badgeClass="bg-emerald-50 text-emerald-700 border border-emerald-100"
                />
              </div>
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Eksik Beceriler
                </h4>
                <SkillBadgeList
                  skills={application.missingSkills}
                  emptyText="Eksik beceri yok."
                  badgeClass="bg-red-50 text-red-700 border border-red-100"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
