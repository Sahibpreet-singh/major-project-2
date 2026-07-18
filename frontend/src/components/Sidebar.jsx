import { NavLink } from 'react-router-dom'
import {
  RiDashboardLine,
  RiBriefcaseLine,
  RiBarChartBoxLine,
  RiFlashlightLine,
  RiRobot2Line,
} from 'react-icons/ri'

const navItems = [
  { to: '/', icon: RiDashboardLine, label: 'Dashboard' },
  { to: '/jobs', icon: RiBriefcaseLine, label: 'Jobs' },
  { to: '/analytics', icon: RiBarChartBoxLine, label: 'Analytics' },
  { to: '/chat', icon: RiRobot2Line, label: 'AI Assistant' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-bg-card border-r border-bg-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-bg-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <RiFlashlightLine className="text-white text-sm" />
          </div>
          <span className="font-semibold text-text-primary tracking-tight">JobPulse</span>
        </div>
        <p className="text-xs text-text-muted mt-1 font-mono">job intelligence</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
              ${isActive
                ? 'bg-accent-soft text-accent border border-accent/20'
                : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
              }`
            }
          >
            <Icon className="text-base flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-bg-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-text-muted font-mono">api connected</span>
        </div>
      </div>
    </aside>
  )
}
