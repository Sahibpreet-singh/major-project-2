import { RiRobot2Line } from 'react-icons/ri'

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 fade-in">
      <div className="w-7 h-7 rounded-lg bg-bg-elevated border border-bg-border text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
        <RiRobot2Line className="text-sm" />
      </div>
      <div className="bg-bg-card border border-bg-border rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-text-muted"
            style={{
              animation: 'typingDot 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        <style>{`
          @keyframes typingDot {
            0%, 60%, 100% { opacity: 0.2; transform: scale(0.8); }
            30% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  )
}
