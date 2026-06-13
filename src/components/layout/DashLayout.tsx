import { type ReactNode, useState } from 'react'
import { Sidebar } from './Sidebar'
import { NotifPanel } from './NotifPanel'
import { useNotif } from '../../context/NotifContext'

interface DashLayoutProps {
  children: ReactNode
  sidebarItems: { icon: ReactNode; label: string; path: string; badge?: number }[]
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function DashLayout({ children, sidebarItems, title, subtitle, actions }: DashLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { unreadCount, openPanel } = useNotif()

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar items={sidebarItems} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <NotifPanel />

      <div className="flex-1 flex flex-col min-w-0 md:ml-0">
        {/* Topbar */}
        <div className="bg-white border-b border-[#E8E8E8] px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-[0_1px_4px_rgba(0,0,0,.05)]">
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button className="md:hidden p-1.5 rounded-[8px] hover:bg-[#F5F5F5] transition-colors" onClick={() => setMobileOpen(true)}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div>
              <h1 className="text-[16px] font-[700]" style={{ fontFamily: 'Clash Display, sans-serif' }}>{title}</h1>
              {subtitle && <p className="text-[11px] text-[#6B6B6B]">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <button onClick={openPanel} className="relative p-2 rounded-[8px] hover:bg-[#F5F5F5] transition-colors">
              <svg className="w-5 h-5 text-[#6B6B6B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-[7px] h-[7px] rounded-full bg-[#EF4444]" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 dash-content">
          {children}
        </div>
      </div>
    </div>
  )
}
