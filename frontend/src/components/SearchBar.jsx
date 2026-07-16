import { useState, useRef } from 'react'
import { RiSearchLine } from 'react-icons/ri'

export default function SearchBar({ value, onChange, placeholder = 'Search jobs…' }) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  return (
    <div
      className={`flex items-center gap-2.5 bg-bg-elevated border rounded-lg px-3 py-2.5 transition-all duration-150 cursor-text
        ${focused ? 'border-accent shadow-[0_0_0_1px_#6366F120]' : 'border-bg-border'}`}
      onClick={() => inputRef.current?.focus()}
    >
      <RiSearchLine className={`text-base flex-shrink-0 transition-colors ${focused ? 'text-accent' : 'text-text-muted'}`} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="bg-transparent text-sm text-text-primary placeholder-text-muted outline-none flex-1"
      />
      {focused && (
        <span className="text-accent font-mono text-sm animate-blink select-none">|</span>
      )}
    </div>
  )
}
