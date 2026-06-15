import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
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
    { name: 'Ada Obi', role: 'Student', text: 'I completed three courses in two months. The certificate I earned helped me get a junior developer role!', rating: 5, avatar: 'AO', color: '#D4A017' },
    { name: 'James Okafor', role: 'Instructor', text: 'EmMaxi made it so easy to launch my Python course. The YouTube integration is a game changer.', rating: 5, avatar: 'JO', color: '#10B981' },
    { name: 'Lena Müller', role: 'Instructor', text: "My UI/UX course has 940 students and I didn't have to do any platform setup. Just built and launched.", rating: 5, avatar: 'LM', color: '#6366F1' },
  ]

  return (
    <div className="min-h-screen bg-white text-text overflow-hidden">
      {/* Nav */}
      <nav className="home-nav fixed top-0 left-0 right-0 z-[100] flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-border shadow-sm transition-all" style={{ padding: '16px 48px' }}>
        <div className="text-[24px] font-[700] text-dark" style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em' }}>
          Em<span className="text-brand">Maxi</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[14px] text-text2 hover:text-brand transition-colors font-[500]">Features</a>
          <a href="#courses" className="text-[14px] text-text2 hover:text-brand transition-colors font-[500]">Courses</a>
          <a href="#testimonials" className="text-[14px] text-text2 hover:text-brand transition-colors font-[500]">Reviews</a>
        </div>
        <div className="flex gap-3">
          <Btn variant="ghost" size="md" onClick={() => navigate('/login')}>Sign in</Btn>
          <Btn size="md" onClick={() => navigate('/signup')} className="shadow-gold hover:shadow-gold-lg">Get started</Btn>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero relative pt-[160px] pb-[100px] px-6 lg:px-12 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 relative z-10 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 bg-brand-light border border-brand/20 rounded-full px-4 py-1.5 text-[13px] text-brand-dark mb-8 font-[600] slide-in">
            <span className="w-1.5 h-1.5 rounded-full bg-brand pulse" /> Africa's fastest-growing learning platform
          </div>

          <h1 
            className="text-[clamp(42px,5vw,72px)] font-[700] leading-[1.05] text-dark mb-6 slide-in"
            style={{ fontFamily: 'Clash Display, sans-serif', transitionDelay: '.1s' }}
          >
            Empower your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-[#F59E0B]">learning journey.</span>
          </h1>

          <p className="text-[18px] text-text2 max-w-[540px] mb-10 leading-[1.6] slide-in" style={{ transitionDelay: '.2s' }}>
            Join over 24,000 students and instructors building their future on EmMaxi. The all-in-one platform for creating and mastering world-class courses.
          </p>
          
          <div className="flex gap-4 items-center flex-wrap slide-in" style={{ transitionDelay: '.3s' }}>
            <Btn size="lg" onClick={() => navigate('/signup')} className="text-[16px] px-8 py-3.5 shadow-gold hover:shadow-gold-lg">Start learning free</Btn>
            <Btn variant="outline" size="lg" onClick={() => navigate('/courses')} className="text-[16px] px-8 py-3.5 border-border2 hover:border-brand">Browse courses</Btn>
          </div>
          
          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border slide-in" style={{ transitionDelay: '.4s' }}>
            <div className="flex -space-x-3">
              {['AO','JO','LM'].map((i, idx) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-[12px] font-bold text-white shadow-sm" style={{ background: ['#D4A017','#10B981','#6366F1'][idx], zIndex: 3-idx }}>{i}</div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#F59E0B] text-[14px]">
                ★★★★★
              </div>
              <div className="text-[13px] text-text2 font-[500] mt-0.5">Loved by 24,000+ users</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 relative z-10 w-full slide-in" style={{ transitionDelay: '.5s' }}>
          <div className="relative rounded-[24px] bg-white border border-border shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-transparent opacity-50"></div>
            {/* Embedded mockup image */}
            <img src="/hero_dashboard_light_mockup_1781550300720.png" alt="Platform Dashboard Mockup" className="w-full h-auto object-cover opacity-95 block relative z-10 mix-blend-multiply" />
          </div>
          
          {/* Decorative floating elements */}
          <div className="absolute -bottom-8 -left-8 bg-white border border-border rounded-[16px] p-4 shadow-lg flex items-center gap-4 animate-float" style={{ animationDelay: '1s', zIndex: 20 }}>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-[18px]">📈</div>
            <div>
              <div className="text-[12px] text-text3 font-[600]">Course Completion</div>
              <div className="text-[18px] font-[700] text-dark">94%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trusted By */}
      <section className="py-12 border-y border-border bg-surface">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center flex-wrap gap-8">
          <div className="text-[14px] font-[600] text-text3 uppercase tracking-wider slide-in">Platform Metrics</div>
          {[['24K+', 'Active Students'], ['480+', 'Expert Instructors'], ['1.8K+', 'Courses Created'], ['₦2.4M+', 'Creator Earnings']].map(([num, lbl], i) => (
            <div key={lbl} className="slide-in" style={{ transitionDelay: `${i * .1}s` }}>
              <div className="text-[28px] font-[700] text-dark" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                {num.includes('₦') ? <>{num.replace('₦', '')}<span className="text-brand">₦</span></> : <>{num.replace('+', '')}<span className="text-brand">+</span></>}
              </div>
              <div className="text-[13px] text-text2 font-[500]">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-brand font-[600] text-[14px] uppercase tracking-wider mb-3 slide-in">Why EmMaxi?</div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-[700] text-dark slide-in" style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em' }}>Everything you need to succeed.</h2>
          <p className="text-text2 text-[16px] mt-4 max-w-2xl mx-auto leading-[1.6] slide-in" style={{ transitionDelay: '.1s' }}>Whether you're building a massive audience or mastering a new skill, we provide the tools to make it happen flawlessly.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Feature 1 */}
          <div className="md:col-span-2 feature-card bg-surface border border-border rounded-[24px] p-8 md:p-10 relative overflow-hidden group slide-in">
            <div className="relative z-10 max-w-[320px]">
              <div className="w-12 h-12 rounded-[14px] bg-white border border-border flex items-center justify-center text-[22px] mb-6 shadow-sm feature-icon">📺</div>
              <h3 className="text-[24px] font-[700] mb-3 text-dark font-[Clash_Display,sans-serif]">YouTube-Powered Lessons</h3>
              <p className="text-[15px] text-text2 leading-[1.6]">Embed any YouTube video as a lesson. No encoding waits, no storage limits. Students watch right in-app with progress tracking.</p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-[300px] h-[200px] bg-white rounded-tl-[24px] border-l border-t border-border shadow-2xl p-4 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
               <div className="w-full h-full bg-surface2 rounded-[12px] flex items-center justify-center text-text3 text-[12px] font-medium border border-border">Video Player Mockup</div>
            </div>
          </div>

          {/* Small Feature 1 */}
          <div className="feature-card bg-surface border border-border rounded-[24px] p-8 relative overflow-hidden slide-in" style={{ transitionDelay: '.1s' }}>
            <div className="w-12 h-12 rounded-[14px] bg-white border border-border flex items-center justify-center text-[22px] mb-6 shadow-sm feature-icon">🎓</div>
            <h3 className="text-[20px] font-[700] mb-3 text-dark font-[Clash_Display,sans-serif]">Verified Certificates</h3>
            <p className="text-[14px] text-text2 leading-[1.6]">Auto-generated certificates with unique IDs for one-click LinkedIn sharing.</p>
            <div className="mt-8 pt-6 border-t border-border/50">
               <div className="h-2 w-3/4 bg-brand-light rounded-full mb-2"></div>
               <div className="h-2 w-1/2 bg-surface2 rounded-full"></div>
            </div>
          </div>

          {/* Small Feature 2 */}
          <div className="feature-card bg-surface border border-border rounded-[24px] p-8 relative overflow-hidden slide-in" style={{ transitionDelay: '.2s' }}>
            <div className="w-12 h-12 rounded-[14px] bg-white border border-border flex items-center justify-center text-[22px] mb-6 shadow-sm feature-icon">💰</div>
            <h3 className="text-[20px] font-[700] mb-3 text-dark font-[Clash_Display,sans-serif]">80% Revenue Share</h3>
            <p className="text-[14px] text-text2 leading-[1.6]">Keep 80% of every sale. Fast monthly payouts directly to your local bank account.</p>
          </div>

          {/* Large Feature 2 */}
          <div className="md:col-span-2 feature-card bg-dark border border-dark2 rounded-[24px] p-8 md:p-10 relative overflow-hidden group slide-in text-white" style={{ transitionDelay: '.3s' }}>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="relative z-10 max-w-[320px]">
              <div className="w-12 h-12 rounded-[14px] bg-white/10 border border-white/10 flex items-center justify-center text-[22px] mb-6 backdrop-blur-md feature-icon">🌍</div>
              <h3 className="text-[24px] font-[700] mb-3 text-white font-[Clash_Display,sans-serif]">Multi-currency Engine</h3>
              <p className="text-[15px] text-white/70 leading-[1.6]">Sell globally, earn locally. Support for localized pricing, automatic currency conversion, and global payment gateways.</p>
            </div>
            <div className="absolute right-0 bottom-0 w-[260px] h-[160px] bg-dark2/50 backdrop-blur-md rounded-tl-[24px] border-l border-t border-white/10 p-5 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[12px] font-medium text-white/60">Revenue</div>
                  <div className="text-[12px] text-green-400">+14%</div>
                </div>
                <div className="text-[24px] font-bold font-[Clash_Display,sans-serif] text-white mb-2">$4,250.00</div>
                <div className="flex items-end gap-1 h-10 mt-4">
                  {[40,70,45,90,60,100,80].map((h, i) => (
                    <div key={i} className="flex-1 bg-brand rounded-t-sm opacity-80" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-24 px-6 bg-surface border-y border-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <h2 className="text-[clamp(32px,4vw,42px)] font-[700] text-dark slide-in" style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em' }}>Featured Courses</h2>
              <p className="text-text2 text-[16px] mt-2 slide-in" style={{ transitionDelay: '.1s' }}>Hand-picked courses from top instructors to accelerate your career.</p>
            </div>
            <Btn variant="outline" onClick={() => navigate('/courses')} className="slide-in border-border2 hover:border-brand" style={{ transitionDelay: '.2s' }}>Explore all courses</Btn>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEMO_COURSES.filter(c => c.status === 'published').slice(0, 3).map((c, i) => (
              <div key={c.id} className="slide-in" style={{ transitionDelay: `${i * .1}s` }}>
                <CourseCard course={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(32px,4vw,48px)] font-[700] text-dark slide-in" style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em' }}>Join thousands of happy learners.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className="testimonial bg-white border border-border rounded-[24px] p-8 shadow-sm slide-in" style={{ transitionDelay: `${i * .1}s` }}>
              <StarRating rating={t.rating} size="md" />
              <p className="text-[15px] text-text2 leading-[1.6] my-6 font-medium">"{t.text}"</p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-[700] text-[13px] shadow-sm" style={{ background: t.color }}>{t.avatar}</div>
                <div>
                  <div className="text-[14px] font-[600] text-dark">{t.name}</div>
                  <div className="text-[12px] text-text3 font-medium">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[1000px] mx-auto bg-dark rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl slide-in">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#10B981]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-[clamp(36px,5vw,56px)] font-[700] text-white mb-6 leading-[1.1]" style={{ fontFamily: 'Clash Display, sans-serif', letterSpacing: '-0.02em' }}>
              Ready to elevate <br/> your <span className="text-brand">potential?</span>
            </h2>
            <p className="text-white/70 text-[18px] mb-10 leading-[1.6] max-w-[500px] mx-auto">
              Join the most intuitive platform for creators and learners. Get started in seconds.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Btn size="lg" onClick={() => navigate('/signup')} className="text-[16px] px-8 py-4 shadow-gold hover:shadow-gold-lg border border-transparent">Create free account</Btn>
              <Btn variant="outline" size="lg" className="text-[16px] px-8 py-4 !border-white/20 !text-white !bg-white/5 hover:!bg-white/10 hover:!border-white/40" onClick={() => navigate('/courses')}>Explore courses</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border px-8 py-12 text-center text-[14px] text-text3 font-medium">
        © {new Date().getFullYear()} EmMaxi · Built for Excellence
      </footer>
    </div>
  )
}