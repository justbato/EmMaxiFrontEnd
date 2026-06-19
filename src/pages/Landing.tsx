import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { StarRating } from '../components/ui'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { DEMO_COURSES } from '../types'

type Tab = 'learner' | 'instructor'

// Real categories from the Courses page
const COURSE_CATEGORIES = [
  { label: 'Web Dev',      icon: '💻', desc: 'React, Node.js, full-stack' },
  { label: 'Data Science', icon: '📊', desc: 'Python, ML, analytics' },
  { label: 'Design',       icon: '🎨', desc: 'UI/UX, Figma, branding' },
  { label: 'Cloud',        icon: '☁️',  desc: 'AWS, DevOps, architecture' },
  { label: 'Mobile',       icon: '📱', desc: 'Flutter, React Native' },
  { label: 'Security',     icon: '🔐', desc: 'Ethical hacking, networking' },
  { label: 'Business',     icon: '📈', desc: 'Marketing, finance, strategy' },
]

const INSTRUCTOR_TOOLS = [
  { title: 'Course Builder',        desc: 'Structure your knowledge into sections and lessons. Add quizzes and publish when you are ready.',   label: 'Platform tool', icon: '🛠️' },
  { title: 'Revenue Dashboard',     desc: 'See your earnings in real time. Monthly payouts go directly to your bank account.',                   label: 'Platform tool', icon: '💰' },
  { title: 'Student Analytics',     desc: 'Understand who your students are, where they drop off, and how to improve completion rates.',          label: 'Platform tool', icon: '📊' },
  { title: 'Certificate Generator', desc: 'Students receive verified certificates automatically. Shareable on LinkedIn with one click.',          label: 'Platform tool', icon: '🏆' },
  { title: 'Multi-Currency Pricing',desc: 'Set prices in any currency. EmMaxi handles conversion and local payment methods for you.',            label: 'Platform tool', icon: '💱' },
  { title: 'Promo & Discounts',     desc: 'Create coupon codes and limited-time offers to grow enrolment and reward loyal students.',             label: 'Platform tool', icon: '🎁' },
]

const LEARNER_HIGHLIGHTS = [
  { icon: '🎓', title: 'Expert-led courses', desc: 'Learn from vetted instructors with real-world experience in every field.' },
  { icon: '📜', title: 'Verified certificates', desc: 'Earn certificates you can share directly on LinkedIn with a single click.' },
  { icon: '⚡', title: 'Learn at your pace', desc: 'Lifetime access. Watch on any device, online or offline, whenever you choose.' },
  { icon: '💬', title: 'Community & Q&A', desc: 'Join live discussions, get answers from instructors, and grow your network.' },
]

const INSTRUCTOR_HIGHLIGHTS = [
  { icon: '🚀', title: 'Publish in minutes', desc: 'Our builder turns your YouTube videos into a structured course instantly.' },
  { icon: '💸', title: '80% revenue share', desc: 'Keep the majority of every sale. Monthly payouts, no hidden fees.' },
  { icon: '🌍', title: 'Global reach', desc: 'Reach learners across Africa and beyond with multi-currency support.' },
  { icon: '📈', title: 'Deep analytics', desc: "Track every student's progress, identify drop-off points, and improve fast." },
]

const testimonials = [
  { name: 'Ada Obi',       role: 'Student',    text: 'I completed three courses in two months. The certificate helped me land a junior developer role.', rating: 5, avatar: 'AO', color: '#D4A017' },
  { name: 'James Okafor', role: 'Instructor',  text: 'EmMaxi made it easy to launch my Python course. The platform handles everything so I can focus on teaching.', rating: 5, avatar: 'JO', color: '#10B981' },
  { name: 'Lena Müller',  role: 'Instructor',  text: 'My UI/UX course has 940 students. I did not have to deal with any platform setup — I just built and launched.', rating: 5, avatar: 'LM', color: '#6366F1' },
]

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

