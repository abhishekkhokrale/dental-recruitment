import Link from 'next/link'
import type { Job } from '@/lib/types/job'
import Badge from '@/components/ui/Badge'

interface JobCardProps {
  job: Job
}

function formatSalary(job: Job): string {
  const unit = job.salaryType === '時給' ? '円' : '万円'
  const toMan = (n: number) =>
    job.salaryType === '時給' ? n.toLocaleString() : Math.round(n / 10000).toString()
  return `${job.salaryType} ${toMan(job.salaryMin)}〜${toMan(job.salaryMax)}${unit}`
}

function getDaysAgo(postedAt: string): string {
  const posted = new Date(postedAt)
  const now = new Date()
  const diffMs = now.getTime() - posted.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return '今日'
  if (diffDays === 1) return '1日前'
  return `${diffDays}日前`
}

function employmentTypeVariant(type: Job['employmentType']) {
  switch (type) {
    case '正社員':
      return 'success' as const
    case 'パート・アルバイト':
      return 'info' as const
    case '契約社員':
      return 'warning' as const
    case '派遣社員':
      return 'default' as const
  }
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 group"
    >
      {/* Clinic header */}
      <div className="flex items-center gap-3 mb-3">
        {/* Logo placeholder */}
        <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0 text-lg">
          🦷
        </div>
        <span className="text-sm text-gray-500 truncate">{job.clinicName}</span>
      </div>

      {/* Job title */}
      <h2 className="font-semibold text-lg text-gray-900 group-hover:text-cyan-600 transition-colors mb-2 line-clamp-2">
        {job.title}
      </h2>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge variant="info">{job.jobType}</Badge>
        <Badge variant={employmentTypeVariant(job.employmentType)}>{job.employmentType}</Badge>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
        <svg
          className="w-4 h-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <span>
          {job.prefecture} {job.city}
        </span>
      </div>

      {/* Salary */}
      <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-4">
        <svg
          className="w-4 h-4 shrink-0 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span>{formatSalary(job)}</span>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">{getDaysAgo(job.postedAt)}</span>
        <span className="text-sm font-medium text-cyan-600 group-hover:text-cyan-700 transition-colors">
          応募する →
        </span>
      </div>
    </Link>
  )
}
