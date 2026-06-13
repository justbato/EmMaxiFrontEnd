import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type AllowedRole = 'student' | 'instructor' | 'admin' | 'super_admin' | 'moderator'

interface Props {
  children: React.ReactNode
  role?: AllowedRole
}

const ADMIN_ROLES: AllowedRole[] = ['admin', 'super_admin', 'moderator']

export function ProtectedRoute({ children, role }: Props) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#D4A017] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#6B6B6B]">Loading…</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If route requires admin role, allow all admin-tier roles
  if (role === 'admin' && ADMIN_ROLES.includes(user.role as AllowedRole)) {
    return <>{children}</>
  }

  if (role && user.role !== role && !ADMIN_ROLES.includes(user.role as AllowedRole)) {
    return <Navigate to={`/${user.role === 'super_admin' || user.role === 'moderator' ? 'admin' : user.role}`} replace />
  }

  return <>{children}</>
}
