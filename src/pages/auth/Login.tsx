import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Btn, Divider } from '../../components/ui'
import { ForgotPasswordModal } from '../../components/modals'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30)
    return () => clearTimeout(t)
  }, [])

  const emailErr = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Please enter a valid email.' : ''
  const passErr = password && password.length < 6 ? 'Password must be at least 6 characters.' : ''

  const handleLogin = async () => {
    if (emailErr || passErr || !email || !password) {
      setError('Please fill in all fields correctly.')
      return
    }
    setLoading(true); setError('')
    const { error: err } = await login(email, password)
    setLoading(false)
    if (err) { setError(err); return }
    const stored = localStorage.getItem('emmaxi_user')
    const user = stored ? JSON.parse(stored) : null
    if (user?.role === 'instructor') navigate('/instructor')
    else if (user?.role === 'admin') navigate('/admin')
    else navigate('/student')
  }

  const demoLogin = async (demoEmail: string) => {
    setEmail(demoEmail); setPassword('demo1234')
    setLoading(true)
    const { error: err } = await login(demoEmail, 'demo1234')
    setLoading(false)
    if (err) return
    const stored = localStorage.getItem('emmaxi_user')
    const user = stored ? JSON.parse(stored) : null
    if (user?.role === 'instructor') navigate('/instructor')
    else if (user?.role === 'admin') navigate('/admin')
    else navigate('/student')
  }

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
        /* Mobile: slide down instead of sideways */
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
        .demo-btn:hover { border-color: #D4A017 !important; background: rgba(212,160,23,.08) !important; }
      `}</style>

      {/* Left – dark panel */}
      <div className={`panel-left${mounted ? ' in' : ''} w-full md:flex-1 bg-[#111] text-white p-8 md:p-12 flex flex-col justify-center`}>
        <div className="max-w-sm mx-auto w-full">
          <div className="text-[26px] font-[700] mb-6 md:mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Em<span className="text-[#D4A017]">Maxi</span>
          </div>
          <h2 className="text-[22px] md:text-[28px] font-[600] leading-[1.25] mb-2">Welcome back.</h2>
          <p className="text-[rgba(255,255,255,.55)] text-[13px] leading-[1.8] mb-6 md:mb-8">
            Sign in to continue your learning journey or manage your courses.
          </p>

          {/* Demo accounts */}
          <div className="space-y-2">
            <div className="text-[11px] text-[rgba(255,255,255,.4)] uppercase tracking-[.08em] font-[600] mb-3">
              Quick demo logins
            </div>
            {[
              { label: '🎓 Student demo', email: 'student@demo.com', desc: 'Ada Obi · Student dashboard' },
              { label: '📋 Instructor demo', email: 'instructor@demo.com', desc: 'Sarah Kim · Instructor dashboard' },
              { label: '🛡 Admin demo', email: 'admin@demo.com', desc: 'Admin · Full admin panel' },
            ].map(d => (
              <button key={d.email} onClick={() => demoLogin(d.email)}
                className="demo-btn w-full text-left p-3 rounded-[10px] bg-[rgba(255,255,255,.06)] border border-[rgba(212,160,23,.2)] transition-all">
                <div className="text-[12px] font-[600] text-white">{d.label}</div>
                <div className="text-[10px] text-[rgba(255,255,255,.4)] mt-0.5">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right – white form panel */}
      <div className={`panel-right${mounted ? ' in' : ''} w-full md:w-[440px] md:min-w-[440px] bg-white border-t md:border-t-0 md:border-l border-[#E8E8E8] flex items-center justify-center p-8 md:p-10 md:shadow-[-4px_0_24px_rgba(0,0,0,.08)]`}>
        <div className="w-full max-w-[360px]">
          <div className="text-[24px] font-[700] mb-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>Sign in</div>
          <div className="text-[13px] text-[#333] mb-6">
            New to EmMaxi? <Link to="/signup" className="text-[#D4A017] font-[500]">Create an account</Link>
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

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[12px] text-[#333] mb-1 font-[600]">Email</label>
            <input type="email" placeholder="you@example.com" value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              className={`w-full px-[14px] py-[10px] border-[1.5px] rounded-[8px] text-[13px] outline-none transition-all focus:border-[#D4A017] focus:shadow-[0_0_0_3px_rgba(212,160,23,.15)] ${emailErr ? 'border-[#EF4444]' : 'border-[#D0D0D0]'}`} />
            {emailErr && <p className="text-[11px] text-[#EF4444] mt-1">{emailErr}</p>}
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[12px] text-[#333] font-[600]">Password</label>
              <button onClick={() => setForgotOpen(true)} className="text-[11px] text-[#D4A017] font-[500]">Forgot password?</button>
            </div>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                className={`w-full px-[14px] py-[10px] pr-10 border-[1.5px] rounded-[8px] text-[13px] outline-none transition-all focus:border-[#D4A017] focus:shadow-[0_0_0_3px_rgba(212,160,23,.15)] ${passErr ? 'border-[#EF4444]' : 'border-[#D0D0D0]'}`}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              <button onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] text-[12px]">
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {passErr && <p className="text-[11px] text-[#EF4444] mt-1">{passErr}</p>}
          </div>

          {error && (
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[8px] px-3 py-2.5 text-[12px] text-[#991B1B] mb-3">
              {error}
            </div>
          )}

          <Btn className="w-full justify-center mt-4" size="lg" disabled={loading} onClick={handleLogin}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </Btn>

          <p className="text-center text-[12px] text-[#6B6B6B] mt-4">
            Don't have an account? <Link to="/signup" className="text-[#D4A017] font-[500]">Sign up</Link>
          </p>
        </div>
      </div>

      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </div>
  )
}