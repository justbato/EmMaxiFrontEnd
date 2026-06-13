import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Btn, Divider } from '../../components/ui'

type Role = 'student' | 'instructor'

const TAKEN_EMAILS = ['ada@demo.com', 'test@test.com']
const USERNAME_RE = /^[a-zA-Z0-9_]+$/

const ROLE_INFO = {
  student: {
    emoji: '🎓',
    heading: 'Learn at your own pace.',
    sub: 'Access courses built by expert African instructors, track your progress, and earn real certificates.',
    accent: '#D4A017',
    perks: [
      { icon: '✓', text: 'Unlimited access to free courses' },
      { icon: '✓', text: 'Progress tracking & certificates' },
      { icon: '✓', text: 'Community discussions & Q&A' },
      { icon: '✓', text: 'Download lessons for offline use' },
    ],
  },
  instructor: {
    emoji: '📋',
    heading: 'Teach & earn on your terms.',
    sub: 'Build courses with YouTube videos, keep 80% of every sale, and grow a real student base.',
    accent: '#10B981',
    perks: [
      { icon: '★', text: 'YouTube-embedded course builder' },
      { icon: '★', text: '80% revenue share, monthly payouts' },
      { icon: '★', text: 'Deep student analytics & drop-off data' },
      { icon: '★', text: 'Auto-generated verifiable certificates' },
    ],
  },
}

