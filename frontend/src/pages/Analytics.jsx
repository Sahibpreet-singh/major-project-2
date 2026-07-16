import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid
} from 'recharts'
import {
  getTopSkills, getTopCompanies, getTopCategories,
  getTopLocations, getJobTypes, getSalaryOverview
} from '../services/api'

const COLORS = ['#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF', '#4F46E5', '#3730A3', '#312E81']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-bg-elevated border border-bg-border rounded-lg px-3 py-2 text-xs shadow-lg">
        <p className="text-text-muted mb-0.5">{label}</p>
        <p className="text-text-primary font-mono font-semibold">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

function ChartCard({ title, sub, children, loading }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
        {sub && <span className="text-xs font-mono text-text-muted">{sub}</span>}
      </div>
      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <span className="text-xs font-mono text-text-muted animate-pulse">loading…</span>
        </div>
      ) : children}
    </div>
  )
}

export default function Analytics() {
  const [skills, setSkills] = useState([])
  const [companies, setCompanies] = useState([])
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])
  const [jobTypes, setJobTypes] = useState([])
  const [salary, setSalary] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getTopSkills(),
      getTopCompanies(),
      getTopCategories(),
      getTopLocations(),
      getJobTypes(),
      getSalaryOverview(),
    ]).then(([sk, co, cat, loc, jt, sal]) => {
      const norm = (d) => d?.data || d || []
      setSkills(norm(sk).slice(0, 12))
      setCompanies(norm(co).slice(0, 10))
      setCategories(norm(cat).slice(0, 8))
      setLocations(norm(loc).slice(0, 10))
      setJobTypes(norm(jt))
      setSalary(norm(sal))
    }).catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Top Skills */}
        <ChartCard title="Top Skills" sub="by frequency" loading={loading}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={skills} layout="vertical" margin={{ left: 8, right: 16 }}>
              <XAxis type="number" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A1A26' }} />
              <Bar dataKey="count" radius={[0, 3, 3, 0]}>
                {skills.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Job Types */}
        <ChartCard title="Job Types" sub="distribution" loading={loading}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={jobTypes}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
                innerRadius={55}
                paddingAngle={3}
              >
                {jobTypes.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => <span className="text-xs text-text-muted">{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Locations */}
        <ChartCard title="Top Locations" sub="by job count" loading={loading}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={locations} margin={{ left: 0, right: 12 }}>
              <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A1A26' }} />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {locations.map((_, i) => <Cell key={i} fill={i === 0 ? '#6366F1' : '#1E1E2E'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Categories */}
        <ChartCard title="Job Categories" sub="top sectors" loading={loading}>
          <div className="space-y-2.5">
            {categories.map((c, i) => {
              const max = categories[0]?.count || 1
              const pct = Math.round((c.count / max) * 100)
              return (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-text-dim w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-primary truncate">{c.name}</span>
                      <span className="text-xs font-mono text-text-muted ml-2 flex-shrink-0">{c.count}</span>
                    </div>
                    <div className="h-1 bg-bg-elevated rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ChartCard>

        {/* Salary Overview */}
        {salary.length > 0 && (
          <ChartCard title="Salary Overview" sub="avg by category" loading={loading}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={salary} margin={{ left: 0, right: 12 }}>
                <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" vertical={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A1A26' }} />
                <Bar dataKey="avg_salary" radius={[3, 3, 0, 0]} fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {/* Top Companies */}
        <ChartCard title="Top Companies" sub="most listings" loading={loading}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={companies} layout="vertical" margin={{ left: 8, right: 16 }}>
              <XAxis type="number" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1A1A26' }} />
              <Bar dataKey="count" radius={[0, 3, 3, 0]}>
                {companies.map((_, i) => <Cell key={i} fill={i < 3 ? '#6366F1' : '#1E1E2E'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  )
}
