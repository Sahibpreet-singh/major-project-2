import { useLocation } from 'react-router-dom'
import { RiRefreshLine } from 'react-icons/ri'
import { saveJobs } from '../services/api'
import { useState } from 'react'

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/jobs': 'Jobs',
  '/analytics': 'Analytics',
}

export default function Navbar() {
  const { pathname } = useLocation()
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState(null)

  const title = PAGE_TITLES[pathname] || 'JobPulse'

  const handleSync = async () => {
    setSyncing(true)
    setSyncMsg(null)
    try {
      const res = await saveJobs()
      setSyncMsg(`Synced ${res.count} jobs`)
    } catch {
      setSyncMsg('Sync failed')
    } finally {
      setSyncing(false)
      setTimeout(() => setSyncMsg(null), 3000)
    }
  }

  return (
    <header className="fixed top-0 left-56 right-0 h-14 bg-bg-base/90 backdrop-blur border-b border-bg-border flex items-center justify-between px-6 z-30">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-text-primary">{title}</h1>
        <span className="text-text-dim font-mono text-xs hidden sm:inline">
          {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {syncMsg && (
          <span className="text-xs font-mono text-success fade-in">{syncMsg}</span>
        )}
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 btn-ghost text-xs"
          title="Fetch & sync latest jobs"
        >
          <RiRefreshLine className={`text-base ${syncing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{syncing ? 'Syncing…' : 'Sync Jobs'}</span>
        </button>
      </div>
    </header>
  )
}
