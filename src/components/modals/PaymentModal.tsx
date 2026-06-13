import { useState } from 'react'
import { Btn } from '../ui'
import {
    createOrder,
    generateReference,
    nairaToKobo,
    formatKobo,
    type CreateOrderResponse,
} from '../../lib/payments'

// ── Modal base (matches modals/index.tsx style) ──────────────────────
function ModalBase({ open, onClose, children, maxWidth = 460 }: {
    open: boolean; onClose: () => void; children: React.ReactNode; maxWidth?: number
}) {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-[9700] bg-[rgba(0,0,0,.5)] backdrop-blur-[4px] flex items-center justify-center p-5 animate-[fadeIn_.2s_both]"
            onClick={e => { if (e.target === e.currentTarget) onClose() }}>
            <div className="bg-white rounded-[20px] shadow-[0_24px_64px_rgba(0,0,0,.2)] animate-[pageSlideIn_.3s_both] w-full overflow-y-auto max-h-[90vh]"
                style={{ maxWidth }}>
                {children}
            </div>
        </div>
    )
}

interface PaymentModalProps {
    open: boolean
    onClose: () => void
    course: { title: string; price: number } // price in Naira
    onTransferSent: (reference: string) => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function PaymentModal({ open, onClose, course, onTransferSent }: PaymentModalProps) {
    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [account, setAccount] = useState<CreateOrderResponse | null>(null)
    const [copied, setCopied] = useState<'acct' | 'amount' | null>(null)

    const amountKobo = nairaToKobo(course.price)

    const reset = () => {
        setEmail(''); setEmailErr(''); setLoading(false); setError(''); setAccount(null); setCopied(null)
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    const handleGenerate = async () => {
        if (!EMAIL_RE.test(email)) {
            setEmailErr('Please enter a valid email address.')
            return
        }
        setEmailErr(''); setError(''); setLoading(true)
        try {
            const reference = generateReference()
            const res = await createOrder({
                email,
                amount: amountKobo,
                reference,
                product: course.title,
            })
            setAccount(res)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const copy = (text: string, which: 'acct' | 'amount') => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(which)
            setTimeout(() => setCopied(null), 1500)
        })
    }

    const handleSentTransfer = () => {
        if (!account) return
        onTransferSent(account.reference)
        reset()
    }

    return (
        <ModalBase open={open} onClose={handleClose} maxWidth={460}>
            <div className="p-7">
                {!account ? (
                    <>
                        {/* ── Step 1: email entry ── */}
                        <div className="text-[32px] text-center mb-3">💳</div>
                        <h2 className="text-[18px] font-[700] text-center mb-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            Pay by bank transfer
                        </h2>
                        <p className="text-[13px] text-[#6B6B6B] text-center mb-6 leading-[1.6]">
                            for <strong className="text-[#111]">{course.title}</strong>
                        </p>

                        {/* Amount display */}
                        <div className="bg-[#FDF6DC] border border-[rgba(212,160,23,.2)] rounded-[14px] p-5 text-center mb-5">
                            <div className="text-[11px] text-[#7A5A00] font-[600] uppercase tracking-[.08em] mb-1">Amount to transfer</div>
                            <div className="text-[32px] font-[700] text-[#D4A017]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                {formatKobo(amountKobo)}
                            </div>
                            <div className="text-[11px] text-[#7A5A00] mt-2">⚠ Transfer the exact amount — no more, no less.</div>
                        </div>

                        {/* Email input */}
                        <div className="mb-5">
                            <label className="block text-[12px] font-[600] text-[#333] mb-1">Email address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setEmailErr('') }}
                                onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                                className={`w-full px-[14px] py-[10px] border-[1.5px] rounded-[8px] text-[13px] outline-none transition-all focus:border-[#D4A017] focus:shadow-[0_0_0_3px_rgba(212,160,23,.15)] ${emailErr ? 'border-[#EF4444]' : 'border-[#D0D0D0]'}`}
                            />
                            {emailErr && <p className="text-[11px] text-[#EF4444] mt-1">{emailErr}</p>}
                            <p className="text-[11px] text-[#6B6B6B] mt-1">Your virtual account number and download link will be sent here.</p>
                        </div>

                        {error && (
                            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[8px] px-3 py-2.5 text-[12px] text-[#991B1B] mb-4">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <Btn variant="outline" className="flex-1 justify-center" onClick={handleClose} disabled={loading}>Cancel</Btn>
                            <Btn className="flex-1 justify-center" onClick={handleGenerate} disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 border-2 border-[#111] border-t-transparent rounded-full animate-spin" />
                                        Generating…
                                    </span>
                                ) : 'Generate account →'}
                            </Btn>
                        </div>
                    </>
                ) : (
                    <>
                        {/* ── Step 2: virtual account details ── */}
                        <div className="text-[32px] text-center mb-3">🏦</div>
                        <h2 className="text-[18px] font-[700] text-center mb-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            Transfer to this account
                        </h2>
                        <p className="text-[13px] text-[#6B6B6B] text-center mb-6 leading-[1.6]">
                            Use your banking app to send the exact amount below.
                        </p>

                        <div className="bg-[#FDF6DC] border border-[rgba(212,160,23,.25)] rounded-[14px] p-5 mb-5 space-y-4">
                            <div>
                                <div className="text-[11px] text-[#7A5A00] font-[600] uppercase tracking-[.08em] mb-1">Bank name</div>
                                <div className="text-[15px] font-[600] text-[#111]">{account.bank_name}</div>
                            </div>
                            <div>
                                <div className="text-[11px] text-[#7A5A00] font-[600] uppercase tracking-[.08em] mb-1">Account name</div>
                                <div className="text-[15px] font-[600] text-[#111]">{account.account_name}</div>
                            </div>
                            <div>
                                <div className="text-[11px] text-[#7A5A00] font-[600] uppercase tracking-[.08em] mb-1">Account number</div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="text-[22px] font-[700] text-[#111] tracking-[.04em]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                        {account.account_number}
                                    </div>
                                    <button onClick={() => copy(account.account_number, 'acct')}
                                        className="px-3 py-1.5 rounded-full text-[11px] font-[600] bg-white border border-[rgba(212,160,23,.3)] text-[#7A5A00] hover:border-[#D4A017] transition-all">
                                        {copied === 'acct' ? '✓ Copied' : '⧉ Copy'}
                                    </button>
                                </div>
                            </div>
                            <div className="border-t border-[rgba(212,160,23,.25)] pt-4">
                                <div className="text-[11px] text-[#7A5A00] font-[600] uppercase tracking-[.08em] mb-1">Amount</div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="text-[26px] font-[700] text-[#D4A017]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                                        {formatKobo(amountKobo)}
                                    </div>
                                    <button onClick={() => copy((amountKobo / 100).toString(), 'amount')}
                                        className="px-3 py-1.5 rounded-full text-[11px] font-[600] bg-white border border-[rgba(212,160,23,.3)] text-[#7A5A00] hover:border-[#D4A017] transition-all">
                                        {copied === 'amount' ? '✓ Copied' : '⧉ Copy'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[8px] px-3 py-2.5 text-[12px] text-[#991B1B] mb-5 text-center">
                            ⚠ Transfer the exact amount shown above. Sending a different amount may delay confirmation.
                        </div>

                        <p className="text-[11px] text-[#6B6B6B] text-center mb-4">
                            Order reference: <span className="font-[600] text-[#111]">{account.reference}</span>
                        </p>

                        <div className="flex gap-3">
                            <Btn variant="outline" className="flex-1 justify-center" onClick={handleClose}>Cancel</Btn>
                            <Btn className="flex-1 justify-center" onClick={handleSentTransfer}>I've sent the transfer →</Btn>
                        </div>
                    </>
                )}
            </div>
        </ModalBase>
    )
}