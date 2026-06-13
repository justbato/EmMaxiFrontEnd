import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseCard } from '../components/CourseCard'
import { FilterPill } from '../components/ui'
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
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between bg-[#111] border-b border-[rgba(212,160,23,.15)] shadow-[0_2px_20px_rgba(0,0,0,.3)] px-4 md:px-12 py-3.5">
        <div className="text-[22px] font-[700] text-white cursor-pointer" style={{ fontFamily: 'Clash Display, sans-serif' }} onClick={() => navigate('/')}>Em<span className="text-[#D4A017]">Maxi</span></div>
        <div className="flex-1 max-w-sm mx-4 md:mx-8 hidden sm:flex items-center gap-2 bg-[rgba(255,255,255,.1)] border border-[rgba(255,255,255,.15)] rounded-full px-4 py-2">
          <svg className="w-3.5 h-3.5 text-[rgba(255,255,255,.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="bg-transparent border-none text-white text-[13px] outline-none flex-1 placeholder-[rgba(255,255,255,.4)]" placeholder="Search courses, topics, instructors…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 rounded-full text-[13px] font-[600] border border-[rgba(255,255,255,.2)] text-white bg-[rgba(255,255,255,.07)] hover:border-[#D4A017] transition-all" onClick={() => navigate('/login')}>Sign in</button>
          <button className="px-4 py-1.5 rounded-full text-[13px] font-[600] bg-[#D4A017] text-[#111] shadow-[0_4px_20px_rgba(212,160,23,.35)] hover:bg-[#C8920F] transition-all" onClick={() => navigate('/signup')}>Get started</button>
        </div>
      </nav>

      <div className="pt-20 px-4 md:px-12 pb-16 max-w-[1200px] mx-auto">
        <div className="mb-6 mt-2">
          <h1 className="text-[28px] font-[600] text-[#111]" style={{ fontFamily: 'Clash Display, sans-serif' }}>Browse courses</h1>
          <p className="text-[#333] mt-1">Explore {DEMO_COURSES.filter(c => c.status === 'published').length} courses across all categories</p>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden flex items-center gap-2 bg-white border border-[#D0D0D0] rounded-full px-4 py-2 mb-4">
          <svg className="w-3.5 h-3.5 text-[#6B6B6B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="flex-1 text-[13px] outline-none" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
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
            <span className="text-[13px] text-[#333]">Showing <strong>{filtered.length}</strong> courses</span>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="bg-white border border-[#D0D0D0] rounded-[8px] text-[#111] px-3 py-1.5 text-[12px] outline-none focus:border-[#D4A017]">
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
          <div className="text-center py-20 text-[#6B6B6B]">
            <div className="text-[48px] mb-4">🔍</div>
            <div className="text-[16px] font-[600] text-[#333] mb-2">No courses found</div>
            <p className="text-[13px]">Try a different category or search term</p>
          </div>
        )}
      </div>
    </div>
  )
}
