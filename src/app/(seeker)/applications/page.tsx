import type { Metadata } from 'next'
import Link from 'next/link'
import { mockApplications } from '@/lib/mock-data/applications'
import type { ApplicationStatus } from '@/lib/types/application'
import Badge, { getApplicationStatusVariant } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: '応募管理 | デンタルキャリア',
  description: '応募した求人の状況を確認・管理できます。',
}

// Filter to seeker-001 applications (the logged-in mock user)
const myApplications = mockApplications.filter((a) => a.seekerId === 'seeker-001')

function statusLabel(status: ApplicationStatus): string {
  return status
}

function calcSummary() {
  const total = myApplications.length
  const active = myApplications.filter((a) =>
    ['書類選考中', '面接調整中', '一次面接', '二次面接', '最終面接'].includes(a.status)
  ).length
  const offered = myApplications.filter((a) => a.status === '内定').length
  const pending = myApplications.filter((a) => a.status === '書類選考中').length
  return { total, active, offered, pending }
}

export default function ApplicationsPage() {
  const summary = calcSummary()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">応募管理</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-gray-900">{summary.total}</p>
          <p className="text-sm text-gray-500 mt-1">応募総数</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-cyan-600">{summary.active}</p>
          <p className="text-sm text-gray-500 mt-1">選考中</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-yellow-500">{summary.pending}</p>
          <p className="text-sm text-gray-500 mt-1">書類選考待ち</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{summary.offered}</p>
          <p className="text-sm text-gray-500 mt-1">内定</p>
        </div>
      </div>

      {/* Applications list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">応募一覧</h2>
          <span className="text-sm text-gray-500">{myApplications.length}件</span>
        </div>

        {myApplications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg font-medium mb-2">まだ応募した求人はありません</p>
            <Link href="/jobs" className="text-cyan-600 hover:underline text-sm">
              求人を探す
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {myApplications.map((app) => (
              <div key={app.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <Badge variant={getApplicationStatusVariant(app.status)}>
                      {statusLabel(app.status)}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                    {app.jobTitle}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{app.clinicName}</p>
                  {app.memo && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{app.memo}</p>
                  )}
                </div>

                {/* Dates + action */}
                <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1 shrink-0">
                  <div className="text-xs text-gray-400 text-right">
                    <p>応募日: {app.appliedAt}</p>
                    {app.interviewDate && (
                      <p className="text-cyan-600 font-medium">面接: {app.interviewDate}</p>
                    )}
                  </div>
                  <Link
                    href={`/jobs/${app.jobId}`}
                    className="text-xs font-medium text-cyan-600 hover:text-cyan-700 hover:underline whitespace-nowrap border border-cyan-200 hover:border-cyan-300 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
