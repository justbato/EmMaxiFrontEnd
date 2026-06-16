import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { StarRating } from '../components/ui'
import { DEMO_COURSES } from '../types'
import { CourseCard } from '../components/CourseCard'

type Tab = 'learner' | 'instructor'

// Derive top 5 categories by total student count from real course data
function getTopCategories(courses: typeof DEMO_COURSES, limit = 5) {
  const map = new Map<string, { students: number; count: number }>()
  courses.filter(c => c.status === 'published').forEach(c => {
    const existing = map.get(c.category) ?? { students: 0, count: 0 }
    map.set(c.category, { students: existing.students + c.students, count: existing.count + 1 })
  })
  return Array.from(map.entries())
    .sort((a, b) => b[1].students - a[1].students)
    .slice(0, limit)
    .map(([category, data]) => ({ category, ...data }))
}

// Compute live stats from course data
function getStats(courses: typeof DEMO_COURSES) {
  const published = courses.filter(c => c.status === 'published')
  const totalStudents = published.reduce((sum, c) => sum + c.students, 0)
  const instructors = new Set(published.map(c => c.instructor_id)).size
  return {
    students: totalStudents.toLocaleString() + '+',
    courses: published.length + '+',
    instructors: instructors + '+',
    completion: '94%',
  }
}

const INSTRUCTOR_TOOLS = [
  { title: 'Course Builder', desc: 'Structure your knowledge into sections and lessons. Add quizzes and publish when you are ready.', label: 'Platform tool' },
  { title: 'Revenue Dashboard', desc: 'See your earnings in real time. Monthly payouts go directly to your bank account.', label: 'Platform tool' },
  { title: 'Student Analytics', desc: 'Understand who your students are, where they drop off, and how to improve completion rates.', label: 'Platform tool' },
  { title: 'Certificate Generator', desc: 'Students receive verified certificates automatically. Shareable on LinkedIn with one click.', label: 'Platform tool' },
  { title: 'Multi-Currency Pricing', desc: 'Set prices in any currency. EmMaxi handles conversion and local payment methods for you.', label: 'Platform tool' },
  { title: 'Promo & Discounts', desc: 'Create coupon codes and limited-time offers to grow enrolment and reward loyal students.', label: 'Platform tool' },
]

const testimonials = [
  { name: 'Ada Obi', role: 'Student', text: 'I completed three courses in two months. The certificate helped me land a junior developer role.', rating: 5, avatar: 'AO', color: '#D4A017' },
  { name: 'James Okafor', role: 'Instructor', text: 'EmMaxi made it easy to launch my Python course. The platform handles everything so I can focus on teaching.', rating: 5, avatar: 'JO', color: '#10B981' },
  { name: 'Lena Müller', role: 'Instructor', text: 'My UI/UX course has 940 students. I did not have to deal with any platform setup — I just built and launched.', rating: 5, avatar: 'LM', color: '#6366F1' },
]

