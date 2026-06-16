import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { StarRating } from '../components/ui'
import { DEMO_COURSES } from '../types'
import { CourseCard } from '../components/CourseCard'

type Tab = 'learner' | 'instructor'

const LEARNER_GOALS = [
  'Build a new skill',
  'Earn a certificate',
  'Advance my career',
  'Learn at my own pace',
  'Explore digital marketing',
  'Get into tech',
]

const INSTRUCTOR_GOALS = [
  'Publish my first course',
  'Grow my audience',
  'Earn from my knowledge',
  'Build structured content',
  'Reach global students',
  'Track learner progress',
]

const LEARNER_COURSES = [
  {
    title: 'Data Analytics',
    desc: 'Master data interpretation, spreadsheets, and visualisation tools used by professionals worldwide.',
    label: 'Online course',
  },
  {
    title: 'UX Design',
    desc: 'Learn the fundamentals of user experience design and build a portfolio ready for the job market.',
    label: 'Online course',
  },
  {
    title: 'Digital Marketing',
    desc: 'Understand SEO, paid media, email campaigns, and how to measure what matters.',
    label: 'Online course',
  },
  {
    title: 'IT Support',
    desc: 'Get the technical foundation needed to start or advance a career in IT support.',
    label: 'Online course',
  },
  {
    title: 'Python Programming',
    desc: 'Write real Python code from day one and build projects that demonstrate your ability.',
    label: 'Online course',
  },
  {
    title: 'Project Management',
    desc: 'Learn agile and traditional project management approaches used in modern workplaces.',
    label: 'Online course',
  },
]

const INSTRUCTOR_TOOLS = [
  {
    title: 'Course Builder',
    desc: 'Structure your knowledge into sections and lessons. Add quizzes and publish when you are ready.',
    label: 'Platform tool',
  },
  {
    title: 'Revenue Dashboard',
    desc: 'See your earnings in real time. Monthly payouts go directly to your bank account.',
    label: 'Platform tool',
  },
  {
    title: 'Student Analytics',
    desc: 'Understand who your students are, where they drop off, and how to improve completion rates.',
    label: 'Platform tool',
  },
  {
    title: 'Certificate Generator',
    desc: 'Students receive verified certificates automatically. Shareable on LinkedIn with one click.',
    label: 'Platform tool',
  },
  {
    title: 'Multi-Currency Pricing',
    desc: 'Set prices in any currency. EmMaxi handles conversion and local payment methods for you.',
    label: 'Platform tool',
  },
  {
    title: 'Promo & Discounts',
    desc: 'Create coupon codes and limited-time offers to grow enrolment and reward loyal students.',
    label: 'Platform tool',
  },
]

const testimonials = [
  { name: 'Ada Obi', role: 'Student', text: 'I completed three courses in two months. The certificate helped me land a junior developer role.', rating: 5, avatar: 'AO', color: '#1a73e8' },
  { name: 'James Okafor', role: 'Instructor', text: 'EmMaxi made it easy to launch my Python course. The platform handles everything so I can focus on teaching.', rating: 5, avatar: 'JO', color: '#34a853' },
  { name: 'Lena Müller', role: 'Instructor', text: 'My UI/UX course has 940 students. I did not have to deal with any platform setup — I just built and launched.', rating: 5, avatar: 'LM', color: '#ea4335' },
]

