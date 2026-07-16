import { RiFilterLine, RiCloseLine } from 'react-icons/ri'

const SELECT_CLASSES = `bg-bg-elevated border border-bg-border rounded-lg px-3 py-2 text-sm
  text-text-primary outline-none focus:border-accent transition-colors cursor-pointer appearance-none`

export default function FilterPanel({ filters, onChange, onReset }) {
  const hasActive = Object.values(filters).some(Boolean)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono mr-1">
        <RiFilterLine />
        <span>filter</span>
      </div>

      <select
        value={filters.job_type || ''}
        onChange={(e) => onChange('job_type', e.target.value)}
        className={SELECT_CLASSES}
      >
        <option value="">All types</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="remote">Remote</option>
        <option value="internship">Internship</option>
      </select>

      <input
        type="text"
        value={filters.location || ''}
        onChange={(e) => onChange('location', e.target.value)}
        placeholder="Location"
        className={`${SELECT_CLASSES} w-32`}
      />

      <input
        type="text"
        value={filters.company || ''}
        onChange={(e) => onChange('company', e.target.value)}
        placeholder="Company"
        className={`${SELECT_CLASSES} w-32`}
      />

      <input
        type="text"
        value={filters.skill || ''}
        onChange={(e) => onChange('skill', e.target.value)}
        placeholder="Skill"
        className={`${SELECT_CLASSES} w-28`}
      />

      <select
        value={filters.sort || 'newest'}
        onChange={(e) => onChange('sort', e.target.value)}
        className={SELECT_CLASSES}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="salary_high">Salary ↑</option>
        <option value="salary_low">Salary ↓</option>
      </select>

      {hasActive && (
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-danger hover:text-red-400 transition-colors font-mono"
        >
          <RiCloseLine className="text-base" />
          clear
        </button>
      )}
    </div>
  )
}