export function LandingPage() {
  const navigate = useNavigate()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('learner')

  const [menuOpen, setMenuOpen] = useState(false)

  // Derived from real course data
  const topCategories = getTopCategories(DEMO_COURSES)
  const stats = getStats(DEMO_COURSES)

  // Published courses — show top 3 by student count as a preview
  const publishedCourses = DEMO_COURSES.filter(c => c.status === 'published')
  const featuredCourses = [...publishedCourses].sort((a, b) => b.students - a.students).slice(0, 3)

  const connectObserver = () => {
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.08 })
    setTimeout(() => {
      document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in, .stat-pop').forEach(el => {
        el.classList.remove('visible')
        observerRef.current?.observe(el)
      })
    }, 50)
  }

  useEffect(() => {
    connectObserver()
    return () => observerRef.current?.disconnect()
  }, [activeTab])

  const handleTabSwitch = (tab: Tab) => {
    setActiveTab(tab)
  }

  const handleCategoryClick = (category: string) => {
    navigate(`/courses?category=${encodeURIComponent(category)}`)
  }

  return (
    <div className="min-h-screen bg-white text-text" style={{ fontFamily: 'Google Sans, Inter, sans-serif' }}>

      <style>{`
        /* ── Base animation states ── */
        .fade-up   { opacity: 0; transform: translateY(32px);  transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1); }
        .fade-left { opacity: 0; transform: translateX(-32px); transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1); }
        .fade-right{ opacity: 0; transform: translateX(32px);  transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1); }
        .scale-in  { opacity: 0; transform: scale(.93);        transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1); }
        .fade-up.visible, .fade-left.visible, .fade-right.visible, .scale-in.visible { opacity: 1; transform: none; }

        /* ── Stagger delays for card grids ── */
        .stagger-1 { transition-delay: .08s !important; }
        .stagger-2 { transition-delay: .16s !important; }
        .stagger-3 { transition-delay: .24s !important; }
        .stagger-4 { transition-delay: .32s !important; }
        .stagger-5 { transition-delay: .40s !important; }
        .stagger-6 { transition-delay: .48s !important; }

        /* ── Stat number count-up pop ── */
        @keyframes popIn { 0%{transform:scale(.7);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        .stat-pop { opacity: 0; }
        .stat-pop.visible { animation: popIn .55s cubic-bezier(.22,1,.36,1) forwards; }

        /* ── Nav link underline slide ── */
        .nav-link { position: relative; }
        .nav-link::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#D4A017; transition:width .25s ease; border-radius:2px; }
        .nav-link:hover::after { width:100%; }

        /* ── Card hover lift ── */
        .course-card-g { border: 1.5px solid #e8eaed; border-radius: 12px; padding: 28px; background: #fff; display: flex; flex-direction: column; gap: 10px; transition: box-shadow .25s ease, border-color .25s ease, transform .25s ease; cursor: pointer; }
        .course-card-g:hover { box-shadow: 0 8px 28px rgba(212,160,23,0.13); border-color: #D4A017; transform: translateY(-4px); }
        .course-card-g .label { font-size: 12px; font-weight: 600; color: #D4A017; text-transform: uppercase; letter-spacing: .06em; }
        .course-card-g h3 { font-size: 18px; font-weight: 700; color: #202124; margin: 0; }
        .course-card-g p { font-size: 14px; color: #5f6368; line-height: 1.6; margin: 0; flex: 1; }
        .arrow-link { font-size: 14px; font-weight: 600; color: #D4A017; display: flex; align-items: center; gap: 4px; margin-top: 4px; transition: gap .2s; }
        .course-card-g:hover .arrow-link { gap: 8px; }

        /* ── Story card hover ── */
        .story-card { border: 1.5px solid #e8eaed; border-radius: 12px; overflow: hidden; background: #fff; transition: box-shadow .25s ease, transform .25s ease; }
        .story-card:hover { box-shadow: 0 8px 28px rgba(212,160,23,0.10); transform: translateY(-4px); }

        /* ── Pills ── */
        .goal-pill { display: inline-flex; align-items: center; padding: 8px 18px; border-radius: 999px; border: 1.5px solid #dadce0; font-size: 14px; font-weight: 500; color: #3c4043; cursor: pointer; transition: background .15s, border-color .2s, color .15s, transform .15s; white-space: nowrap; background: #fff; }
        .goal-pill:hover { border-color: #D4A017; color: #D4A017; background: #FDF6E3; transform: scale(1.03); }
        .goal-pill.active { background: #D4A017; border-color: #D4A017; color: #fff; }

        /* ── Tab buttons ── */
        .tab-btn { font-size: 15px; font-weight: 600; padding: 10px 28px; border-radius: 999px; border: 2px solid transparent; cursor: pointer; transition: all .2s ease; }
        .tab-btn.active { background: #D4A017; color: #fff; }
        .tab-btn:not(.active) { background: #f1f3f4; color: #3c4043; }
        .tab-btn:not(.active):hover { background: #e8eaed; }

        /* ── Misc ── */
        .divider { height: 1px; background: #e8eaed; margin: 0; border: none; }
        .stat-block { text-align: center; }
        .stat-block .num { font-size: 36px; font-weight: 700; color: #202124; line-height: 1.1; }
        .stat-block .lbl { font-size: 14px; color: #5f6368; margin-top: 4px; font-weight: 500; }
        .pills-scroll { display: flex; flex-wrap: wrap; gap: 10px; }
        @media (max-width: 640px) {
          .pills-scroll { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .pills-scroll::-webkit-scrollbar { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fade-up, .fade-left, .fade-right, .scale-in, .stat-pop { opacity: 1 !important; transform: none !important; animation: none !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #e8eaed', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          {/* Logo */}
          <div style={{ fontSize: 22, fontWeight: 700, color: '#202124', letterSpacing: '-0.02em', flexShrink: 0 }}>
            Em<span style={{ color: '#D4A017' }}>Maxi</span>
          </div>

          {/* Desktop nav links — centred */}
          <div className="hidden md:flex" style={{ gap: 36, flex: 1, justifyContent: 'center' }}>
            {[['Features', '#features'], ['Courses', '#courses'], ['Reviews', '#reviews']].map(([label, href]) => (
              <a key={label} href={href} className="nav-link"
                style={{ fontSize: 14, fontWeight: 500, color: '#3c4043', textDecoration: 'none', paddingBottom: 2 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4A017')}
                onMouseLeave={e => (e.currentTarget.style.color = '#3c4043')}
              >{label}</a>
            ))}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex" style={{ gap: 10, alignItems: 'center', flexShrink: 0 }}>
            <button onClick={() => navigate('/login')}
              style={{ fontSize: 14, fontWeight: 600, color: '#3c4043', background: 'none', border: '1.5px solid #dadce0', borderRadius: 8, cursor: 'pointer', padding: '9px 18px', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4A017'; (e.currentTarget as HTMLButtonElement).style.color = '#D4A017' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#dadce0'; (e.currentTarget as HTMLButtonElement).style.color = '#3c4043' }}
            >
              Sign in
            </button>
            <button onClick={() => navigate('/signup/student')}
              style={{ fontSize: 14, fontWeight: 600, color: '#fff', background: '#D4A017', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '10px 20px', whiteSpace: 'nowrap' }}>
              Get started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', width: 22, height: 2, background: '#3c4043', borderRadius: 2, transition: 'transform .2s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#3c4043', borderRadius: 2, transition: 'opacity .2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#3c4043', borderRadius: 2, transition: 'transform .2s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #e8eaed', padding: '16px 32px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['Features', '#features'], ['Courses', '#courses'], ['Reviews', '#reviews']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ fontSize: 15, fontWeight: 500, color: '#3c4043', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #f1f3f4' }}>
                {label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button onClick={() => { navigate('/login'); setMenuOpen(false) }}
                style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#3c4043', background: 'none', border: '1.5px solid #dadce0', borderRadius: 8, cursor: 'pointer', padding: '10px' }}>
                Sign in
              </button>
              <button onClick={() => { navigate('/signup/student'); setMenuOpen(false) }}
                style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#fff', background: '#D4A017', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '10px' }}>
                Get started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section style={{ background: '#fff', padding: '72px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h1 className="fade-up" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#202124', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 20 }}>
            Here to help you grow
          </h1>
          <p className="fade-up stagger-1" style={{ fontSize: 18, color: '#5f6368', lineHeight: 1.65, marginBottom: 40 }}>
            Whether you want to build new skills, earn a certificate, or launch your own course — EmMaxi gives you the tools to get there.
          </p>

          {/* Tab switcher */}
          <div className="fade-up stagger-2" style={{ display: 'inline-flex', background: '#f1f3f4', borderRadius: 999, padding: 4, gap: 4, marginBottom: 36 }}>
            <button className={`tab-btn${activeTab === 'learner' ? ' active' : ''}`}
              onClick={() => handleTabSwitch('learner')}>
              I want to learn
            </button>
            <button className={`tab-btn${activeTab === 'instructor' ? ' active' : ''}`}
              onClick={() => handleTabSwitch('instructor')}>
              I want to teach
            </button>
          </div>

          {/* Signup CTA below tabs */}
          <div className="fade-up stagger-3" style={{ marginBottom: 32 }}>
            <button
              onClick={() => navigate(activeTab === 'learner' ? '/signup/student' : '/signup/instructor')}
              style={{ fontSize: 15, fontWeight: 600, color: '#fff', background: '#D4A017', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '12px 32px' }}>
              {activeTab === 'learner' ? 'Start learning for free' : 'Start teaching for free'}
            </button>
          </div>

          {/* Category pills — top 5 from real course data */}
          <div className="fade-up stagger-3" style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 13, color: '#5f6368', marginBottom: 12 }}>
              {activeTab === 'learner' ? 'What do you want to learn?' : 'What will you teach?'}
            </p>
            <div className="pills-scroll" style={{ justifyContent: 'center' }}>
              {activeTab === 'learner'
                ? topCategories.map(({ category, students }) => (
                  <button key={category}
                    className="goal-pill"
                    onClick={() => handleCategoryClick(category)}
                    title={`${students.toLocaleString()} students`}>
                    {category}
                    <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
                      {students >= 1000 ? `${(students / 1000).toFixed(1)}k` : students}
                    </span>
                  </button>
                ))
                : ['Course Design', 'Pricing Strategy', 'Growing Students', 'Video Production', 'Marketing'].map(g => (
                  <button key={g} className="goal-pill" onClick={() => navigate('/signup/instructor')}>{g}</button>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Stats — computed live from course data */}
      <section style={{ background: '#f8f9fa', padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
          {[
            [stats.students, 'Active learners'],
            [stats.instructors, 'Expert instructors'],
            [stats.courses, 'Courses available'],
            [stats.completion, 'Completion rate'],
          ].map(([num, lbl], i) => (
            <div key={lbl} className={`stat-block stat-pop stagger-${i + 1}`}>
              <div className="num">{num}</div>
              <div className="lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* Grow your career / Share your expertise */}
      <section id="features" style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="fade-left" style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>
            {activeTab === 'learner' ? 'For learners' : 'For instructors'}
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 700, color: '#202124', letterSpacing: '-0.02em', marginBottom: 12, maxWidth: 480 }}>
            {activeTab === 'learner' ? 'Grow your career' : 'Share your expertise'}
          </h2>
          <p style={{ fontSize: 16, color: '#5f6368', lineHeight: 1.65, maxWidth: 520 }}>
            {activeTab === 'learner'
              ? `Browse ${publishedCourses.length} courses across ${topCategories.length} categories. Click any category above to jump straight to what interests you.`
              : 'From your first course to a thriving student base, EmMaxi gives instructors the tools to build, publish, and earn.'}
          </p>
        </div>

        {activeTab === 'learner' ? (
          /* Real course cards from DEMO_COURSES, filtered by selected category */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {featuredCourses.map((course, i) => (
              <div key={course.id}
                className={`course-card-g scale-in stagger-${Math.min(i + 1, 6)}`}
                onClick={() => navigate(`/courses/${course.id}`)}>
                <div className="label">{course.category}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#5f6368', marginTop: 4 }}>
                  <span>{course.students.toLocaleString()} students</span>
                  <span>·</span>
                  <span>{course.level}</span>
                  <span>·</span>
                  <span>{course.hours}h</span>
                </div>
                <div className="arrow-link">
                  View course
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Instructor tools — static */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {INSTRUCTOR_TOOLS.map((item, i) => (
              <div key={item.title} className={`course-card-g scale-in stagger-${i + 1}`}
                onClick={() => navigate('/signup/instructor')}>
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
        )}

        <div className="fade-up" style={{ marginTop: 40 }}>
          <button onClick={() => navigate('/courses')}
            style={{ fontSize: 15, fontWeight: 600, color: '#D4A017', background: 'none', border: '2px solid #D4A017', borderRadius: 8, cursor: 'pointer', padding: '12px 28px' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FDF6E3' }}
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
              <p style={{ fontSize: 13, fontWeight: 600, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Live on platform</p>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: '#202124', letterSpacing: '-0.02em' }}>Featured courses</h2>
              <p style={{ fontSize: 15, color: '#5f6368', marginTop: 8 }}>Hand-picked from our top instructors.</p>
            </div>
            <button onClick={() => navigate('/courses')}
              style={{ fontSize: 14, fontWeight: 600, color: '#D4A017', background: 'none', border: '1.5px solid #dadce0', borderRadius: 8, cursor: 'pointer', padding: '10px 20px' }}>
              Browse all courses
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {DEMO_COURSES.filter(c => c.status === 'published').slice(0, 3).map((c, i) => (
              <div key={c.id} className={`scale-in stagger-${i + 1}`}>
                <CourseCard course={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Testimonials */}
      <section id="reviews" style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="fade-left" style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Success stories</p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: '#202124', letterSpacing: '-0.02em', maxWidth: 400 }}>
            What our community says
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {testimonials.map((t, i) => (
            <div key={t.name} className={`story-card fade-up stagger-${i + 1}`} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p className="fade-up" style={{ fontSize: 13, fontWeight: 600, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 16 }}>Get started today</p>
          <h2 className="fade-up stagger-1" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#202124', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.1 }}>
            Ready to advance your potential?
          </h2>
          <p className="fade-up stagger-2" style={{ fontSize: 16, color: '#5f6368', lineHeight: 1.65, marginBottom: 36 }}>
            Join thousands of learners and instructors building their future on EmMaxi. Create a free account and get started today.
          </p>
          <div className="fade-up stagger-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')}
              style={{ fontSize: 15, fontWeight: 600, color: '#fff', background: '#D4A017', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '14px 32px' }}>
              Create free account
            </button>
            <button onClick={() => navigate('/courses')}
              style={{ fontSize: 15, fontWeight: 600, color: '#D4A017', background: '#fff', border: '2px solid #dadce0', borderRadius: 8, cursor: 'pointer', padding: '14px 32px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4A017' }}
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
            Em<span style={{ color: '#D4A017' }}>Maxi</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Features', 'Courses', 'Reviews'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 500, color: '#5f6368', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4A017')}
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