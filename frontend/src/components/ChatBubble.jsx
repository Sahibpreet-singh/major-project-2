import { RiRobot2Line, RiUser3Line } from 'react-icons/ri'

// Very lightweight markdown renderer — bold, inline code, code blocks, line breaks
function renderContent(text) {
  if (!text) return null

  // Split on code blocks first
  const codeBlockRe = /```[\s\S]*?```/g
  const parts = []
  let last = 0
  let match

  while ((match = codeBlockRe.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ type: 'text', content: text.slice(last, match.index) })
    }
    const inner = match[0].replace(/^```\w*\n?/, '').replace(/```$/, '')
    parts.push({ type: 'code', content: inner })
    last = match.index + match[0].length
  }
  if (last < text.length) {
    parts.push({ type: 'text', content: text.slice(last) })
  }

  return parts.map((part, i) => {
    if (part.type === 'code') {
      return (
        <pre key={i} className="bg-bg-base border border-bg-border rounded-lg px-3 py-2.5 text-xs font-mono text-accent overflow-x-auto mt-2 mb-1">
          {part.content.trim()}
        </pre>
      )
    }

    // Inline formatting inside text parts
    const lines = part.content.split('\n')
    return (
      <span key={i}>
        {lines.map((line, li) => {
          // Bold: **text**
          const segments = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
          const formatted = segments.map((seg, si) => {
            if (seg.startsWith('**') && seg.endsWith('**')) {
              return <strong key={si} className="font-semibold text-text-primary">{seg.slice(2, -2)}</strong>
            }
            if (seg.startsWith('`') && seg.endsWith('`')) {
              return <code key={si} className="font-mono text-xs bg-bg-base border border-bg-border rounded px-1 py-0.5 text-accent">{seg.slice(1, -1)}</code>
            }
            return seg
          })
          return (
            <span key={li}>
              {formatted}
              {li < lines.length - 1 && <br />}
            </span>
          )
        })}
      </span>
    )
  })
}

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user'
  const isError = message.role === 'error'

  return (
    <div className={`flex gap-3 fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
        ${isUser
          ? 'bg-accent text-white'
          : isError
          ? 'bg-danger/20 text-danger'
          : 'bg-bg-elevated border border-bg-border text-accent'
        }`}>
        {isUser
          ? <RiUser3Line className="text-sm" />
          : <RiRobot2Line className="text-sm" />
        }
      </div>

      {/* Bubble */}
      <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed
        ${isUser
          ? 'bg-accent text-white rounded-tr-sm'
          : isError
          ? 'bg-danger/10 border border-danger/20 text-danger rounded-tl-sm'
          : 'bg-bg-card border border-bg-border text-text-primary rounded-tl-sm'
        }`}>
        {isUser
          ? <span>{message.content}</span>
          : <span className="text-text-muted leading-relaxed">{renderContent(message.content)}</span>
        }

        {/* Timestamp */}
        {message.timestamp && (
          <p className={`text-[10px] mt-1.5 font-mono
            ${isUser ? 'text-white/50 text-right' : 'text-text-dim'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  )
}
