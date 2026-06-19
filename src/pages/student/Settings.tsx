import { useState } from 'react'
import { DashLayout } from '../../components/layout/DashLayout'
import { Btn, Card, Toast } from '../../components/ui'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Home', path: '/' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, label: 'Dashboard', path: '/student' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, label: 'My Courses', path: '/student/courses' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>, label: 'Settings', path: '/student/settings' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, label: 'Report Issue', path: '/student/report' },
]

const TABS = ['Profile', 'Password', 'Notifications', 'Billing']

export function StudentSettings() {
  const { user, updateUser } = useAuth()
  const [tab, setTab] = useState('Profile')
  const [fname, setFname] = useState(user?.full_name?.split(' ')[0] || '')
  const [lname, setLname] = useState(user?.full_name?.split(' ')[1] || '')
  const [bio, setBio] = useState('')
  const [toast, setToast] = useState(false)
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [passErr, setPassErr] = useState('')

  const showToast = () => { setToast(true); setTimeout(() => setToast(false), 2500) }

  const saveProfile = () => {
    updateUser({ full_name: `${fname} ${lname}` })
    showToast()
  }

  const savePassword = () => {
    if (newPass.length < 8) { setPassErr('Password must be at least 8 characters'); return }
    if (newPass !== confirmPass) { setPassErr('Passwords do not match'); return }
    setPassErr(''); showToast()
    setCurrentPass(''); setNewPass(''); setConfirmPass('')
  }

  return (
    <DashLayout sidebarItems={NAV} title="Settings" subtitle="Manage your profile and preferences">
      {/* Tab pills */}
      <div className="flex gap-2 flex-wrap mb-6 bg-[var(--surface)] transition-colors border border-[var(--border)] rounded-full p-1.5 w-fit">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-[600] transition-all ${tab === t ? 'bg-[#D4A017] text-[var(--text-primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Profile' && (
        <Card className="p-6 max-w-xl">
          <h2 className="text-[15px] font-[700] mb-5">Profile information</h2>
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#D4A017] flex items-center justify-center text-[var(--text-primary)] text-[22px] font-[700]">
              {user?.full_name?.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
            </div>
            <div>
              <Btn variant="outline" size="sm">Change photo</Btn>
              <p className="text-[10px] text-[var(--text-tertiary)] mt-1">JPG, PNG up to 5MB</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">First name</label>
              <input value={fname} onChange={e => setFname(e.target.value)} className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors" />
            </div>
            <div>
              <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Last name</label>
              <input value={lname} onChange={e => setLname(e.target.value)} className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-[13px]">@</span>
              <input defaultValue={user?.username} className="w-full pl-7 pr-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Email</label>
            <input defaultValue={user?.email} className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none bg-[var(--bg-tertiary)] transition-colors text-[var(--text-tertiary)]" disabled />
          </div>
          <div className="mb-5">
            <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Bio</label>
            <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell instructors a bit about yourself…"
              className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] resize-y transition-colors" />
          </div>
          <Btn onClick={saveProfile}>Save changes</Btn>
        </Card>
      )}

      {tab === 'Password' && (
        <Card className="p-6 max-w-md">
          <h2 className="text-[15px] font-[700] mb-5">Change password</h2>
          {['Current password', 'New password', 'Confirm new password'].map((label, i) => {
            const vals = [currentPass, newPass, confirmPass]
            const setters = [setCurrentPass, setNewPass, setConfirmPass]
            return (
              <div key={label} className="mb-4">
                <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">{label}</label>
                <input type="password" value={vals[i]} onChange={e => { setters[i](e.target.value); setPassErr('') }}
                  className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors" />
              </div>
            )
          })}
          {passErr && <p className="text-[11px] text-[#EF4444] mb-3">{passErr}</p>}
          <Btn onClick={savePassword}>Update password</Btn>
        </Card>
      )}

      {tab === 'Notifications' && (
        <Card className="p-6 max-w-xl">
          <h2 className="text-[15px] font-[700] mb-5">Notification preferences</h2>
          {[
            { label: 'New course announcements', desc: 'When instructors post updates', checked: true },
            { label: 'Q&A replies', desc: 'When your questions are answered', checked: true },
            { label: 'Course completion reminders', desc: 'Nudges to keep you on track', checked: false },
            { label: 'New course recommendations', desc: 'Personalized course picks', checked: true },
            { label: 'Promotional emails', desc: 'Deals, new courses, platform news', checked: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3.5 border-b border-[var(--border)] last:border-0">
              <div>
                <div className="text-[13px] font-[500] text-[var(--text-primary)]">{item.label}</div>
                <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{item.desc}</div>
              </div>
              <label className="relative inline-block w-10 h-5">
                <input type="checkbox" defaultChecked={item.checked} className="opacity-0 w-0 h-0 peer" />
                <span className="absolute inset-0 bg-[#D0D0D0] rounded-full cursor-pointer transition-all peer-checked:bg-[#D4A017] before:content-[''] before:absolute before:w-4 before:h-4 before:bg-[var(--surface)] transition-colors before:rounded-full before:top-0.5 before:left-0.5 before:transition-all peer-checked:before:translate-x-5" />
              </label>
            </div>
          ))}
          <Btn className="mt-4" onClick={showToast}>Save preferences</Btn>
        </Card>
      )}

      {tab === 'Billing' && (
        <Card className="p-6 max-w-xl">
          <h2 className="text-[15px] font-[700] mb-5">Billing & payments</h2>
          <div className="bg-[#FDF6DC] dark:bg-[rgba(212,160,23,.12)] border border-[var(--border)] dark:border-[rgba(212,160,23,.2)] rounded-[12px] p-4 mb-5">
            <div className="text-[13px] font-[600] text-[#7A5A00] mb-1">Free plan</div>
            <div className="text-[12px] text-[#7A5A00]">You're on the free tier. Upgrade to access exclusive courses and features.</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Pro', price: '₦2,499/mo', features: ['Unlimited courses', 'Download certificates', 'Priority support', 'Offline access'], highlight: true },
              { name: 'Annual', price: '₦19,999/yr', features: ['Everything in Pro', '2 months free', 'Early access to new courses', 'Exclusive workshops'], highlight: false },
            ].map(plan => (
              <div key={plan.name} className={`border-[2px] rounded-[14px] p-5 cursor-pointer transition-all ${plan.highlight ? 'border-[#D4A017] bg-[#FDF6DC] dark:bg-[rgba(212,160,23,.12)]' : 'border-[var(--border-2)] hover:border-[#D4A017]'}`}>
                <div className="text-[14px] font-[700] mb-1">{plan.name}</div>
                <div className="text-[20px] font-[700] text-[#D4A017] mb-3">{plan.price}</div>
                {plan.features.map(f => <div key={f} className="text-[12px] text-[var(--text-secondary)] flex items-center gap-1.5 mb-1.5"><span className="text-[#10B981]">✓</span>{f}</div>)}
                <Btn size="sm" className="w-full justify-center mt-3" variant={plan.highlight ? 'primary' : 'outline'}>Upgrade →</Btn>
              </div>
            ))}
          </div>
        </Card>
      )}

      {toast && <Toast message="Changes saved ✓" />}
    </DashLayout>
  )
}
