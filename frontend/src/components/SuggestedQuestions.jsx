const SUGGESTIONS = [
  { label: 'Top skills in demand right now', icon: '📊' },
  { label: 'Show me recent remote jobs', icon: '🌍' },
  { label: 'Which companies are hiring the most?', icon: '🏢' },
  { label: 'Find Python jobs with good salary', icon: '🐍' },
  { label: 'What categories have the most openings?', icon: '📁' },
  { label: 'Show me an overview of the job market', icon: '📈' },
]

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="flex flex-col items-center gap-6 py-8 fade-in">
      {/* Hero */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-accent-soft border border-accent/20 flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">⚡</span>
        </div>
        <h2 className="text-base font-semibold text-text-primary">Ask anything about the job market</h2>
        <p className="text-xs text-text-muted font-mono max-w-xs">
          Powered by an AI agent with live access to jobs, analytics, and company data
        </p>
      </div>

      {/* Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onSelect(s.label)}
            className="flex items-center gap-2.5 text-left px-3.5 py-2.5 rounded-xl
              bg-bg-card border border-bg-border text-sm text-text-muted
              hover:border-accent/40 hover:text-text-primary hover:bg-bg-elevated
              transition-all duration-150 group"
          >
            <span className="text-base flex-shrink-0">{s.icon}</span>
            <span className="text-xs leading-snug">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
