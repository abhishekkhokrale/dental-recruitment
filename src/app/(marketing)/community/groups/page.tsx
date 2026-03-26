import type { Metadata } from 'next'
import Link from 'next/link'
import { mockCommunityGroups } from '@/lib/mock-data/community'
import GroupCard from '@/components/community/GroupCard'

export const metadata: Metadata = {
  title: 'グループ | 歯科コミュニティ',
  description: '歯科医療従事者向けの専門・職種別グループに参加しましょう。',
}

export default function CommunityGroupsPage() {
  const myGroups = mockCommunityGroups.filter((g) => g.isJoined)
  const allGroups = mockCommunityGroups

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/community"
              className="text-slate-400 hover:text-white text-sm transition-colors"
            >
              コミュニティ
            </Link>
            <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
            </svg>
            <span className="text-sm text-white font-medium">グループ</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">コミュニティグループ</h1>
          <p className="text-slate-300 text-sm max-w-xl">
            専門分野や職種が同じ歯科医療従事者とつながりましょう。グループに参加して関連する投稿を確認したり、専門コミュニティと繋がりを深めましょう。
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* My groups */}
        {myGroups.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-4">参加中のグループ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </section>
        )}

        {/* All groups */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-4">すべてのグループ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
