import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  RiArrowLeftLine, RiMapPinLine, RiBriefcaseLine,
  RiMoneyDollarCircleLine, RiTimeLine, RiExternalLinkLine,
  RiBuilding2Line,
} from 'react-icons/ri'
import { getJobs } from '../services/api'

function timeAgo(dateStr) {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  const d = Math.floor(diff / 86400000)
  if (d === 0) return 'Posted today'
  if (d === 1) return 'Posted yesterday'
  if (d < 7) return `Posted ${d} days ago`
  return `Posted ${Math.floor(d / 7)} weeks ago`
}

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch by searching for this specific id — adapt if backend adds /jobs/:id
    getJobs({ limit: 100 })
  .then((res) => {
    const list = res?.results || []
    const found = list.find(j => String(j.id) === String(id))

    setJob(found || null)
  })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const skills = Array.isArray(job?.skills)
    ? job.skills
    : typeof job?.skills === 'string'
    ? job.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card p-5 h-16 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!job) {
    return (
      <div className="max-w-2xl mx-auto card p-12 text-center">
        <p className="text-text-muted text-sm">Job not found</p>
        <button onClick={() => navigate('/jobs')} className="btn-ghost text-xs mt-3">
          Back to Jobs
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 fade-in">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 btn-ghost text-xs -ml-1"
      >
        <RiArrowLeftLine /> Back
      </button>

      {/* Header */}
      <div className="card p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-text-primary leading-snug">{job.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <RiBuilding2Line className="text-text-muted text-sm" />
              <span className="text-sm text-text-muted">{job.company}</span>
            </div>
          </div>
          {job.job_url && (
            <a
              href={job.job_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-1.5 flex-shrink-0 text-xs"
            >
              Apply <RiExternalLinkLine />
            </a>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-xs text-text-muted border-t border-bg-border pt-4">
          {job.location && (
            <span className="flex items-center gap-1.5">
              <RiMapPinLine className="text-accent" />
              {job.location}
            </span>
          )}
          {job.job_type && (
            <span className="flex items-center gap-1.5">
              <RiBriefcaseLine className="text-accent" />
              {job.job_type}
            </span>
          )}
          {job.salary && (
            <span className="flex items-center gap-1.5 text-success font-mono">
              <RiMoneyDollarCircleLine />
              {job.salary}
            </span>
          )}
          {job.published_date && (
            <span className="flex items-center gap-1.5 ml-auto">
              <RiTimeLine />
              {timeAgo(job.published_date)}
            </span>
          )}
        </div>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="card p-5">
          <h2 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="tag-accent">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Category */}
      {job.category && (
        <div className="card p-5">
          <h2 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">Category</h2>
          <span className="tag-muted">{job.category}</span>
        </div>
      )}

      {/* Description */}
      {job.description && (
        <div className="card p-5">
          <h2 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">Description</h2>
          <div className="text-sm text-text-muted leading-relaxed whitespace-pre-line">
            {job.description}
          </div>
        </div>
      )}

      {/* Raw data (dev aid) */}
      {import.meta.env.DEV && (
        <details className="card p-4 text-xs font-mono text-text-dim">
          <summary className="cursor-pointer text-text-muted">raw data</summary>
          <pre className="mt-2 overflow-auto">{JSON.stringify(job, null, 2)}</pre>
        </details>
      )}
    </div>
  )
}
