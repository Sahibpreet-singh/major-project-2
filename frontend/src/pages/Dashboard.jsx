import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  RiBriefcaseLine,
  RiBuilding2Line,
  RiMapPinLine,
  RiCodeLine,
  RiArrowRightLine,
} from 'react-icons/ri'
import StatCard from '../components/StatCard'
import JobCard from '../components/JobCard'
import { getOverview, getTopSkills, getTopCompanies, getJobs } from '../services/api'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const ACCENT = '#6366F1'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-bg-elevated border border-bg-border rounded-lg px-3 py-2 text-xs">
        <p className="text-text-muted">{label}</p>
        <p className="text-text-primary font-mono font-semibold">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [overview, setOverview] = useState(null)
  const [skills, setSkills] = useState([])
  const [companies, setCompanies] = useState([])
  const [recentJobs, setRecentJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getOverview(),
      getTopSkills(),
      getTopCompanies(),
      getJobs({ limit: 6, sort: 'newest' }),
    ]).then(([ov, sk, co, jobs]) => {
      setOverview(ov)
      setSkills((sk?.data || sk || []).slice(0, 8))
      setCompanies((co?.data || co || []).slice(0, 6))
      setRecentJobs(jobs?.jobs || jobs?.data || jobs || [])
    }).catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Jobs"
          value={overview?.total_jobs?.toLocaleString()}
          sub="in database"
          icon={RiBriefcaseLine}
          accent
        />
        <StatCard
          label="Companies"
          value={overview?.total_companies?.toLocaleString()}
          sub="unique employers"
          icon={RiBuilding2Line}
        />
        <StatCard
          label="Locations"
          value={overview?.total_locations?.toLocaleString()}
          sub="cities & remote"
          icon={RiMapPinLine}
        />
        <StatCard
          label="Skills Tracked"
          value={overview?.total_skills?.toLocaleString()}
          sub="across all listings"
          icon={RiCodeLine}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Skills */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">Top Skills</h2>
            <span className="text-xs font-mono text-text-muted">demand</span>
          </div>
          {skills.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={skills} layout="vertical" margin={{ left: 10, right: 16 }}>
                <XAxis type="number" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A1A26' }} />
                <Bar dataKey="count" radius={[0, 3, 3, 0]}>
                  {skills.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? ACCENT : '#1E1E2E'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-text-muted text-xs font-mono">
              {loading ? 'loading…' : 'no data'}
            </div>
          )}
        </div>

        {/* Top Companies */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">Top Companies</h2>
            <span className="text-xs font-mono text-text-muted">by listings</span>
          </div>
          <div className="space-y-2.5">
            {companies.length > 0 ? companies.map((c, i) => {
              const max = companies[0]?.count || 1
              const pct = Math.round((c.count / max) * 100)
              return (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-text-dim w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-primary truncate">{c.name}</span>
                      <span className="text-xs font-mono text-text-muted flex-shrink-0 ml-2">{c.count}</span>
                    </div>
                    <div className="h-1 bg-bg-elevated rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: i === 0 ? ACCENT : '#1E1E2E' }}
                      />
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className="h-[180px] flex items-center justify-center text-text-muted text-xs font-mono">
                {loading ? 'loading…' : 'no data'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-text-primary">Recent Jobs</h2>
          <Link to="/jobs" className="flex items-center gap-1 text-xs text-accent hover:text-accent-hover transition-colors">
            View all <RiArrowRightLine />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentJobs.length > 0
            ? recentJobs.map((job) => <JobCard key={job.id} job={job} />)
            : Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card p-4 h-28 animate-pulse">
                  <div className="h-3 bg-bg-elevated rounded w-2/3 mb-2" />
                  <div className="h-2 bg-bg-elevated rounded w-1/3" />
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}
