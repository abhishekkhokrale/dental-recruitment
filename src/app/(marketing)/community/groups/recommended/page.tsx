import type { Metadata } from 'next'
import Link from 'next/link'
import { mockCommunityGroups, PROFESSION_LABELS } from '@/lib/mock-data/community'
import GroupCard from '@/components/community/GroupCard'

export const metadata: Metadata = {
  title: 'おすすめグループ | 歯科コミュニティ',
  description: 'あなたにおすすめの歯科専門グループを見つけましょう。',
}

const CATEGORY_ORDER = ['dentist', 'hygienist', 'technician', 'clinic_owner'] as const

export default function RecommendedGroupsPage() {
  const recommended = mockCommunityGroups.filter((g) => !g.isJoined)
  const joined = mockCommunityGroups.filter((g) => g.isJoined)

  const byProfession = CATEGORY_ORDER.map((prof) => ({
    profession: prof,
    label: PROFESSION_LABELS[prof],
    groups: recommended.filter((g) => g.profession === prof),
  })).filter((c) => c.groups.length > 0)

  const specialtyGroups = recommended.filter((g) => !g.profession && g.specialty)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-cyan-700 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Link href="/community" className="text-cyan-200 hover:text-white transition-colors">
              コミュニティ
            </Link>
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
            </svg>
            <Link href="/community/groups" className="text-cyan-200 hover:text-white transition-colors">
              グループ
            </Link>
            <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
            </svg>
            <span className="text-white font-medium">おすすめ</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">おすすめグループ</h1>
          <p className="text-cyan-100 text-sm max-w-xl">
            あなたの職種や専門分野に合ったグループに参加して、同じ志を持つ歯科医療従事者とつながりましょう。
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-cyan-200">
            <span>{recommended.length}件のおすすめグループ</span>
            <span>·</span>
            <span>参加中: {joined.length}グループ</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* By profession */}
        {byProfession.map(({ profession, label, groups }) => (
          <section key={profession}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-base font-bold text-gray-900">{label}向け</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {groups.length}件
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </section>
        ))}

        {/* By specialty */}
        {specialtyGroups.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-base font-bold text-gray-900">専門科グループ</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {specialtyGroups.length}件
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialtyGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </section>
        )}

        {/* Already joined */}
        {joined.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-base font-bold text-gray-900">参加中のグループ</h2>
              <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full font-medium">
                フォロー中
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {joined.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </section>
        )}

        {/* Footer link */}
        <div className="flex justify-center pt-2">
          <Link
            href="/community/groups"
            className="px-6 py-2.5 border border-cyan-600 text-cyan-600 hover:bg-cyan-50 text-sm font-bold rounded-full transition-colors"
          >
            すべてのグループを見る
          </Link>
        </div>
      </div>
    </div>
  )
}
