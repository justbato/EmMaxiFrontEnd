import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashLayout } from '../../components/layout/DashLayout'
import { Btn, Card, Toast } from '../../components/ui'
import { SubmitReviewModal } from '../../components/modals'

const NAV = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Home', path: '/' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, label: 'Dashboard', path: '/instructor' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>, label: 'Course Builder', path: '/instructor/builder' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, label: 'Report Issue', path: '/instructor/report' },
]

const STEPS = ['Basic Info', 'Details', 'Curriculum', 'Pricing', 'Submit']
const CATEGORIES = ['Web Development', 'Data Science', 'Design', 'Mobile', 'Business', 'Cloud', 'Security']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

interface Lesson {
  id: string; title: string; type: 'video' | 'text' | 'both'; ytUrl: string; content: string
}
interface Section { id: string; title: string; lessons: Lesson[] }

function newLesson(): Lesson { return { id: Date.now().toString(), title: '', type: 'text', ytUrl: '', content: '' } }
function newSection(): Section { return { id: Date.now().toString(), title: 'New Section', lessons: [newLesson()] } }

export function CourseBuilderPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [submitOpen, setSubmitOpen] = useState(false)
  const [toast, setToast] = useState('')

  // Step 1
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Step 2
  const [fullDesc, setFullDesc] = useState('')
  const [outcomes, setOutcomes] = useState(['', '', ''])
  const [requirements, setRequirements] = useState('')
  const [language, setLanguage] = useState('English')

  // Step 3 – curriculum
  const [sections, setSections] = useState<Section[]>([newSection()])

  // Step 4
  const [priceType, setPriceType] = useState<'paid' | 'free' | 'subscription'>('paid')
  const [price, setPrice] = useState('12000')
  const [discountPrice, setDiscountPrice] = useState('')
  const [coupon, setCoupon] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  const validateStep = () => {
    if (step === 0) {
      const errs: Record<string, string> = {}
      if (!title.trim()) errs.title = 'Course title is required'
      if (!category) errs.category = 'Select a category'
      if (!level) errs.level = 'Select a level'
      if (!shortDesc.trim()) errs.shortDesc = 'Short description is required'
      setErrors(errs)
      return Object.keys(errs).length === 0
    }
    return true
  }

  const nextStep = () => { if (validateStep()) setStep(s => Math.min(s + 1, STEPS.length - 1)) }
  const prevStep = () => setStep(s => Math.max(s - 1, 0))

  const addSection = () => setSections(prev => [...prev, newSection()])
  const removeSection = (id: string) => setSections(prev => prev.filter(s => s.id !== id))
  const updateSection = (id: string, title: string) => setSections(prev => prev.map(s => s.id === id ? { ...s, title } : s))
  const addLesson = (sectionId: string) => setSections(prev => prev.map(s => s.id === sectionId ? { ...s, lessons: [...s.lessons, newLesson()] } : s))
  const removeLesson = (sectionId: string, lessonId: string) => setSections(prev => prev.map(s => s.id === sectionId ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) } : s))
  const updateLesson = (sectionId: string, lessonId: string, field: keyof Lesson, value: string) =>
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, lessons: s.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l) } : s))

  const handleSubmit = () => { setSubmitOpen(false); showToast('Course submitted for review! ✓'); navigate('/instructor') }

  const inputClass = (err?: string) => `w-full px-3 py-2.5 border-[1.5px] rounded-[8px] text-[13px] outline-none transition-all focus:border-[#D4A017] focus:shadow-[0_0_0_3px_rgba(212,160,23,.15)] ${err ? 'border-[#EF4444]' : 'border-[#D0D0D0]'}`

  return (
    <DashLayout sidebarItems={NAV} title="Course Builder" subtitle="Create and publish a new course">
      <div className="max-w-3xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center mb-8 overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-shrink-0">
              <div onClick={() => i < step && setStep(i)} className={`flex items-center gap-2 cursor-pointer ${i <= step ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-[700] transition-all ${i < step ? 'bg-[#10B981] text-white' : i === step ? 'bg-[#D4A017] text-[#111]' : 'bg-[#E8E8E8] text-[#6B6B6B]'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-[12px] font-[600] hidden sm:block ${i === step ? 'text-[#D4A017]' : 'text-[#6B6B6B]'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`w-8 sm:w-16 h-px mx-2 flex-shrink-0 ${i < step ? 'bg-[#10B981]' : 'bg-[#E8E8E8]'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 0 && (
          <Card className="p-6">
            <h2 className="text-[15px] font-[700] mb-1">Step 1 — Basic information</h2>
            <p className="text-[12px] text-[#6B6B6B] mb-5">Fill in the core details that help students find your course.</p>
            <div className="mb-4">
              <label className="block text-[12px] font-[600] text-[#333] mb-1">Course title *</label>
              <input value={title} onChange={e => { setTitle(e.target.value); setErrors(p => ({ ...p, title: '' })) }} placeholder="e.g. Advanced React Patterns & Performance" className={inputClass(errors.title)} />
              {errors.title && <p className="text-[11px] text-[#EF4444] mt-1">{errors.title}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[12px] font-[600] text-[#333] mb-1">Category *</label>
                <select value={category} onChange={e => { setCategory(e.target.value); setErrors(p => ({ ...p, category: '' })) }} className={inputClass(errors.category)}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                {errors.category && <p className="text-[11px] text-[#EF4444] mt-1">{errors.category}</p>}
              </div>
              <div>
                <label className="block text-[12px] font-[600] text-[#333] mb-1">Level *</label>
                <select value={level} onChange={e => { setLevel(e.target.value); setErrors(p => ({ ...p, level: '' })) }} className={inputClass(errors.level)}>
                  <option value="">Select level</option>
                  {LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
                {errors.level && <p className="text-[11px] text-[#EF4444] mt-1">{errors.level}</p>}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[12px] font-[600] text-[#333] mb-1">Short description * <span className="font-normal text-[#6B6B6B]">(shown in course cards)</span></label>
              <textarea rows={2} value={shortDesc} onChange={e => { setShortDesc(e.target.value); setErrors(p => ({ ...p, shortDesc: '' })) }} placeholder="One or two sentences summarising your course…" className={`${inputClass(errors.shortDesc)} resize-none`} />
              {errors.shortDesc && <p className="text-[11px] text-[#EF4444] mt-1">{errors.shortDesc}</p>}
            </div>
          </Card>
        )}

        {/* Step 2: Details */}
        {step === 1 && (
          <Card className="p-6">
            <h2 className="text-[15px] font-[700] mb-1">Step 2 — Course details</h2>
            <p className="text-[12px] text-[#6B6B6B] mb-5">Add a full description, learning outcomes, and requirements.</p>
            <div className="mb-4">
              <label className="block text-[12px] font-[600] text-[#333] mb-1">Full description</label>
              <textarea rows={5} value={fullDesc} onChange={e => setFullDesc(e.target.value)} placeholder="Describe what students will learn, who it's for, and what makes this course unique…" className={`${inputClass()} resize-y`} />
            </div>
            <div className="mb-4">
              <label className="block text-[12px] font-[600] text-[#333] mb-2">Learning outcomes <span className="text-[#6B6B6B] font-normal">(what students will be able to do)</span></label>
              {outcomes.map((o, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <span className="text-[#10B981] font-[700] text-[13px] flex-shrink-0">✓</span>
                  <input value={o} onChange={e => setOutcomes(prev => prev.map((x, j) => j === i ? e.target.value : x))} placeholder={`Outcome ${i + 1}…`} className={inputClass()} />
                  {i === outcomes.length - 1 && <button onClick={() => setOutcomes(prev => [...prev, ''])} className="text-[#D4A017] font-[700] text-[18px] flex-shrink-0 hover:opacity-70">+</button>}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-[600] text-[#333] mb-1">Requirements / prerequisites</label>
                <textarea rows={3} value={requirements} onChange={e => setRequirements(e.target.value)} placeholder="e.g. Basic JavaScript knowledge…" className={`${inputClass()} resize-none`} />
              </div>
              <div>
                <label className="block text-[12px] font-[600] text-[#333] mb-1">Language</label>
                <select value={language} onChange={e => setLanguage(e.target.value)} className={inputClass()}>
                  {['English', 'Yoruba', 'Igbo', 'Hausa', 'Pidgin'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Curriculum */}
        {step === 2 && (
          <div className="space-y-4">
            <Card className="p-5">
              <h2 className="text-[15px] font-[700] mb-1">Step 3 — Curriculum</h2>
              <p className="text-[12px] text-[#6B6B6B]">Organise your course into sections and lessons. Each lesson can be a video, text, or both.</p>
            </Card>
            {sections.map((section, si) => (
              <Card key={section.id} className="overflow-hidden">
                {/* Section header */}
                <div className="bg-[#F9F9F9] px-4 py-3 flex items-center gap-3 border-b border-[#E8E8E8]">
                  <span className="text-[11px] font-[700] text-[#6B6B6B]">§{si + 1}</span>
                  <input value={section.title} onChange={e => updateSection(section.id, e.target.value)} className="flex-1 bg-transparent border-none outline-none text-[13px] font-[600] text-[#111]" />
                  <button onClick={() => removeSection(section.id)} className="text-[#6B6B6B] hover:text-[#EF4444] transition-colors text-[16px]">✕</button>
                </div>
                {/* Lessons */}
                <div className="divide-y divide-[#E8E8E8]">
                  {section.lessons.map((lesson, li) => (
                    <div key={lesson.id} className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-[#D4A017] text-[#111] text-[10px] font-[700] flex items-center justify-center flex-shrink-0">{li + 1}</div>
                        <input value={lesson.title} onChange={e => updateLesson(section.id, lesson.id, 'title', e.target.value)} placeholder="Lesson title…" className="flex-1 px-2.5 py-1.5 border-[1.5px] border-[#D0D0D0] rounded-[6px] text-[12px] outline-none focus:border-[#D4A017]" />
                        <button onClick={() => removeLesson(section.id, lesson.id)} className="text-[#6B6B6B] hover:text-[#EF4444] transition-colors">✕</button>
                      </div>
                      {/* Type picker */}
                      <div className="flex gap-2 mb-3">
                        {(['video', 'text', 'both'] as const).map(type => (
                          <button key={type} onClick={() => updateLesson(section.id, lesson.id, 'type', type)}
                            className={`px-3 py-1 rounded-full text-[11px] font-[600] border-[1.5px] transition-all ${lesson.type === type ? 'border-[#D4A017] bg-[#D4A017] text-[#111]' : 'border-[#D0D0D0] bg-white text-[#333] hover:border-[#D4A017]'}`}>
                            {type === 'video' ? '📺 Video' : type === 'text' ? '📝 Text' : '⚡ Both'}
                          </button>
                        ))}
                      </div>
                      {(lesson.type === 'video' || lesson.type === 'both') && (
                        <div className="mb-3">
                          <label className="text-[11px] text-[#6B6B6B] font-[600] block mb-1">YouTube video URL</label>
                          <input value={lesson.ytUrl} onChange={e => updateLesson(section.id, lesson.id, 'ytUrl', e.target.value)} placeholder="https://www.youtube.com/watch?v=…" className="w-full px-3 py-2 border-[1.5px] border-[#D0D0D0] rounded-[6px] text-[12px] outline-none focus:border-[#D4A017]" />
                        </div>
                      )}
                      {(lesson.type === 'text' || lesson.type === 'both') && (
                        <div>
                          <label className="text-[11px] text-[#6B6B6B] font-[600] block mb-1">Lesson text content</label>
                          <textarea rows={3} value={lesson.content} onChange={e => updateLesson(section.id, lesson.id, 'content', e.target.value)} placeholder="Write your lesson content here…" className="w-full px-3 py-2 border-[1.5px] border-[#D0D0D0] rounded-[6px] text-[12px] outline-none focus:border-[#D4A017] resize-y" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-[#E8E8E8]">
                  <button onClick={() => addLesson(section.id)} className="text-[12px] text-[#D4A017] font-[600] hover:opacity-70 transition-opacity">+ Add lesson</button>
                </div>
              </Card>
            ))}
            <button onClick={addSection} className="w-full py-3 border-[1.5px] border-dashed border-[#D0D0D0] rounded-[14px] text-[13px] font-[500] text-[#6B6B6B] hover:border-[#D4A017] hover:text-[#D4A017] transition-all">
              + Add new section
            </button>
          </div>
        )}

        {/* Step 4: Pricing */}
        {step === 3 && (
          <Card className="p-6">
            <h2 className="text-[15px] font-[700] mb-1">Step 4 — Pricing</h2>
            <p className="text-[12px] text-[#6B6B6B] mb-5">Set your course price. You earn <strong className="text-[#10B981]">80%</strong> of every sale — EmMaxi retains 20%.</p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { key: 'paid', icon: '💳', label: 'One-time payment' },
                { key: 'subscription', icon: '🔄', label: 'Subscription' },
                { key: 'free', icon: '🆓', label: 'Free' },
              ].map(p => (
                <div key={p.key} onClick={() => setPriceType(p.key as any)}
                  className={`border-[2px] rounded-[8px] p-4 text-center cursor-pointer transition-all ${priceType === p.key ? 'border-[#D4A017] bg-[#FDF6DC]' : 'border-[#D0D0D0] hover:border-[#D4A017]'}`}>
                  <div className="text-[20px] mb-1">{p.icon}</div>
                  <div className={`text-[12px] font-[600] ${priceType === p.key ? 'text-[#D4A017]' : 'text-[#333]'}`}>{p.label}</div>
                </div>
              ))}
            </div>
            {priceType !== 'free' && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[12px] font-[600] text-[#333] mb-1">Price (₦) *</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 12000" className={inputClass()} />
                </div>
                <div>
                  <label className="block text-[12px] font-[600] text-[#333] mb-1">Discounted price (optional)</label>
                  <input type="number" value={discountPrice} onChange={e => setDiscountPrice(e.target.value)} placeholder="e.g. 8000" className={inputClass()} />
                </div>
              </div>
            )}
            <div>
              <label className="block text-[12px] font-[600] text-[#333] mb-1">Coupon code (optional)</label>
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="e.g. LAUNCH50 for 50% off" className={inputClass()} />
            </div>
            {priceType !== 'free' && price && (
              <div className="mt-4 p-4 bg-[#D1FAE5] border border-[#86EFAC] rounded-[10px]">
                <div className="text-[12px] text-[#065F46]">
                  💰 At ₦{parseInt(price).toLocaleString()}, you earn <strong>₦{Math.round(parseInt(price) * 0.8).toLocaleString()}</strong> per sale
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Step 5: Submit */}
        {step === 4 && (
          <Card className="p-6 text-center">
            <div className="text-[48px] mb-4">🚀</div>
            <h2 className="text-[20px] font-[700] mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>Ready to submit?</h2>
            <p className="text-[13px] text-[#6B6B6B] mb-6 leading-[1.7]">
              Your course <strong className="text-[#111]">"{title || 'Untitled Course'}"</strong> will be reviewed by the EmMaxi team within 2–3 business days.
            </p>
            <div className="bg-[#FDF6DC] border border-[rgba(212,160,23,.2)] rounded-[12px] p-4 mb-6 text-left space-y-1.5">
              <div className="text-[12px] text-[#7A5A00] flex items-center gap-2"><span>✓</span> Course content will be reviewed for quality</div>
              <div className="text-[12px] text-[#7A5A00] flex items-center gap-2"><span>✓</span> Pricing and descriptions will be verified</div>
              <div className="text-[12px] text-[#7A5A00] flex items-center gap-2"><span>✓</span> You can edit the course while in review</div>
            </div>
            <Btn className="w-full justify-center" size="lg" onClick={() => setSubmitOpen(true)}>Submit for review →</Btn>
          </Card>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <Btn variant="outline" onClick={prevStep} disabled={step === 0}>← Back</Btn>
          {step < STEPS.length - 1 ? (
            <Btn onClick={nextStep}>Continue →</Btn>
          ) : null}
        </div>
      </div>

      <SubmitReviewModal open={submitOpen} onClose={() => setSubmitOpen(false)} onConfirm={handleSubmit} courseTitle={title || 'Untitled Course'} />
      {toast && <Toast message={toast} />}
    </DashLayout>
  )
}
