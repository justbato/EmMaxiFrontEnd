import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Btn, StarRating, Tag, ProgressBar } from '../../components/ui'
import { PaymentModal } from '../../components/modals/PaymentModal'
import { DEMO_COURSES, DEMO_SECTIONS } from '../../types'

export function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [tab, setTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview')
  const [expandedSections, setExpandedSections] = useState<string[]>(['s1'])

  const course = DEMO_COURSES.find(c => c.id === id) || DEMO_COURSES[0]

  const handleEnroll = () => {
    if (!user) { navigate('/login'); return }
    setPaymentOpen(true)
  }

  const handleTransferSent = (reference: string) => {
    setPaymentOpen(false)
    navigate(`/payment/${reference}?course=${course.id}`)
  }

  const toggleSection = (id: string) => {
    setExpandedSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const totalLessons = DEMO_SECTIONS.reduce((a, s) => a + s.lessons.length, 0)

  return (
    <div className="min-h-screen bg-[var(--surface)] transition-colors">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between bg-[var(--nav-bg)] transition-colors border-b border-[rgba(212,160,23,.15)] px-4 md:px-12 py-3.5">
        <div className="text-[22px] font-[700] text-[var(--text-primary)] cursor-pointer" style={{ fontFamily: 'Clash Display, sans-serif' }} onClick={() => navigate('/')}>Em<span className="text-[#D4A017]">Maxi</span></div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 rounded-full text-[13px] font-[600] border border-[var(--border)] text-[var(--text-primary)] bg-[var(--surface)] hover:border-[#D4A017] transition-all" onClick={() => navigate('/courses')}>← Browse</button>
          {user && <button className="px-4 py-1.5 rounded-full text-[13px] font-[600] bg-[#D4A017] text-[var(--text-primary)]" onClick={() => navigate(`/${user.role}`)}>My dashboard</button>}
        </div>
      </nav>

      <div className="pt-20 px-4 md:px-12 pb-16 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-7 items-start mt-4">
          {/* Main */}
          <div>
            {/* Hero card */}
            <div className="rounded-[14px] p-6 mb-5 border border-[var(--border)] dark:border-[rgba(212,160,23,.2)]" style={{ background: 'linear-gradient(135deg,#FDF6DC 0%,#FFF5CC 100%)' }}>
              <Tag>Web Development · {course.level}</Tag>
              <h1 className="text-[22px] font-[600] mt-2.5 mb-2.5 text-[var(--text-primary)] leading-[1.3]" style={{ fontFamily: 'Clash Display, sans-serif' }}>{course.title}</h1>
              <p className="text-[13px] text-[var(--text-secondary)] leading-[1.7] mb-4">{course.description}</p>
              <div className="flex gap-4 flex-wrap">
                <StarRating rating={course.rating} count={312} />
                <span className="text-[12px] text-[var(--text-tertiary)]">{course.students.toLocaleString()} students enrolled</span>
                <span className="text-[12px] text-[var(--text-tertiary)]">{course.hours} hours of video</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 mb-5 border-b border-[var(--border)]">
              {(['overview', 'curriculum', 'reviews'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-5 py-2.5 text-[13px] font-[600] border-none bg-none cursor-pointer border-b-[2.5px] capitalize transition-all ${tab === t ? 'text-[#D4A017] border-b-[#D4A017]' : 'text-[var(--text-tertiary)] border-b-transparent'}`}>
                  {t}
                </button>
              ))}
            </div>

            {tab === 'overview' && (
              <>
                {/* Free preview */}
                <div className="bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-[14px] p-5 mb-5 shadow-[0_1px_3px_rgba(0,0,0,.06)]">
                  <h3 className="text-[14px] font-[600] mb-4">📺 Free preview lesson</h3>
                  <div className="yt-embed-wrap">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1" allowFullScreen title="Course preview" />
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] mt-2.5">Lesson 1 of {totalLessons} · Introduction to {course.title}</p>
                </div>

                {/* What you'll learn */}
                <div className="bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-[14px] p-5 mb-5 shadow-[0_1px_3px_rgba(0,0,0,.06)]">
                  <h3 className="text-[14px] font-[600] mb-4">🎯 What you'll learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {['Master advanced component patterns', 'Build custom React hooks', 'Optimize performance with memoization', 'Implement code splitting', 'Handle complex state management', 'Write production-grade React apps'].map(item => (
                      <div key={item} className="flex items-start gap-2 text-[13px] text-[var(--text-secondary)]">
                        <span className="text-[#10B981] mt-0.5 flex-shrink-0">✓</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === 'curriculum' && (
              <div className="space-y-3">
                {DEMO_SECTIONS.map(section => {
                  const open = expandedSections.includes(section.id)
                  return (
                    <div key={section.id} className="border border-[var(--border)] rounded-[14px] overflow-hidden">
                      <button onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 bg-[var(--bg-tertiary)] transition-colors hover:bg-[var(--bg-secondary)] transition-colors transition-colors text-left">
                        <div>
                          <span className="text-[13px] font-[600]">{section.title}</span>
                          <span className="text-[11px] text-[var(--text-tertiary)] ml-2">{section.lessons.length} lessons</span>
                        </div>
                        <span className="text-[var(--text-tertiary)] transition-transform" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
                      </button>
                      {open && (
                        <div className="divide-y divide-[#E8E8E8]">
                          {section.lessons.map(lesson => (
                            <div key={lesson.id} className="flex items-center gap-3 p-3.5 hover:bg-[var(--surface-hover)] transition-colors">
                              <span className="text-[16px]">{lesson.completed ? '✅' : lesson.type === 'video' || lesson.type === 'both' ? '📺' : '📝'}</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-[13px] text-[var(--text-primary)] truncate">{lesson.title}</div>
                                {lesson.free_preview && <span className="text-[10px] text-[#D4A017] font-[600]">FREE PREVIEW</span>}
                              </div>
                              {lesson.duration && <span className="text-[11px] text-[var(--text-tertiary)] flex-shrink-0">{lesson.duration}</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {tab === 'reviews' && (
              <div className="bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-[14px] p-5 shadow-[0_1px_3px_rgba(0,0,0,.06)]">
                <h3 className="text-[14px] font-[600] mb-4">⭐ Student reviews</h3>
                <div className="flex gap-6 items-center p-4 bg-gradient-to-r from-[#FDF6DC] to-[#FFF5CC] rounded-[8px] mb-5 flex-wrap">
                  <div className="text-center">
                    <div className="text-[48px] font-[700] text-[#D4A017] leading-none" style={{ fontFamily: 'Clash Display, sans-serif' }}>{course.rating}</div>
                    <div className="text-[#D4A017] text-[18px] tracking-[2px]">★★★★★</div>
                    <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">Course rating</div>
                  </div>
                  <div className="flex-1 min-w-[160px] space-y-1.5">
                    {[[5, 78], [4, 16], [3, 4], [2, 1], [1, 1]].map(([s, p]) => (
                      <div key={s} className="flex items-center gap-2">
                        <span className="text-[11px] text-[var(--text-tertiary)] w-5 text-right">{s}</span>
                        <span className="text-[#D4A017] text-[11px]">★</span>
                        <ProgressBar value={p} className="flex-1" height={6} />
                        <span className="text-[11px] text-[var(--text-tertiary)] w-7">{p}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {[{ name: 'Ada Obi', rating: 5, text: "Best React course I've taken. The compound components section alone was worth it.", date: '2 weeks ago', avatar: 'AO', color: '#D4A017' },
                { name: 'Chidi Nwosu', rating: 5, text: 'Sarah explains complex patterns in a way that actually makes sense. Highly recommended.', date: '1 month ago', avatar: 'CN', color: '#10B981' }].map(r => (
                  <div key={r.name} className="border-b border-[var(--border)] last:border-0 py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-primary)] text-[12px] font-[700] flex-shrink-0" style={{ background: r.color }}>{r.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[13px] font-[600]">{r.name}</span>
                          <span className="text-[#D4A017] text-[12px]">{'★'.repeat(r.rating)}</span>
                          <span className="text-[11px] text-[var(--text-tertiary)]">{r.date}</span>
                        </div>
                        <p className="text-[13px] text-[var(--text-secondary)] leading-[1.6]">{r.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sticky sidebar */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-[14px] p-5 shadow-[0_8px_32px_rgba(212,160,23,.2)]">
              <div className="text-[32px] font-[700] text-[#D4A017] mb-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>₦{course.price.toLocaleString()}</div>
              {course.discount_price && <div className="text-[13px] text-[var(--text-tertiary)] line-through mb-3">₦{course.discount_price.toLocaleString()}</div>}
              <Btn className="w-full justify-center mb-4" onClick={handleEnroll}>Enroll now →</Btn>
              <div className="space-y-2 text-[12px] text-[var(--text-secondary)]">
                {[`📚 ${totalLessons} lessons`, `⏱ ${course.hours} hours of content`, '♾ Lifetime access', '📜 Certificate of completion', '📱 Mobile friendly'].map(item => (
                  <div key={item} className="flex items-center gap-2">{item}</div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#D4A017] flex items-center justify-center text-[var(--text-primary)] text-[11px] font-[700]">SK</div>
                  <div>
                    <div className="text-[12px] font-[600]">{course.instructor}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)]">Senior Software Engineer</div>
                  </div>
                </div>
                <div className="flex gap-3 text-[11px] text-[var(--text-tertiary)]">
                  <span>⭐ {course.rating} rating</span>·<span>{course.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        course={{ title: course.title, price: course.discount_price ?? course.price }}
        onTransferSent={handleTransferSent}
      />
    </div>
  )
}