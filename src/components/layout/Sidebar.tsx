import { type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNotif } from '../../context/NotifContext'

interface NavItem {
  icon: ReactNode
  label: string
  path: string
  badge?: number
}

interface SidebarProps {
  items: NavItem[]
  mobileOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ items, mobileOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth()
  const { unreadCount, openPanel } = useNotif()
  const navigate = useNavigate()
  const location = useLocation()

  const roleBadgeClass: Record<string, string> = {
    student: 'bg-[rgba(212,160,23,.2)] text-[#D4A017]',
    instructor: 'bg-[rgba(16,185,129,.15)] text-[#10B981]',
    admin: 'bg-[rgba(212,160,23,.2)] text-[#D4A017]',
    super_admin: 'bg-[rgba(212,160,23,.2)] text-[#D4A017]',
    moderator: 'bg-[rgba(212,160,23,.2)] text-[#D4A017]',
  }
  const badgeClass = roleBadgeClass[user?.role || 'student'] || roleBadgeClass['student']

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && <div className="sidebar-overlay fixed inset-0 bg-[rgba(0,0,0,.5)] z-[199] md:hidden" onClick={onClose} />}

      <aside className={`fixed md:sticky top-0 left-0 h-screen w-[230px] min-w-[230px] bg-[#111111] flex flex-col z-[200] transition-transform duration-300 shadow-[2px_0_16px_rgba(0,0,0,.25)] overflow-y-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo */}
        <div className="px-5 pb-5 pt-5 border-b border-[rgba(255,255,255,.08)] mb-3 flex-shrink-0">
          <div className="text-[20px] font-[700] text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Em<span className="text-[#D4A017]">Maxi</span>
          </div>
          <div className={`text-[10px] px-[10px] py-[3px] rounded-full font-[600] mt-1.5 inline-block capitalize ${badgeClass}`}>
            {user?.role?.replace('_', ' ')}
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3">
          {items.map(item => {
            const active = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
            return (
              <div key={item.path} onClick={() => { navigate(item.path); onClose?.() }}
                className={`sidebar-item flex items-center gap-2.5 px-3 py-[9px] rounded-[8px] cursor-pointer text-[13px] mb-0.5 ${active ? 'text-[#D4A017] bg-[rgba(212,160,23,.12)] font-[500]' : 'text-[rgba(255,255,255,.5)]'}`}>
                <span className="w-[15px] h-[15px] flex-shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-[#EF4444] text-white text-[10px] px-1.5 py-[1px] rounded-full">{item.badge}</span>
                )}
              </div>
            )
          })}

          {/* Notifications button */}
          <div onClick={openPanel}
            className="sidebar-item flex items-center gap-2.5 px-3 py-[9px] rounded-[8px] cursor-pointer text-[13px] mb-0.5 text-[rgba(255,255,255,.5)]">
            <span className="w-[15px] h-[15px] flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            </span>
            <span className="flex-1">Notifications</span>
            {unreadCount > 0 && <span className="bg-[#EF4444] text-white text-[10px] px-1.5 py-[1px] rounded-full">{unreadCount}</span>}
          </div>
        </nav>

        {/* User + logout */}
        <div className="p-3 mt-auto border-t border-[rgba(255,255,255,.08)]">
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#D4A017] flex items-center justify-center text-[#111] font-[700] text-[12px] flex-shrink-0">
              {user?.full_name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-[600] text-white truncate">{user?.full_name}</div>
              <div className="text-[10px] text-[rgba(255,255,255,.4)] truncate">@{user?.username}</div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-[8px] text-[12px] text-[rgba(255,255,255,.4)] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,.08)] transition-all">
            <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Log out
          </button>
        </div>
      </aside>
    </>
  )
}
