import { MapPin, Briefcase, ExternalLink, Trash2 } from 'lucide-react'
import type { ApplicationStatus, JobApplication } from '../types/job'
import { STATUSES } from '../data/statuses'
import { getFitScoreLabel, getFitScoreClass } from '../utils/formatters'

interface JobApplicationCardProps {
  application: JobApplication
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: ApplicationStatus) => void
}

function SkillBadgeGroup({
  title,
  skills,
  emptyText,
  badgeClass,
}: {
  title: string
  skills: string[]
  emptyText: string
  badgeClass: string
}) {
  return (
    <div>
      <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h4>
      {skills.length === 0 ? (
        <p className="text-xs text-slate-400">{emptyText}</p>
      ) : (
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
      )}
    </div>
  )
}

export default function JobApplicationCard({
  application,
  onDelete,
  onStatusChange,
}: JobApplicationCardProps) {
  const statusInfo = STATUSES.find(
    (status) => status.value === application.status,
  )

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {application.position}
          </h3>
          <p className="text-sm text-slate-500">{application.company}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-2xl font-bold text-slate-900">
            {application.fitScore}%
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getFitScoreClass(
              application.fitScore,
            )}`}
          >
            {getFitScoreLabel(application.fitScore)}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
        {application.location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            {application.location}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <Briefcase className="h-4 w-4" strokeWidth={1.75} />
          {application.workType}
        </span>
        <select
          value={application.status}
          onChange={(e) =>
            onStatusChange(application.id, e.target.value as ApplicationStatus)
          }
          className={`cursor-pointer rounded-full border-none py-1 pl-2.5 pr-7 text-xs font-semibold outline-none transition-colors focus:ring-2 focus:ring-slate-900/10 ${
            statusInfo?.badgeClass ?? 'bg-slate-100 text-slate-600'
          }`}
        >
          {STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {application.notes && (
        <p className="rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600">
          {application.notes}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SkillBadgeGroup
          title="Tespit Edilen"
          skills={application.requiredSkills}
          emptyText="Beceri tespit edilemedi."
          badgeClass="bg-slate-100 text-slate-600"
        />
        <SkillBadgeGroup
          title="Eşleşen"
          skills={application.matchedSkills}
          emptyText="Eşleşen beceri yok."
          badgeClass="bg-emerald-100 text-emerald-700"
        />
        <SkillBadgeGroup
          title="Eksik"
          skills={application.missingSkills}
          emptyText="Eksik beceri yok."
          badgeClass="bg-red-100 text-red-700"
        />
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        {application.jobUrl ? (
          <a
            href={application.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
            İlanı Aç
          </a>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={() => onDelete(application.id)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
          Sil
        </button>
      </div>
    </div>
  )
}
