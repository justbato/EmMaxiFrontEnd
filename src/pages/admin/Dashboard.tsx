import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { DashLayout } from '../../components/layout/DashLayout'
import { StatCard, Card, Badge, Btn, FilterPill, Toast } from '../../components/ui'
import { CoursePreviewModal } from '../../components/modals/CoursePreviewModal'

// ── NAV ────────────────────────────────────────────────────────────────────────
const NAV = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    label: 'Home', path: '/',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    label: 'Dashboard', path: '/admin',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    label: 'Analytics', path: '/admin/analytics',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    label: 'Courses', path: '/admin/courses', badge: 2,
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    label: 'Students', path: '/admin/students',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    label: 'Instructors', path: '/admin/instructors',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    label: 'Payments', path: '/admin/payments',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    label: 'Reports', path: '/admin/reports', badge: 3,
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────────
function pathToView(pathname: string): ViewType {
  if (pathname.includes('/students')) return 'students'
  if (pathname.includes('/instructors')) return 'instructors'
  if (pathname.includes('/courses')) return 'courses'
  if (pathname.includes('/payments')) return 'payments'
  if (pathname.includes('/reports')) return 'reports'
  if (pathname.includes('/admin-mgmt')) return 'admin-mgmt'
  return 'dashboard'
}

type ViewType = 'dashboard' | 'students' | 'instructors' | 'courses' | 'payments' | 'reports' | 'admin-mgmt'
type UserStatus = 'active' | 'suspended' | 'banned'

// ── Mock Data ──────────────────────────────────────────────────────────────────
const STUDENTS = [
  { id: '1', name: 'Ada Obi', username: 'ada_obi', email: 'ada@example.com', joined: 'May 12, 2026', courses: 3, spent: '₦29,500', status: 'active' as UserStatus, color: '#D4A017' },
  { id: '2', name: 'Chidi Nwosu', username: 'chidi_99', email: 'chidi@example.com', joined: 'Apr 28, 2026', courses: 5, spent: '₦54,000', status: 'active' as UserStatus, color: '#10B981' },
  { id: '3', name: 'Fatima Bello', username: 'fatima_b', email: 'fatima@example.com', joined: 'Mar 5, 2026', courses: 1, spent: '₦12,000', status: 'suspended' as UserStatus, color: '#F97316' },
  { id: '4', name: 'Tunde Adewale', username: 'tunde_a', email: 'tunde@example.com', joined: 'Jun 1, 2026', courses: 0, spent: '₦0', status: 'banned' as UserStatus, color: '#EF4444' },
]

const INSTRUCTORS_DATA = [
  { id: 'i1', name: 'Sarah Kim', email: 'sarah@example.com', courses: 2, students: 2962, revenue: '₦415K', rating: 4.75, status: 'active' as UserStatus, color: '#6366F1', pendingPayout: 72000 },
  { id: 'i2', name: 'James Okafor', email: 'james@example.com', courses: 2, students: 1204, revenue: '₦180K', rating: 4.6, status: 'active' as UserStatus, color: '#10B981', pendingPayout: 36000 },
  { id: 'i3', name: 'Kofi Asante', email: 'kofi@example.com', courses: 1, students: 530, revenue: '₦98K', rating: 4.9, status: 'suspended' as UserStatus, color: '#F97316', pendingPayout: 0 },
]

const PENDING_COURSES = [
  {
    id: 'c1', title: 'Machine Learning Basics', instructor: 'James Okafor', submitted: '2 days ago',
    emoji: '🤖', gradient: 'linear-gradient(135deg,#EDE9FE,#C4B5FD)', price: 18500,
    description: 'A comprehensive introduction to machine learning algorithms, data preprocessing, and model evaluation using Python and scikit-learn. Students will build real-world projects from regression to neural networks.',
    modules: [
      { title: 'Introduction to ML', lessons: ['What is Machine Learning?', 'Types of ML Algorithms', 'Setting Up Python Environment'] },
      { title: 'Data Preprocessing', lessons: ['Loading Datasets', 'Handling Missing Values', 'Feature Engineering', 'Normalisation Techniques'] },
      { title: 'Supervised Learning', lessons: ['Linear Regression', 'Decision Trees', 'Random Forests', 'Model Evaluation Metrics'] },
      { title: 'Neural Networks', lessons: ['Perceptron Basics', 'Backpropagation', 'Building with TensorFlow'] },
    ],
  },
  {
    id: 'c2', title: 'React Native Advanced', instructor: 'Amira Hassan', submitted: '3 days ago',
    emoji: '📱', gradient: 'linear-gradient(135deg,#FDF6DC,#F5DFA0)', price: 22000,
    description: 'Take your React Native skills to the next level. Learn advanced patterns like context, navigation, animations with Reanimated, and integrating native modules for production-ready apps.',
    modules: [
      { title: 'Advanced Navigation', lessons: ['Stack & Tab Navigators', 'Deep Linking', 'Modal Flows'] },
      { title: 'Animations', lessons: ['Reanimated 2 Basics', 'Gesture Handler', 'Complex Transitions'] },
      { title: 'Native Modules', lessons: ['Bridging iOS', 'Bridging Android', 'Turbo Modules'] },
    ],
  },
]

