import { type ReactNode, useState } from 'react'
import { Btn, Textarea } from '../ui'

// ── Modal base ──────────────────────────────────────────────
function ModalBase({ open, onClose, children, maxWidth = 480 }: { open: boolean; onClose: () => void; children: ReactNode; maxWidth?: number }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[9700] bg-[rgba(0,0,0,.5)] backdrop-blur-[4px] flex items-center justify-center p-5 animate-[fadeIn_.2s_both]"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-[20px] shadow-[0_24px_64px_rgba(0,0,0,.2)] animate-[pageSlideIn_.3s_both] w-full overflow-y-auto max-h-[90vh]"
        style={{ maxWidth }}>
        {children}
      </div>
    </div>
  )
}

// ── Enrollment Confirmation Modal ────────────────────────────
export function EnrollConfirmModal({ open, onClose, onConfirm, course }: {
  open: boolean; onClose: () => void; onConfirm: () => void; course?: { title: string; price: number }
}) {
  return (
    <ModalBase open={open} onClose={onClose} maxWidth={440}>
      <div className="p-7 text-center">
        <div className="text-[48px] mb-4">🎓</div>
        <h2 className="text-[18px] font-[700] mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>Confirm enrollment</h2>
        <p className="text-[13px] text-[#6B6B6B] mb-2 leading-[1.6]">You're about to enroll in</p>
        <p className="text-[15px] font-[600] text-[#111] mb-4">{course?.title}</p>
        <div className="bg-[#FDF6DC] rounded-[8px] p-4 mb-6 border border-[rgba(212,160,23,.2)]">
          <div className="text-[28px] font-[700] text-[#D4A017]">₦{course?.price.toLocaleString()}</div>
          <div className="text-[11px] text-[#7A5A00] mt-1">One-time payment · Lifetime access</div>
        </div>
        <div className="flex gap-3">
          <Btn variant="outline" className="flex-1 justify-center" onClick={onClose}>Cancel</Btn>
          <Btn className="flex-1 justify-center" onClick={onConfirm}>Enroll now →</Btn>
        </div>
      </div>
    </ModalBase>
  )
}

// ── Enrollment Success Modal ─────────────────────────────────
export function EnrollSuccessModal({ open, onClose, course }: {
  open: boolean; onClose: () => void; course?: { title: string }
}) {
  return (
    <ModalBase open={open} onClose={onClose} maxWidth={420}>
      <div className="p-7 text-center">
        <div className="w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center text-[32px] mx-auto mb-4">✓</div>
        <h2 className="text-[20px] font-[700] mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>You're enrolled!</h2>
        <p className="text-[13px] text-[#6B6B6B] mb-4 leading-[1.6]">
          Welcome to <strong className="text-[#111]">{course?.title}</strong>. Start learning at your own pace and track your progress.
        </p>
        <div className="bg-[#FDF6DC] rounded-[14px] p-4 mb-6 border border-[rgba(212,160,23,.15)]">
          <div className="flex items-center gap-3 text-left">
            <span className="text-[24px]">🎯</span>
            <div>
              <div className="text-[12px] font-[600] text-[#111]">What's next?</div>
              <div className="text-[11px] text-[#6B6B6B] mt-0.5">Head to your dashboard to start your first lesson</div>
            </div>
          </div>
        </div>
        <Btn className="w-full justify-center" onClick={onClose}>Go to my courses →</Btn>
      </div>
    </ModalBase>
  )
}

