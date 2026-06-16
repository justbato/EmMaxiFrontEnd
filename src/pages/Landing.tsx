import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { Btn, StarRating } from '../components/ui'
import { DEMO_COURSES } from '../types'
import { CourseCard } from '../components/CourseCard'

export function LandingPage() {
  const navigate = useNavigate()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.slide-in').forEach(el => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  const testimonials = [
    { name: 'Ada Obi', role: 'Student', text: 'I completed three courses in two months. The certificate I earned helped me get a junior developer role.', rating: 5, avatar: 'AO', color: '#D4A017' },
    { name: 'James Okafor', role: 'Instructor', text: 'EmMaxi made it easy to launch my Python course. The platform handles everything so I can focus on teaching.', rating: 5, avatar: 'JO', color: '#10B981' },
    { name: 'Lena Müller', role: 'Instructor', text: 'My UI/UX course has 940 students and I did not have to handle any platform setup. I just built and launched.', rating: 5, avatar: 'LM', color: '#6366F1' },
  ]

  const features = [
    {
      title: 'Verified Certificates',
      description: 'Auto-generated certificates with unique IDs upon course completion, ready to share on LinkedIn with one click.',
      wide: false,
      dark: false,
    },
    {
      title: '80% Revenue Share',
      description: 'Keep 80% of every sale. Fast monthly payouts directly to your local bank account with full earnings transparency.',
      wide: false,
      dark: false,
    },
    {
      title: 'Multi-Currency Engine',
      description: 'Sell globally, earn locally. Localized pricing, automatic currency conversion, and support for global payment gateways built in.',
      wide: true,
      dark: true,
    },
    {
      title: 'Progress Tracking',
      description: 'Students and instructors get clear dashboards showing completion rates, time spent, and performance metrics at a glance.',
      wide: false,
      dark: false,
    },
    {
      title: 'Course Management',
      description: 'Build structured courses with sections, lessons, and quizzes. Publish when ready and update anytime without disrupting learners.',
      wide: false,
      dark: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white text-text overflow-hidden">

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-border"
        style={{ padding: '0 48px', height: '64px' }}
      >
        <div
          className="text-[22px] font-[700] text-dark tracking-tight"
          style={{ fontFamily: 'Clash Display, sans-serif' }}
        >
          Em<span className="text-brand">Maxi</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[14px] text-text2 hover:text-dark transition-colors font-[500]">Features</a>
          <a href="#courses" className="text-[14px] text-text2 hover:text-dark transition-colors font-[500]">Courses</a>
          <a href="#testimonials" className="text-[14px] text-text2 hover:text-dark transition-colors font-[500]">Reviews</a>
        </div>

        <div className="flex gap-3 items-center">
          <Btn variant="ghost" size="md" onClick={() => navigate('/login')}>Sign in</Btn>
          <Btn size="md" onClick={() => navigate('/signup')}>Get started</Btn>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[100] flex md:hidden items-center justify-around bg-white border-t border-border"
        style={{ height: '56px' }}
      >
        <a href="#features" className="text-[13px] text-text2 font-[500] px-4 py-2">Features</a>
        <a href="#courses" className="text-[13px] text-text2 font-[500] px-4 py-2">Courses</a>
        <a href="#testimonials" className="text-[13px] text-text2 font-[500] px-4 py-2">Reviews</a>
        <button
          onClick={() => navigate('/signup')}
          className="text-[13px] text-white font-[600] px-4 py-2 bg-brand rounded-[8px]"
        >
          Get started
        </button>
      </div>

      {/* Hero */}
      <section
        className="pt-[120px] pb-[80px] px-6 lg:px-12 max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16"
        style={{ paddingBottom: '80px' }}
      >
        <div className="flex-1 max-w-[560px] text-left">
          <p
            className="text-[13px] font-[600] uppercase tracking-widest text-brand mb-5 slide-in"
          >
            Online Learning Platform
          </p>

          <h1
            className="text-[clamp(36px,5vw,64px)] font-[700] leading-[1.08] text-dark mb-6 slide-in"
            style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.025em', transitionDelay: '.08s' }}
          >
            Build skills that<br />
            <span className="text-brand">move your career</span><br />
            forward.
          </h1>

          <p
            className="text-[17px] text-text2 leading-[1.65] mb-10 slide-in"
            style={{ transitionDelay: '.16s' }}
          >
            EmMaxi connects ambitious learners with expert instructors. Access structured courses, earn verified certificates, and grow at your own pace.
          </p>

          <div className="flex gap-3 items-center flex-wrap slide-in" style={{ transitionDelay: '.24s' }}>
            <Btn size="lg" onClick={() => navigate('/signup')} className="text-[15px] px-7 py-3.5">
              Start learning free
            </Btn>
            <Btn variant="outline" size="lg" onClick={() => navigate('/courses')} className="text-[15px] px-7 py-3.5">
              Browse courses
            </Btn>
          </div>

          <div
            className="flex items-center gap-6 mt-12 pt-8 border-t border-border slide-in"
            style={{ transitionDelay: '.32s' }}
          >
            <div className="flex -space-x-3">
              {['AO', 'JO', 'LM'].map((i, idx) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ background: ['#D4A017', '#10B981', '#6366F1'][idx], zIndex: 3 - idx }}
                >
                  {i}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#F59E0B] text-[13px]">★★★★★</div>
              <div className="text-[13px] text-text2 font-[500] mt-0.5">Trusted by 24,000+ learners</div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full slide-in" style={{ transitionDelay: '.4s' }}>
          <div className="relative rounded-[20px] bg-white border border-border overflow-hidden" style={{ boxShadow: '0 16px 48px -8px rgba(0,0,0,0.08)' }}>
            <img
              src="/hero_dashboard_light_mockup_1781550300720.png"
              alt="EmMaxi Platform Dashboard"
              className="w-full h-auto object-cover block"
            />
          </div>
          <div
            className="absolute -bottom-6 -left-6 bg-white border border-border rounded-[14px] p-4 hidden lg:flex items-center gap-4"
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)', zIndex: 20 }}
          >
            <div>
              <div className="text-[11px] text-text3 font-[600] uppercase tracking-wider">Course Completion</div>
              <div className="text-[20px] font-[700] text-dark mt-0.5">94%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-surface py-10">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-wrap justify-between items-center gap-8">
          <div className="text-[12px] font-[600] text-text3 uppercase tracking-widest w-full md:w-auto text-center md:text-left">
            Platform metrics
          </div>
          {[
            ['24,000+', 'Active Students'],
            ['480+', 'Expert Instructors'],
            ['1,800+', 'Courses Created'],
            ['₦2.4M+', 'Creator Earnings'],
          ].map(([num, lbl], i) => (
            <div key={lbl} className="slide-in text-center md:text-left" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div
                className="text-[26px] font-[700] text-dark"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                {num}
              </div>
              <div className="text-[13px] text-text2 font-[500] mt-0.5">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="mb-16">
          <p className="text-[13px] font-[600] uppercase tracking-widest text-brand mb-3 slide-in">Platform features</p>
          <h2
            className="text-[clamp(28px,4vw,44px)] font-[700] text-dark slide-in"
            style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em', transitionDelay: '.08s', maxWidth: '520px' }}
          >
            Everything you need to teach and learn.
          </h2>
          <p
            className="text-text2 text-[16px] mt-4 max-w-[480px] leading-[1.6] slide-in"
            style={{ transitionDelay: '.16s' }}
          >
            Whether you are building an audience or acquiring new skills, EmMaxi provides the infrastructure to make it happen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Verified Certificates */}
          <div className="bg-surface border border-border rounded-[20px] p-8 slide-in">
            <div className="w-10 h-10 rounded-[10px] bg-brand-light flex items-center justify-center mb-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
            </div>
            <h3 className="text-[18px] font-[700] mb-2 text-dark" style={{ fontFamily: 'Clash Display, sans-serif' }}>Verified Certificates</h3>
            <p className="text-[14px] text-text2 leading-[1.6]">Auto-generated certificates with unique IDs upon course completion, ready to share on LinkedIn with one click.</p>
          </div>

          {/* Revenue Share */}
          <div className="bg-surface border border-border rounded-[20px] p-8 slide-in" style={{ transitionDelay: '.08s' }}>
            <div className="w-10 h-10 rounded-[10px] bg-brand-light flex items-center justify-center mb-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <h3 className="text-[18px] font-[700] mb-2 text-dark" style={{ fontFamily: 'Clash Display, sans-serif' }}>80% Revenue Share</h3>
            <p className="text-[14px] text-text2 leading-[1.6]">Keep 80% of every sale. Fast monthly payouts directly to your local bank account with full earnings transparency.</p>
          </div>

          {/* Progress Tracking */}
          <div className="bg-surface border border-border rounded-[20px] p-8 slide-in" style={{ transitionDelay: '.16s' }}>
            <div className="w-10 h-10 rounded-[10px] bg-brand-light flex items-center justify-center mb-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
            </div>
            <h3 className="text-[18px] font-[700] mb-2 text-dark" style={{ fontFamily: 'Clash Display, sans-serif' }}>Progress Tracking</h3>
            <p className="text-[14px] text-text2 leading-[1.6]">Students and instructors get clear dashboards showing completion rates, time spent, and performance metrics.</p>
          </div>

          {/* Multi-Currency — wide dark card */}
          <div
            className="md:col-span-2 bg-dark border border-dark2 rounded-[20px] p-8 md:p-10 relative overflow-hidden slide-in"
            style={{ transitionDelay: '.24s' }}
          >
            <div className="absolute top-0 right-0 w-[360px] h-[360px] bg-brand/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 max-w-[380px]">
              <div className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center mb-6">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              </div>
              <h3 className="text-[22px] font-[700] mb-3 text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>Multi-Currency Engine</h3>
              <p className="text-[15px] text-white/65 leading-[1.65]">Sell globally, earn locally. Localized pricing, automatic currency conversion, and support for global payment gateways built in.</p>
            </div>
            <div className="absolute right-0 bottom-0 hidden md:block w-[220px] h-[140px] bg-dark2/60 backdrop-blur-md rounded-tl-[20px] border-l border-t border-white/10 p-5">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[11px] font-[600] text-white/50 uppercase tracking-wider">Revenue</div>
                <div className="text-[11px] text-green-400 font-[600]">+14%</div>
              </div>
              <div className="text-[22px] font-[700] text-white mb-3" style={{ fontFamily: 'Clash Display, sans-serif' }}>$4,250</div>
              <div className="flex items-end gap-1 h-8">
                {[40, 70, 45, 90, 60, 100, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-brand rounded-t-sm" style={{ height: `${h}%`, opacity: 0.85 }} />
                ))}
              </div>
            </div>
          </div>

          {/* Course Management */}
          <div className="bg-surface border border-border rounded-[20px] p-8 slide-in" style={{ transitionDelay: '.32s' }}>
            <div className="w-10 h-10 rounded-[10px] bg-brand-light flex items-center justify-center mb-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
            </div>
            <h3 className="text-[18px] font-[700] mb-2 text-dark" style={{ fontFamily: 'Clash Display, sans-serif' }}>Course Management</h3>
            <p className="text-[14px] text-text2 leading-[1.6]">Build structured courses with sections, lessons, and quizzes. Publish when ready and update anytime without disrupting learners.</p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-24 px-6 bg-surface border-y border-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <p className="text-[13px] font-[600] uppercase tracking-widest text-brand mb-3 slide-in">Courses</p>
              <h2
                className="text-[clamp(28px,4vw,40px)] font-[700] text-dark slide-in"
                style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em', transitionDelay: '.08s' }}
              >
                Featured Courses
              </h2>
              <p className="text-text2 text-[15px] mt-2 slide-in" style={{ transitionDelay: '.16s' }}>
                Hand-picked courses from top instructors to accelerate your career.
              </p>
            </div>
            <Btn
              variant="outline"
              onClick={() => navigate('/courses')}
              className="slide-in"
              style={{ transitionDelay: '.24s' } as React.CSSProperties}
            >
              Explore all courses
            </Btn>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_COURSES.filter(c => c.status === 'published').slice(0, 3).map((c, i) => (
              <div key={c.id} className="slide-in" style={{ transitionDelay: `${i * 0.1}s` }}>
                <CourseCard course={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="mb-14">
          <p className="text-[13px] font-[600] uppercase tracking-widest text-brand mb-3 slide-in">Testimonials</p>
          <h2
            className="text-[clamp(28px,4vw,40px)] font-[700] text-dark slide-in"
            style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em', transitionDelay: '.08s', maxWidth: '480px' }}
          >
            What our community says.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white border border-border rounded-[20px] p-8 flex flex-col slide-in"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <StarRating rating={t.rating} size="md" />
              <p className="text-[15px] text-text2 leading-[1.65] mt-5 mb-6 flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-[700] text-[12px] flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[14px] font-[600] text-dark">{t.name}</div>
                  <div className="text-[12px] text-text3 font-[500]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 mb-14 md:mb-0">
        <div className="max-w-[960px] mx-auto bg-dark rounded-[24px] p-10 md:p-16 text-center relative overflow-hidden slide-in">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/25 rounded-full blur-[90px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981]/15 rounded-full blur-[90px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[13px] font-[600] uppercase tracking-widest text-brand mb-5">Get started today</p>
            <h2
              className="text-[clamp(28px,4vw,48px)] font-[700] text-white mb-5 leading-[1.1]"
              style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em' }}
            >
              Ready to advance<br />your potential?
            </h2>
            <p className="text-white/60 text-[16px] mb-10 leading-[1.65] max-w-[420px] mx-auto">
              Join the most intuitive platform for creators and learners. Create your account and get started in seconds.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Btn
                size="lg"
                onClick={() => navigate('/signup')}
                className="text-[15px] px-8 py-4"
              >
                Create free account
              </Btn>
              <Btn
                variant="outline"
                size="lg"
                className="text-[15px] px-8 py-4 !border-white/20 !text-white !bg-white/5 hover:!bg-white/10 hover:!border-white/40"
                onClick={() => navigate('/courses')}
              >
                Explore courses
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border px-8 py-10 mb-14 md:mb-0">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            className="text-[20px] font-[700] text-dark tracking-tight"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            Em<span className="text-brand">Maxi</span>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="text-[13px] text-text3 hover:text-dark transition-colors font-[500]">Features</a>
            <a href="#courses" className="text-[13px] text-text3 hover:text-dark transition-colors font-[500]">Courses</a>
            <a href="#testimonials" className="text-[13px] text-text3 hover:text-dark transition-colors font-[500]">Reviews</a>
          </div>
          <div className="text-[13px] text-text3 font-[500]">
            © {new Date().getFullYear()} EmMaxi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}