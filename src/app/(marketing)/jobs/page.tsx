import { Suspense } from 'react'
import JobCard from '@/components/jobs/JobCard'
import JobSearchBar from '@/components/jobs/JobSearchBar'
import JobSearchFilters from '@/components/jobs/JobSearchFilters'
import { mockJobs } from '@/lib/mock-data/jobs'
import type { EmploymentType, JobType } from '@/lib/types/job'
import AIJobMatchingPopup from '@/components/marketing/AIJobMatchingPopup'

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string
    prefecture?: string
    employment?: string | string[]
    jobType?: string | string[]
    salaryMin?: string
    salaryMax?: string
  }>
}) {
  const params = await searchParams

  const q = params.q ?? ''
  const prefecture = params.prefecture ?? ''
  const employmentFilter: EmploymentType[] = params.employment
    ? (Array.isArray(params.employment) ? params.employment : [params.employment]) as EmploymentType[]
    : []
  const jobTypeFilter: JobType[] = params.jobType
    ? (Array.isArray(params.jobType) ? params.jobType : [params.jobType]) as JobType[]
    : []
  const salaryMin = params.salaryMin ? parseInt(params.salaryMin, 10) : null
  const salaryMax = params.salaryMax ? parseInt(params.salaryMax, 10) : null

  const filtered = mockJobs.filter((job) => {
    if (q) {
      const lower = q.toLowerCase()
      const match =
        job.title.toLowerCase().includes(lower) ||
        job.description.toLowerCase().includes(lower) ||
        job.clinicName.toLowerCase().includes(lower) ||
        job.jobType.toLowerCase().includes(lower)
      if (!match) return false
    }
    if (prefecture && job.prefecture !== prefecture) return false
    if (employmentFilter.length > 0 && !employmentFilter.includes(job.employmentType)) return false
    if (jobTypeFilter.length > 0 && !jobTypeFilter.includes(job.jobType)) return false
    // Salary filter applies only to 月給 jobs; hourly jobs always pass through.
    // Both job.salaryMin and job.salaryMax must fall within [filterMin, filterMax].
    if (job.salaryType === '月給') {
      if (salaryMin !== null && job.salaryMin < salaryMin) return false
      if (salaryMax !== null && job.salaryMax > salaryMax) return false
    }
    return true
  })

  const hasFilters =
    q || prefecture || employmentFilter.length > 0 || jobTypeFilter.length > 0 ||
    salaryMin !== null || salaryMax !== null

  return (
    <div className="bg-gray-50 min-h-screen">
      <AIJobMatchingPopup />
      {/* Page header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">求人検索</h1>
          <Suspense fallback={
            <div className="h-12 bg-gray-100 rounded-full animate-pulse" />
          }>
            <JobSearchBar />
          </Suspense>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="lg:w-64 shrink-0">
            <Suspense fallback={
              <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            }>
              <JobSearchFilters />
            </Suspense>
          </aside>

          {/* Results area */}
          <div className="flex-1 min-w-0">
            {/* Result count */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900 text-base">{filtered.length}</span>
                <span className="ml-1">件の求人が見つかりました</span>
                {hasFilters && (
                  <span className="ml-1 text-cyan-600">（絞り込み中）</span>
                )}
              </p>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-5xl mb-4" aria-hidden="true">🦷</div>
                <p className="text-sm text-gray-700 mb-1">
                  恐れ入りますが、該当する求人は見つかりませんでした。
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  検索条件を変更いただくか、絞り込みをリセットのうえ、再度お試しいただけますようお願いいたします。
                </p>
                <a
                  href="/jobs"
                  className="inline-flex items-center px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-full transition-colors"
                >
                  絞り込みをリセット
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
