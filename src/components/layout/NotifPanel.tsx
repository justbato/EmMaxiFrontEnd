import { useState } from 'react'
import { useNotif, type Notification } from '../../context/NotifContext'

const typeColors: Record<string, string> = {
  account: '#D97706',
  report: '#EC4899',
  update: '#6366F1',
  general: '#D4A017',
}

function NotifItem({ notif }: { notif: Notification }) {
  const borderColor = notif.color || typeColors[notif.type] || '#D4A017'
  return (
    <div className="rounded-[14px] p-3 border border-[var(--border)] bg-[var(--surface)] relative transition-shadow animate-[pageSlideIn_.3s_both] border-l-[3px]"
      style={{ borderLeftColor: borderColor }}>
      <div className="flex items-start gap-2.5">
        {notif.icon && <span className="text-[18px] flex-shrink-0">{notif.icon}</span>}
        <div className="flex-1">
          <div className="text-[12px] font-[700] text-[var(--text-primary)] mb-1">{notif.title}</div>
          <div className="text-[11px] text-[var(--text-secondary)] leading-[1.6]">{notif.body}</div>
          <div className="text-[10px] text-[var(--text-tertiary)] mt-1.5">📅 {notif.date}</div>
        </div>
        {!notif.read && <div className="w-[7px] h-[7px] rounded-full bg-[#D4A017] flex-shrink-0 mt-1" />}
      </div>
    </div>
  )
}

export function NotifPanel() {
  const { notifications, panelOpen, closePanel, markAllRead, unreadCount } = useNotif()
  const [activeTab, setActiveTab] = useState<'all' | 'account' | 'reports' | 'updates'>('all')

  const filtered = notifications.filter(n => {
    if (activeTab === 'all') return true
    if (activeTab === 'account') return n.type === 'account'
    if (activeTab === 'reports') return n.type === 'report'
    if (activeTab === 'updates') return n.type === 'update'
    return true
  })

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[9400] bg-[rgba(0,0,0,.35)] backdrop-blur-[2px] transition-opacity duration-300 ${panelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closePanel}
      />
      {/* Panel */}
      <div
        id="notif-panel"
        className={`fixed top-0 right-0 w-[460px] max-w-[100vw] h-full bg-[var(--bg)] z-[9500] shadow-[-8px_0_40px_rgba(0,0,0,.18)] flex flex-col transition-transform duration-[350ms] cubic-bezier(.22,1,.36,1) ${panelOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="px-5 pt-[18px] border-b border-[var(--border)] flex-shrink-0">
          <div className="flex items-center justify-between mb-0">
            <div>
              <div className="text-[15px] font-[700] text-[var(--text-primary)] flex items-center gap-2">
                🔔 Notifications
                {unreadCount > 0 && <span className="bg-[#EF4444] text-white text-[10px] font-[700] px-[7px] py-[2px] rounded-full min-w-[18px] text-center">{unreadCount}</span>}
              </div>
              <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">Your activity and messages</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={markAllRead} className="text-[11px] text-[#D4A017] font-[600] bg-none border-none cursor-pointer">Mark all read</button>
              <button onClick={closePanel} className="text-[20px] text-[var(--text-tertiary)] leading-none px-1.5 py-0.5 hover:text-[var(--text-primary)] transition-colors">✕</button>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex mt-3.5">
            {(['all', 'account', 'reports', 'updates'] as const).map(tab => {
              const labels = { all: 'All', account: 'Account', reports: 'My Reports', updates: 'Updates' }
              const counts = {
                all: notifications.filter(n => !n.read).length,
                account: notifications.filter(n => n.type === 'account' && !n.read).length,
                reports: notifications.filter(n => n.type === 'report' && !n.read).length,
                updates: 0,
              }
              const count = counts[tab]
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-[9px] text-[12px] font-[600] border-none bg-none cursor-pointer border-b-[2.5px] transition-all ${activeTab === tab ? 'text-[#D4A017] border-b-[#D4A017]' : 'text-[var(--text-tertiary)] border-b-transparent'}`}>
                  {labels[tab]}
                  {count > 0 && <span className="bg-[#EF4444] text-white text-[9px] font-[700] px-[5px] py-[1px] rounded-full ml-[5px] inline-block min-w-[16px] text-center">{count}</span>}
                </button>
              )
            })}
          </div>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[var(--text-tertiary)]">
              <div className="text-[36px] mb-3">🔔</div>
              <strong className="block text-[13px] text-[var(--text-secondary)]">You're all caught up</strong>
              <p className="text-[12px] mt-1">Nothing here yet.</p>
            </div>
          ) : (
            filtered.map(n => <NotifItem key={n.id} notif={n} />)
          )}
        </div>
      </div>
    </>
  )
}