const ALL_COURSES = [
  ...PENDING_COURSES.map(c => ({ ...c, status: 'pending' })),
  { id: 'c3', title: 'Advanced React Patterns', instructor: 'Sarah Kim', submitted: '5 days ago', emoji: '⚛️', gradient: 'linear-gradient(135deg,#D1FAE5,#6EE7B7)', price: 15000, status: 'approved', description: '', modules: [] },
  { id: 'c4', title: 'Node.js REST APIs', instructor: 'Sarah Kim', submitted: '2 weeks ago', emoji: '🖥️', gradient: 'linear-gradient(135deg,#FEE2E2,#FCA5A5)', price: 12000, status: 'approved', description: '', modules: [] },
  { id: 'c5', title: 'UI/UX Fundamentals', instructor: 'James Okafor', submitted: '1 month ago', emoji: '🎨', gradient: 'linear-gradient(135deg,#E0E7FF,#A5B4FC)', price: 9500, status: 'rejected', description: '', modules: [] },
]

const PAYOUT_HISTORY = [
  { id: 'p1', instructor: 'Sarah Kim', amount: 72000, date: 'May 5, 2026', status: 'paid' },
  { id: 'p2', instructor: 'James Okafor', amount: 36000, date: 'May 5, 2026', status: 'paid' },
  { id: 'p3', instructor: 'Kofi Asante', amount: 19600, date: 'Apr 5, 2026', status: 'paid' },
  { id: 'p4', instructor: 'Amira Hassan', amount: 44800, date: 'Apr 5, 2026', status: 'paid' },
]

const ADMIN_USERS = [
  { id: 'a1', name: 'Super Admin', email: 'superadmin@demo.com', role: 'super_admin', joined: 'Jan 1, 2025', color: '#D4A017' },
  { id: 'a2', name: 'Admin User', email: 'admin@demo.com', role: 'admin', joined: 'Mar 15, 2025', color: '#6366F1' },
  { id: 'a3', name: 'Mod User', email: 'moderator@demo.com', role: 'moderator', joined: 'Jun 1, 2026', color: '#10B981' },
]

const REPORTS_DATA = [
  { id: '1', from: 'Ada Obi', against: 'kofi_asante', type: 'Instructor', reason: 'Inappropriate content in course materials', status: 'pending', time: '2h ago', color: '#D4A017' },
  { id: '2', from: 'Chidi Nwosu', against: 'spam_user99', type: 'Student', reason: 'Spam in Q&A section with promotional links', status: 'processing', time: '1d ago', color: '#10B981' },
  { id: '3', from: 'Lena Müller', against: 'kofi_asante', type: 'Instructor', reason: 'Misleading course description — content does not match', status: 'actioned', time: '3d ago', color: '#6366F1' },
]

