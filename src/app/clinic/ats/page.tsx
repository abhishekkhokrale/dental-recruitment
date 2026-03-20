import type { Metadata } from 'next'
import { mockApplications } from '@/lib/mock-data/applications'
import AtsKanbanBoard from '@/components/clinic/AtsKanbanBoard'

export const metadata: Metadata = {
  title: '応募者管理（ATS） | スマイル歯科クリニック',
}

// Filter to clinic-001 applications
const clinicApplications = mockApplications.filter((a) => a.clinicId === 'clinic-001')

export default function AtsPage() {
  return (
    <div className="py-6 min-h-screen">
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">応募者管理（ATS）</h1>
            <p className="text-sm text-gray-500 mt-1">
              カンバンボードで応募者の選考状況を管理できます。
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-900">{clinicApplications.length}</span>
            <span>件の応募</span>
          </div>
        </div>
      </div>

      <AtsKanbanBoard initialApplications={clinicApplications} />
    </div>
  )
}
