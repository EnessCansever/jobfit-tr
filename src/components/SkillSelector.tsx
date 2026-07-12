import { Check } from 'lucide-react'
import { SKILLS } from '../data/skills'

interface SkillSelectorProps {
  selectedSkills: string[]
  onChange: (skills: string[]) => void
}

export default function SkillSelector({
  selectedSkills,
  onChange,
}: SkillSelectorProps) {
  function toggleSkill(skill: string) {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter((item) => item !== skill))
    } else {
      onChange([...selectedSkills, skill])
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Beceri Profilin
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Bildiğin teknolojileri seç. Bu beceriler iş ilanı uygunluk
            skorunu hesaplamak için kullanılacak.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => {
            const isSelected = selectedSkills.includes(skill)
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                {skill}
              </button>
            )
          })}
        </div>

        <div className="mt-6 border-t border-slate-100 pt-6">
          <h3 className="text-sm font-semibold text-slate-900">
            Seçilen beceriler
          </h3>
          {selectedSkills.length === 0 ? (
            <p className="mt-2 text-sm text-slate-400">
              Henüz beceri seçmedin.
            </p>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
