import { useState } from 'react'
import { DashLayout } from '../../components/layout/DashLayout'
import { Btn, Card, Toast } from '../../components/ui'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label: 'Home', path: '/' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, label: 'Dashboard', path: '/instructor' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>, label: 'Settings', path: '/instructor/settings' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>, label: 'Report Issue', path: '/instructor/report' },
]

const TABS = ['Profile', 'Payout', 'Password', 'Notifications']

export function InstructorSettings() {
  const { user, updateUser } = useAuth()
  const [tab, setTab] = useState('Profile')
  const [fname, setFname] = useState(user?.full_name?.split(' ')[0] || '')
  const [lname, setLname] = useState(user?.full_name?.split(' ')[1] || '')
  const [bio, setBio] = useState('Senior Software Engineer specialising in React and Node.js. 8 years of experience.')
  const [title, setTitle] = useState('Senior Software Engineer')
  const [expertise, setExpertise] = useState('Web Development')
  const [bankName, setBankName] = useState('')
  const [manualBankName, setManualBankName] = useState('')
  const [accountNo, setAccountNo] = useState('')
  const [toast, setToast] = useState(false)

  const showToast = () => { setToast(true); setTimeout(() => setToast(false), 2500) }

  return (
    <DashLayout sidebarItems={NAV} title="Settings" subtitle="Manage your instructor profile and payouts">
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
          <h2 className="text-[15px] font-[700] mb-5">Instructor profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#D4A017] flex items-center justify-center text-[var(--text-primary)] text-[22px] font-[700]">
              {user?.full_name?.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
            </div>
            <div>
              <Btn variant="outline" size="sm">Change photo</Btn>
              <p className="text-[10px] text-[var(--text-tertiary)] mt-1">Visible to all students</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[{ label: 'First name', val: fname, set: setFname }, { label: 'Last name', val: lname, set: setLname }].map(f => (
              <div key={f.label}>
                <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">{f.label}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)} className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors" />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Professional title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors" />
          </div>
          <div className="mb-4">
            <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Area of expertise</label>
            <input value={expertise} onChange={e => setExpertise(e.target.value)} className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors" />
          </div>
          <div className="mb-5">
            <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Bio <span className="text-[var(--text-tertiary)] font-normal">(shown on your instructor profile)</span></label>
            <textarea rows={4} value={bio} onChange={e => setBio(e.target.value)} className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] resize-y transition-colors" />
          </div>
          <Btn onClick={() => { updateUser({ full_name: `${fname} ${lname}` }); showToast() }}>Save changes</Btn>
        </Card>
      )}

      {tab === 'Payout' && (
        <Card className="p-6 max-w-xl">
          <h2 className="text-[15px] font-[700] mb-2">Payout settings</h2>
          <div className="bg-[#D1FAE5] dark:bg-[rgba(16,185,129,.15)] border border-[#86EFAC] rounded-[10px] p-4 mb-5">
            <div className="text-[13px] font-[600] text-[#065F46]">💰 You earn 80% of every sale</div>
            <div className="text-[11px] text-[#065F46] mt-0.5">Payouts are processed monthly, by the 5th of each month.</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Pending payout</label>
              <div className="text-[22px] font-[700] text-[#10B981]">₦72,000</div>
            </div>
            <div>
              <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Total earned</label>
              <div className="text-[22px] font-[700]">₦541,200</div>
            </div>
          </div>
          <div className="h-px bg-[#E8E8E8] my-5" />
          <h3 className="text-[13px] font-[700] mb-4">Bank account details</h3>
          <div className="mb-4">
            <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Bank name</label>
            <select value={bankName} onChange={e => setBankName(e.target.value)} className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] mb-2">
              <option value="">Select bank</option>
              {['Access Bank', 'GTBank', 'Zenith Bank', 'First Bank', 'UBA', 'Kuda Bank', 'OPay', 'Moniepoint', 'Other (type manually)'].map(b => <option key={b}>{b}</option>)}
            </select>
            {bankName === 'Other (type manually)' && (
              <input type="text" value={manualBankName} onChange={e => setManualBankName(e.target.value)} placeholder="Enter bank name" className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors" />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">Account number</label>
            <input type="text" maxLength={10} value={accountNo} onChange={e => setAccountNo(e.target.value.replace(/\D/g, ''))} placeholder="0123456789" className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] font-mono transition-colors" />
          </div>
          <Btn onClick={showToast}>Save bank details</Btn>
        </Card>
      )}

      {tab === 'Password' && (
        <Card className="p-6 max-w-md">
          <h2 className="text-[15px] font-[700] mb-5">Change password</h2>
          {['Current password', 'New password', 'Confirm new password'].map(label => (
            <div key={label} className="mb-4">
              <label className="block text-[12px] font-[600] text-[var(--text-secondary)] mb-1">{label}</label>
              <input type="password" className="w-full px-3 py-2.5 border-[1.5px] border-[var(--border-2)] rounded-[8px] text-[13px] outline-none focus:border-[#D4A017] transition-colors" />
            </div>
          ))}
          <Btn onClick={showToast}>Update password</Btn>
        </Card>
      )}

      {tab === 'Notifications' && (
        <Card className="p-6 max-w-xl">
          <h2 className="text-[15px] font-[700] mb-5">Notification preferences</h2>
          {[
            { label: 'New student enrollments', desc: 'When someone joins your course', checked: true },
            { label: 'New Q&A questions', desc: 'When students ask questions', checked: true },
            { label: 'Course review results', desc: 'Approval or rejection notices', checked: true },
            { label: 'Monthly payout processed', desc: 'When your payment is sent', checked: true },
            { label: 'Platform policy updates', desc: 'Important changes to EmMaxi terms', checked: false },
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

      {toast && <Toast message="Changes saved ✓" />}
    </DashLayout>
  )
}
