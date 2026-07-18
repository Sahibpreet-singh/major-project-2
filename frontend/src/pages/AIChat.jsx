import { useState, useRef, useEffect, useCallback } from 'react'
import { RiDeleteBinLine, RiDownloadLine } from 'react-icons/ri'
import ChatBubble from '../components/ChatBubble'
import ChatInput from '../components/ChatInput'
import TypingIndicator from '../components/TypingIndicator'
import SuggestedQuestions from '../components/SuggestedQuestions'
import { chat } from '../services/api'

const STORAGE_KEY = 'jobpulse_chat_history'

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveHistory(msgs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-60)))
  } catch {}
}

export default function AIChat() {
  const [messages, setMessages] = useState(loadHistory)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const abortRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    saveHistory(messages)
  }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const addMessage = (role, content) => {
    const msg = { id: Date.now() + Math.random(), role, content, timestamp: new Date().toISOString() }
    setMessages((prev) => [...prev, msg])
    return msg
  }

  const send = useCallback(async (text) => {
    const userText = (text ?? input).trim()
    if (!userText || loading) return

    setInput('')
    addMessage('user', userText)
    setLoading(true)

    // Abort controller for stop button
    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await chat(userText, controller.signal)
      addMessage('assistant', res.answer || 'No response received.')
    } catch (err) {
  console.error("CHAT ERROR:", err)

  if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') {
    addMessage('assistant', '_(Response stopped)_')
  } else {
    addMessage(
      'error',
      JSON.stringify(err, null, 2)
    )
  }
} finally {
      setLoading(false)
      abortRef.current = null
    }
  }, [input, loading])

  const handleStop = () => {
    abortRef.current?.abort()
  }

  const handleClear = () => {
    if (messages.length === 0) return
    if (confirm('Clear chat history?')) {
      setMessages([])
    }
  }

  const handleExport = () => {
    const text = messages
      .map((m) => `[${m.role.toUpperCase()}] ${m.content}`)
      .join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `jobpulse-chat-${Date.now()}.txt`
    a.click()
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem-3rem)] max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-sm font-semibold text-text-primary">AI Assistant</h1>
          <p className="text-xs text-text-muted font-mono">
            {messages.length > 0 ? `${messages.length} messages` : 'Start a conversation'}
          </p>
        </div>
        {messages.length > 0 && (
          <div className="flex items-center gap-1">
            <button onClick={handleExport} className="btn-ghost text-xs flex items-center gap-1.5" title="Export chat">
              <RiDownloadLine className="text-base" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button onClick={handleClear} className="btn-ghost text-xs flex items-center gap-1.5 text-danger hover:text-red-400" title="Clear history">
              <RiDeleteBinLine className="text-base" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {isEmpty ? (
          <SuggestedQuestions onSelect={(q) => send(q)} />
        ) : (
          <>
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </>
        )}
        {!isEmpty && <div ref={bottomRef} />}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 pt-3 border-t border-bg-border">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => send()}
          onStop={handleStop}
          loading={loading}
        />
      </div>
    </div>
  )
}