// ── Component ──────────────────────────────────────────────────────────────────
export function AdminDashboard() {
  const { user } = useAuth()
  const location = useLocation()
  const [view, setView] = useState<ViewType>(() => pathToView(location.pathname))
  const [students, setStudents] = useState(STUDENTS)
  const [instructors, setInstructors] = useState(INSTRUCTORS_DATA)
  const [courses, setCourses] = useState(ALL_COURSES)
  const [adminUsers, setAdminUsers] = useState(ADMIN_USERS)
  const [reports, setReports] = useState(REPORTS_DATA)
  const [studentFilter, setStudentFilter] = useState('All')
  const [courseFilter, setCourseFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')
  const [previewCourse, setPreviewCourse] = useState<typeof PENDING_COURSES[0] | null>(null)
  const [payConfirm, setPayConfirm] = useState<typeof INSTRUCTORS_DATA[0] | null>(null)
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [newAdminRole, setNewAdminRole] = useState<'admin' | 'moderator'>('admin')
  const [dismissReport, setDismissReport] = useState<any>(null)
  const [dismissReason, setDismissReason] = useState('')
  const [actionReport, setActionReport] = useState<any>(null)
  const [actionType, setActionType] = useState('suspend')
  const [actionDuration, setActionDuration] = useState('7 days')
  const [actionFeedback, setActionFeedback] = useState('')

  const role = user?.role as string
  const isSuperAdmin = role === 'super_admin'
  const isModerator = role === 'moderator'
  const canModifyFinance = !isModerator

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  // Sync view when navigating via sidebar
  useMemo(() => { setView(pathToView(location.pathname)) }, [location.pathname])

  const updateStudentStatus = (id: string, status: UserStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s))
    const msgs: Record<UserStatus, string> = { active: 'User reinstated ✓', suspended: 'User suspended', banned: 'User banned' }
    showToast(msgs[status])
  }

  const updateInstructorStatus = (id: string, status: UserStatus) => {
    setInstructors(prev => prev.map(i => i.id === id ? { ...i, status } : i))
    showToast(status === 'active' ? 'Instructor reinstated ✓' : status === 'suspended' ? 'Instructor suspended' : 'Instructor banned')
  }

  const handleApproveCourse = (id: string) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' } : c))
    showToast('Course approved ✓')
  }

  const handleRejectCourse = (id: string, _feedback: string) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' } : c))
    showToast('Course rejected — feedback sent')
  }

  const handlePayout = (inst: typeof INSTRUCTORS_DATA[0]) => {
    setInstructors(prev => prev.map(i => i.id === inst.id ? { ...i, pendingPayout: 0 } : i))
    setPayConfirm(null)
    showToast(`₦${inst.pendingPayout.toLocaleString()} paid to ${inst.name} ✓`)
  }

  const handleBulkPayout = () => {
    setInstructors(prev => prev.map(i => ({ ...i, pendingPayout: 0 })))
    showToast('All payouts processed ✓')
  }

  const handleAddAdmin = () => {
    if (!newAdminEmail.trim()) { showToast('Enter an email address'); return }
    const newEntry = {
      id: `a${Date.now()}`, name: newAdminEmail.split('@')[0], email: newAdminEmail,
      role: newAdminRole, joined: 'Jun 13, 2026', color: '#EC4899',
    }
    setAdminUsers(prev => [...prev, newEntry])
    setNewAdminEmail('')
    showToast(`${newAdminRole === 'admin' ? 'Admin' : 'Moderator'} added ✓`)
  }

  const handleRemoveAdmin = (id: string) => {
    setAdminUsers(prev => prev.filter(a => a.id !== id))
    showToast('Admin removed')
  }

  const handlePromote = (id: string) => {
    setAdminUsers(prev => prev.map(a => a.id === id ? { ...a, role: 'super_admin' } : a))
    showToast('Promoted to Super Admin ✓')
  }

  const handleStartProcessing = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'processing' } : r))
    showToast('Report is now processing. Reporter notified ✓')
  }

  const handleDismiss = () => {
    setReports(prev => prev.map(r => r.id === dismissReport.id ? { ...r, status: 'dismissed' } : r))
    setDismissReport(null)
    setDismissReason('')
    showToast('Report dismissed. Feedback sent to reporter ✓')
  }

  const handleAction = () => {
    setReports(prev => prev.map(r => r.id === actionReport.id ? { ...r, status: 'actioned' } : r))
    setActionReport(null)
    setActionFeedback('')
    showToast('Action taken. Offender and reporter notified ✓')
  }

  const filteredStudents = students.filter(s => {
    const matchFilter = studentFilter === 'All' || s.status === studentFilter.toLowerCase()
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.username.includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const filteredCourses = courses.filter(c => {
    if (courseFilter === 'Pending') return c.status === 'pending'
    if (courseFilter === 'Approved') return c.status === 'approved'
    if (courseFilter === 'Rejected') return c.status === 'rejected'
    return true
  })

  const statusBadge = (status: UserStatus) => {
    if (status === 'active') return <Badge variant="green">● Active</Badge>
    if (status === 'suspended') return <span className="inline-block px-[10px] py-[3px] rounded-full text-[11px] font-[600] bg-[#FEF3C7] dark:bg-[rgba(212,160,23,.15)] text-[#92400E]">⚠ Suspended</span>
    return <Badge variant="red">✕ Banned</Badge>
  }

  const roleBadge = (r: string) => {
    if (r === 'super_admin') return <Badge variant="admin">👑 Super Admin</Badge>
    if (r === 'moderator') return <span className="inline-block px-[10px] py-[3px] rounded-full text-[11px] font-[600] bg-[#EDE9FE] dark:bg-[rgba(99,102,241,.12)] text-[#5B21B6]">🛡 Moderator</span>
    return <Badge>Admin</Badge>
  }

  const VIEWS: { key: ViewType; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'students', label: 'Students' },
    { key: 'instructors', label: 'Instructors' },
    { key: 'courses', label: 'Courses' },
    ...(canModifyFinance ? [{ key: 'payments' as ViewType, label: 'Payments' }] : []),
    { key: 'reports', label: 'Reports' },
    ...(isSuperAdmin ? [{ key: 'admin-mgmt' as ViewType, label: '👑 Admin Mgmt' }] : []),
  ]

  return (
    <DashLayout sidebarItems={NAV} title="Admin Panel" subtitle="Platform overview and management">
      {/* Moderator info banner */}
      {isModerator && (
        <div className="flex items-center gap-3 bg-[#EDE9FE] dark:bg-[rgba(99,102,241,.12)] border border-[#C4B5FD] rounded-[12px] px-4 py-3 mb-5">
          <span className="text-[16px]">🛡</span>
          <p className="text-[12px] text-[#5B21B6] font-[500]">You are logged in as a <strong>Moderator</strong>. Financial records and admin management are restricted. You can review content, suspend/ban users, and approve/reject courses.</p>
        </div>
      )}

      {/* Sub-nav */}
      <div className="flex gap-2 flex-wrap mb-6">
        {VIEWS.map(({ key, label }) => (
          <FilterPill key={key} active={view === key} onClick={() => setView(key)}>{label}</FilterPill>
        ))}
      </div>

      {/* ── DASHBOARD ─────────────────────────────────────────── */}
      {view === 'dashboard' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon="👥" iconBg="#D1FAE5" label="Total users" value="24,847" delta="↑ 847 this month" deltaUp />
            <StatCard icon="📚" iconBg="#FDF6DC" label="Live courses" value="1,847" delta="↑ 48 this week" deltaUp />
            {canModifyFinance && <StatCard icon="💰" iconBg="#EDE9FE" label="Platform revenue" value="₦4.2M" delta="↑ 18% vs last month" deltaUp />}
            <StatCard icon="🚩" iconBg="#FEE2E2" label="Open reports" value="3" delta="↓ 2 resolved" deltaUp={false} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="p-5">
              <h3 className="text-[14px] font-[700] mb-4">Recent activity</h3>
              {[
                { icon: '👤', text: 'Ada Obi enrolled in Advanced React Patterns', time: '2h ago', color: '#D4A017' },
                { icon: '📋', text: 'New course submitted for review: "Flutter Dev"', time: '4h ago', color: '#6366F1' },
                { icon: '🚩', text: 'Report filed against instructor @kofi_a', time: '6h ago', color: '#EC4899' },
                { icon: '💰', text: 'Payout processed: ₦72K to Sarah Kim', time: '1d ago', color: '#10B981' },
                { icon: '✕', text: 'User @spam_bot banned by automated system', time: '1d ago', color: '#EF4444' },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[var(--border)] last:border-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[14px] flex-shrink-0" style={{ background: `${a.color}22` }}>{a.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] text-[var(--text-secondary)] leading-[1.4]">{a.text}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{a.time}</div>
                  </div>
                </div>
              ))}
            </Card>
            <Card className="p-5">
              <h3 className="text-[14px] font-[700] mb-4">Courses pending review</h3>
              {PENDING_COURSES.filter(c => courses.find(x => x.id === c.id)?.status === 'pending').map(c => (
                <div key={c.id} className="flex items-center gap-3 py-3 border-b border-[var(--border)] last:border-0">
                  <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-[20px] flex-shrink-0" style={{ background: c.gradient }}>{c.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-[600] text-[var(--text-primary)] truncate">{c.title}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">{c.instructor} · {c.submitted}</div>
                  </div>
                  <div className="flex gap-1.5">
                    <Btn size="sm" variant="outline" onClick={() => setPreviewCourse(c)}>Preview</Btn>
                    <Btn size="sm" variant="success" onClick={() => handleApproveCourse(c.id)}>✓</Btn>
                    <Btn size="sm" variant="danger" onClick={() => { setPreviewCourse(c) }}>✕</Btn>
                  </div>
                </div>
              ))}
              {PENDING_COURSES.filter(c => courses.find(x => x.id === c.id)?.status === 'pending').length === 0 && (
                <p className="text-[13px] text-[var(--text-tertiary)] py-4 text-center">No pending courses 🎉</p>
              )}
            </Card>
          </div>
        </>
      )}

      {/* ── STUDENTS ─────────────────────────────────────────── */}
      {view === 'students' && (
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <div className="flex items-center gap-2 bg-[var(--surface)] transition-colors border border-[var(--border-2)] rounded-full px-4 py-2 flex-1 max-w-xs">
              <svg className="w-3.5 h-3.5 text-[var(--text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input className="flex-1 text-[13px] outline-none" placeholder="Search students…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {['All', 'Active', 'Suspended', 'Banned'].map(f => (
              <FilterPill key={f} active={studentFilter === f} onClick={() => setStudentFilter(f)}>{f}</FilterPill>
            ))}
          </div>
          <div className="bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06)]">
            <div className="overflow-x-auto">
              <table className="w-full text-[12px] border-collapse">
                <thead>
                  <tr className="bg-[var(--bg-tertiary)] transition-colors border-b border-[var(--border)]">
                    {['Student', 'Email', 'Joined', 'Courses', 'Spent', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] text-[var(--text-tertiary)] font-[600] uppercase tracking-[.05em] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(s => (
                    <tr key={s.id} className="border-t border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-primary)] text-[10px] font-[700] flex-shrink-0" style={{ background: s.color }}>{s.name.split(' ').map(w => w[0]).join('')}</div>
                          <div>
                            <div className="font-[600] text-[var(--text-primary)]">{s.name}</div>
                            <div className="text-[10px] text-[var(--text-tertiary)]">@{s.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{s.email}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)] whitespace-nowrap">{s.joined}</td>
                      <td className="px-4 py-3 text-center">{s.courses}</td>
                      <td className="px-4 py-3 font-[600] text-[#D4A017]">{s.spent}</td>
                      <td className="px-4 py-3">{statusBadge(s.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5 flex-wrap">
                          {s.status !== 'active' && <Btn size="sm" variant="success" onClick={() => updateStudentStatus(s.id, 'active')}>Reinstate</Btn>}
                          {s.status !== 'suspended' && <Btn size="sm" variant="outline" onClick={() => updateStudentStatus(s.id, 'suspended')}>Suspend</Btn>}
                          {s.status !== 'banned' && <Btn size="sm" variant="danger" onClick={() => updateStudentStatus(s.id, 'banned')}>Ban</Btn>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── INSTRUCTORS ─────────────────────────────────────── */}
      {view === 'instructors' && (
        <div className="bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06)]">
          <div className="overflow-x-auto">
            <table className="w-full text-[12px] border-collapse">
              <thead>
                <tr className="bg-[var(--bg-tertiary)] transition-colors border-b border-[var(--border)]">
                  {['Instructor', 'Courses', 'Students', 'Revenue', 'Rating', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] text-[var(--text-tertiary)] font-[600] uppercase tracking-[.05em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {instructors.map(inst => (
                  <tr key={inst.id} className="border-t border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-primary)] text-[10px] font-[700]" style={{ background: inst.color }}>{inst.name.split(' ').map(w => w[0]).join('')}</div>
                        <div>
                          <span className="font-[600] text-[var(--text-primary)]">{inst.name}</span>
                          <div className="text-[10px] text-[var(--text-tertiary)]">{inst.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{inst.courses}</td>
                    <td className="px-4 py-3">{inst.students.toLocaleString()}</td>
                    <td className="px-4 py-3 font-[600] text-[#D4A017]">{canModifyFinance ? inst.revenue : '—'}</td>
                    <td className="px-4 py-3 text-[#D4A017]">★ {inst.rating}</td>
                    <td className="px-4 py-3">{statusBadge(inst.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {inst.status === 'suspended' ? (
                          <Btn size="sm" variant="success" onClick={() => updateInstructorStatus(inst.id, 'active')}>Reinstate</Btn>
                        ) : (
                          <Btn size="sm" variant="outline" onClick={() => updateInstructorStatus(inst.id, 'suspended')}>Suspend</Btn>
                        )}
                        {inst.status !== 'banned' && (
                          <Btn size="sm" variant="danger" onClick={() => updateInstructorStatus(inst.id, 'banned')}>Ban</Btn>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── COURSES ──────────────────────────────────────────── */}
      {view === 'courses' && (
        <div>
          <div className="flex gap-2 flex-wrap mb-4">
            {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
              <FilterPill key={f} active={courseFilter === f} onClick={() => setCourseFilter(f)}>{f}</FilterPill>
            ))}
          </div>
          <div className="bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06)]">
            <div className="overflow-x-auto">
              <table className="w-full text-[12px] border-collapse">
                <thead>
                  <tr className="bg-[var(--bg-tertiary)] transition-colors border-b border-[var(--border)]">
                    {['Course', 'Instructor', 'Price', 'Submitted', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] text-[var(--text-tertiary)] font-[600] uppercase tracking-[.05em]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map(c => {
                    const pending = PENDING_COURSES.find(p => p.id === c.id)
                    return (
                      <tr key={c.id} className="border-t border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-[8px] flex items-center justify-center text-[18px] flex-shrink-0" style={{ background: c.gradient }}>{c.emoji}</div>
                            <span className="font-[600] text-[var(--text-primary)] truncate max-w-[180px]">{c.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[var(--text-tertiary)]">{c.instructor}</td>
                        <td className="px-4 py-3 font-[600] text-[#D4A017]">₦{c.price.toLocaleString()}</td>
                        <td className="px-4 py-3 text-[var(--text-tertiary)] whitespace-nowrap">{c.submitted}</td>
                        <td className="px-4 py-3">
                          {c.status === 'pending' && <Badge variant="amber">⏳ Pending</Badge>}
                          {c.status === 'approved' && <Badge variant="green">✓ Approved</Badge>}
                          {c.status === 'rejected' && <Badge variant="red">✕ Rejected</Badge>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            {pending && (
                              <Btn size="sm" variant="outline" onClick={() => setPreviewCourse(pending)}>Preview</Btn>
                            )}
                            {c.status === 'pending' && (
                              <>
                                <Btn size="sm" variant="success" onClick={() => handleApproveCourse(c.id)}>✓</Btn>
                                <Btn size="sm" variant="danger" onClick={() => pending && setPreviewCourse(pending)}>✕</Btn>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── PAYMENTS ─────────────────────────────────────────── */}
      {view === 'payments' && (
        <div>
          {!canModifyFinance ? (
            <Card className="p-8 text-center">
              <div className="text-[40px] mb-3">🔒</div>
              <h3 className="text-[16px] font-[700] mb-2">Access Restricted</h3>
              <p className="text-[13px] text-[var(--text-tertiary)]">Moderators cannot view financial records.</p>
            </Card>
          ) : (
            <>
              {/* Pending payouts */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-[700]">Pending Payouts</h3>
                {isSuperAdmin && (
                  <Btn size="sm" variant="success" onClick={handleBulkPayout}>
                    💸 Process All Payouts
                  </Btn>
                )}
              </div>
              <div className="bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06)] mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-[12px] border-collapse">
                    <thead>
                      <tr className="bg-[var(--bg-tertiary)] transition-colors border-b border-[var(--border)]">
                        {['Instructor', 'Email', 'Pending Amount', 'Action'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-[11px] text-[var(--text-tertiary)] font-[600] uppercase tracking-[.05em]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {instructors.map(inst => (
                        <tr key={inst.id} className="border-t border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-primary)] text-[10px] font-[700]" style={{ background: inst.color }}>{inst.name.split(' ').map(w => w[0]).join('')}</div>
                              <span className="font-[600] text-[var(--text-primary)]">{inst.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[var(--text-tertiary)]">{inst.email}</td>
                          <td className="px-4 py-3">
                            {inst.pendingPayout > 0
                              ? <span className="text-[14px] font-[700] text-[#10B981]">₦{inst.pendingPayout.toLocaleString()}</span>
                              : <span className="text-[12px] text-[var(--text-tertiary)]">No pending payout</span>}
                          </td>
                          <td className="px-4 py-3">
                            {inst.pendingPayout > 0 && (
                              <Btn size="sm" variant="primary" onClick={() => setPayConfirm(inst)}>
                                Pay ₦{inst.pendingPayout.toLocaleString()}
                              </Btn>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payout history */}
              <h3 className="text-[15px] font-[700] mb-4">Payout History</h3>
              <div className="bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-[12px] border-collapse">
                    <thead>
                      <tr className="bg-[var(--bg-tertiary)] transition-colors border-b border-[var(--border)]">
                        {['Instructor', 'Amount', 'Date', 'Status'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-[11px] text-[var(--text-tertiary)] font-[600] uppercase tracking-[.05em]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAYOUT_HISTORY.map(p => (
                        <tr key={p.id} className="border-t border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
                          <td className="px-4 py-3 font-[600] text-[var(--text-primary)]">{p.instructor}</td>
                          <td className="px-4 py-3 font-[600] text-[#D4A017]">₦{p.amount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-[var(--text-tertiary)]">{p.date}</td>
                          <td className="px-4 py-3"><Badge variant="green">✓ Paid</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── REPORTS ──────────────────────────────────────────── */}
      {view === 'reports' && (
        <div className="space-y-3">
          {reports.map(r => (
            <Card key={r.id} className="p-5 border-l-[3px] border-l-[#EC4899]">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[13px] font-[600]">Report against @{r.against}</span>
                    <span className={`inline-block px-[10px] py-[3px] rounded-full text-[11px] font-[600] ${r.status === 'pending' ? 'bg-[#FEE2E2] dark:bg-[rgba(239,68,68,.12)] text-[#991B1B]' : r.status === 'processing' ? 'bg-[#FEF3C7] dark:bg-[rgba(212,160,23,.15)] text-[#92400E]' : r.status === 'dismissed' ? 'bg-[#E5E7EB] dark:bg-[rgba(255,255,255,.1)] text-[#374151]' : 'bg-[#D1FAE5] dark:bg-[rgba(16,185,129,.15)] text-[#065F46]'}`}>
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                    <span className="text-[11px] text-[var(--text-tertiary)]">· {r.time}</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-tertiary)] mb-2">Reported by: <strong>{r.from}</strong> · {r.type}</div>
                  <p className="text-[13px] text-[var(--text-secondary)]">{r.reason}</p>
                </div>
                <div className="flex gap-2">
                  {r.status === 'pending' && <Btn size="sm" variant="outline" onClick={() => handleStartProcessing(r.id)}>Start Processing</Btn>}
                  {r.status === 'processing' && (
                    <>
                      <Btn size="sm" variant="outline" onClick={() => setDismissReport(r)}>Dismiss</Btn>
                      <Btn size="sm" variant="danger" onClick={() => setActionReport(r)}>Take Action</Btn>
                    </>
                  )}
                  {(r.status === 'dismissed' || r.status === 'actioned') && <span className="text-[11px] text-[var(--text-tertiary)] font-[600]">Closed</span>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── ADMIN MANAGEMENT (super_admin only) ──────────────── */}
      {view === 'admin-mgmt' && isSuperAdmin && (
        <div>
          {/* Add admin */}
          <Card className="p-6 mb-6 max-w-xl">
            <h3 className="text-[14px] font-[700] mb-4">➕ Add Admin / Moderator</h3>
            <div className="flex gap-3 flex-wrap">
              <input
                value={newAdminEmail}
                onChange={e => setNewAdminEmail(e.target.value)}
                placeholder="user@example.com"
                className="flex-1 min-w-[200px] px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017]"
              />
              <select
                value={newAdminRole}
                onChange={e => setNewAdminRole(e.target.value as 'admin' | 'moderator')}
                className="px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] bg-[var(--surface)] transition-colors"
              >
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
              <Btn onClick={handleAddAdmin}>Add</Btn>
            </div>
          </Card>

          {/* Admin list */}
          <div className="bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,.06)]">
            <div className="overflow-x-auto">
              <table className="w-full text-[12px] border-collapse">
                <thead>
                  <tr className="bg-[var(--bg-tertiary)] transition-colors border-b border-[var(--border)]">
                    {['Admin', 'Email', 'Role', 'Joined', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] text-[var(--text-tertiary)] font-[600] uppercase tracking-[.05em]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map(a => (
                    <tr key={a.id} className="border-t border-[var(--border)] hover:bg-[var(--surface-hover)] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-primary)] text-[10px] font-[700]" style={{ background: a.color }}>{a.name.split(' ').map(w => w[0]).join('')}</div>
                          <span className="font-[600] text-[var(--text-primary)]">{a.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{a.email}</td>
                      <td className="px-4 py-3">{roleBadge(a.role)}</td>
                      <td className="px-4 py-3 text-[var(--text-tertiary)]">{a.joined}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          {a.role === 'admin' && (
                            <Btn size="sm" variant="primary" onClick={() => handlePromote(a.id)}>👑 Promote</Btn>
                          )}
                          {a.role !== 'super_admin' && (
                            <Btn size="sm" variant="danger" onClick={() => handleRemoveAdmin(a.id)}>Remove</Btn>
                          )}
                          {a.role === 'super_admin' && (
                            <span className="text-[11px] text-[#D4A017] font-[600]">Owner</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Course Preview Modal ──────────────────────────────── */}
      {previewCourse && (
        <CoursePreviewModal
          course={previewCourse}
          onClose={() => setPreviewCourse(null)}
          onApprove={handleApproveCourse}
          onReject={handleRejectCourse}
        />
      )}

      {/* ── Payout Confirm Modal ─────────────────────────────── */}
      {payConfirm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={() => setPayConfirm(null)}>
          <div className="absolute inset-0 bg-[rgba(0,0,0,.6)] backdrop-blur-sm" />
          <div className="relative bg-[var(--surface)] transition-colors rounded-[20px] p-8 w-full max-w-sm shadow-[0_24px_80px_rgba(0,0,0,.25)] animate-[pageSlideIn_.25s_both]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[17px] font-[700] mb-2">Confirm Payout</h3>
            <p className="text-[13px] text-[var(--text-secondary)] mb-6 leading-[1.6]">
              You are about to pay <strong className="text-[#D4A017]">₦{payConfirm.pendingPayout.toLocaleString()}</strong> to <strong>{payConfirm.name}</strong>. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Btn variant="success" onClick={() => handlePayout(payConfirm)}>✓ Confirm Payment</Btn>
              <Btn variant="ghost" onClick={() => setPayConfirm(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ── Dismiss Modal ─────────────────────────────── */}
      {dismissReport && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={() => setDismissReport(null)}>
          <div className="absolute inset-0 bg-[rgba(0,0,0,.6)] backdrop-blur-sm" />
          <div className="relative bg-[var(--surface)] transition-colors rounded-[20px] p-8 w-full max-w-sm shadow-[0_24px_80px_rgba(0,0,0,.25)] animate-[pageSlideIn_.25s_both]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[17px] font-[700] mb-2">Dismiss Report</h3>
            <p className="text-[13px] text-[var(--text-secondary)] mb-4">Provide a reason for dismissing this report. This will be sent as feedback to the reporter.</p>
            <textarea
              rows={3}
              value={dismissReason}
              onChange={e => setDismissReason(e.target.value)}
              placeholder="Reason for dismissal..."
              className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] resize-y mb-6"
            />
            <div className="flex gap-3">
              <Btn variant="primary" onClick={handleDismiss} disabled={!dismissReason.trim()}>Submit</Btn>
              <Btn variant="ghost" onClick={() => setDismissReport(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ── Action Modal ─────────────────────────────── */}
      {actionReport && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={() => setActionReport(null)}>
          <div className="absolute inset-0 bg-[rgba(0,0,0,.6)] backdrop-blur-sm" />
          <div className="relative bg-[var(--surface)] transition-colors rounded-[20px] p-8 w-full max-w-md shadow-[0_24px_80px_rgba(0,0,0,.25)] animate-[pageSlideIn_.25s_both]" onClick={e => e.stopPropagation()}>
            <h3 className="text-[17px] font-[700] mb-4">Take Action on @{actionReport.against}</h3>
            
            <div className="mb-4">
              <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Action Type</label>
              <select value={actionType} onChange={e => setActionType(e.target.value)} className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017]">
                <option value="suspend">Suspend User</option>
                <option value="ban">Permanently Ban User</option>
              </select>
            </div>

            {actionType === 'suspend' && (
              <div className="mb-4">
                <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Duration</label>
                <select value={actionDuration} onChange={e => setActionDuration(e.target.value)} className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017]">
                  <option value="24 hours">24 hours</option>
                  <option value="7 days">7 days</option>
                  <option value="30 days">30 days</option>
                </select>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Feedback to Reporter (Optional)</label>
              <textarea
                rows={2}
                value={actionFeedback}
                onChange={e => setActionFeedback(e.target.value)}
                placeholder="Let the reporter know what action was taken..."
                className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] resize-y"
              />
            </div>

            <div className="flex gap-3">
              <Btn variant="danger" onClick={handleAction}>Confirm Action</Btn>
              <Btn variant="ghost" onClick={() => setActionReport(null)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} color={toast.includes('banned') || toast.includes('rejected') || toast.includes('suspended') ? '#EF4444' : toast.includes('Restricted') ? '#F97316' : '#10B981'} />}
    </DashLayout>
  )
}
