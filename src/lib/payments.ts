const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface CreateOrderPayload {
    email: string
    amount: number // in kobo
    reference: string
    product: string
}

export interface CreateOrderResponse {
    success: boolean
    account_number: string
    bank_name: string
    account_name: string
    reference: string
    message?: string
}

export type OrderStatus = 'pending' | 'paid' | 'not_found'

export interface OrderStatusResponse {
    status: OrderStatus
}

/** Generates a unique order reference: DD-<base36 timestamp><random chars> */
export function generateReference(): string {
    const ts = Date.now().toString(36).toUpperCase()
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
    return `DD-${ts}${rand}`
}

/** Convert a Naira amount to kobo (Paystack's smallest unit). */
export function nairaToKobo(naira: number): number {
    return Math.round(naira * 100)
}

/** Format kobo as a Naira display string, e.g. 2900000 -> "₦29,000" */
export function formatKobo(kobo: number): string {
    return `₦${(kobo / 100).toLocaleString()}`
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
    const res = await fetch(`${API_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(text || `Failed to create order (${res.status})`)
    }
    return res.json()
}

export async function getOrderStatus(reference: string): Promise<OrderStatusResponse> {
    const res = await fetch(`${API_URL}/order-status/${encodeURIComponent(reference)}`)
    if (!res.ok) {
        throw new Error(`Failed to check order status (${res.status})`)
    }
    return res.json()
}