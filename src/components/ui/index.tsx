import { type ReactNode, type ButtonHTMLAttributes } from 'react'

// ── Button ──────────────────────────────────────────────────
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger' | 'success' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Btn({ variant = 'primary', size = 'md', className = '', children, ...props }: BtnProps) {
  const base = 'inline-flex items-center gap-2 rounded-full font-[600] cursor-pointer border-none transition-all duration-[250ms] cubic-bezier(.22,1,.36,1) whitespace-nowrap tracking-[.01em] font-[Satoshi,sans-serif]'
  const sizes = { sm: 'px-4 py-1.5 text-[12px]', md: 'px-[22px] py-[10px] text-[13px]', lg: 'px-7 py-3 text-[14px]' }
  const variants = {
    primary: 'bg-[#D4A017] text-[#111] shadow-[0_4px_20px_rgba(212,160,23,.35)] hover:bg-[#C8920F] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_28px_rgba(212,160,23,.5)] active:translate-y-0 active:scale-[.98]',
    outline: 'bg-[var(--surface)] text-[var(--text-primary)] border !border-[var(--border-2)] hover:border-[#D4A017] hover:text-[#D4A017] hover:bg-[var(--brand-light)] hover:-translate-y-px',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] hover:-translate-y-px',
    success: 'bg-[#10B981] text-white hover:bg-[#059669] hover:-translate-y-px',
    ghost: 'bg-transparent text-[var(--text-tertiary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// ── Badge ──────────────────────────────────────────────────
type BadgeVariant = 'green' | 'amber' | 'red' | 'purple' | 'admin'
interface BadgeProps { variant?: BadgeVariant; children: ReactNode; className?: string }

export function Badge({ variant = 'amber', children, className = '' }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    green: 'bg-[#D1FAE5] dark:bg-[rgba(16,185,129,.15)] text-[#065F46] dark:text-[#34D399]',
    amber: 'bg-[#FDF6DC] dark:bg-[rgba(212,160,23,.12)] text-[#7A5A00] dark:text-[#D4A017]',
    red: 'bg-[#FEE2E2] dark:bg-[rgba(239,68,68,.12)] text-[#991B1B] dark:text-[#F87171]',
    purple: 'bg-[#EDE9FE] dark:bg-[rgba(99,102,241,.12)] text-[#5B21B6] dark:text-[#A5B4FC]',
    admin: 'bg-gradient-to-r from-[#1E1E1E] to-[#333] text-[#D4A017] border border-[rgba(212,160,23,.3)]',
  }
  return <span className={`inline-block px-[10px] py-[3px] rounded-full text-[11px] font-[600] ${variants[variant]} ${className}`}>{children}</span>
}

// ── Avatar ──────────────────────────────────────────────────
interface AvatarProps { name: string; size?: number; color?: string; className?: string }
const COLORS = ['#D4A017','#10B981','#6366F1','#EC4899','#F97316','#14B8A6']
function getColor(name: string) { return COLORS[name.charCodeAt(0) % COLORS.length] }
function initials(name: string) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2) }

export function Avatar({ name, size = 36, color, className = '' }: AvatarProps) {
  const bg = color || getColor(name)
  return (
    <div
      className={`rounded-full flex items-center justify-center font-[700] text-white flex-shrink-0 ${className}`}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.35 }}
    >
      {initials(name)}
    </div>
  )
}

// ── Filter Pill ──────────────────────────────────────────────
interface PillProps { active?: boolean; onClick?: () => void; children: ReactNode; className?: string }

export function FilterPill({ active, onClick, children, className = '' }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`filter-pill px-[14px] py-[6px] rounded-full border-[1.5px] text-[12px] font-[500] cursor-pointer transition-all ${
        active
          ? 'border-[#D4A017] bg-[#D4A017] text-[#111] font-[600]'
          : 'border-[var(--border-2)] bg-[var(--surface)] text-[var(--text-secondary)]'
      } ${className}`}
    >
      {children}
    </button>
  )
}

// ── Star Rating ──────────────────────────────────────────────
interface StarProps { rating: number; count?: number; size?: 'sm' | 'md' }
export function StarRating({ rating, count, size = 'sm' }: StarProps) {
  const sz = size === 'sm' ? 'text-[12px]' : 'text-[16px]'
  return (
    <span className={`flex items-center gap-1 ${sz}`}>
      <span className="text-[#D4A017]">★</span>
      <span className="font-[600] text-[var(--text-primary)]">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-[var(--text-tertiary)]">({count.toLocaleString()})</span>}
    </span>
  )
}

