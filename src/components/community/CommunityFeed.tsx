'use client'

import { useState, useMemo, useEffect } from 'react'
import type { CommunityPost, CommunityTopic, ContentType } from '@/lib/mock-data/community'
import { communityTopics } from '@/lib/mock-data/community'
import RedditPostCard from './RedditPostCard'

export type SortType = 'hot' | 'new' | 'top' | 'rising'
type FeedType = 'all' | ContentType

const SORT_OPTIONS: { value: SortType; label: string; icon: React.ReactNode }[] = [
  {
    value: 'hot',
    label: '話題',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
        <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93s-3.05 7.44-7 7.93v2.02c5.05-.5 9-4.76 9-9.95S18.05 2.55 13 2.05z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    ),
  },
  {
    value: 'new',
    label: '新着',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    value: 'top',
    label: 'TOP',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    ),
  },
  {
    value: 'rising',
    label: '急上昇',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
]

const TYPE_OPTIONS: { value: FeedType; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'post', label: '✍️ 投稿' },
  { value: 'article', label: '📚 記事' },
  { value: 'question', label: '❓ 質問' },
  { value: 'case', label: '🦷 ケース' },
]

const PAGE_SIZE = 5

function sortPosts(posts: CommunityPost[], sort: SortType): CommunityPost[] {
  const arr = [...posts]
  switch (sort) {
    case 'hot':
      return arr.sort((a, b) => (b.likeCount * 2 + b.commentCount) - (a.likeCount * 2 + a.commentCount))
    case 'new':
      return arr.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    case 'top':
      return arr.sort((a, b) => b.likeCount - a.likeCount)
    case 'rising':
      return arr.sort((a, b) => (b.savedCount ?? 0) - (a.savedCount ?? 0))
    default:
      return arr
  }
}

interface CommunityFeedProps {
  posts: CommunityPost[]
  sort: SortType
  onSortChange: (s: SortType) => void
}

export default function CommunityFeed({ posts, sort, onSortChange }: CommunityFeedProps) {
  const [contentType, setContentType] = useState<FeedType>('all')
  const [topic, setTopic] = useState<CommunityTopic>('すべて')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Reset pagination when sort changes from parent
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [sort])

  const filtered = useMemo(() => {
    let result = posts
    if (contentType !== 'all') {
      result = result.filter((p) => p.contentType === contentType)
    }
    if (topic !== 'すべて') {
      result = result.filter((p) => p.topic === topic)
    }
    return sortPosts(result, sort)
  }, [posts, sort, contentType, topic])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function handleSortChange(s: SortType) {
    onSortChange(s)
    setVisibleCount(PAGE_SIZE)
  }

  function handleTypeChange(t: FeedType) {
    setContentType(t)
    setVisibleCount(PAGE_SIZE)
  }

  function handleTopicChange(t: CommunityTopic) {
    setTopic(t)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="space-y-3">
      {/* Sort bar */}
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
        {/* Row 1: Sort options */}
        <div className="px-3 pt-2.5 pb-2 flex items-center gap-1 border-b border-gray-100">
          {SORT_OPTIONS.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleSortChange(value)}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                sort === value
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100',
              ].join(' ')}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>
        {/* Row 2: Content type filter */}
        <div className="px-3 py-2 flex items-center gap-1.5 flex-wrap">
          {TYPE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleTypeChange(value)}
              className={[
                'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
                contentType === value
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Topic filter */}
      <div className="bg-white border border-gray-200 rounded-md px-3 py-2 flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-gray-400 font-medium mr-1">トピック：</span>
        {communityTopics.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTopicChange(t)}
            className={[
              'px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
              topic === t
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ].join(' ')}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Posts */}
      {visible.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-md p-12 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-500 font-medium">該当する投稿が見つかりませんでした</p>
          <p className="text-sm text-gray-400 mt-1">フィルターを変更してみてください</p>
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map((post) => (
            <RedditPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
          className="w-full py-2.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-cyan-600 hover:bg-cyan-50 hover:border-cyan-300 transition-colors"
        >
          さらに読み込む ({filtered.length - visibleCount}件)
        </button>
      )}

      {!hasMore && filtered.length > 0 && (
        <p className="text-center text-xs text-gray-400 py-4">すべての投稿を表示しました</p>
      )}
    </div>
  )
}
