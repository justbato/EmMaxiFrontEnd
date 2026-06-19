import { useState } from 'react'
import { DashLayout } from '../../components/layout/DashLayout'
import { StatCard, FilterPill, Card, Badge, Btn } from '../../components/ui'
import { QAReplyModal } from '../../components/modals'
import { Toast } from '../../components/ui'

const NAV = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Home', path: '/' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, label: 'Dashboard', path: '/instructor' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: 'Q&A', path: '/instructor/qa', badge: 5 },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, label: 'Report Issue', path: '/instructor/report' },
]

const QUESTIONS = [
  { id: '1', student: 'Ada Obi', handle: '@ada_obi', color: '#10B981', time: '2 hrs ago', course: 'Advanced React Patterns', lesson: 'Lesson 5 — Custom Hooks', text: 'When should I use useCallback vs useMemo? I\'m seeing performance improvements but I\'m not sure when each one is appropriate for real-world usage.', upvotes: 8, answered: false },
  { id: '2', student: 'Chidi Obi', handle: '@chidi_99', color: '#6366F1', time: '5 hrs ago', course: 'Advanced React Patterns', lesson: 'Lesson 3 — Compound Components', text: 'Can compound components work with Context API or is there a better pattern? I tried it but child components aren\'t receiving the shared state.', upvotes: 5, answered: false },
  { id: '3', student: 'Emeka Obi', handle: '@emeka_obi', color: '#EC4899', time: '2 days ago', course: 'Advanced React Patterns', lesson: 'Lesson 7 — Code Splitting', text: 'React.lazy() throws an error when the chunk fails to load. How do you handle network errors gracefully with Suspense?', upvotes: 18, answered: true, reply: 'Wrap React.lazy() with an Error Boundary component. In componentDidCatch, display a retry button that resets state. This gives users a graceful fallback without a full page reload.' },
  { id: '4', student: 'Fatima Bello', handle: '@fatima_b', color: '#F97316', time: '3 days ago', course: 'Node.js REST APIs', lesson: 'Lesson 12 — Authentication', text: 'Should I store JWT in localStorage or cookies? What are the security trade-offs?', upvotes: 22, answered: true, reply: 'HttpOnly cookies are generally safer against XSS attacks. Use SameSite=Strict and Secure flags. localStorage is fine for non-sensitive apps but avoid it when dealing with sensitive user data.' },
]

export function InstructorQAPage() {
  const [filter, setFilter] = useState('All questions')
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyTarget, setReplyTarget] = useState({ id: '', name: '' })
  const [questions, setQuestions] = useState(QUESTIONS)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  const filtered = questions.filter(q => {
    if (filter === 'Unanswered') return !q.answered
    if (filter === 'Answered') return q.answered
    if (filter === 'Advanced React Patterns') return q.course === 'Advanced React Patterns'
    if (filter === 'Node.js REST APIs') return q.course === 'Node.js REST APIs'
    return true
  })

  const openReply = (id: string, name: string) => { setReplyTarget({ id, name }); setReplyOpen(true) }

  const submitReply = (text: string) => {
    setQuestions(prev => prev.map(q => q.id === replyTarget.id ? { ...q, answered: true, reply: text } : q))
    showToast('Reply posted successfully ✓')
  }

  return (
    <DashLayout sidebarItems={NAV} title="Q&A" subtitle="Manage questions from your students">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="❓" iconBg="#FEF3C7" label="Total questions" value="156" delta="↑ 18 this week" deltaUp />
        <StatCard icon="✓" iconBg="#D1FAE5" label="Answered" value="128" delta="↑ 12 this week" deltaUp />
        <StatCard icon="⏱" iconBg="#FEF3C7" label="Avg. response" value="4.2h" delta="Top 10%" deltaUp />
        <StatCard icon="★" iconBg="#EDE9FE" label="Satisfaction" value="98%" delta="Excellent" deltaUp />
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-5">
        {['All questions', `Unanswered (${questions.filter(q => !q.answered).length})`, 'Answered', 'Advanced React Patterns', 'Node.js REST APIs'].map(f => (
          <FilterPill key={f} active={filter === f || (filter === 'All questions' && f === 'All questions')} onClick={() => setFilter(f.startsWith('Unanswered') ? 'Unanswered' : f)}>{f}</FilterPill>
        ))}
      </div>

      {/* Question list */}
      <div className="space-y-3">
        {filtered.map(q => (
          <Card key={q.id} className={`p-[18px] border-l-[3px] ${q.answered ? 'border-l-[#10B981]' : 'border-l-[#D4A017]'}`}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-[700] flex-shrink-0" style={{ background: q.color }}>
                {q.student.split(' ').map(w => w[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[13px] font-[600]">{q.student}</span>
                  <span className="text-[11px] text-[#D4A017]">{q.handle}</span>
                  <Badge variant={q.answered ? 'green' : 'amber'}>{q.answered ? '✓ Answered' : 'Pending'}</Badge>
                  <span className="text-[11px] text-[var(--text-tertiary)]">· {q.time}</span>
                </div>
                <div className="text-[11px] text-[var(--text-tertiary)] mb-2">
                  <span className="text-[#D4A017] font-[500]">{q.course}</span> · {q.lesson}
                </div>
                <p className="text-[13px] leading-[1.65] text-[var(--text-secondary)] mb-3">{q.text}</p>

                {q.answered && q.reply && (
                  <div className="bg-[#FDF6DC] dark:bg-[rgba(212,160,23,.12)] border border-[var(--border)] dark:border-[rgba(212,160,23,.2)] rounded-[8px] p-3 mb-3">
                    <div className="text-[10px] font-[700] text-[#D4A017] uppercase tracking-[.06em] mb-1.5">✓ Your reply</div>
                    <p className="text-[12px] text-[var(--text-secondary)] leading-[1.65]">{q.reply}</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[var(--text-tertiary)]">👍 {q.upvotes} upvotes</span>
                  <Btn size="sm" variant={q.answered ? 'outline' : 'primary'} onClick={() => openReply(q.id, q.student)}>
                    {q.answered ? 'Edit reply' : 'Reply →'}
                  </Btn>
                  {!q.answered && <Btn size="sm" variant="ghost">Pin</Btn>}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[var(--text-tertiary)]">
            <div className="text-[48px] mb-3">💬</div>
            <div className="text-[14px] font-[600] text-[var(--text-secondary)] mb-1">No questions here</div>
            <p className="text-[12px]">All caught up!</p>
          </div>
        )}
      </div>

      <QAReplyModal open={replyOpen} onClose={() => setReplyOpen(false)} onSubmit={submitReply} studentName={replyTarget.name} />
      {toast && <Toast message={toast} />}
    </DashLayout>
  )
}
