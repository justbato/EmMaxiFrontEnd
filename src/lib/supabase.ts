import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          email: string
          role: 'student' | 'instructor' | 'admin'
          avatar_url?: string
          bio?: string
          title?: string
          expertise?: string
          status: 'active' | 'suspended' | 'banned'
          created_at: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          instructor_id: string
          price: number
          discount_price?: number
          category: string
          level: 'Beginner' | 'Intermediate' | 'Advanced'
          status: 'draft' | 'review' | 'published' | 'rejected'
          thumbnail_emoji: string
          thumbnail_gradient: string
          rating: number
          students_count: number
          created_at: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          progress: number
          completed: boolean
          enrolled_at: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          section_id: string
          title: string
          type: 'video' | 'text' | 'both'
          youtube_url?: string
          content?: string
          order: number
        }
      }
      sections: {
        Row: {
          id: string
          course_id: string
          title: string
          order: number
        }
      }
      reviews: {
        Row: {
          id: string
          course_id: string
          student_id: string
          rating: number
          comment: string
          created_at: string
        }
      }
      questions: {
        Row: {
          id: string
          course_id: string
          lesson_id?: string
          student_id: string
          question: string
          answer?: string
          answered_at?: string
          upvotes: number
          created_at: string
        }
      }
    }
  }
}
