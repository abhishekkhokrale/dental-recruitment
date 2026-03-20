import type { Metadata } from 'next'
import Link from 'next/link'
import { mockJobs } from '@/lib/mock-data/jobs'
import JobsFilterTabs from '@/components/clinic/JobsFilterTabs'

export const metadata: Metadata = {
  title: '求人管理 | スマイル歯科クリニック',
}

const clinicJobs = mockJobs.filter((j) => j.clinicId === 'clinic-001')

export default function ClinicJobsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">求人管理</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            掲載中・停止中の求人を管理します
          </p>
        </div>
        <Link
          href="/clinic/jobs/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors shadow-sm"
        >
          <span>＋</span>
          新規作成
        </Link>
      </div>

      <JobsFilterTabs jobs={clinicJobs} />
    </div>
  )
}
