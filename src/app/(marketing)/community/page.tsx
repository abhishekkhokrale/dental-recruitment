import type { Metadata } from 'next'
import Link from 'next/link'
import {
  mockCommunityPosts,
  mockCommunityGroups,
  mockCurrentUser,
  PROFESSION_LABELS,
  PROFESSION_COLORS,
  EXPERIENCE_LABELS,
} from '@/lib/mock-data/community'
import CommunityPageClient from '@/components/community/CommunityPageClient'
import GroupCard from '@/components/community/GroupCard'

export const metadata: Metadata = {
  title: '歯科コミュニティ | ブルージョブズ',
  description:
    '歯科医師・歯科衛生士・歯科技工士・クリニックオーナーのためのプロフェッショナルな知識と議論のネットワーク。',
}

const communityRules = [
  { num: 1, title: '相互尊重', desc: '経験に関わらず全メンバーを尊重しましょう' },
  { num: 2, title: '患者情報の匿名化', desc: '個人を特定できる患者情報は共有しないでください' },
  { num: 3, title: '宣伝・採用禁止', desc: 'フィードへの宣伝・採用目的の投稿はご遠慮ください' },
  { num: 4, title: '根拠に基づく情報', desc: '可能な限り根拠に基づいた情報を提供しましょう' },
  { num: 5, title: '違反コンテンツの報告', desc: 'ガイドライン違反のコンテンツは報告してください' },
]

export default function CommunityPage() {
  const myGroups = mockCommunityGroups.filter((g) => g.isJoined)
  const suggestedGroups = mockCommunityGroups.filter((g) => !g.isJoined).slice(0, 3)

  return (
    <div className="bg-[#dae0e6] min-h-screen">
      {/* Community banner — full width */}
      <div className="bg-linear-to-r from-cyan-700 to-slate-800 w-full">
        <div className="w-full px-6 lg:px-10 py-8">
          <div className="flex items-end gap-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl border-4 border-white shadow-md shrink-0">
              🦷
            </div>
            <div className="pb-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">歯科コミュニティ</h1>
              <p className="text-cyan-200 text-sm">DentalProfessionals · 4,800+ メンバー</p>
            </div>
            <div className="ml-auto pb-1 flex gap-2">
              <Link
                href="/register"
                className="px-5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-sm rounded-full transition-colors"
              >
                参加
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar — full width */}
      <div className="bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="w-full px-6 lg:px-10">
          <div className="flex items-center gap-8 py-2.5 text-sm">
            <div className="flex items-center gap-1.5 text-gray-700">
              <span className="font-bold text-base">4,800+</span>
              <span className="text-gray-500 text-xs">メンバー</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <span className="font-bold text-base">312</span>
              <span className="text-gray-500 text-xs">オンライン中</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <span className="font-bold text-base">2020</span>
              <span className="text-gray-500 text-xs">年設立</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <span className="font-bold text-base">9</span>
              <span className="text-gray-500 text-xs">専門グループ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout — full width, feed + sidebar */}
      <div className="w-full px-4 lg:px-8 py-5">
        <div className="flex gap-5">
          {/* Feed column — takes all available space */}
          <div className="flex-1 min-w-0">
            <CommunityPageClient initialPosts={mockCommunityPosts} />
          </div>

          {/* Right sidebar — fixed width */}
          <aside className="hidden lg:block w-80 shrink-0 space-y-4">
            {/* About community */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-linear-to-r from-cyan-600 to-slate-700 px-4 py-3">
                <h2 className="text-white font-bold text-sm">歯科コミュニティについて</h2>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  歯科医師・歯科衛生士・歯科技工士・クリニックオーナーのためのプロフェッショナルなナレッジネットワークです。
                </p>

                {/* User card */}
                <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-lg mb-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white font-bold shrink-0">
                    {mockCurrentUser.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{mockCurrentUser.name}</p>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${PROFESSION_COLORS[mockCurrentUser.profession]}`}>
                        {PROFESSION_LABELS[mockCurrentUser.profession]}
                      </span>
                      <span className="text-xs text-gray-400">{EXPERIENCE_LABELS[mockCurrentUser.experience]}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-gray-100 mb-4">
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{mockCurrentUser.postCount}</p>
                    <p className="text-xs text-gray-500">投稿</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{mockCurrentUser.followerCount}</p>
                    <p className="text-xs text-gray-500">フォロワー</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{mockCurrentUser.followingCount}</p>
                    <p className="text-xs text-gray-500">フォロー中</p>
                  </div>
                </div>

                {/* Open to opportunities */}
                <div className="flex items-center justify-between mb-4 p-2.5 bg-cyan-50 rounded-lg border border-cyan-100">
                  <div>
                    <p className="text-xs font-semibold text-cyan-800">求職シグナル</p>
                    <p className="text-xs text-cyan-600">クリニックに表示されます</p>
                  </div>
                  <div className="relative cursor-pointer w-10 h-6 bg-gray-200 rounded-full flex items-center transition-colors hover:bg-gray-300">
                    <div className="w-5 h-5 bg-white rounded-full shadow absolute left-0.5 transition-transform" />
                  </div>
                </div>

                <Link
                  href="/community/groups"
                  className="block w-full py-2 border border-cyan-600 text-cyan-600 hover:bg-cyan-50 text-sm font-bold rounded-full transition-colors text-center"
                >
                  グループを見る
                </Link>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 text-sm">コミュニティルール</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {communityRules.map((rule) => (
                  <div key={rule.num} className="px-4 py-2.5">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs font-bold text-gray-400 w-4 shrink-0 mt-0.5">{rule.num}.</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{rule.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{rule.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My groups */}
            {myGroups.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-bold text-gray-900 text-sm">参加中のグループ</h2>
                  <Link href="/community/groups" className="text-xs text-cyan-600 hover:underline">すべて見る</Link>
                </div>
                <div className="p-3 space-y-2">
                  {myGroups.map((group) => (
                    <GroupCard key={group.id} group={group} compact />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested groups */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 text-sm">おすすめグループ</h2>
                <Link href="/community/groups" className="text-xs text-cyan-600 hover:underline">すべて見る</Link>
              </div>
              <div className="p-3 space-y-2">
                {suggestedGroups.map((group) => (
                  <GroupCard key={group.id} group={group} compact />
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center px-2">
              BlueJobs · ヘルプ · プライバシーポリシー · 利用規約
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
