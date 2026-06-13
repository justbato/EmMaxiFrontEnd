import { useState } from 'react'
import { DashLayout } from '../../components/layout/DashLayout'
import { Card, Btn, Toast } from '../../components/ui'

const NAV = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Home', path: '/' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, label: 'Dashboard', path: '/student' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, label: 'My Courses', path: '/student/courses' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>, label: 'Certificates', path: '/student/certificates' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>, label: 'Browse Courses', path: '/courses' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>, label: 'Settings', path: '/student/settings' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, label: 'Report Issue', path: '/student/report' },
]

export function StudentReportPage() {
  const [category, setCategory] = useState('')
  const [offender, setOffender] = useState('')
  const [description, setDescription] = useState('')
  const [fileName, setFileName] = useState('')
  const [toast, setToast] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [myReports, setMyReports] = useState([
    { id: 'r1', type: 'Instructor Behaviour', against: '@kofi_asante', status: 'processing', date: '1d ago', feedback: '' },
    { id: 'r2', type: 'Technical Issue', against: 'N/A', status: 'dismissed', date: '1w ago', feedback: 'We investigated the video playback issue but could not reproduce it. Please ensure your browser is up to date.' }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!category || !description.trim()) return
    setSubmitting(true)
    setTimeout(() => {
      setMyReports(prev => [{
        id: `r${Date.now()}`,
        type: category.replace('_', ' '),
        against: offender || 'N/A',
        status: 'pending',
        date: 'Just now',
        feedback: ''
      }, ...prev])
      setToast('Report submitted successfully. We will review it shortly.')
      setCategory('')
      setOffender('')
      setDescription('')
      setFileName('')
      setSubmitting(false)
      setTimeout(() => setToast(''), 3000)
    }, 800)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <DashLayout sidebarItems={NAV} title="Report an Issue" subtitle="Help us keep EmMaxi safe and functional">
      <Card className="p-6 max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-[12px] font-[600] text-[#333] mb-2">Category *</label>
            <select
              required
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 border-[1.5px] border-[#D0D0D0] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] bg-white transition-colors"
            >
              <option value="">Select an issue type...</option>
              <option value="course_content">Course Content Issue</option>
              <option value="instructor_behavior">Instructor Behaviour</option>
              <option value="technical_issue">Technical Issue</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-[12px] font-[600] text-[#333] mb-2">Tag Offender (Optional)</label>
            <input
              type="text"
              value={offender}
              onChange={e => setOffender(e.target.value)}
              placeholder="e.g. @username"
              className="w-full px-3 py-2.5 border-[1.5px] border-[#D0D0D0] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] bg-white transition-colors"
            />
          </div>

          <div className="mb-5">
            <label className="block text-[12px] font-[600] text-[#333] mb-2">Description *</label>
            <textarea
              required
              rows={6}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Please provide details about the issue you are experiencing..."
              className="w-full px-3 py-2.5 border-[1.5px] border-[#D0D0D0] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] resize-y transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[12px] font-[600] text-[#333] mb-2">Attachment (Optional)</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border-[1.5px] border-[#D0D0D0] rounded-[8px] hover:border-[#D4A017] hover:text-[#D4A017] transition-colors text-[13px] font-[500] text-[#333]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                Choose File
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
              <span className="text-[12px] text-[#6B6B6B] truncate max-w-[200px]">
                {fileName || 'No file chosen'}
              </span>
            </div>
          </div>

          <Btn type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Report'}
          </Btn>
        </form>
      </Card>

      <div className="max-w-xl mt-8">
        <h3 className="text-[15px] font-[700] mb-4">My Reports</h3>
        {myReports.length === 0 ? (
          <p className="text-[13px] text-[#6B6B6B]">You haven't submitted any reports yet.</p>
        ) : (
          <div className="space-y-3">
            {myReports.map(r => (
              <Card key={r.id} className="p-4 border border-[#E8E8E8]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[13px] font-[600] text-[#111] capitalize">{r.type}</span>
                      <span className={`inline-block px-[8px] py-[2px] rounded-full text-[10px] font-[600] ${r.status === 'pending' ? 'bg-[#FEE2E2] text-[#991B1B]' : r.status === 'processing' ? 'bg-[#FEF3C7] text-[#92400E]' : r.status === 'dismissed' ? 'bg-[#E5E7EB] text-[#374151]' : 'bg-[#D1FAE5] text-[#065F46]'}`}>
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#6B6B6B] mb-2">
                      Against: <strong className="text-[#333]">{r.against}</strong> · {r.date}
                    </div>
                    {r.feedback && (
                      <div className="bg-[#FDF6DC] border border-[rgba(212,160,23,.2)] rounded-[8px] p-2.5 mt-2">
                        <div className="text-[10px] font-[700] text-[#D4A017] uppercase tracking-[.06em] mb-1">Admin Feedback</div>
                        <p className="text-[12px] text-[#333] leading-[1.5]">{r.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {toast && <Toast message={toast} color="#10B981" />}
    </DashLayout>
  )
}
