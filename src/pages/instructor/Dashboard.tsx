import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { DashLayout } from '../../components/layout/DashLayout'
import { StatCard, Card, Badge, Btn, FilterPill } from '../../components/ui'
import { DEMO_COURSES } from '../../types'

const NAV = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Home', path: '/' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, label: 'Dashboard', path: '/instructor' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, label: 'My Courses', path: '/instructor/courses' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>, label: 'Course Builder', path: '/instructor/builder' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: 'Q&A', path: '/instructor/qa', badge: 5 },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, label: 'Analytics', path: '/instructor/analytics' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>, label: 'Settings', path: '/instructor/settings' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, label: 'Report Issue', path: '/instructor/report' },
]

const MY_COURSES = DEMO_COURSES.slice(0, 2).concat([DEMO_COURSES[7]])

const CHART_DATA = [
  { month: 'Jan', revenue: 48000, students: 18 },
  { month: 'Feb', revenue: 72000, students: 27 },
  { month: 'Mar', revenue: 65000, students: 24 },
  { month: 'Apr', revenue: 93000, students: 35 },
  { month: 'May', revenue: 118000, students: 44 },
  { month: 'Jun', revenue: 145000, students: 54 },
]

const maxRevenue = Math.max(...CHART_DATA.map(d => d.revenue))

export function InstructorDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [courseFilter, setCourseFilter] = useState('All')

  const filtered = MY_COURSES.filter(c => {
    if (courseFilter === 'Published') return c.status === 'published'
    if (courseFilter === 'Review') return c.status === 'review'
    if (courseFilter === 'Draft') return c.status === 'draft'
    return true
  })

  return (
    <DashLayout sidebarItems={NAV} title={`Hello, ${user?.full_name?.split(' ')[0]} 👋`} subtitle="Here's your instructor overview"
      actions={<Btn size="sm" onClick={() => navigate('/instructor/builder')}>+ New course</Btn>}>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="👥" iconBg="#D1FAE5" label="Total students" value="3,577" delta="↑ 142 this month" deltaUp />
        <StatCard icon="💰" iconBg="#FDF6DC" label="Revenue (Jun)" value="₦145K" delta="↑ 23% vs May" deltaUp />
        <StatCard icon="📚" iconBg="#EDE9FE" label="Active courses" value="2" delta="1 in review" deltaUp />
        <StatCard icon="⭐" iconBg="#FEF3C7" label="Avg. rating" value="4.75" delta="Top 5%" deltaUp />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        <div>
          {/* Revenue chart */}
          <Card className="p-5 mb-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-[700]">Revenue overview</h2>
              <Badge variant="green">80% your share</Badge>
            </div>
            <div className="flex items-end gap-2 h-[100px] mb-2">
              {CHART_DATA.map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-[4px] min-h-1 transition-all duration-200 chart-bar cursor-pointer"
                    style={{ height: `${(d.revenue / maxRevenue) * 90}px`, background: 'linear-gradient(to top, #D4A017, #F0C040)' }}
                    title={`₦${d.revenue.toLocaleString()}`} />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {CHART_DATA.map(d => (
                <div key={d.month} className="flex-1 text-center text-[9px] text-[#6B6B6B]">{d.month}</div>
              ))}
            </div>
            <div className="flex gap-6 mt-4 pt-4 border-t border-[#E8E8E8]">
              <div><div className="text-[11px] text-[#6B6B6B]">Total earned</div><div className="text-[18px] font-[700] text-[#D4A017]">₦541K</div></div>
              <div><div className="text-[11px] text-[#6B6B6B]">This month</div><div className="text-[18px] font-[700]">₦145K</div></div>
              <div><div className="text-[11px] text-[#6B6B6B]">Pending payout</div><div className="text-[18px] font-[700] text-[#10B981]">₦72K</div></div>
            </div>
          </Card>

          {/* Courses */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-[700]">My courses</h2>
              <Btn size="sm" variant="outline" onClick={() => navigate('/instructor/builder')}>+ New course</Btn>
            </div>
            <div className="flex gap-2 flex-wrap mb-4">
              {['All','Published','Review','Draft'].map(f => (
                <FilterPill key={f} active={courseFilter === f} onClick={() => setCourseFilter(f)}>{f}</FilterPill>
              ))}
            </div>
            <div className="space-y-3">
              {filtered.map(course => (
                <div key={course.id} className="flex items-center gap-4 p-4 rounded-[12px] border border-[#E8E8E8] hover:border-[#D4A017] hover:bg-[#FFFDF7] transition-all">
                  <div className="w-12 h-12 rounded-[10px] flex items-center justify-center text-[22px] flex-shrink-0" style={{ background: course.gradient }}>{course.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-[600] text-[#111] truncate">{course.title}</div>
                    <div className="text-[11px] text-[#6B6B6B] mt-0.5">{course.students.toLocaleString()} students · ₦{course.price.toLocaleString()}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[#D4A017] text-[11px]">★ {course.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={course.status === 'published' ? 'green' : course.status === 'review' ? 'amber' : 'purple'}>
                      {course.status === 'published' ? '● Live' : course.status === 'review' ? '⏳ Review' : 'Draft'}
                    </Badge>
                    <Btn size="sm" variant="outline" onClick={() => navigate('/instructor/builder')}>Edit</Btn>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right col */}
        <div>
          {/* Recent students */}
          <Card className="p-5 mb-5">
            <h3 className="text-[14px] font-[700] mb-4">Recent enrollments</h3>
            {[
              { name: 'Ada Obi', course: 'Advanced React Patterns', time: '2h ago', color: '#D4A017' },
              { name: 'Chidi Nwosu', course: 'Node.js REST APIs', time: '4h ago', color: '#10B981' },
              { name: 'Emeka Eze', course: 'Advanced React Patterns', time: '1d ago', color: '#6366F1' },
              { name: 'Fatima Bello', course: 'Node.js REST APIs', time: '1d ago', color: '#EC4899' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#E8E8E8] last:border-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-[700] flex-shrink-0" style={{ background: s.color }}>
                  {s.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-[600] text-[#111] truncate">{s.name}</div>
                  <div className="text-[10px] text-[#6B6B6B] truncate">{s.course}</div>
                </div>
                <span className="text-[10px] text-[#6B6B6B] flex-shrink-0">{s.time}</span>
              </div>
            ))}
          </Card>

          {/* Quick actions */}
          <Card className="p-5">
            <h3 className="text-[14px] font-[700] mb-4">Quick actions</h3>
            <div className="space-y-2">
              {[
                { icon: '➕', label: 'Create new course', action: () => navigate('/instructor/builder') },
                { icon: '❓', label: 'Answer Q&A (5 pending)', action: () => navigate('/instructor/qa') },
                { icon: '📊', label: 'View full analytics', action: () => navigate('/instructor/analytics') },
                { icon: '⚙️', label: 'Edit profile & settings', action: () => navigate('/instructor/settings') },
              ].map(a => (
                <button key={a.label} onClick={a.action}
                  className="w-full flex items-center gap-3 p-3 rounded-[10px] border border-[#E8E8E8] hover:border-[#D4A017] hover:bg-[#FFFDF7] transition-all text-left">
                  <span className="text-[18px]">{a.icon}</span>
                  <span className="text-[13px] font-[500] text-[#111]">{a.label}</span>
                  <span className="ml-auto text-[#D4A017] text-[12px]">→</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashLayout>
  )
}
