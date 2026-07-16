import { useEffect, useState, useCallback } from 'react'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import JobCard from '../components/JobCard'
import { getJobs } from '../services/api'

const LIMIT = 20

const DEFAULT_FILTERS = {
  job_type: '',
  location: '',
  company: '',
  skill: '',
  sort: 'newest',
}

export default function Jobs() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [page, setPage] = useState(1)
  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const totalPages = Math.ceil(total / LIMIT)

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, limit: LIMIT, search: search || undefined }
      Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v })
      const res = await getJobs(params)
      setJobs(res?.results || [])
      setTotal(res?.total || 0)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [search, filters, page])

  useEffect(() => {
    const t = setTimeout(fetchJobs, 300)
    return () => clearTimeout(t)
  }, [fetchJobs])

  const handleFilterChange = (key, val) => {
    setFilters((f) => ({ ...f, [key]: val }))
    setPage(1)
  }

  const handleSearch = (val) => {
    setSearch(val)
    setPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="card p-4 space-y-3">
        <SearchBar value={search} onChange={handleSearch} placeholder="Search by title, company, or skill…" />
        <FilterPanel filters={filters} onChange={handleFilterChange} onReset={() => { setFilters(DEFAULT_FILTERS); setPage(1) }} />
      </div>

      {/* Count */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-text-muted">
          {loading ? 'searching…' : `${total.toLocaleString()} results`}
        </p>
        {totalPages > 1 && (
          <p className="text-xs font-mono text-text-muted">
            page {page} / {totalPages}
          </p>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="card p-4 h-32 animate-pulse">
              <div className="h-3 bg-bg-elevated rounded w-2/3 mb-2" />
              <div className="h-2 bg-bg-elevated rounded w-1/3 mb-4" />
              <div className="h-2 bg-bg-elevated rounded w-full" />
            </div>
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-text-muted text-sm">No jobs found</p>
          <p className="text-text-dim text-xs mt-1 font-mono">try adjusting your filters</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 btn-ghost text-xs disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <RiArrowLeftLine /> Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(7, totalPages) }).map((_, i) => {
              const p = i + 1
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded text-xs font-mono transition-colors
                    ${page === p ? 'bg-accent text-white' : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'}`}
                >
                  {p}
                </button>
              )
            })}
            {totalPages > 7 && <span className="text-text-dim text-xs font-mono">…</span>}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 btn-ghost text-xs disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next <RiArrowRightLine />
          </button>
        </div>
      )}
    </div>
  )
}