export function LandingPage() {
  const navigate = useNavigate()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('learner')
  const [activeGoal, setActiveGoal] = useState<string | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.08 })
    document.querySelectorAll('.fade-up').forEach(el => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  const goals = activeTab === 'learner' ? LEARNER_GOALS : INSTRUCTOR_GOALS
  const items = activeTab === 'learner' ? LEARNER_COURSES : INSTRUCTOR_TOOLS

  return (
    <div className="min-h-screen bg-white text-text" style={{ fontFamily: 'Google Sans, Inter, sans-serif' }}>

      <style>{`
        .fade-up { opacity: 0; transform: translateY(20px); transition: opacity .5s ease, transform .5s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .goal-pill { display: inline-flex; align-items: center; padding: 8px 18px; border-radius: 999px; border: 1.5px solid #dadce0; font-size: 14px; font-weight: 500; color: #3c4043; cursor: pointer; transition: background .15s, border-color .15s, color .15s; white-space: nowrap; background: #fff; }
        .goal-pill:hover { border-color: #1a73e8; color: #1a73e8; background: #e8f0fe; }
        .goal-pill.active { background: #1a73e8; border-color: #1a73e8; color: #fff; }
        .tab-btn { font-size: 15px; font-weight: 600; padding: 10px 28px; border-radius: 999px; border: 2px solid transparent; cursor: pointer; transition: all .15s; }
        .tab-btn.active { background: #1a73e8; color: #fff; }
        .tab-btn:not(.active) { background: #f1f3f4; color: #3c4043; }
        .tab-btn:not(.active):hover { background: #e8eaed; }
        .course-card-g { border: 1.5px solid #e8eaed; border-radius: 12px; padding: 28px; background: #fff; display: flex; flex-direction: column; gap: 10px; transition: box-shadow .2s, border-color .2s; cursor: pointer; }
        .course-card-g:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-color: #1a73e8; }
        .course-card-g .label { font-size: 12px; font-weight: 600; color: #1a73e8; text-transform: uppercase; letter-spacing: .06em; }
        .course-card-g h3 { font-size: 18px; font-weight: 700; color: #202124; margin: 0; }
        .course-card-g p { font-size: 14px; color: #5f6368; line-height: 1.6; margin: 0; flex: 1; }
        .arrow-link { font-size: 14px; font-weight: 600; color: #1a73e8; display: flex; align-items: center; gap: 4px; margin-top: 4px; }
        .divider { height: 1px; background: #e8eaed; margin: 0; border: none; }
        .stat-block { text-align: center; }
        .stat-block .num { font-size: 36px; font-weight: 700; color: #202124; line-height: 1.1; }
        .stat-block .lbl { font-size: 14px; color: #5f6368; margin-top: 4px; font-weight: 500; }
        .story-card { border: 1.5px solid #e8eaed; border-radius: 12px; overflow: hidden; background: #fff; transition: box-shadow .2s; }
        .story-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .pills-scroll { display: flex; flex-wrap: wrap; gap: 10px; }
        @media (max-width: 640px) {
          .pills-scroll { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .pills-scroll::-webkit-scrollbar { display: none; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #e8eaed', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#202124', letterSpacing: '-0.02em' }}>
            Em<span style={{ color: '#1a73e8' }}>Maxi</span>
          </div>
          <div className="hidden md:flex" style={{ gap: 32 }}>
            {['Features', 'Courses', 'Reviews'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 14, fontWeight: 500, color: '#3c4043', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1a73e8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#3c4043')}
              >{item}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={() => navigate('/login')}
              style={{ fontSize: 14, fontWeight: 600, color: '#1a73e8', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px' }}>
              Sign in
            </button>
            <button onClick={() => navigate('/signup')}
              style={{ fontSize: 14, fontWeight: 600, color: '#fff', background: '#1a73e8', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '10px 20px' }}>
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: '#fff', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }} className="fade-up">
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#202124', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 20 }}>
            Here to help you grow
          </h1>
          <p style={{ fontSize: 18, color: '#5f6368', lineHeight: 1.65, marginBottom: 40 }}>
            Whether you want to build new skills, earn a certificate, or launch your own course — EmMaxi gives you the tools to get there.
          </p>

          {/* Tab switcher */}
          <div style={{ display: 'inline-flex', background: '#f1f3f4', borderRadius: 999, padding: 4, gap: 4, marginBottom: 36 }}>
            <button className={`tab-btn${activeTab === 'learner' ? ' active' : ''}`} onClick={() => { setActiveTab('learner'); setActiveGoal(null) }}>
              I want to learn
            </button>
            <button className={`tab-btn${activeTab === 'instructor' ? ' active' : ''}`} onClick={() => { setActiveTab('instructor'); setActiveGoal(null) }}>
              I want to teach
            </button>
          </div>

          {/* Goal pills */}
          <div className="pills-scroll" style={{ justifyContent: 'center' }}>
            {goals.map(g => (
              <button key={g} className={`goal-pill${activeGoal === g ? ' active' : ''}`}
                onClick={() => setActiveGoal(activeGoal === g ? null : g)}>
                {g}
              </button>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Stats */}
      <section style={{ background: '#f8f9fa', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
          {[['24,000+', 'Active learners'], ['480+', 'Expert instructors'], ['1,800+', 'Courses available'], ['94%', 'Completion rate']].map(([num, lbl]) => (
            <div key={lbl} className="stat-block fade-up">
              <div className="num">{num}</div>
              <div className="lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* Courses / Tools Grid */}
      <section id="features" style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>
            {activeTab === 'learner' ? 'For learners' : 'For instructors'}
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 700, color: '#202124', letterSpacing: '-0.02em', marginBottom: 12, maxWidth: 480 }}>
            {activeTab === 'learner' ? 'Grow your career' : 'Share your expertise'}
          </h2>
          <p style={{ fontSize: 16, color: '#5f6368', lineHeight: 1.65, maxWidth: 520 }}>
            {activeTab === 'learner'
              ? 'Whether you are writing your first CV or deepening your technical knowledge, EmMaxi has the courses to sharpen your digital skillset.'
              : 'From your first course to a thriving student base, EmMaxi gives instructors the tools to build, publish, and earn.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {items.map((item, i) => (
            <div key={item.title} className="course-card-g fade-up" style={{ transitionDelay: `${i * 0.06}s` }}
              onClick={() => navigate('/courses')}>
              <div className="label">{item.label}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="arrow-link">
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <button onClick={() => navigate('/courses')}
            style={{ fontSize: 15, fontWeight: 600, color: '#1a73e8', background: 'none', border: '2px solid #1a73e8', borderRadius: 8, cursor: 'pointer', padding: '12px 28px' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#e8f0fe' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
          >
            Explore all {activeTab === 'learner' ? 'courses' : 'tools'}
          </button>
        </div>
      </section>

      <hr className="divider" />

      {/* Featured Courses from platform */}
      <section id="courses" style={{ background: '#f8f9fa', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="fade-up" style={{ marginBottom: 40, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Live on platform</p>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: '#202124', letterSpacing: '-0.02em' }}>Featured courses</h2>
              <p style={{ fontSize: 15, color: '#5f6368', marginTop: 8 }}>Hand-picked from our top instructors.</p>
            </div>
            <button onClick={() => navigate('/courses')}
              style={{ fontSize: 14, fontWeight: 600, color: '#1a73e8', background: 'none', border: '1.5px solid #dadce0', borderRadius: 8, cursor: 'pointer', padding: '10px 20px' }}>
              Browse all courses
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {DEMO_COURSES.filter(c => c.status === 'published').slice(0, 3).map((c, i) => (
              <div key={c.id} className="fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
                <CourseCard course={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Testimonials */}
      <section id="reviews" style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Success stories</p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: '#202124', letterSpacing: '-0.02em', maxWidth: 400 }}>
            What our community says
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {testimonials.map((t, i) => (
            <div key={t.name} className="story-card fade-up" style={{ transitionDelay: `${i * 0.08}s`, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <StarRating rating={t.rating} size="md" />
              <p style={{ fontSize: 15, color: '#3c4043', lineHeight: 1.65, flex: 1, margin: 0 }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid #e8eaed' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#202124' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#5f6368', fontWeight: 500 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* CTA */}
      <section style={{ background: '#f8f9fa', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }} className="fade-up">
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1a73e8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 16 }}>Get started today</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#202124', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.1 }}>
            Ready to advance your potential?
          </h2>
          <p style={{ fontSize: 16, color: '#5f6368', lineHeight: 1.65, marginBottom: 36 }}>
            Join thousands of learners and instructors building their future on EmMaxi. Create a free account and get started today.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')}
              style={{ fontSize: 15, fontWeight: 600, color: '#fff', background: '#1a73e8', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '14px 32px' }}>
              Create free account
            </button>
            <button onClick={() => navigate('/courses')}
              style={{ fontSize: 15, fontWeight: 600, color: '#1a73e8', background: '#fff', border: '2px solid #dadce0', borderRadius: 8, cursor: 'pointer', padding: '14px 32px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#1a73e8' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#dadce0' }}
            >
              Explore courses
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e8eaed', background: '#fff', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#202124', letterSpacing: '-0.02em' }}>
            Em<span style={{ color: '#1a73e8' }}>Maxi</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Features', 'Courses', 'Reviews'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 500, color: '#5f6368', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1a73e8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#5f6368')}
              >{item}</a>
            ))}
          </div>
          <div style={{ fontSize: 13, color: '#9aa0a6', fontWeight: 500 }}>
            © {new Date().getFullYear()} EmMaxi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}