export function LandingPage() {
  const navigate = useNavigate()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('learner')
  const [menuOpen, setMenuOpen] = useState(false)

  const stats = getStats(DEMO_COURSES)

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

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]" style={{ fontFamily: 'Google Sans, Inter, sans-serif' }}>

      <style>{`
        /* ── Base animation states ── */
        .fade-up   { opacity: 0; transform: translateY(32px);  transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1); }
        .fade-left { opacity: 0; transform: translateX(-32px); transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1); }
        .fade-right{ opacity: 0; transform: translateX(32px);  transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1); }
        .scale-in  { opacity: 0; transform: scale(.93);        transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1); }
        .fade-up.visible, .fade-left.visible, .fade-right.visible, .scale-in.visible { opacity: 1; transform: none; }

        /* ── Stagger delays ── */
        .stagger-1 { transition-delay: .08s !important; }
        .stagger-2 { transition-delay: .16s !important; }
        .stagger-3 { transition-delay: .24s !important; }
        .stagger-4 { transition-delay: .32s !important; }
        .stagger-5 { transition-delay: .40s !important; }
        .stagger-6 { transition-delay: .48s !important; }

        /* ── Stat pop ── */
        @keyframes popIn { 0%{transform:scale(.7);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
        .stat-pop { opacity: 0; }
        .stat-pop.visible { animation: popIn .55s cubic-bezier(.22,1,.36,1) forwards; }

        /* ── Nav underline ── */
        .nav-link { position: relative; }
        .nav-link::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:2px; background:#D4A017; transition:width .25s ease; border-radius:2px; }
        .nav-link:hover::after { width:100%; }

        /* ── Classic segmented tab control ── */
        .seg-control {
          display: inline-flex;
          background: var(--surface);
          border: 1.5px solid var(--border-2);
          border-radius: 10px;
          padding: 3px;
          gap: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,.06);
        }
        .seg-btn {
          position: relative;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 28px;
          border-radius: 7px;
          border: none;
          cursor: pointer;
          background: transparent;
          color: var(--text-tertiary);
          letter-spacing: .01em;
          transition: color .2s ease, background .2s ease, box-shadow .2s ease;
          white-space: nowrap;
          z-index: 1;
        }
        .seg-btn.active {
          background: #D4A017;
          color: #fff;
          box-shadow: 0 2px 8px rgba(212,160,23,.35);
        }
        .seg-btn:not(.active):hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        /* ── Category pill chips (horizontal row) ── */
        .cat-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .cat-card {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border: 1.5px solid var(--border);
          border-radius: 999px;
          background: var(--surface);
          cursor: pointer;
          transition: border-color .2s, box-shadow .2s, transform .15s, background .2s;
          white-space: nowrap;
        }
        .cat-card:hover {
          border-color: #D4A017;
          box-shadow: 0 4px 16px rgba(212,160,23,.18);
          transform: translateY(-2px);
          background: var(--brand-light);
        }
        .cat-icon { font-size: 18px; line-height: 1; flex-shrink: 0; }
        .cat-label { font-size: 13px; font-weight: 700; color: var(--text-primary); }
        .cat-desc  { font-size: 11px; color: var(--text-tertiary); margin-left: 2px; }

        /* ── Highlight cards (horizontal equal-width row) ── */
        .highlight-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .highlight-card {
          flex: 1 1 200px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 18px 20px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          background: var(--surface);
          transition: border-color .25s, box-shadow .25s, transform .25s, background .25s;
          min-width: 0;
        }
        .highlight-card:hover {
          border-color: #D4A017;
          box-shadow: 0 6px 24px rgba(212,160,23,.12);
          transform: translateY(-3px);
        }
        .highlight-icon { font-size: 24px; flex-shrink: 0; margin-top: 1px; }

        /* ── Course card ── */
        .course-card-g { border: 1.5px solid var(--border); border-radius: 12px; padding: 28px; background: var(--surface); display: flex; flex-direction: column; gap: 10px; transition: box-shadow .25s ease, border-color .25s ease, transform .25s ease, background-color .25s ease; cursor: pointer; }
        .course-card-g:hover { box-shadow: 0 8px 28px rgba(212,160,23,0.13); border-color: #D4A017; transform: translateY(-4px); }
        .course-card-g .label { font-size: 12px; font-weight: 600; color: #D4A017; text-transform: uppercase; letter-spacing: .06em; }
        .course-card-g h3 { font-size: 18px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .course-card-g p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin: 0; flex: 1; }
        .arrow-link { font-size: 14px; font-weight: 600; color: #D4A017; display: flex; align-items: center; gap: 4px; margin-top: 4px; transition: gap .2s; }
        .course-card-g:hover .arrow-link { gap: 8px; }

        /* ── Story card ── */
        .story-card { border: 1.5px solid var(--border); border-radius: 12px; overflow: hidden; background: var(--surface); transition: box-shadow .25s ease, transform .25s ease, background-color .25s ease; }
        .story-card:hover { box-shadow: 0 8px 28px rgba(212,160,23,0.10); transform: translateY(-4px); }

        /* ── CTA panel that appears under tab ── */
        .tab-detail-panel {
          width: 100%;
          animation: panelFade .35s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes panelFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Misc ── */
        .landing-divider { height: 1px; background: var(--border); margin: 0; border: none; }
        .stat-block { text-align: center; }
        .stat-block .num { font-size: 36px; font-weight: 700; color: var(--text-primary); line-height: 1.1; }
        .stat-block .lbl { font-size: 14px; color: var(--text-secondary); margin-top: 4px; font-weight: 500; }

        @media (prefers-reduced-motion: reduce) {
          .fade-up, .fade-left, .fade-right, .scale-in, .stat-pop { opacity: 1 !important; transform: none !important; animation: none !important; }
        }

        /* ── Dark-mode input text fix ── */
        .dark input::placeholder, .dark textarea::placeholder { color: var(--text-tertiary); opacity: 1; }
        .dark input, .dark textarea, .dark select { color: var(--text-primary) !important; }
      `}</style>

      {/* ── Nav ── */}
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--nav-bg)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', flexShrink: 0 }}>
            Em<span style={{ color: '#D4A017' }}>Maxi</span>
          </div>

          <div className="hidden md:flex" style={{ gap: 36, flex: 1, justifyContent: 'center' }}>
            {[['Features', '#features'], ['Courses', '#courses'], ['Reviews', '#reviews']].map(([label, href]) => (
              <a key={label} href={href} className="nav-link"
                style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', paddingBottom: 2 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4A017')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >{label}</a>
            ))}
          </div>

          <div className="hidden md:flex" style={{ gap: 10, alignItems: 'center', flexShrink: 0 }}>
            <ThemeToggle />
            <button onClick={() => navigate('/login')}
              style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', background: 'none', border: '1.5px solid var(--border-2)', borderRadius: 8, cursor: 'pointer', padding: '9px 18px', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4A017'; (e.currentTarget as HTMLButtonElement).style.color = '#D4A017' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-2)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)' }}
            >
              Sign in
            </button>
            <button onClick={() => navigate('/signup')}
              style={{ fontSize: 14, fontWeight: 600, color: '#fff', background: '#D4A017', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '10px 20px', whiteSpace: 'nowrap' }}>
              Get started
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle size="sm" />
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text-secondary)', borderRadius: 2, transition: 'transform .2s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text-secondary)', borderRadius: 2, transition: 'opacity .2s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text-secondary)', borderRadius: 2, transition: 'transform .2s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '16px 32px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['Features', '#features'], ['Courses', '#courses'], ['Reviews', '#reviews']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                {label}
              </a>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button onClick={() => { navigate('/login'); setMenuOpen(false) }}
                style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', background: 'none', border: '1.5px solid var(--border-2)', borderRadius: 8, cursor: 'pointer', padding: '10px' }}>
                Sign in
              </button>
              <button onClick={() => { navigate('/signup'); setMenuOpen(false) }}
                style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#fff', background: '#D4A017', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '10px' }}>
                Get started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--bg)', padding: '72px 24px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h1 className="fade-up" style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Here to help you grow
          </h1>
          <p className="fade-up stagger-1" style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 44 }}>
            Whether you want to build new skills, earn a certificate, or launch your own course — EmMaxi gives you the tools to get there.
          </p>

          {/* ── Classic segmented control ── */}
          <div className="fade-up stagger-2" style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
            <div className="seg-control">
              <button
                id="tab-learner"
                className={`seg-btn${activeTab === 'learner' ? ' active' : ''}`}
                onClick={() => handleTabSwitch('learner')}
              >
                I want to learn
              </button>
              <button
                id="tab-instructor"
                className={`seg-btn${activeTab === 'instructor' ? ' active' : ''}`}
                onClick={() => handleTabSwitch('instructor')}
              >
                I want to teach
              </button>
            </div>
          </div>

          {/* ── Tab detail panel ── */}
          <div key={activeTab} className="tab-detail-panel" style={{ textAlign: 'left', marginBottom: 64 }}>
            {activeTab === 'learner' ? (
              <>
                {/* Section label */}
                <p style={{ fontSize: 12, fontWeight: 700, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, textAlign: 'center' }}>
                  Browse by category
                </p>

                {/* Category chips — full-width horizontal row */}
                <div className="cat-chip-row" style={{ marginBottom: 36 }}>
                  {COURSE_CATEGORIES.map(cat => (
                    <button
                      key={cat.label}
                      className="cat-card"
                      onClick={() => navigate(`/courses?category=${encodeURIComponent(cat.label)}`)}
                    >
                      <span className="cat-icon">{cat.icon}</span>
                      <span className="cat-label">{cat.label}</span>
                      <span className="cat-desc" style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 2 }}>— {cat.desc}</span>
                    </button>
                  ))}
                </div>

                {/* What you get as a learner — equal-width horizontal row */}
                <div style={{ marginBottom: 36 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 14, textAlign: 'center' }}>
                    What you get
                  </p>
                  <div className="highlight-row">
                    {LEARNER_HIGHLIGHTS.map(h => (
                      <div key={h.title} className="highlight-card">
                        <span className="highlight-icon">{h.icon}</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{h.title}</div>
                          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{h.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate('/signup')}
                    style={{ fontSize: 15, fontWeight: 600, color: '#fff', background: '#D4A017', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '13px 32px', boxShadow: '0 4px 16px rgba(212,160,23,.3)' }}>
                    Create free account →
                  </button>
                  <button
                    onClick={() => navigate('/courses')}
                    style={{ fontSize: 15, fontWeight: 600, color: '#D4A017', background: 'var(--surface)', border: '1.5px solid var(--border-2)', borderRadius: 8, cursor: 'pointer', padding: '13px 28px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4A017' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-2)' }}
                  >
                    Explore courses
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* What you can teach */}
                <p style={{ fontSize: 12, fontWeight: 700, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, textAlign: 'center' }}>
                  Topics you can teach
                </p>
                <div className="cat-chip-row" style={{ marginBottom: 36 }}>
                  {COURSE_CATEGORIES.map(cat => (
                    <button
                      key={cat.label}
                      className="cat-card"
                      onClick={() => navigate('/signup')}
                    >
                      <span className="cat-icon">{cat.icon}</span>
                      <span className="cat-label">{cat.label}</span>
                      <span className="cat-desc" style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 2 }}>— {cat.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Instructor perks — equal-width horizontal row */}
                <div style={{ marginBottom: 36 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 14, textAlign: 'center' }}>
                    Why teach on EmMaxi
                  </p>
                  <div className="highlight-row">
                    {INSTRUCTOR_HIGHLIGHTS.map(h => (
                      <div key={h.title} className="highlight-card">
                        <span className="highlight-icon">{h.icon}</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{h.title}</div>
                          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{h.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigate('/signup')}
                    style={{ fontSize: 15, fontWeight: 600, color: '#fff', background: '#D4A017', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '13px 32px', boxShadow: '0 4px 16px rgba(212,160,23,.3)' }}>
                    Start teaching for free →
                  </button>
                  <button
                    onClick={() => navigate('/courses')}
                    style={{ fontSize: 15, fontWeight: 600, color: '#D4A017', background: 'var(--surface)', border: '1.5px solid var(--border-2)', borderRadius: 8, cursor: 'pointer', padding: '13px 28px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4A017' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-2)' }}
                  >
                    See live courses
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <hr className="landing-divider" />

      {/* ── Stats ── */}
      <section style={{ background: 'var(--bg-elevated)', padding: '48px 24px' }}>
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

      <hr className="landing-divider" />

      {/* ── Features / Courses ── */}
      <section id="features" style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div id="courses" style={{ position: 'relative', top: -80 }} />
        <div className="fade-left" style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>
            {activeTab === 'learner' ? 'For learners' : 'For instructors'}
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 12, maxWidth: 480 }}>
            {activeTab === 'learner' ? 'Grow your career' : 'Share your expertise'}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 520 }}>
            {activeTab === 'learner'
              ? `Browse ${DEMO_COURSES.filter(c => c.status === 'published').length} courses across ${COURSE_CATEGORIES.length} categories. Click any category in the hero to jump to what interests you.`
              : 'From your first course to a thriving student base, EmMaxi gives instructors the tools to build, publish, and earn.'}
          </p>
        </div>

        {activeTab === 'learner' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {DEMO_COURSES.filter(c => c.status === 'published').slice(0, 3).map((course, i) => (
              <div key={course.id}
                className={`course-card-g scale-in stagger-${Math.min(i + 1, 6)}`}
                onClick={() => navigate(`/courses?category=${encodeURIComponent(course.category)}`)}>
                <div className="label">{course.category}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {INSTRUCTOR_TOOLS.map((item, i) => (
              <div key={item.title} className={`course-card-g scale-in stagger-${i + 1}`}
                onClick={() => navigate('/signup')}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{item.icon}</div>
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
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-light)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none' }}
          >
            Explore all {activeTab === 'learner' ? 'courses' : 'tools'}
          </button>
        </div>
      </section>

      <hr className="landing-divider" />

      {/* ── Testimonials ── */}
      <section id="reviews" style={{ padding: '64px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="fade-left" style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Success stories</p>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', maxWidth: 400 }}>
            What our community says
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {testimonials.map((t, i) => (
            <div key={t.name} className={`story-card fade-up stagger-${i + 1}`} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <StarRating rating={t.rating} size="md" />
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1, margin: 0 }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="landing-divider" />

      {/* ── Bottom CTA ── */}
      <section style={{ background: 'var(--bg-elevated)', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p className="fade-up" style={{ fontSize: 13, fontWeight: 600, color: '#D4A017', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 16 }}>Get started today</p>
          <h2 className="fade-up stagger-1" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.1 }}>
            Ready to advance your potential?
          </h2>
          <p className="fade-up stagger-2" style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 36 }}>
            Join thousands of learners and instructors building their future on EmMaxi. Create a free account and get started today.
          </p>
          <div className="fade-up stagger-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/signup')}
              style={{ fontSize: 15, fontWeight: 600, color: '#fff', background: '#D4A017', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '14px 32px', boxShadow: '0 4px 16px rgba(212,160,23,.3)' }}>
              Create free account
            </button>
            <button onClick={() => navigate('/courses')}
              style={{ fontSize: 15, fontWeight: 600, color: '#D4A017', background: 'var(--surface)', border: '2px solid var(--border-2)', borderRadius: 8, cursor: 'pointer', padding: '14px 32px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#D4A017' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-2)' }}
            >
              Explore courses
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Em<span style={{ color: '#D4A017' }}>Maxi</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Features', 'Courses', 'Reviews'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-tertiary)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4A017')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
              >{item}</a>
            ))}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
            © {new Date().getFullYear()} EmMaxi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}