'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Job } from '@/lib/types/job'
import { formatSalary, formatDate } from '@/lib/utils/format'
import Badge from '@/components/ui/Badge'

type FilterTab = 'all' | 'active' | 'paused'

const tabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'active', label: '掲載中' },
  { key: 'paused', label: '停止中' },
]

interface Props {
  jobs: Job[]
}

export default function JobsFilterTabs({ jobs }: Props) {
  const [filter, setFilter] = useState<FilterTab>('all')
  const [jobStates, setJobStates] = useState<Record<string, boolean>>(
    Object.fromEntries(jobs.map((j) => [j.id, j.isActive]))
  )

  const filtered = jobs.filter((j) => {
    if (filter === 'active') return jobStates[j.id]
    if (filter === 'paused') return !jobStates[j.id]
    return true
  })

  function toggleActive(jobId: string) {
    setJobStates((prev) => ({ ...prev, [jobId]: !prev[jobId] }))
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 bg-white rounded-lg border border-gray-200 p-1 w-fit">
        {tabs.map((tab) => {
          const count =
            tab.key === 'all'
              ? jobs.length
              : tab.key === 'active'
              ? jobs.filter((j) => jobStates[j.id]).length
              : jobs.filter((j) => !jobStates[j.id]).length

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={[
                'px-4 py-1.5 text-sm font-medium rounded-md transition-colors',
                filter === tab.key
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
              ].join(' ')}
            >
              {tab.label}
              <span
                className={[
                  'ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold',
                  filter === tab.key ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-600',
                ].join(' ')}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400">
            該当する求人はありません
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                    求人タイトル
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                    職種
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                    雇用形態
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                    給与
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">
                    掲載期間
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 whitespace-nowrap">
                    閲覧数
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 whitespace-nowrap">
                    応募数
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 whitespace-nowrap">
                    ステータス
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 whitespace-nowrap">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((job) => {
                  const active = jobStates[job.id]
                  return (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="font-medium text-gray-900 line-clamp-2 leading-snug">
                          {job.title}
                        </p>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <Badge variant="info">{job.jobType}</Badge>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-gray-600">
                        {job.employmentType}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-gray-700 font-medium">
                        {formatSalary(job.salaryMin, job.salaryMax, job.salaryType)}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-gray-500 text-xs">
                        <div>{formatDate(job.postedAt)} 〜</div>
                        {job.deadline && (
                          <div className="text-red-500">{formatDate(job.deadline)} 締切</div>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        <span className="text-gray-700 font-medium">
                          {job.viewCount.toLocaleString('ja-JP')}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        <span className="text-gray-700 font-medium">{job.applicationCount}</span>
                      </td>
                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        <span
                          className={[
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500',
                          ].join(' ')}
                        >
                          {active ? '掲載中' : '停止中'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="text-xs font-medium text-gray-500 hover:text-gray-700 hover:underline"
                          >
                            表示
                          </Link>
                          <span className="text-gray-300">|</span>
                          <Link
                            href={`/clinic/jobs/${job.id}/edit`}
                            className="text-xs font-medium text-cyan-600 hover:text-cyan-700 hover:underline"
                          >
                            編集
                          </Link>
                          <span className="text-gray-300">|</span>
                          <button
                            type="button"
                            onClick={() => toggleActive(job.id)}
                            className={[
                              'text-xs font-medium hover:underline transition-colors',
                              active
                                ? 'text-amber-600 hover:text-amber-700'
                                : 'text-green-600 hover:text-green-700',
                            ].join(' ')}
                          >
                            {active ? '停止' : '再開'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
