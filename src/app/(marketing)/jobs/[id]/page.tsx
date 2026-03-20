import Link from 'next/link'
import { notFound } from 'next/navigation'
import { mockJobs } from '@/lib/mock-data/jobs'
import Badge from '@/components/ui/Badge'
import ApplyButton from '@/components/jobs/ApplyButton'
import type { Job } from '@/lib/types/job'

function formatSalary(job: Job): string {
  const unit = job.salaryType === '時給' ? '円' : '万円'
  const toLabel = (n: number) =>
    job.salaryType === '時給' ? n.toLocaleString() : Math.round(n / 10000).toString()
  return `${job.salaryType} ${toLabel(job.salaryMin)}〜${toLabel(job.salaryMax)}${unit}`
}

function employmentTypeVariant(type: Job['employmentType']) {
  switch (type) {
    case '正社員': return 'success' as const
    case 'パート・アルバイト': return 'info' as const
    case '契約社員': return 'warning' as const
    case '派遣社員': return 'default' as const
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const job = mockJobs.find((j) => j.id === id)

  if (!job) notFound()

  const postedDate = new Date(job.postedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const deadlineDate = job.deadline
    ? new Date(job.deadline).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="パンくずリスト">
          <Link href="/" className="hover:text-cyan-600 transition-colors">トップ</Link>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/jobs" className="hover:text-cyan-600 transition-colors">求人検索</Link>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-gray-700 font-medium truncate max-w-xs">{job.title}</span>
        </nav>

        {/* Job header card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0 text-xl">
              🦷
            </div>
            <div>
              <p className="text-sm text-gray-500">{job.clinicName}</p>
              <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span>{job.prefecture} {job.city}</span>
              </div>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-snug">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="info">{job.jobType}</Badge>
            <Badge variant={employmentTypeVariant(job.employmentType)}>{job.employmentType}</Badge>
          </div>

          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {formatSalary(job)}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* 仕事内容 */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 border-l-4 border-cyan-600 pl-3 mb-4">仕事内容</h2>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
            </section>

            {/* 応募資格 */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 border-l-4 border-cyan-600 pl-3 mb-4">応募資格</h2>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            {/* 給与 */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 border-l-4 border-cyan-600 pl-3 mb-4">給与</h2>
              <p className="text-sm font-semibold text-gray-800">{formatSalary(job)}</p>
            </section>

            {/* 勤務時間 */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 border-l-4 border-cyan-600 pl-3 mb-4">勤務時間</h2>
              <p className="text-sm text-gray-700">{job.workingHours}</p>
            </section>

            {/* 休日 */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 border-l-4 border-cyan-600 pl-3 mb-4">休日・休暇</h2>
              <p className="text-sm text-gray-700">{job.holidays}</p>
            </section>

            {/* 福利厚生 */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 border-l-4 border-cyan-600 pl-3 mb-4">福利厚生</h2>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((benefit, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </section>

            {/* Posting info */}
            <div className="text-xs text-gray-400 pb-2">
              <span>掲載日: {postedDate}</span>
              {deadlineDate && <span className="ml-4">応募締切: {deadlineDate}</span>}
            </div>
          </div>

          {/* Sticky apply card */}
          <div className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <p className="text-xs text-gray-500 mb-1">給与</p>
                <p className="text-base font-bold text-gray-900 mb-5">{formatSalary(job)}</p>

                <ApplyButton jobId={job.id} jobTitle={job.title} />

                <button
                  type="button"
                  className="mt-3 w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                  気になる
                </button>

                <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span>{job.prefecture} {job.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>{job.workingHours}</span>
                  </div>
                  {deadlineDate && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      <span>締切: {deadlineDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Back to results */}
              <Link
                href="/jobs"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm text-gray-500 hover:text-cyan-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                求人一覧に戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
