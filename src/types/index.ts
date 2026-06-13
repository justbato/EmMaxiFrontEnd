export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructor_id: string
  price: number
  discount_price?: number
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  status: 'draft' | 'review' | 'published' | 'rejected'
  emoji: string
  gradient: string
  rating: number
  students: number
  hours: number
  lessons: number
}

export interface Section {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  type: 'video' | 'text' | 'both'
  duration?: string
  youtube_url?: string
  content?: string
  completed?: boolean
  free_preview?: boolean
}

export const DEMO_COURSES: Course[] = [
  { id: '1', title: 'Advanced React Patterns', description: 'Master compound components, render props, custom hooks, and code-splitting to build production-grade React apps.', instructor: 'Sarah Kim', instructor_id: '2', price: 12000, category: 'Web Dev', level: 'Intermediate', status: 'published', emoji: '⚛️', gradient: 'linear-gradient(135deg,#FDF6DC,#F5E5A0)', rating: 4.8, students: 1842, hours: 24, lessons: 42 },
  { id: '2', title: 'Python for Data Science', description: 'Learn Python, NumPy, Pandas, and Matplotlib to analyze and visualize real-world datasets.', instructor: 'James Okafor', instructor_id: '3', price: 9500, category: 'Data Science', level: 'Beginner', status: 'published', emoji: '🐍', gradient: 'linear-gradient(135deg,#D1FAE5,#6EE7B7)', rating: 4.6, students: 1204, hours: 18, lessons: 35 },
  { id: '3', title: 'UI/UX Fundamentals', description: 'Design beautiful and user-friendly interfaces using Figma, design principles, and prototyping.', instructor: 'Lena Müller', instructor_id: '4', price: 8000, category: 'Design', level: 'Beginner', status: 'published', emoji: '🎨', gradient: 'linear-gradient(135deg,#FEE2E2,#FCA5A5)', rating: 4.7, students: 940, hours: 15, lessons: 28 },
  { id: '4', title: 'AWS Solutions Architect', description: 'Prepare for AWS certification with hands-on labs covering EC2, S3, RDS, and more.', instructor: 'David Chen', instructor_id: '5', price: 18000, category: 'Cloud', level: 'Advanced', status: 'published', emoji: '☁️', gradient: 'linear-gradient(135deg,#FEF3C7,#FCD34D)', rating: 4.5, students: 720, hours: 30, lessons: 52 },
  { id: '5', title: 'Flutter Mobile Dev', description: 'Build cross-platform iOS and Android apps using Flutter and Dart from scratch.', instructor: 'Amira Hassan', instructor_id: '6', price: 11000, category: 'Mobile', level: 'Intermediate', status: 'published', emoji: '📱', gradient: 'linear-gradient(135deg,#FDF6DC,#F5DFA0)', rating: 4.6, students: 615, hours: 22, lessons: 40 },
  { id: '6', title: 'Ethical Hacking & Security', description: 'Learn penetration testing, network security, and ethical hacking from industry experts.', instructor: 'Kofi Asante', instructor_id: '7', price: 15000, category: 'Security', level: 'Advanced', status: 'published', emoji: '🔐', gradient: 'linear-gradient(135deg,#FEE2E2,#F87171)', rating: 4.9, students: 530, hours: 26, lessons: 45 },
  { id: '7', title: 'Node.js REST APIs', description: 'Build scalable REST APIs with Node.js, Express, and PostgreSQL. Authentication, middleware, and deployment included.', instructor: 'Sarah Kim', instructor_id: '2', price: 10500, category: 'Web Dev', level: 'Intermediate', status: 'published', emoji: '🟢', gradient: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)', rating: 4.7, students: 1120, hours: 20, lessons: 38 },
  { id: '8', title: 'Machine Learning Basics', description: 'Understand ML algorithms, model training, and deployment using scikit-learn and TensorFlow.', instructor: 'James Okafor', instructor_id: '3', price: 14000, category: 'Data Science', level: 'Intermediate', status: 'review', emoji: '🤖', gradient: 'linear-gradient(135deg,#EDE9FE,#C4B5FD)', rating: 4.5, students: 0, hours: 28, lessons: 48 },
]

export const DEMO_SECTIONS: Section[] = [
  {
    id: 's1', title: 'Getting Started',
    lessons: [
      { id: 'l1', title: 'Introduction to Advanced React Patterns', type: 'both', duration: '12:30', youtube_url: 'dQw4w9WgXcQ', content: 'Welcome to the course! In this lesson we set up our environment.', completed: true, free_preview: true },
      { id: 'l2', title: 'Project Setup & Tooling', type: 'video', duration: '8:45', completed: true },
      { id: 'l3', title: 'Understanding Component Design', type: 'text', content: 'Before we dive into patterns, let\'s understand component design principles...', completed: true },
    ]
  },
  {
    id: 's2', title: 'Core Patterns',
    lessons: [
      { id: 'l4', title: 'Compound Components', type: 'both', duration: '18:20', completed: true },
      { id: 'l5', title: 'Render Props Pattern', type: 'video', duration: '14:10', completed: false },
      { id: 'l6', title: 'Custom Hooks Deep Dive', type: 'both', duration: '22:05', completed: false },
      { id: 'l7', title: 'useCallback vs useMemo', type: 'text', content: 'Learn when to use each hook for performance optimization...', completed: false },
    ]
  },
  {
    id: 's3', title: 'Performance & Code Splitting',
    lessons: [
      { id: 'l8', title: 'Code Splitting with React.lazy()', type: 'video', duration: '16:40', completed: false },
      { id: 'l9', title: 'Suspense & Error Boundaries', type: 'both', duration: '20:15', completed: false },
    ]
  }
]
