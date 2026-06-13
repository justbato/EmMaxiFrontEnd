import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Btn } from '../components/ui'
import { getOrderStatus, type OrderStatus } from '../lib/payments'
import { DEMO_COURSES } from '../types'

const POLL_INTERVAL = 4000 // 4 seconds, per the payment brief

interface Step {
    key: 'created' | 'sent' | 'verifying' | 'download'
    label: string
}

const STEPS: Step[] = [
    { key: 'created', label: 'Order created' },
    { key: 'sent', label: 'Transfer sent' },
    { key: 'verifying', label: 'Verification' },
    { key: 'download', label: 'Download sent' },
]

export function PaymentStatusPage() {
    const { reference } = useParams<{ reference: string }>()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const courseId = searchParams.get('course')
    const course = DEMO_COURSES.find(c => c.id === courseId)

    const [status, setStatus] = useState<OrderStatus>('pending')
    const [pollError, setPollError] = useState('')
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        if (!reference) return

        const poll = async () => {
            try {
                const res = await getOrderStatus(reference)
                setStatus(res.status)
                setPollError('')
                if (res.status === 'paid' && intervalRef.current) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                }
            } catch (err) {
                setPollError(err instanceof Error ? err.message : 'Unable to reach payment server.')
            }
        }

        poll() // initial check
        intervalRef.current = setInterval(poll, POLL_INTERVAL)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [reference])

    const isPaid = status === 'paid'

    const handleBackToStore = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        navigate('/courses')
    }

    const stepStatus = (key: Step['key']): 'done' | 'active' | 'pending' => {
        if (key === 'created') return 'done'
        if (key === 'sent') return 'done'
        if (key === 'verifying') return isPaid ? 'done' : 'active'
        if (key === 'download') return isPaid ? 'done' : 'pending'
        return 'pending'
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
            <style>{`
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,160,23,.4); }
          50% { box-shadow: 0 0 0 14px rgba(212,160,23,0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: .4; transform: scale(.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .ring-pending { animation: pulseRing 1.8s ease-out infinite; }
        .dot-active { animation: pulseDot 1.2s ease-in-out infinite; }
      `}</style>

            {/* Nav */}
            <nav className="flex items-center justify-between bg-[#111] border-b border-[rgba(212,160,23,.15)] px-4 md:px-12 py-3.5">
                <div className="text-[22px] font-[700] text-white cursor-pointer" style={{ fontFamily: 'Clash Display, sans-serif' }} onClick={() => navigate('/')}>
                    Em<span className="text-[#D4A017]">Maxi</span>
                </div>
            </nav>

            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-[480px]">
                    <div className="bg-white border border-[#E8E8E8] rounded-[20px] p-7 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,.06)] text-center">

                        {/* Status ring/icon */}
                        <div className="flex justify-center mb-5">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-[36px] ${isPaid ? 'bg-[#D1FAE5]' : 'bg-[#FDF6DC] ring-pending'}`}>
                                {isPaid ? '✅' : '⏳'}
                            </div>
                        </div>

                        {/* Title + subtitle */}
                        <h1 className="text-[22px] font-[700] mb-1.5" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                            {isPaid ? 'Payment confirmed!' : 'Waiting for your transfer'}
                        </h1>
                        <p className="text-[13px] text-[#6B6B6B] mb-6 leading-[1.6]">
                            {isPaid
                                ? <>Your enrollment is confirmed and the download link has been sent to your email.</>
                                : <>We're checking for your bank transfer. This usually takes a few moments after you send it.</>}
                        </p>

                        {/* Order reference */}
                        <div className="bg-[#F9F9F9] border border-[#E8E8E8] rounded-[10px] py-3 px-4 mb-6">
                            <div className="text-[10px] text-[#6B6B6B] uppercase tracking-[.08em] font-[600] mb-0.5">Order reference</div>
                            <div className="text-[14px] font-[700] text-[#111] tracking-[.04em]">{reference}</div>
                            {course && <div className="text-[11px] text-[#6B6B6B] mt-1">{course.title}</div>}
                        </div>

                        {/* Step tracker */}
                        <div className="space-y-3 text-left mb-6">
                            {STEPS.map((step, i) => {
                                const st = stepStatus(step.key)
                                return (
                                    <div key={step.key} className="flex items-center gap-3">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-[700] flex-shrink-0 ${st === 'done' ? 'bg-[#10B981] text-white'
                                                : st === 'active' ? 'bg-[#FDF6DC] text-[#D4A017] border-2 border-[#D4A017] dot-active'
                                                    : 'bg-[#F0F0F0] text-[#B0B0B0]'
                                            }`}>
                                            {st === 'done' ? '✓' : i + 1}
                                        </div>
                                        <div className={`text-[13px] font-[500] ${st === 'pending' ? 'text-[#B0B0B0]' : 'text-[#111]'}`}>
                                            {step.label}
                                            {st === 'active' && <span className="text-[#D4A017] ml-1.5 text-[11px]">checking…</span>}
                                            {step.key === 'download' && st === 'pending' && <span className="text-[#B0B0B0] ml-1.5 text-[11px]">🔒 locked until paid</span>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {pollError && (
                            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-[8px] px-3 py-2.5 text-[12px] text-[#991B1B] mb-5">
                                {pollError}
                            </div>
                        )}

                        {isPaid ? (
                            <Btn className="w-full justify-center" onClick={() => navigate('/student/courses')}>Go to my courses →</Btn>
                        ) : (
                            <Btn variant="outline" className="w-full justify-center" onClick={handleBackToStore}>← Back to store</Btn>
                        )}
                    </div>

                    <p className="text-center text-[11px] text-[#6B6B6B] mt-4">
                        Checking status every 4 seconds — you can safely close this page and come back later.
                    </p>
                </div>
            </div>
        </div>
    )
}