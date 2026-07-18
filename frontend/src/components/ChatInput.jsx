import { useRef, useEffect } from 'react'
import { RiSendPlaneFill, RiStopCircleLine } from 'react-icons/ri'

export default function ChatInput({ value, onChange, onSend, onStop, loading, disabled }) {
  const ref = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 140) + 'px'
  }, [value])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!loading && value.trim()) onSend()
    }
  }

  return (
    <div className="relative">
      <div className={`flex items-end gap-2 bg-bg-elevated border rounded-xl px-3 py-2.5 transition-all duration-150
        ${disabled ? 'opacity-50' : 'border-bg-border focus-within:border-accent focus-within:shadow-[0_0_0_1px_#6366F120]'}`}>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder="Ask about jobs, skills, companies…"
          rows={1}
          className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted
            outline-none resize-none leading-relaxed py-0.5"
          style={{ maxHeight: '140px' }}
        />

        {loading ? (
          <button
            onClick={onStop}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-danger/10 text-danger
              hover:bg-danger/20 transition-colors flex-shrink-0"
            title="Stop"
          >
            <RiStopCircleLine className="text-base" />
          </button>
        ) : (
          <button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="w-8 h-8 flex items-center justify-center rounded-lg
              bg-accent text-white hover:bg-accent-hover transition-colors flex-shrink-0
              disabled:opacity-30 disabled:cursor-not-allowed"
            title="Send (Enter)"
          >
            <RiSendPlaneFill className="text-sm" />
          </button>
        )}
      </div>

      <p className="text-[10px] text-text-dim font-mono mt-1.5 text-center">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  )
}
