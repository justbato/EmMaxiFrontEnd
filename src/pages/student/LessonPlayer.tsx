import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DEMO_COURSES, DEMO_SECTIONS } from '../../types'
import { ProgressBar, Btn } from '../../components/ui'
import { useNotif } from '../../context/NotifContext'

export function LessonPlayerPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { addNotification } = useNotif()
  const [activeLessonId, setActiveLessonId] = useState('l1')
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(['l1', 'l2', 'l3', 'l4']))
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [qaText, setQaText] = useState('')
  const [qaSubmitted, setQaSubmitted] = useState(false)

  const course = DEMO_COURSES.find(c => c.id === courseId) || DEMO_COURSES[0]
  const allLessons = DEMO_SECTIONS.flatMap(s => s.lessons)
  const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0]
  const activeSectionTitle = DEMO_SECTIONS.find(s => s.lessons.some(l => l.id === activeLessonId))?.title || ''

  const totalLessons = allLessons.length
  const completedCount = completedLessons.size
  const progress = Math.round((completedCount / totalLessons) * 100)

  const markComplete = () => {
    setCompletedLessons(prev => new Set([...prev, activeLessonId]))
    // Go next
    const idx = allLessons.findIndex(l => l.id === activeLessonId)
    if (idx < allLessons.length - 1) setActiveLessonId(allLessons[idx + 1].id)
  }

  const submitQuestion = () => {
    if (!qaText.trim()) return
    setQaSubmitted(true)
    addNotification({ type: 'general', title: 'Question submitted', body: `Your question about "${activeLesson.title}" has been submitted.`, date: 'Just now', icon: '❓', color: '#D4A017' })
    setTimeout(() => { setQaText(''); setQaSubmitted(false) }, 3000)
  }

  return (
    <div className="flex h-screen bg-[#111] overflow-hidden">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-[rgba(0,0,0,.6)] z-[49] lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Lesson list sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed lg:relative top-0 left-0 h-full w-[280px] bg-[#1a1a1a] border-r border-[rgba(255,255,255,.08)] flex flex-col z-50 transition-transform duration-300`}>
        {/* Sidebar header */}
        <div className="p-4 border-b border-[rgba(255,255,255,.08)] flex-shrink-0">
          <button onClick={() => navigate(`/courses/${course.id}`)} className="text-[#D4A017] text-[12px] font-[600] mb-3 flex items-center gap-1 hover:opacity-80">
            ← Back to course
          </button>
          <div className="text-[13px] font-[600] text-white leading-[1.3] mb-2">{course.title}</div>
          <div className="flex items-center gap-2 mb-1">
            <ProgressBar value={progress} className="flex-1" height={4} />
            <span className="text-[11px] text-[#D4A017] font-[600] flex-shrink-0">{progress}%</span>
          </div>
          <div className="text-[10px] text-[rgba(255,255,255,.4)]">{completedCount}/{totalLessons} lessons</div>
        </div>

        {/* Lessons */}
        <div className="flex-1 overflow-y-auto">
          {DEMO_SECTIONS.map(section => (
            <div key={section.id}>
              <div className="px-4 py-2.5 text-[10px] text-[rgba(255,255,255,.3)] uppercase tracking-[.1em] font-[700] bg-[rgba(255,255,255,.03)]">
                {section.title}
              </div>
              {section.lessons.map((lesson, i) => {
                const isActive = lesson.id === activeLessonId
                const isDone = completedLessons.has(lesson.id)
                return (
                  <div key={lesson.id} onClick={() => { setActiveLessonId(lesson.id); setSidebarOpen(false) }}
                    className={`lesson-item flex items-start gap-3 px-4 py-3 cursor-pointer transition-all ${isActive ? 'active bg-[rgba(212,160,23,.12)]' : ''} ${isActive ? 'border-l-[3px] border-l-[#D4A017]' : 'border-l-[3px] border-l-transparent'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 ${isDone ? 'bg-[#10B981] text-white' : isActive ? 'bg-[#D4A017] text-[#111]' : 'border border-[rgba(255,255,255,.2)] text-[rgba(255,255,255,.3)]'}`}>
                      {isDone ? '✓' : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[12px] leading-[1.4] ${isActive ? 'text-[#D4A017] font-[600]' : isDone ? 'text-[rgba(255,255,255,.5)]' : 'text-[rgba(255,255,255,.7)]'}`}>{lesson.title}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-[rgba(255,255,255,.3)]">{lesson.type === 'video' ? '📺' : lesson.type === 'text' ? '📝' : '⚡'}</span>
                        {lesson.duration && <span className="text-[10px] text-[rgba(255,255,255,.3)]">{lesson.duration}</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-[#1a1a1a] border-b border-[rgba(255,255,255,.08)] px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[rgba(255,255,255,.6)] hover:text-white transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div>
              <div className="text-[13px] font-[600] text-white">{activeLesson.title}</div>
              <div className="text-[11px] text-[rgba(255,255,255,.4)]">{activeSectionTitle}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!completedLessons.has(activeLessonId) && (
              <Btn size="sm" onClick={markComplete}>✓ Mark complete</Btn>
            )}
            {completedLessons.has(activeLessonId) && (
              <span className="text-[12px] text-[#10B981] font-[600]">✓ Completed</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5]">
          {/* Video */}
          {(activeLesson.type === 'video' || activeLesson.type === 'both') && (
            <div className="bg-[#111] aspect-video max-h-[55vh] w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${activeLesson.youtube_url || 'dQw4w9WgXcQ'}?rel=0&modestbranding=1`}
                allowFullScreen
                title={activeLesson.title}
              />
            </div>
          )}

          <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-[20px] font-[700] text-[#111] mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>{activeLesson.title}</h1>

            {/* Text content */}
            {(activeLesson.type === 'text' || activeLesson.type === 'both') && activeLesson.content && (
              <div className="bg-white border border-[#E8E8E8] rounded-[14px] p-6 mb-6 text-[14px] text-[#333] leading-[1.8]">
                <p>{activeLesson.content}</p>
                <div className="mt-4 p-4 bg-[#FDF6DC] border border-[rgba(212,160,23,.2)] rounded-[8px]">
                  <strong className="text-[#7A5A00] block mb-1">Key takeaway</strong>
                  <p className="text-[13px] text-[#7A5A00]">Understanding this concept will help you write more maintainable and performant React applications.</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <Btn variant="outline" size="sm" onClick={() => {
                const idx = allLessons.findIndex(l => l.id === activeLessonId)
                if (idx > 0) setActiveLessonId(allLessons[idx - 1].id)
              }}>← Previous</Btn>
              <Btn size="sm" onClick={() => {
                markComplete()
              }}>Next lesson →</Btn>
            </div>

            {/* Q&A */}
            <div className="bg-white border border-[#E8E8E8] rounded-[14px] p-5">
              <h3 className="text-[14px] font-[700] mb-4">❓ Ask a question</h3>
              {qaSubmitted ? (
                <div className="bg-[#D1FAE5] border border-[#86EFAC] rounded-[8px] p-4 text-[13px] text-[#065F46] font-[600] text-center">
                  ✓ Question submitted! Your instructor will reply soon.
                </div>
              ) : (
                <>
                  <textarea
                    rows={3}
                    placeholder={`Ask about "${activeLesson.title}"…`}
                    value={qaText}
                    onChange={e => setQaText(e.target.value)}
                    className="w-full px-4 py-3 border-[1.5px] border-[#D0D0D0] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors resize-y"
                  />
                  <Btn size="sm" className="mt-2" onClick={submitQuestion} disabled={!qaText.trim()}>Submit question →</Btn>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
