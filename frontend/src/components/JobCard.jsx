import { Link } from 'react-router-dom'
import { RiMapPinLine, RiTimeLine, RiBriefcaseLine, RiMoneyDollarCircleLine } from 'react-icons/ri'

function timeAgo(dateStr) {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  const d = Math.floor(diff / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return 'Yesterday'
  if (d < 7) return `${d}d ago`
  if (d < 30) return `${Math.floor(d / 7)}w ago`
  return `${Math.floor(d / 30)}mo ago`
}

export default function JobCard({ job }) {
  const skills = Array.isArray(job.skills)
    ? job.skills
    : typeof job.skills === 'string'
    ? job.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="card p-4 flex flex-col gap-3 hover:border-accent/40 hover:bg-bg-elevated/50 transition-all duration-150 group fade-in block"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors leading-snug truncate">
            {job.title}
          </h3>
          <p className="text-xs text-text-muted mt-0.5 truncate">{job.company}</p>
        </div>
        {job.salary && (
          <div className="flex items-center gap-1 text-xs font-mono text-success flex-shrink-0">
            <RiMoneyDollarCircleLine className="text-sm" />
            <span>{job.salary}</span>
          </div>
        )}
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
        {job.location && (
          <span className="flex items-center gap-1">
            <RiMapPinLine />
            {job.location}
          </span>
        )}
        {job.job_type && (
          <span className="flex items-center gap-1">
            <RiBriefcaseLine />
            {job.job_type}
          </span>
        )}
        {job.posted_at && (
          <span className="flex items-center gap-1 ml-auto">
            <RiTimeLine />
            {timeAgo(job.posted_at)}
          </span>
        )}
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 5).map((s) => (
            <span key={s} className="tag-muted">{s}</span>
          ))}
          {skills.length > 5 && (
            <span className="tag-muted text-text-dim">+{skills.length - 5}</span>
          )}
        </div>
      )}
    </Link>
  )
}