// ── Certificate Preview Modal ────────────────────────────────
export function CertModal({ open, onClose, studentName = 'Ada Obi', courseTitle = 'Advanced React Patterns' }: {
  open: boolean; onClose: () => void; studentName?: string; courseTitle?: string
}) {
  return (
    <ModalBase open={open} onClose={onClose} maxWidth={560}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-[600]">Certificate preview</h2>
          <button onClick={onClose} className="text-[#6B6B6B] text-[20px] hover:text-[#111]">✕</button>
        </div>
        {/* Certificate */}
        <div className="border-[3px] border-[#D4A017] rounded-[14px] p-8 text-center bg-gradient-to-br from-[#FDF6DC] to-[#FFF5CC] mb-5">
          <div className="text-[11px] uppercase tracking-[.15em] text-[#7A5A00] font-[700] mb-3">Certificate of Completion</div>
          <div className="text-[26px] font-[700] mb-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>Em<span className="text-[#D4A017]">Maxi</span></div>
          <div className="h-px bg-[rgba(212,160,23,.3)] my-4" />
          <div className="text-[12px] text-[#7A5A00] mb-1">This certifies that</div>
          <div className="text-[24px] font-[700] text-[#111] mb-2">{studentName}</div>
          <div className="text-[12px] text-[#6B6B6B] mb-1">has successfully completed</div>
          <div className="text-[16px] font-[600] text-[#111] mb-4">{courseTitle}</div>
          <div className="flex justify-between text-[10px] text-[#6B6B6B]">
            <span>Date: June 2026</span>
            <span>ID: CERT-2026-001</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Btn variant="outline" className="flex-1 justify-center" onClick={onClose}>Close</Btn>
          <Btn className="flex-1 justify-center">⬇ Download PDF</Btn>
        </div>
      </div>
    </ModalBase>
  )
}

// ── Submit for Review Modal ──────────────────────────────────
export function SubmitReviewModal({ open, onClose, onConfirm, courseTitle }: {
  open: boolean; onClose: () => void; onConfirm: () => void; courseTitle?: string
}) {
  return (
    <ModalBase open={open} onClose={onClose} maxWidth={440}>
      <div className="p-7">
        <div className="text-[32px] text-center mb-4">📋</div>
        <h2 className="text-[18px] font-[700] text-center mb-2">Submit for review</h2>
        <p className="text-[13px] text-[#6B6B6B] text-center mb-6 leading-[1.6]">
          Submit <strong className="text-[#111]">{courseTitle}</strong> for the EmMaxi team to review. You'll be notified within 2–3 business days.
        </p>
        <div className="bg-[#FDF6DC] rounded-[8px] p-4 mb-6 border border-[rgba(212,160,23,.2)]">
          <div className="text-[11px] text-[#7A5A00] space-y-1">
            <div>✓ Course content will be reviewed for quality</div>
            <div>✓ Pricing and descriptions will be verified</div>
            <div>✓ You can edit the course after approval</div>
          </div>
        </div>
        <div className="flex gap-3">
          <Btn variant="outline" className="flex-1 justify-center" onClick={onClose}>Cancel</Btn>
          <Btn className="flex-1 justify-center" onClick={onConfirm}>Submit →</Btn>
        </div>
      </div>
    </ModalBase>
  )
}

// ── QA Reply Modal ───────────────────────────────────────────
export function QAReplyModal({ open, onClose, onSubmit, studentName }: {
  open: boolean; onClose: () => void; onSubmit: (text: string) => void; studentName?: string
}) {
  const [text, setText] = useState('')
  const [err, setErr] = useState(false)
  const submit = () => {
    if (!text.trim()) { setErr(true); return }
    onSubmit(text.trim())
    setText(''); setErr(false); onClose()
  }
  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="p-7">
        <div className="text-[15px] font-[600] mb-1">Reply to {studentName}</div>
        <div className="text-[12px] text-[#6B6B6B] mb-4">Your response will be visible to all enrolled students.</div>
        <Textarea rows={5} placeholder="Write a thorough, helpful reply…" value={text}
          onChange={e => { setText(e.target.value); setErr(false) }}
          error={err ? 'Please write a reply before submitting.' : undefined} />
        <div className="flex gap-3 mt-2">
          <Btn variant="outline" className="flex-1 justify-center" onClick={onClose}>Cancel</Btn>
          <Btn className="flex-1 justify-center" onClick={submit}>Post reply →</Btn>
        </div>
      </div>
    </ModalBase>
  )
}

// ── Forgot Password Modal ────────────────────────────────────
export function ForgotPasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const handleSend = () => { if (email) setSent(true) }
  return (
    <ModalBase open={open} onClose={onClose} maxWidth={420}>
      <div className="p-7">
        <div className="text-[18px] font-[700] mb-1">Reset password</div>
        {sent ? (
          <div className="text-center py-6">
            <div className="text-[48px] mb-3">📬</div>
            <div className="text-[14px] font-[600] mb-2">Check your email</div>
            <div className="text-[13px] text-[#6B6B6B] mb-5">We sent a reset link to <strong>{email}</strong></div>
            <Btn className="w-full justify-center" onClick={() => { setSent(false); onClose() }}>Done</Btn>
          </div>
        ) : (
          <>
            <p className="text-[13px] text-[#6B6B6B] mb-5">Enter your email and we'll send you a reset link.</p>
            <div className="mb-4">
              <label className="block text-[12px] font-[600] text-[#333] mb-1">Email</label>
              <input type="email" className="w-full px-[14px] py-[10px] border-[1.5px] border-[#D0D0D0] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors"
                placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <Btn variant="outline" className="flex-1 justify-center" onClick={onClose}>Cancel</Btn>
              <Btn className="flex-1 justify-center" onClick={handleSend}>Send link →</Btn>
            </div>
          </>
        )}
      </div>
    </ModalBase>
  )
}
