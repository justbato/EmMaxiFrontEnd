import { useNavigate } from 'react-router-dom'
import { StarRating, Tag } from './ui'
import { type Course } from '../types'

interface CourseCardProps {
  course: Course
  showProgress?: boolean
  progress?: number
}

export function CourseCard({ course, showProgress, progress = 0 }: CourseCardProps) {
  const navigate = useNavigate()

  return (
    <div className="course-card bg-[var(--surface)] border border-[var(--border)] rounded-[14px] overflow-hidden cursor-pointer shadow-[var(--shadow)]"
      onClick={() => navigate(`/courses/${course.id}`)}>
      <div className="course-thumb h-[148px] flex items-center justify-center text-[40px] relative overflow-hidden"
        style={{ background: course.gradient }}>
        <span>{course.emoji}</span>
        {course.status === 'review' && (
          <span className="absolute top-2.5 left-2.5 bg-[#111] text-[#D4A017] text-[9px] font-[700] px-2 py-0.5 rounded-full border border-[rgba(212,160,23,.4)]">REVIEW</span>
        )}
      </div>
      <div className="p-[14px]">
        <div className="mb-2"><Tag>{course.level}</Tag></div>
        <div className="text-[13px] font-[600] leading-[1.4] mb-1.5 text-[var(--text-primary)]">{course.title}</div>
        <div className="text-[11px] text-[var(--text-tertiary)] flex items-center gap-2 mb-2.5">
          <span>{course.instructor}</span>·<span>{course.students.toLocaleString()} students</span>
        </div>
        {showProgress ? (
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[var(--text-tertiary)]">Progress</span>
              <span className="text-[#D4A017] font-[600]">{progress}%</span>
            </div>
            <div className="bg-[var(--bg-tertiary)] rounded-full h-1.5 overflow-hidden">
              <div className="progress-fill h-full rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <StarRating rating={course.rating} />
            <span className="text-[13px] font-[700] text-[#D4A017]">₦{course.price.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}
