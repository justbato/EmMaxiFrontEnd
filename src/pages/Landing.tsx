import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Btn, StarRating } from '../components/ui'
import { DEMO_COURSES } from '../types'
import { CourseCard } from '../components/CourseCard'

export function LandingPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'phrase1-in' | 'phrase1-out' | 'phrase2-in' | 'phrase2-out'>('phrase1-in')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.slide-in').forEach(el => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const timings: Record<string, { next: 'phrase1-in' | 'phrase1-out' | 'phrase2-in' | 'phrase2-out', delay: number }> = {
      'phrase1-in': { next: 'phrase1-out', delay: 5000 },
      'phrase1-out': { next: 'phrase2-in', delay: 600 },
      'phrase2-in': { next: 'phrase2-out', delay: 5000 },
      'phrase2-out': { next: 'phrase1-in', delay: 600 },
    }
    const t = setTimeout(() => setPhase(timings[phase].next), timings[phase].delay)
    return () => clearTimeout(t)
  }, [phase])

  const features = [
    { icon: '📺', title: 'YouTube-powered lessons', desc: 'Embed any YouTube video as a lesson — no encoding, no storage costs. Students watch right in-app.' },
    { icon: '🎓', title: 'Verified certificates', desc: 'Auto-generated certificates with unique IDs. Students can share on LinkedIn and download as PDF.' },
    { icon: '💰', title: '80% revenue share', desc: 'Keep 80% of every sale. Monthly payouts directly to your bank account, no minimum threshold.' },
    { icon: '📊', title: 'Deep analytics', desc: "See exactly which lessons have drop-offs, who's watching, and how your revenue is trending." },
    { icon: '❓', title: 'Built-in Q&A', desc: 'Students ask questions; you answer in context. Upvoting surfaces the most important questions first.' },
    { icon: '🌍', title: 'Multi-currency pricing', desc: 'Sell in Naira or switch to USD. Localized pricing with coupon codes and discount support.' },
  ]

  const testimonials = [
    { name: 'Ada Obi', role: 'Student', text: 'I completed three courses in two months. The certificate I earned helped me get a junior developer role!', rating: 5, avatar: 'AO', color: '#D4A017' },
    { name: 'James Okafor', role: 'Instructor', text: 'EmMaxi made it so easy to launch my Python course. The YouTube integration is a game changer.', rating: 5, avatar: 'JO', color: '#10B981' },
    { name: 'Lena Müller', role: 'Instructor', text: "My UI/UX course has 940 students and I didn't have to do any platform setup. Just built and launched.", rating: 5, avatar: 'LM', color: '#6366F1' },
  ]

  const getStyle = (
    inAnim: string,
    outAnim: string,
    activeIn: string,
    activeOut: string
  ): React.CSSProperties => {
    if (phase === activeIn) return { animation: `${inAnim} 0.6s cubic-bezier(.22,1,.36,1) forwards` }
    if (phase === activeOut) return { animation: `${outAnim} 0.6s cubic-bezier(.22,1,.36,1) forwards` }
    return { display: 'none' }
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes inFromLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes outToRight {
          from { transform: translateX(0);     opacity: 1; }
          to   { transform: translateX(100%);  opacity: 0; }
        }
        @keyframes inFromRight {
          from { transform: translateX(100%);  opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes outToLeft {
          from { transform: translateX(0);     opacity: 1; }
          to   { transform: translateX(-100%); opacity: 0; }
        }
        .headline-wrap {
          overflow: hidden;
          min-height: 1.2em;
        }
      `}</style>

      {/* Nav */}
      <nav className="home-nav fixed top-0 left-0 right-0 z-[100] flex items-center justify-between bg-[#111] border-b border-[rgba(212,160,23,.15)] shadow-[0_2px_20px_rgba(0,0,0,.3)]" style={{ padding: '14px 48px' }}>
        <div className="text-[22px] font-[700] text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>Em<span className="text-[#D4A017]">Maxi</span></div>
        <div className="hidden md:flex items-center gap-7">
          <a href="#features" className="text-[13px] text-[rgba(255,255,255,.65)] hover:text-[#D4A017] transition-colors font-[500]">Features</a>
          <a href="#courses" className="text-[13px] text-[rgba(255,255,255,.65)] hover:text-[#D4A017] transition-colors font-[500]">Courses</a>
          <a href="#testimonials" className="text-[13px] text-[rgba(255,255,255,.65)] hover:text-[#D4A017] transition-colors font-[500]">Reviews</a>
        </div>
        <div className="flex gap-2.5">
          <Btn variant="outline" size="sm" className="!border-[rgba(255,255,255,.2)] !text-white !bg-[rgba(255,255,255,.07)]" onClick={() => navigate('/login')}>Sign in</Btn>
          <Btn size="sm" onClick={() => navigate('/signup')}>Get started</Btn>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero min-h-screen flex items-center justify-center relative overflow-hidden" style={{ padding: '100px 48px 60px' }}>
        <div className="text-center relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#111] border border-[rgba(212,160,23,.3)] rounded-full px-4 py-1.5 text-[12px] text-[#D4A017] mb-7 shadow-[0_4px_16px_rgba(0,0,0,.15)] font-[600]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] pulse" /> Africa's fastest-growing learning platform
          </div>

          <div
            className="headline-wrap text-[clamp(36px,5.5vw,66px)] font-[700] leading-[1.15] text-[#111] mb-5"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            {/* Phrase 1: "Learn Without Limits." — slides in from left, out to right */}
            <div style={getStyle('inFromLeft', 'outToRight', 'phrase1-in', 'phrase1-out')}>
              Learn Without <span style={{ color: '#D4A017' }}>Limits.</span>
            </div>

            {/* Phrase 2: "Teach With Purpose." — slides in from right, out to left */}
            <div style={getStyle('inFromRight', 'outToLeft', 'phrase2-in', 'phrase2-out')}>
              Teach With <span style={{ color: '#D4A017' }}>Purpose.</span>
            </div>
          </div>

          <p className="text-[16px] text-[#333] max-w-[500px] mx-auto mb-8 leading-[1.75] slide-in" style={{ transitionDelay: '.1s' }}>
            Join 24,000+ students and 480 instructors on EmMaxi — the platform built for African learners and creators.
          </p>
          <div className="flex gap-3 justify-center flex-wrap slide-in" style={{ transitionDelay: '.2s' }}>
            <Btn size="lg" onClick={() => navigate('/signup')}>Start learning free →</Btn>
            <Btn variant="outline" size="lg" onClick={() => navigate('/courses')}>Browse courses</Btn>
          </div>
          <div className="flex gap-10 justify-center mt-14 pt-10 border-t border-[#E8E8E8] flex-wrap slide-in" style={{ transitionDelay: '.3s' }}>
            {[['24K+', 'Students'], ['480+', 'Instructors'], ['1.8K+', 'Courses'], ['₦2.4M+', 'Paid out']].map(([num, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="text-[30px] font-[700] text-[#111]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  {num.includes('₦') ? <>{num.replace('₦', '')}<span className="text-[#D4A017]">₦</span></> : <>{num.replace('+', '')}<span className="text-[#D4A017]">+</span></>}
                </div>
                <div className="text-[12px] text-[#6B6B6B] mt-0.5 font-[500]">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 max-w-[1160px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(24px,3.5vw,38px)] font-[600] text-[#111] slide-in" style={{ fontFamily: 'Clash Display, sans-serif' }}>Everything you need to learn & earn</h2>
          <p className="text-[#333] text-[14px] mt-2 leading-[1.6] slide-in" style={{ transitionDelay: '.1s' }}>Built for Nigerian creators and students from day one</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={f.title} className="feature-card bg-white border border-[#E8E8E8] rounded-[14px] p-6 shadow-[0_1px_3px_rgba(0,0,0,.06),0_4px_16px_rgba(0,0,0,.05)] transition-all duration-300 slide-in" style={{ transitionDelay: `${i * .05}s` }}>
              <div className="feature-icon w-[46px] h-[46px] rounded-[12px] bg-[#FDF6DC] flex items-center justify-center text-[20px] mb-4 transition-transform duration-300">{f.icon}</div>
              <h3 className="text-[15px] font-[600] mb-2 text-[#111]">{f.title}</h3>
              <p className="text-[13px] text-[#333] leading-[1.65]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-20 px-6 max-w-[1160px] mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-[clamp(22px,3vw,34px)] font-[600] text-[#111] slide-in" style={{ fontFamily: 'Clash Display, sans-serif' }}>Featured courses</h2>
            <p className="text-[#6B6B6B] text-[13px] mt-1 slide-in" style={{ transitionDelay: '.1s' }}>Top-rated courses taught by expert instructors</p>
          </div>
          <Btn variant="outline" onClick={() => navigate('/courses')}>View all →</Btn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEMO_COURSES.filter(c => c.status === 'published').slice(0, 6).map((c, i) => (
            <div key={c.id} className="slide-in" style={{ transitionDelay: `${i * .06}s` }}>
              <CourseCard course={c} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-[#F5F5F5]">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(24px,3.5vw,38px)] font-[600] text-[#111] slide-in" style={{ fontFamily: 'Clash Display, sans-serif' }}>What our community says</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={t.name} className="testimonial bg-white border border-[#E8E8E8] rounded-[14px] p-[22px] shadow-[0_1px_3px_rgba(0,0,0,.06),0_4px_16px_rgba(0,0,0,.05)] transition-all duration-300 slide-in" style={{ transitionDelay: `${i * .08}s` }}>
                <StarRating rating={t.rating} size="md" />
                <p className="text-[13px] text-[#333] leading-[1.65] my-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-[700] text-[12px]" style={{ background: t.color }}>{t.avatar}</div>
                  <div>
                    <div className="text-[13px] font-[600] text-[#111]">{t.name}</div>
                    <div className="text-[11px] text-[#6B6B6B]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#111] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-[clamp(28px,4vw,42px)] font-[700] text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Ready to <span className="text-[#D4A017]">start?</span>
          </h2>
          <p className="text-[rgba(255,255,255,.6)] text-[14px] mb-8 leading-[1.7]">Join thousands of students and instructors building their future on EmMaxi.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Btn size="lg" onClick={() => navigate('/signup')}>Create free account →</Btn>
            <Btn variant="outline" size="lg" className="!border-[rgba(255,255,255,.2)] !text-white !bg-[rgba(255,255,255,.07)]" onClick={() => navigate('/courses')}>Explore courses</Btn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] border-t border-[rgba(255,255,255,.08)] px-8 py-8 text-center text-[12px] text-[rgba(255,255,255,.4)]">
        © 2026 EmMaxi · Built for Africa
      </footer>
    </div>
  )
}