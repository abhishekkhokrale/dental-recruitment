'use client'

import { useState } from 'react'
import type { Application, ApplicationStatus } from '@/lib/types/application'

// Mock seeker names
const seekerNames: Record<string, string> = {
  'seeker-001': '山田 花子',
  'seeker-002': '佐藤 健太',
  'seeker-003': '鈴木 美咲',
  'seeker-004': '田中 彩乃',
}

const columns: { status: ApplicationStatus; label: string; color: string; headerBg: string; badge: string }[] = [
  {
    status: '書類選考中',
    label: '書類選考中',
    color: 'border-blue-400',
    headerBg: 'bg-blue-50 text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    status: '面接調整中',
    label: '面接調整中',
    color: 'border-purple-400',
    headerBg: 'bg-purple-50 text-purple-700',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    status: '一次面接',
    label: '一次面接',
    color: 'border-yellow-400',
    headerBg: 'bg-yellow-50 text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  {
    status: '最終面接',
    label: '最終面接',
    color: 'border-orange-400',
    headerBg: 'bg-orange-50 text-orange-700',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    status: '内定',
    label: '内定',
    color: 'border-green-400',
    headerBg: 'bg-green-50 text-green-700',
    badge: 'bg-green-100 text-green-700',
  },
  {
    status: '不採用',
    label: '不採用',
    color: 'border-red-300',
    headerBg: 'bg-red-50 text-red-600',
    badge: 'bg-red-100 text-red-600',
  },
]

// Order of statuses for "advance" button
const statusOrder: ApplicationStatus[] = [
  '書類選考中',
  '面接調整中',
  '一次面接',
  '最終面接',
  '内定',
  '不採用',
]

interface Props {
  initialApplications: Application[]
}

export default function AtsKanbanBoard({ initialApplications }: Props) {
  const [applications, setApplications] = useState<Application[]>(initialApplications)

  function advanceStatus(appId: string, currentStatus: ApplicationStatus) {
    const currentIdx = statusOrder.indexOf(currentStatus)
    if (currentIdx === -1 || currentIdx >= statusOrder.length - 1) return
    const nextStatus = statusOrder[currentIdx + 1]
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: nextStatus, updatedAt: new Date().toISOString().split('T')[0] } : app
      )
    )
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max px-6 py-4">
        {columns.map((col) => {
          const cards = applications.filter((a) => a.status === col.status)
          return (
            <div
              key={col.status}
              className={`w-64 shrink-0 flex flex-col rounded-xl border-t-4 ${col.color} bg-white shadow-sm overflow-hidden`}
            >
              {/* Column header */}
              <div className={`flex items-center justify-between px-4 py-3 ${col.headerBg}`}>
                <span className="text-sm font-semibold">{col.label}</span>
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${col.badge}`}
                >
                  {cards.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex-1 p-3 space-y-3 min-h-[200px] bg-gray-50">
                {cards.length === 0 && (
                  <div className="flex items-center justify-center h-20 text-xs text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    応募者なし
                  </div>
                )}
                {cards.map((app) => {
                  const currentIdx = statusOrder.indexOf(app.status)
                  const canAdvance = currentIdx < statusOrder.length - 1
                  return (
                    <div
                      key={app.id}
                      className="bg-white rounded-lg border border-gray-200 p-3.5 shadow-sm"
                    >
                      {/* Applicant info */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold text-cyan-700 shrink-0">
                          {(seekerNames[app.seekerId] ?? '?')[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {seekerNames[app.seekerId] ?? `応募者 ${app.seekerId}`}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">
                        {app.jobTitle}
                      </p>

                      <p className="text-xs text-gray-400 mb-3">
                        応募日: {app.appliedAt}
                      </p>

                      <div className="flex items-center gap-1.5">
                        <a
                          href="/clinic/ats"
                          className="flex-1 text-center text-xs font-medium text-cyan-600 border border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 px-2 py-1.5 rounded-lg transition-colors"
                        >
                          詳細を見る
                        </a>
                        {canAdvance && (
                          <button
                            type="button"
                            onClick={() => advanceStatus(app.id, app.status)}
                            title={`${statusOrder[currentIdx + 1]}へ進める`}
                            className="text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 px-2 py-1.5 rounded-lg transition-colors shrink-0"
                          >
                            →
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
