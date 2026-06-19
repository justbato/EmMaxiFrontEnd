import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { DashLayout } from '../../components/layout/DashLayout'
import { StatCard, Card, ProgressBar, Btn, FilterPill } from '../../components/ui'
import { CertModal } from '../../components/modals'
import { DEMO_COURSES } from '../../types'

const NAV = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Home', path: '/' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, label: 'Dashboard', path: '/student' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, label: 'My Courses', path: '/student/courses' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>, label: 'Certificates', path: '/student/certificates' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>, label: 'Browse Courses', path: '/courses' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>, label: 'Settings', path: '/student/settings' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, label: 'Report Issue', path: '/student/report' },
]

const MY_COURSES = [
  { ...DEMO_COURSES[0], progress: 73, lastLesson: 'Custom Hooks Deep Dive' },
  { ...DEMO_COURSES[1], progress: 45, lastLesson: 'Pandas DataFrames' },
  { ...DEMO_COURSES[2], progress: 100, lastLesson: 'Final Project', completed: true },
]

export function StudentDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [certOpen, setCertOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = MY_COURSES.filter(c => {
    if (activeFilter === 'In Progress') return (c.progress || 0) < 100
    if (activeFilter === 'Completed') return (c.progress || 0) === 100
    return true
  })

  return (
    <DashLayout sidebarItems={NAV} title={`Welcome back, ${user?.full_name?.split(' ')[0]} 👋`} subtitle="Here's your learning activity">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="📚" iconBg="#FDF6DC" label="Courses enrolled" value="3" delta="↑ 1 this month" deltaUp />
        <StatCard icon="⏱" iconBg="#D1FAE5" label="Hours learned" value="47h" delta="↑ 8h this week" deltaUp />
        <StatCard icon="🎓" iconBg="#EDE9FE" label="Certificates" value="1" delta="↑ 1 new" deltaUp />
        <StatCard icon="🔥" iconBg="#FEF3C7" label="Day streak" value="12" delta="Keep it up!" deltaUp />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* Left col */}
        <div>
          {/* Continue learning */}
          <Card className="p-5 mb-5 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-[700] text-[var(--text-primary)]">Continue learning</h2>
              <button onClick={() => navigate('/student/courses')} className="text-[12px] text-[#D4A017] font-[600]">View all →</button>
            </div>
            <div className="flex gap-4 flex-wrap items-center mb-4">
              {['All','In Progress','Completed'].map(f => (
                <FilterPill key={f} active={activeFilter === f} onClick={() => setActiveFilter(f)}>{f}</FilterPill>
              ))}
            </div>
            <div className="space-y-3">
              {filtered.map(course => (
                <div key={course.id} className="flex items-center gap-4 p-4 rounded-[12px] border border-[var(--border)] hover:border-[#D4A017] hover:bg-[var(--surface-hover)] transition-all cursor-pointer group"
                  onClick={() => navigate(`/learn/${course.id}`)}>
                  <div className="w-12 h-12 rounded-[10px] flex items-center justify-center text-[24px] flex-shrink-0" style={{ background: course.gradient }}>{course.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-[600] text-[var(--text-primary)] truncate">{course.title}</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 truncate">Last: {course.lastLesson}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <ProgressBar value={course.progress} className="flex-1" />
                      <span className="text-[11px] font-[600] text-[#D4A017] flex-shrink-0">{course.progress}%</span>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {course.progress === 100 ? (
                      <span className="text-[11px] text-[#10B981] font-[600]">✓ Done</span>
                    ) : (
                      <Btn size="sm">Resume →</Btn>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly goal */}
          <Card className="p-5 mb-5 transition-colors">
            <h2 className="text-[15px] font-[700] text-[var(--text-primary)] mb-4">📅 Weekly learning goal</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-[var(--text-secondary)]">5 hours / week</span>
              <span className="text-[13px] font-[600] text-[#D4A017]">3.5h done</span>
            </div>
            <ProgressBar value={70} className="mb-3" height={8} />
            <div className="grid grid-cols-7 gap-1.5 mt-4">
              {['M','T','W','T','F','S','S'].map((d, i) => (
                <div key={i} className="text-center">
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-[10px] font-[600] mb-1 transition-colors ${i < 4 ? 'bg-[#D4A017] text-[var(--text-primary)]' : i === 4 ? 'bg-[var(--brand-light)] border-2 border-[#D4A017] text-[#D4A017]' : 'bg-[var(--bg-secondary)] text-[var(--text-tertiary)]'}`}>
                    {i < 4 ? '✓' : i === 4 ? '→' : '·'}
                  </div>
                  <div className="text-[10px] text-[var(--text-secondary)]">{d}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right col */}
        <div>
          {/* Certificate */}
          <Card className="p-5 mb-5 bg-[var(--brand-light)] border-[var(--border)] transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[20px]">🎓</span>
              <h3 className="text-[14px] font-[700] text-[var(--text-primary)]">Certificate earned!</h3>
            </div>
            <p className="text-[12px] text-[#D4A017] mb-3 leading-[1.6]">You completed <strong className="text-[var(--text-primary)]">UI/UX Fundamentals</strong>. Your certificate is ready to share.</p>
            <Btn size="sm" className="w-full justify-center" onClick={() => setCertOpen(true)}>View certificate →</Btn>
          </Card>

          {/* Recommended */}
          <Card className="p-5 transition-colors">
            <h3 className="text-[14px] font-[700] text-[var(--text-primary)] mb-4">✨ Recommended for you</h3>
            <div className="space-y-3">
              {DEMO_COURSES.slice(3, 6).map(c => (
                <div key={c.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate(`/courses/${c.id}`)}>
                  <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-[20px] flex-shrink-0" style={{ background: c.gradient }}>{c.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-[600] text-[var(--text-primary)] truncate group-hover:text-[#D4A017] transition-colors">{c.title}</div>
                    <div className="text-[10px] text-[var(--text-secondary)]">{c.instructor} · ₦{c.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <CertModal open={certOpen} onClose={() => setCertOpen(false)} studentName={user?.full_name} courseTitle="UI/UX Fundamentals" />
    </DashLayout>
  )
}
