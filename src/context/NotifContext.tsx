import { createContext, useContext, useState, type ReactNode } from 'react'

export interface Notification {
  id: string
  type: 'account' | 'report' | 'update' | 'general'
  title: string
  body: string
  date: string
  read: boolean
  color?: string
  icon?: string
}

interface NotifContextType {
  notifications: Notification[]
  unreadCount: number
  panelOpen: boolean
  openPanel: () => void
  closePanel: () => void
  markAllRead: () => void
  addNotification: (n: Omit<Notification, 'id' | 'read'>) => void
}

const NotifContext = createContext<NotifContextType | null>(null)

const INITIAL: Notification[] = [
  { id: '1', type: 'update', title: 'Platform update — June 2026', body: 'New features: Course Bundles, Live Sessions, and improved certificate sharing are now available.', date: 'Jun 1, 2026', read: false, icon: '📢', color: '#6366F1' },
  { id: '2', type: 'update', title: 'Revenue split updated', body: 'The instructor revenue share has been updated to 80/20. All new sales from June 2026 onward will use the new rate.', date: 'May 28, 2026', read: true, icon: '💰', color: '#6366F1' },
]

export function NotifProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL)
  const [panelOpen, setPanelOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const openPanel = () => setPanelOpen(true)
  const closePanel = () => setPanelOpen(false)
  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, read: true })))
  const addNotification = (n: Omit<Notification, 'id' | 'read'>) => {
    setNotifications(prev => [{ ...n, id: Date.now().toString(), read: false }, ...prev])
  }

  return (
    <NotifContext.Provider value={{ notifications, unreadCount, panelOpen, openPanel, closePanel, markAllRead, addNotification }}>
      {children}
    </NotifContext.Provider>
  )
}

export function useNotif() {
  const ctx = useContext(NotifContext)
  if (!ctx) throw new Error('useNotif must be used within NotifProvider')
  return ctx
}
