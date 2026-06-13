import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotifProvider } from './context/NotifContext'
import { ProtectedRoute } from './components/ProtectedRoute'

import { LandingPage } from './pages/Landing'
import { LoginPage } from './pages/auth/Login'
import { SignupPage } from './pages/auth/Signup'
import { CoursesPage } from './pages/Courses'
import { CourseDetailPage } from './pages/student/CourseDetail'
import { PaymentStatusPage } from './pages/PaymentStatus'
import { StudentDashboard } from './pages/student/Dashboard'
import { MyCoursesPage } from './pages/student/MyCourses'
import { LessonPlayerPage } from './pages/student/LessonPlayer'
import { StudentSettings } from './pages/student/Settings'
import { StudentReportPage } from './pages/student/Report'
import { InstructorDashboard } from './pages/instructor/Dashboard'
import { CourseBuilderPage } from './pages/instructor/CourseBuilder'
import { InstructorQAPage } from './pages/instructor/QA'
import { InstructorSettings } from './pages/instructor/Settings'
import { InstructorReportPage } from './pages/instructor/Report'
import { AdminDashboard } from './pages/admin/Dashboard'

function RoleRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'instructor') return <Navigate to="/instructor" replace />
  if (user.role === 'admin' || user.role === 'super_admin' || user.role === 'moderator') return <Navigate to="/admin" replace />
  return <Navigate to="/student" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/payment/:reference" element={<PaymentStatusPage />} />
      <Route path="/dashboard" element={<RoleRedirect />} />

      <Route path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/courses" element={<ProtectedRoute><MyCoursesPage /></ProtectedRoute>} />
      <Route path="/student/certificates" element={<ProtectedRoute><MyCoursesPage /></ProtectedRoute>} />
      <Route path="/student/settings" element={<ProtectedRoute><StudentSettings /></ProtectedRoute>} />
      <Route path="/student/report" element={<ProtectedRoute><StudentReportPage /></ProtectedRoute>} />
      <Route path="/learn/:courseId" element={<ProtectedRoute><LessonPlayerPage /></ProtectedRoute>} />

      <Route path="/instructor" element={<ProtectedRoute role="instructor"><InstructorDashboard /></ProtectedRoute>} />
      <Route path="/instructor/courses" element={<ProtectedRoute role="instructor"><InstructorDashboard /></ProtectedRoute>} />
      <Route path="/instructor/builder" element={<ProtectedRoute role="instructor"><CourseBuilderPage /></ProtectedRoute>} />
      <Route path="/instructor/qa" element={<ProtectedRoute role="instructor"><InstructorQAPage /></ProtectedRoute>} />
      <Route path="/instructor/analytics" element={<ProtectedRoute role="instructor"><InstructorDashboard /></ProtectedRoute>} />
      <Route path="/instructor/settings" element={<ProtectedRoute role="instructor"><InstructorSettings /></ProtectedRoute>} />
      <Route path="/instructor/report" element={<ProtectedRoute role="instructor"><InstructorReportPage /></ProtectedRoute>} />

      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/*" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotifProvider>
          <AppRoutes />
        </NotifProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}