export function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [role, setRole] = useState<Role>('student')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [expertise, setExpertise] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30)
    return () => clearTimeout(t)
  }, [])

  const emailDupe = TAKEN_EMAILS.includes(email.toLowerCase())
  const usernameOk = username.length >= 3 && username.length <= 30 && USERNAME_RE.test(username)
  const usernameErr = username && !usernameOk
    ? username.length < 3 ? 'At least 3 characters' : !USERNAME_RE.test(username) ? 'Letters, numbers, underscores only' : ''
    : ''

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!fname.trim()) errs.fname = 'Required'
    if (!lname.trim()) errs.lname = 'Required'
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email required'
    if (emailDupe) errs.email = 'An account with this email already exists'
    if (!usernameOk) errs.username = 'Invalid username'
    if (password.length < 8) errs.password = 'At least 8 characters'
    return errs
  }

  const handleSignup = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const { error } = await signup({ email, password, username, full_name: `${fname} ${lname}`, role, title, expertise })
    setLoading(false)
    if (error) { setErrors({ general: error }); return }
    navigate(role === 'instructor' ? '/instructor' : '/student')
  }

  const info = ROLE_INFO[role]

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      <style>{`
        .panel-left {
          transform: translateX(-100%);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1), opacity 0.6s ease;
        }
        .panel-right {
          transform: translateX(100%);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1), opacity 0.6s ease;
        }
        .panel-left.in, .panel-right.in {
          transform: translateX(0);
          opacity: 1;
        }
        @media (max-width: 767px) {
          .panel-left {
            transform: translateY(-40px);
            opacity: 0;
            transition: transform 0.55s cubic-bezier(.22,1,.36,1), opacity 0.55s ease;
          }
          .panel-right {
            transform: translateY(40px);
            opacity: 0;
            transition: transform 0.55s cubic-bezier(.22,1,.36,1) 0.1s, opacity 0.55s ease 0.1s;
          }
          .panel-left.in, .panel-right.in {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .info-perk {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .role-tab {
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
      `}</style>

      {/* Left – dark info panel (role-reactive) */}
      <div className={`panel-left${mounted ? ' in' : ''} w-full md:flex-1 bg-[#111] text-white p-8 md:p-12 flex flex-col justify-center`}>
        <div className="max-w-sm mx-auto w-full">
          <div className="text-[26px] font-[700] mb-6 md:mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Em<span className="text-[#D4A017]">Maxi</span>
          </div>

          <div className="text-[32px] mb-3">{info.emoji}</div>
          <h2 className="text-[22px] md:text-[28px] font-[600] leading-[1.25] mb-2">{info.heading}</h2>
          <p className="text-[rgba(255,255,255,.55)] text-[13px] leading-[1.8] mb-6">{info.sub}</p>

          <div className="bg-[rgba(255,255,255,.06)] border border-[rgba(212,160,23,.2)] rounded-[14px] p-5 space-y-3">
            {info.perks.map((p, i) => (
              <div key={i} className="info-perk flex items-start gap-2.5">
                <span className="text-[13px] font-[700] mt-px" style={{ color: info.accent }}>{p.icon}</span>
                <span className="text-[13px] text-[rgba(255,255,255,.7)] leading-[1.5]">{p.text}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[rgba(255,255,255,.3)] mt-5 leading-[1.6]">
            Switch roles above — the perks update instantly.
          </p>
        </div>
      </div>

      {/* Right – white form panel */}
      <div className={`panel-right${mounted ? ' in' : ''} w-full md:w-[460px] bg-white border-t md:border-t-0 md:border-l border-[#E8E8E8] flex items-start justify-center p-8 md:p-10 md:shadow-[-4px_0_24px_rgba(0,0,0,.08)] overflow-y-auto`}>
        <div className="w-full max-w-[390px] py-4">
          <div className="text-[24px] font-[700] mb-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>Create account</div>
          <div className="text-[13px] text-[#333] mb-5">Choose how you want to join EmMaxi</div>

          {/* Role picker */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {(['student', 'instructor'] as Role[]).map(r => (
              <div key={r} onClick={() => setRole(r)}
                className={`role-tab border-[1.5px] rounded-[8px] p-[14px] text-center cursor-pointer ${role === r ? 'border-[#D4A017] bg-[#FDF6DC]' : 'border-[#D0D0D0] bg-white hover:border-[#D4A017] hover:bg-[#FDF6DC]'}`}>
                <div className="text-[22px] mb-1">{r === 'student' ? '🎓' : '📋'}</div>
                <div className={`text-[12px] font-[600] ${role === r ? 'text-[#7A5A00]' : 'text-[#111]'}`}>
                  {r === 'student' ? 'Student' : 'Instructor'}
                </div>
                <div className="text-[10px] text-[#6B6B6B] mt-0.5">
                  {r === 'student' ? 'Learn from courses' : 'Teach & earn'}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-white border-[1.5px] border-[#D0D0D0] rounded-[8px] text-[13px] font-[500] cursor-pointer mb-4 hover:border-[#D4A017] hover:shadow-[0_0_0_3px_rgba(212,160,23,.12)] hover:-translate-y-px transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
          <Divider label="or with email" />

          {/* Name row */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: 'fname', label: 'First name', val: fname, set: setFname, ph: 'Ada' },
              { id: 'lname', label: 'Last name', val: lname, set: setLname, ph: 'Obi' },
            ].map(f => (
              <div key={f.id} className="mb-4">
                <label className="block text-[12px] font-[600] text-[#333] mb-1">{f.label}</label>
                <input placeholder={f.ph} value={f.val}
                  onChange={e => { f.set(e.target.value); setErrors(p => ({ ...p, [f.id]: '' })) }}
                  className={`w-full px-[14px] py-[10px] border-[1.5px] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-all ${errors[f.id] ? 'border-[#EF4444]' : 'border-[#D0D0D0]'}`} />
                {errors[f.id] && <p className="text-[11px] text-[#EF4444] mt-1">{errors[f.id]}</p>}
              </div>
            ))}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[12px] font-[600] text-[#333] mb-1">Email</label>
            <input type="email" placeholder="ada@example.com" value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
              className={`w-full px-[14px] py-[10px] border-[1.5px] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-all ${errors.email || emailDupe ? 'border-[#EF4444]' : 'border-[#D0D0D0]'}`} />
            {(errors.email || emailDupe) && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[11px] text-[#EF4444]">{emailDupe ? 'Account already exists. ' : errors.email}</span>
                {emailDupe && <Link to="/login" className="text-[11px] text-[#EF4444] font-[600] underline">Sign in →</Link>}
              </div>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[12px] font-[600] text-[#333]">Username</label>
              <span className="text-[10px] text-[#6B6B6B]">Letters, numbers, underscores only</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] text-[13px] font-[500] pointer-events-none">@</span>
              <input placeholder="chidi_99" maxLength={30} value={username}
                onChange={e => { setUsername(e.target.value); setErrors(p => ({ ...p, username: '' })) }}
                className={`w-full pl-7 pr-[14px] py-[10px] border-[1.5px] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-all ${usernameErr || errors.username ? 'border-[#EF4444]' : username && usernameOk ? 'border-[#10B981]' : 'border-[#D0D0D0]'}`} />
            </div>
            {(usernameErr || errors.username) && <p className="text-[11px] text-[#EF4444] mt-1">{usernameErr || errors.username}</p>}
            {username && usernameOk && <p className="text-[11px] text-[#10B981] mt-1">✓ Username available</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-[12px] font-[600] text-[#333] mb-1">Password</label>
            <input type="password" placeholder="Min. 8 characters" value={password}
              onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })) }}
              className={`w-full px-[14px] py-[10px] border-[1.5px] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-all ${errors.password ? 'border-[#EF4444]' : 'border-[#D0D0D0]'}`} />
            {errors.password && <p className="text-[11px] text-[#EF4444] mt-1">{errors.password}</p>}
          </div>

          {/* Instructor-only fields */}
          {role === 'instructor' && (
            <div className="mb-4 bg-[#F9F9F9] border border-[#E8E8E8] rounded-[10px] p-4 space-y-3">
              <p className="text-[11px] font-[600] text-[#6B6B6B] uppercase tracking-[.06em]">Instructor details</p>
              <div>
                <label className="block text-[12px] font-[600] text-[#333] mb-1">Professional title</label>
                <input placeholder="e.g. Senior Software Engineer" value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-[14px] py-[10px] border-[1.5px] border-[#D0D0D0] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-all bg-white" />
              </div>
              <div>
                <label className="block text-[12px] font-[600] text-[#333] mb-1">Area of expertise</label>
                <input placeholder="e.g. Web Development" value={expertise}
                  onChange={e => setExpertise(e.target.value)}
                  className="w-full px-[14px] py-[10px] border-[1.5px] border-[#D0D0D0] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-all bg-white" />
              </div>
            </div>
          )}

          {errors.general && (
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[8px] px-3 py-2.5 text-[12px] text-[#991B1B] mb-3">
              {errors.general}
            </div>
          )}

          <Btn className="w-full justify-center mt-1" size="lg" onClick={handleSignup} disabled={loading}>
            {loading ? 'Creating account…' : `Create ${role} account →`}
          </Btn>
          <p className="text-center text-[12px] text-[#6B6B6B] mt-3">
            Already have an account? <Link to="/login" className="text-[#D4A017] font-[500]">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}