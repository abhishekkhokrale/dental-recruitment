import type { Metadata } from 'next'
import { mockCommunityPosts } from '@/lib/mock-data/community'
import CommunityTopicTabs from '@/components/community/CommunityTopicTabs'
import PostCard from '@/components/community/PostCard'
import NewPostModal from '@/components/community/NewPostModal'

export const metadata: Metadata = {
  title: '歯科コミュニティ | デンタルキャリア',
  description:
    '歯科衛生士・歯科医師・歯科助手・歯科技工士のためのコミュニティ。職場環境・給与・転職・スキルアップについて情報交換しましょう。',
}

const popularTopics = [
  { label: '職場環境', count: 124 },
  { label: '給与・待遇', count: 98 },
  { label: '転職相談', count: 87 },
  { label: 'スキルアップ', count: 63 },
  { label: 'その他', count: 31 },
]

export default function CommunityPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              歯科コミュニティ
            </h1>
            <p className="text-cyan-100 text-lg leading-relaxed">
              歯科業界で働く仲間と情報交換・交流しましょう。職場の悩みから転職相談、スキルアップのヒントまで。
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
                <span className="font-semibold">2,400+</span>
                <span className="text-cyan-100">メンバー</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
                <span className="font-semibold">403</span>
                <span className="text-cyan-100">投稿</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
                <span className="font-semibold">今日も活発</span>
                <span className="text-cyan-100">なコミュニティ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main column */}
          <div className="flex-1 min-w-0">
            {/* Topic filter */}
            <div className="mb-6">
              <CommunityTopicTabs />
            </div>

            {/* Post list */}
            <div className="space-y-4">
              {mockCommunityPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load more placeholder */}
            <div className="mt-8 text-center">
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 text-sm font-medium text-gray-600 rounded-full hover:border-cyan-400 hover:text-cyan-600 transition-colors"
              >
                もっと見る
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0 space-y-6">
            {/* CTA card */}
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-5">
              <h2 className="text-base font-bold text-cyan-900 mb-2">コミュニティに参加する</h2>
              <p className="text-sm text-cyan-700 leading-relaxed mb-4">
                無料登録して、歯科業界の仲間と繋がりましょう。悩みを共有したり、経験を活かしたアドバイスを送ったりできます。
              </p>
              <a
                href="/register"
                className="block w-full text-center py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                無料で参加する
              </a>
              <p className="text-xs text-center text-cyan-600 mt-2">
                登録済みの方は{' '}
                <a href="/login" className="underline hover:no-underline">
                  ログイン
                </a>
              </p>
            </div>

            {/* Popular topics */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                人気のトピック
              </h2>
              <ul className="space-y-2">
                {popularTopics.map(({ label, count }) => (
                  <li key={label}>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
                    >
                      <span className="font-medium">#{label}</span>
                      <span className="text-xs text-gray-400">{count}件</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guidelines card */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
                コミュニティガイドライン
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  '相手を尊重した言葉遣いで投稿しましょう',
                  '個人情報・クリニック名の特定は避けてください',
                  '広告・勧誘目的の投稿はご遠慮ください',
                  '誠実な情報共有を心がけましょう',
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="leading-snug">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating new post button / modal */}
      <NewPostModal />
    </div>
  )
}
