'use client'

import { useState } from 'react'
import type { CommunityPost } from '@/lib/mock-data/community'
import { mockCurrentUser } from '@/lib/mock-data/community'
import CommunityFeed, { type SortType } from './CommunityFeed'
import NewPostModal from './NewPostModal'
import TrendingCarousel from './TrendingCarousel'

interface CommunityPageClientProps {
  initialPosts: CommunityPost[]
}

export default function CommunityPageClient({ initialPosts }: CommunityPageClientProps) {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts)
  const [modalOpen, setModalOpen] = useState(false)
  const [sort, setSort] = useState<SortType>('hot')

  function handleNewPost(post: CommunityPost) {
    setPosts((prev) => [post, ...prev])
    setSort('new')
  }

  return (
    <>
      {/* Trending carousel */}
      <TrendingCarousel />

      {/* Create post bar */}
      <div className="bg-white border border-gray-200 rounded-md p-2 flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {mockCurrentUser.name.charAt(0)}
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex-1 text-left px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-400 hover:border-cyan-400 hover:bg-gray-50 transition-colors"
        >
          知見・症例・質問をシェアしましょう...
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-gray-100 rounded transition-colors"
            title="画像"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-gray-100 rounded transition-colors"
            title="リンク"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 1 1.242 7.244" />
            </svg>
          </button>
        </div>
      </div>

      {/* Feed */}
      <CommunityFeed posts={posts} sort={sort} onSortChange={setSort} />

      {/* Modal */}
      <NewPostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onNewPost={handleNewPost}
      />
    </>
  )
}