// ── Progress Bar ──────────────────────────────────────────────
interface ProgressProps { value: number; className?: string; height?: number }
export function ProgressBar({ value, className = '', height = 6 }: ProgressProps) {
  return (
    <div className={`bg-[var(--bg-tertiary)] rounded-full overflow-hidden ${className}`} style={{ height }}>
      <div className="progress-fill h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  )
}

// ── Tag ──────────────────────────────────────────────────────
export function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-block px-[10px] py-[3px] rounded-full text-[11px] bg-[var(--brand-light)] text-[#D4A017] border border-[rgba(212,160,23,.3)] font-[500]">{children}</span>
}

// ── Card ──────────────────────────────────────────────────────
export function Card({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-[14px] shadow-[var(--shadow)] ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

// ── StatCard ──────────────────────────────────────────────────
interface StatCardProps { icon: string; iconBg: string; label: string; value: string; delta?: string; deltaUp?: boolean }
export function StatCard({ icon, iconBg, label, value, delta, deltaUp }: StatCardProps) {
  return (
    <div className="stat-card bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 shadow-[var(--shadow)] transition-all duration-[250ms]">
      <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[18px] mb-3" style={{ background: iconBg }}>{icon}</div>
      <div className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-[.07em] mb-2 font-[600]">{label}</div>
      <div className="text-[24px] font-[700] font-[Clash_Display,sans-serif] text-[var(--text-primary)]">{value}</div>
      {delta && <div className={`text-[11px] mt-1 ${deltaUp ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>{delta}</div>}
    </div>
  )
}

// ── Divider ──────────────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="h-px bg-[var(--border)] my-4" />
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-[var(--border)]" />
      <span className="text-[11px] text-[var(--text-tertiary)]">{label}</span>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </div>
  )
}

// ── Input ──────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; prefix?: string }
export function Input({ label, error, prefix, className = '', ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && <label className="block text-[12px] text-[var(--text-secondary)] mb-1 font-[600] tracking-[.02em]">{label}</label>}
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-[14px] font-[600] pointer-events-none z-10">{prefix}</span>}
        <input
          className={`w-full px-[14px] py-[10px] bg-[var(--input-bg)] border-[1.5px] border-[var(--input-border)] rounded-[8px] text-[var(--text-primary)] font-[Satoshi,sans-serif] text-[13px] outline-none transition-all focus:border-[#D4A017] focus:shadow-[0_0_0_3px_var(--input-focus-ring)] ${error ? 'border-[#EF4444] focus:border-[#EF4444]' : ''} ${prefix ? 'pl-7' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-[#EF4444] mt-1 font-[500]">{error}</p>}
    </div>
  )
}

// ── Textarea ──────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { label?: string; error?: string }
export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="mb-4">
      {label && <label className="block text-[12px] text-[var(--text-secondary)] mb-1 font-[600]">{label}</label>}
      <textarea
        className={`w-full px-[14px] py-[10px] bg-[var(--input-bg)] border-[1.5px] border-[var(--input-border)] rounded-[8px] text-[var(--text-primary)] font-[Satoshi,sans-serif] text-[13px] outline-none transition-all resize-y min-h-[80px] focus:border-[#D4A017] focus:shadow-[0_0_0_3px_var(--input-focus-ring)] ${error ? 'border-[#EF4444]' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] text-[#EF4444] mt-1">{error}</p>}
    </div>
  )
}

// ── Select ──────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { label?: string; options: { value: string; label: string }[] }
export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="mb-4">
      {label && <label className="block text-[12px] text-[var(--text-secondary)] mb-1 font-[600]">{label}</label>}
      <select
        className={`w-full px-[14px] py-[10px] bg-[var(--input-bg)] border-[1.5px] border-[var(--input-border)] rounded-[8px] text-[var(--text-primary)] font-[Satoshi,sans-serif] text-[13px] outline-none transition-all focus:border-[#D4A017] ${className}`}
        {...props}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

// ── Toast ──────────────────────────────────────────────────────
export function Toast({ message, color = '#10B981', onClose }: { message: string; color?: string; onClose?: () => void }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] text-white text-[13px] font-[600] px-5 py-3 rounded-full shadow-lg animate-[pageSlideIn_.3s_both] flex items-center gap-2"
      style={{ background: color }}
    >
      {message}
      {onClose && <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>}
    </div>
  )
}
