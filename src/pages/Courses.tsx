import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseCard } from '../components/CourseCard'
import { FilterPill } from '../components/ui'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { DEMO_COURSES } from '../types'

const CATEGORIES = ['All', 'Web Dev', 'Design', 'Data Science', 'Business', 'Mobile', 'Cloud', 'Security']
const LEVELS = ['All levels', 'Beginner', 'Intermediate', 'Advanced']
const SORT_OPTIONS = ['Most popular', 'Newest', 'Highest rated', 'Price: Low to High', 'Price: High to Low']

export function CoursesPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeLevel, setActiveLevel] = useState('All levels')
  const [sort, setSort] = useState('Most popular')
  const [search, setSearch] = useState('')

  let filtered = DEMO_COURSES.filter(c => c.status === 'published')
  if (search) filtered = filtered.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase()))
  if (activeCategory !== 'All') filtered = filtered.filter(c => c.category === activeCategory)
  if (activeLevel !== 'All levels') filtered = filtered.filter(c => c.level === activeLevel)
  if (sort === 'Highest rated') filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  if (sort === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.price - a.price)

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between bg-[var(--nav-bg)] border-b border-[var(--nav-border)] shadow-md px-4 md:px-12 py-3.5 transition-colors">
        <div className="text-[22px] font-[700] text-[var(--text-primary)] cursor-pointer" style={{ fontFamily: 'Clash Display, sans-serif' }} onClick={() => navigate('/')}>Em<span className="text-[#D4A017]">Maxi</span></div>
        <div className="flex-1 max-w-sm mx-4 md:mx-8 hidden sm:flex items-center gap-2 bg-[var(--surface-hover)] border border-[var(--border)] rounded-full px-4 py-2 transition-colors">
          <svg className="w-3.5 h-3.5 text-[var(--text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input className="bg-transparent border-none text-[var(--text-primary)] text-[13px] outline-none flex-1 placeholder-[var(--text-tertiary)]" placeholder="Search courses, topics, instructors…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 items-center">
          <ThemeToggle size="sm" />
          <button className="px-4 py-1.5 rounded-full text-[13px] font-[600] border border-[var(--border)] text-[var(--text-primary)] bg-[var(--surface)] hover:border-[#D4A017] transition-all hidden sm:block" onClick={() => navigate('/login')}>Sign in</button>
          <button className="px-4 py-1.5 rounded-full text-[13px] font-[600] bg-[#D4A017] text-[var(--text-primary)] shadow-[var(--shadow-gold)] hover:bg-[#C8920F] transition-all" onClick={() => navigate('/signup')}>Get started</button>
        </div>
      </nav>

      <div className="pt-20 px-4 md:px-12 pb-16 max-w-[1200px] mx-auto">
        <div className="mb-6 mt-2">
          <h1 className="text-[28px] font-[600] text-[var(--text-primary)]" style={{ fontFamily: 'Clash Display, sans-serif' }}>Browse courses</h1>
          <p className="text-[var(--text-secondary)] mt-1">Explore {DEMO_COURSES.filter(c => c.status === 'published').length} courses across all categories</p>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-full px-4 py-2 mb-4 transition-colors">
          <svg className="w-3.5 h-3.5 text-[var(--text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input className="flex-1 bg-transparent border-none text-[var(--text-primary)] text-[13px] outline-none placeholder-[var(--text-tertiary)]" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-4">
          {CATEGORIES.map(cat => (
            <FilterPill key={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)}>{cat}</FilterPill>
          ))}
        </div>

        {/* Level + sort */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map(l => (
              <FilterPill key={l} active={activeLevel === l} onClick={() => setActiveLevel(l)}>{l}</FilterPill>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[var(--text-secondary)]">Showing <strong className="text-[var(--text-primary)]">{filtered.length}</strong> courses</span>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] text-[var(--text-primary)] px-3 py-1.5 text-[12px] outline-none focus:border-[#D4A017] transition-colors">
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-[var(--text-tertiary)]">
            <div className="text-[48px] mb-4">🔍</div>
            <div className="text-[16px] font-[600] text-[var(--text-secondary)] mb-2">No courses found</div>
            <p className="text-[13px]">Try a different category or search term</p>
          </div>
        )}
      </div>
    </div>
  )
}
