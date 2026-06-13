import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'

export type Role = 'student' | 'instructor' | 'admin' | 'super_admin' | 'moderator'

interface User {
  id: string
  email: string
  username: string
  full_name: string
  role: Role
  avatar_url?: string
  status: 'active' | 'suspended' | 'banned'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ error?: string }>
  signup: (data: SignupData) => Promise<{ error?: string }>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

interface SignupData {
  email: string
  password: string
  username: string
  full_name: string
  role: Role
  title?: string
  expertise?: string
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock users for demo
const MOCK_USERS: User[] = [
  { id: '1', email: 'student@demo.com', username: 'ada_obi', full_name: 'Ada Obi', role: 'student', status: 'active' },
  { id: '2', email: 'instructor@demo.com', username: 'sarah_kim', full_name: 'Sarah Kim', role: 'instructor', status: 'active' },
  { id: '3', email: 'admin@demo.com', username: 'admin', full_name: 'Admin User', role: 'admin', status: 'active' },
  { id: '4', email: 'superadmin@demo.com', username: 'superadmin', full_name: 'Super Admin', role: 'super_admin', status: 'active' },
  { id: '5', email: 'moderator@demo.com', username: 'moderator', full_name: 'Mod User', role: 'moderator', status: 'active' },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored session
    const stored = localStorage.getItem('emmaxi_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Demo login — match mock users by email
    const found = MOCK_USERS.find(u => u.email === email)
    if (found && password.length >= 6) {
      setUser(found)
      localStorage.setItem('emmaxi_user', JSON.stringify(found))
      return {}
    }
    // Try Supabase
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { error: 'Invalid email or password.' }
      if (data.user) {
        const profile = {
          id: data.user.id, email: data.user.email!, username: data.user.email!.split('@')[0],
          full_name: data.user.user_metadata?.full_name || 'User', role: 'student' as Role, status: 'active' as const,
        }
        setUser(profile)
        localStorage.setItem('emmaxi_user', JSON.stringify(profile))
        return {}
      }
    } catch {}
    return { error: 'Invalid email or password.' }
  }

  const signup = async (data: SignupData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email, password: data.password,
        options: { data: { username: data.username, full_name: data.full_name, role: data.role } },
      })
      if (error) return { error: error.message }
      // For demo, auto-login
      const newUser: User = { id: Date.now().toString(), email: data.email, username: data.username, full_name: data.full_name, role: data.role, status: 'active' }
      setUser(newUser)
      localStorage.setItem('emmaxi_user', JSON.stringify(newUser))
      return {}
    } catch {
      // Demo fallback
      const newUser: User = { id: Date.now().toString(), email: data.email, username: data.username, full_name: data.full_name, role: data.role, status: 'active' }
      setUser(newUser)
      localStorage.setItem('emmaxi_user', JSON.stringify(newUser))
      return {}
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('emmaxi_user')
    supabase.auth.signOut().catch(() => {})
  }

  const updateUser = (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev
      const updated = { ...prev, ...data }
      localStorage.setItem('emmaxi_user', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
