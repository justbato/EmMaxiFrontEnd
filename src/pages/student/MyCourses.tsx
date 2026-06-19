import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashLayout } from '../../components/layout/DashLayout'
import { FilterPill, ProgressBar, Btn, Card, Badge } from '../../components/ui'
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
  { ...DEMO_COURSES[0], progress: 73, lastLesson: 'Custom Hooks Deep Dive', enrolledDate: 'May 12, 2026' },
  { ...DEMO_COURSES[1], progress: 45, lastLesson: 'Pandas DataFrames', enrolledDate: 'May 28, 2026' },
  { ...DEMO_COURSES[2], progress: 100, lastLesson: 'Final Project', enrolledDate: 'Apr 5, 2026', completed: true, completedDate: 'May 20, 2026' },
]

export function MyCoursesPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [certOpen, setCertOpen] = useState(false)
  const [certCourse, setCertCourse] = useState('')

  const filtered = MY_COURSES.filter(c => {
    if (filter === 'In Progress') return c.progress < 100
    if (filter === 'Completed') return c.progress === 100
    return true
  })

  return (
    <DashLayout sidebarItems={NAV} title="My Courses" subtitle={`${MY_COURSES.length} courses enrolled`}
      actions={<Btn size="sm" variant="outline" onClick={() => navigate('/courses')}>+ Discover more</Btn>}>
      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {['All', 'In Progress', 'Completed'].map(f => (
          <FilterPill key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f} {f === 'All' ? `(${MY_COURSES.length})` : f === 'In Progress' ? `(${MY_COURSES.filter(c => c.progress < 100).length})` : `(${MY_COURSES.filter(c => c.progress === 100).length})`}
          </FilterPill>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[var(--text-tertiary)]">
          <div className="text-[48px] mb-4">📚</div>
          <div className="text-[16px] font-[600] text-[var(--text-secondary)] mb-2">No courses here</div>
          <Btn onClick={() => navigate('/courses')}>Browse courses →</Btn>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(course => (
            <Card key={course.id} className="overflow-hidden hover:shadow-[0_8px_28px_rgba(212,160,23,.15)] transition-all">
              {/* Thumb */}
              <div className="h-[140px] flex items-center justify-center text-[40px] relative" style={{ background: course.gradient }}>
                <span>{course.emoji}</span>
                {course.progress === 100 && (
                  <div className="absolute inset-0 bg-[rgba(16,185,129,.15)] flex items-center justify-center">
                    <div className="bg-[#10B981] text-white rounded-full w-10 h-10 flex items-center justify-center text-[18px] font-[700]">✓</div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-[13px] font-[600] text-[var(--text-primary)] leading-[1.4] flex-1">{course.title}</h3>
                  {course.progress === 100 && <Badge variant="green">✓ Done</Badge>}
                </div>
                <div className="text-[11px] text-[var(--text-tertiary)] mb-3">{course.instructor}</div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-[var(--text-tertiary)]">Progress</span>
                    <span className="text-[#D4A017] font-[600]">{course.progress}%</span>
                  </div>
                  <ProgressBar value={course.progress} height={6} />
                </div>

                <div className="text-[10px] text-[var(--text-tertiary)] mb-3">
                  Last: <span className="text-[var(--text-secondary)] font-[500]">{course.lastLesson}</span>
                </div>

                <div className="flex gap-2">
                  {course.progress === 100 ? (
                    <>
                      <Btn variant="outline" size="sm" className="flex-1 justify-center" onClick={() => navigate(`/learn/${course.id}`)}>Review</Btn>
                      <Btn size="sm" className="flex-1 justify-center" onClick={() => { setCertCourse(course.title); setCertOpen(true) }}>🎓 Certificate</Btn>
                    </>
                  ) : (
                    <Btn size="sm" className="w-full justify-center" onClick={() => navigate(`/learn/${course.id}`)}>Continue →</Btn>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CertModal open={certOpen} onClose={() => setCertOpen(false)} courseTitle={certCourse} />
    </DashLayout>
  )
}
