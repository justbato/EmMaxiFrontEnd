import { useState } from 'react'
import { Btn, Toast } from '../ui'

interface Module {
  title: string
  lessons: string[]
}

interface CoursePreviewData {
  id: string
  title: string
  instructor: string
  description: string
  emoji: string
  gradient: string
  modules: Module[]
  price: number
  submitted: string
}

interface Props {
  course: CoursePreviewData | null
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string, feedback: string) => void
}

export function CoursePreviewModal({ course, onClose, onApprove, onReject }: Props) {
  const [rejecting, setRejecting] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [toast, setToast] = useState('')

  if (!course) return null

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  const handleApprove = () => {
    onApprove(course.id)
    showToast('Course approved ✓')
    setTimeout(onClose, 800)
  }

  const handleReject = () => {
    if (!rejecting) { setRejecting(true); return }
    if (!feedback.trim()) { showToast('Please enter rejection feedback'); return }
    onReject(course.id, feedback)
    showToast('Course rejected — feedback sent')
    setTimeout(onClose, 800)
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,.65)] backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_24px_80px_rgba(0,0,0,.3)] animate-[pageSlideIn_.25s_both]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="rounded-t-[20px] p-8 relative overflow-hidden" style={{ background: course.gradient }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[rgba(0,0,0,.15)] flex items-center justify-center text-white text-[14px] hover:bg-[rgba(0,0,0,.3)] transition-colors">✕</button>
          <div className="text-[48px] mb-3">{course.emoji}</div>
          <h2 className="text-[20px] font-[700] text-[#111] mb-1">{course.title}</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[13px] text-[#333] font-[500]">by {course.instructor}</span>
            <span className="text-[11px] bg-[rgba(0,0,0,.1)] px-3 py-1 rounded-full text-[#333]">Submitted {course.submitted}</span>
            <span className="text-[13px] font-[700] text-[#D4A017]">₦{course.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-[13px] font-[700] text-[#6B6B6B] uppercase tracking-[.07em] mb-2">Course Description</h3>
            <p className="text-[14px] text-[#333] leading-[1.7]">{course.description}</p>
          </div>

          {/* Curriculum */}
          <div className="mb-6">
            <h3 className="text-[13px] font-[700] text-[#6B6B6B] uppercase tracking-[.07em] mb-3">Curriculum Outline</h3>
            <div className="space-y-3">
              {course.modules.map((mod, mi) => (
                <div key={mi} className="border border-[#E8E8E8] rounded-[10px] overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#F9F9F9]">
                    <span className="w-6 h-6 rounded-full bg-[#D4A017] text-[#111] text-[11px] font-[700] flex items-center justify-center flex-shrink-0">{mi + 1}</span>
                    <span className="text-[13px] font-[600] text-[#111]">{mod.title}</span>
                    <span className="ml-auto text-[11px] text-[#6B6B6B]">{mod.lessons.length} lessons</span>
                  </div>
                  <div className="px-4 py-2">
                    {mod.lessons.map((lesson, li) => (
                      <div key={li} className="flex items-center gap-2 py-1.5 border-b border-[#F0F0F0] last:border-0">
                        <svg className="w-3 h-3 text-[#6B6B6B] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        <span className="text-[12px] text-[#555]">{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rejection feedback */}
          {rejecting && (
            <div className="mb-5 border border-[#FEE2E2] rounded-[12px] p-4 bg-[#FFF5F5]">
              <label className="block text-[12px] font-[700] text-[#991B1B] mb-2">
                ✕ Rejection Feedback <span className="font-normal text-[#6B6B6B]">(required — will be sent to instructor)</span>
              </label>
              <textarea
                rows={4}
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Explain why this course is being rejected and what the instructor should improve…"
                className="w-full px-3 py-2.5 border-[1.5px] border-[#FCA5A5] rounded-[8px] text-[13px] outline-none focus:border-[#EF4444] resize-y transition-colors bg-white"
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            <Btn variant="success" onClick={handleApprove}>✓ Approve Course</Btn>
            <Btn variant="danger" onClick={handleReject}>
              {rejecting ? 'Submit Rejection' : '✕ Reject Course'}
            </Btn>
            {rejecting && (
              <Btn variant="ghost" onClick={() => { setRejecting(false); setFeedback('') }}>Cancel</Btn>
            )}
          </div>
        </div>

        {toast && <Toast message={toast} color={toast.includes('approved') ? '#10B981' : toast.includes('rejected') ? '#EF4444' : '#D4A017'} />}
      </div>
    </div>
  )
}
