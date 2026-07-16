export default function StatCard({ label, value, sub, icon: Icon, accent = false }) {
  return (
    <div className={`card stat-border-glow p-5 fade-in relative overflow-hidden`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest mb-2">{label}</p>
          <p className="text-2xl font-bold text-text-primary tracking-tight">
            {value ?? <span className="text-text-dim">—</span>}
          </p>
          {sub && <p className="text-xs text-text-muted mt-1">{sub}</p>}
        </div>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
            ${accent ? 'bg-accent-soft text-accent' : 'bg-bg-elevated text-text-muted'}`}>
            <Icon className="text-lg" />
          </div>
        )}
      </div>
      {/* subtle bg glow */}
      {accent && (
        <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-accent opacity-5 pointer-events-none" />
      )}
    </div>
  )
}
