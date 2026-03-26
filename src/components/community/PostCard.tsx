import type { CommunityPost } from '@/lib/mock-data/community'
import { PROFESSION_LABELS, PROFESSION_COLORS, EXPERIENCE_LABELS } from '@/lib/mock-data/community'
import LikeButton from './LikeButton'
import SaveButton from './SaveButton'

function formatRelativeDate(isoString: string): string {
  const posted = new Date(isoString)
  const now = new Date('2026-03-25T00:00:00Z')
  const diffMs = now.getTime() - posted.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) return `${diffMins}分前`
  if (diffHours < 24) return `${diffHours}時間前`
  if (diffDays < 30) return `${diffDays}日前`
  return posted.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })
}

const CONTENT_TYPE_CONFIG = {
  post: { label: '投稿', color: 'bg-gray-100 text-gray-600', border: '' },
  article: { label: '記事', color: 'bg-blue-50 text-blue-700', border: 'border-l-4 border-l-blue-400' },
  question: { label: '質問', color: 'bg-amber-50 text-amber-700', border: 'border-l-4 border-l-amber-400' },
  case: { label: 'ケース', color: 'bg-violet-50 text-violet-700', border: 'border-l-4 border-l-violet-500' },
}

interface PostCardProps {
  post: CommunityPost
}

export default function PostCard({ post }: PostCardProps) {
  const profColor = PROFESSION_COLORS[post.author.profession] ?? 'bg-gray-100 text-gray-600'
  const typeConfig = CONTENT_TYPE_CONFIG[post.contentType]
  const isLong = post.content.length > 200
  const displayContent = isLong ? post.content.slice(0, 200) + '…' : post.content

  return (
    <article
      className={[
        'bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow duration-200',
        typeConfig.border,
      ].join(' ')}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shrink-0 text-white text-sm font-bold">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-semibold text-gray-900">{post.author.name}</span>
              {post.author.specialty && (
                <span className="text-xs text-gray-400">· {post.author.specialty}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${profColor}`}>
                {PROFESSION_LABELS[post.author.profession]}
              </span>
              <span className="text-xs text-gray-400">
                {EXPERIENCE_LABELS[post.author.experience]}
              </span>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-400">{formatRelativeDate(post.postedAt)}</span>
            </div>
          </div>
        </div>

        {/* Type badge */}
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${typeConfig.color}`}>
          {post.contentType === 'case' && '🦷 '}
          {post.contentType === 'article' && '📚 '}
          {post.contentType === 'question' && '❓ '}
          {typeConfig.label}
        </span>
      </div>

      {/* Title (articles + cases) */}
      {post.title && (
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
          {post.title}
        </h3>
      )}

      {/* Content */}
      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        {displayContent}
        {isLong && (
          <button
            type="button"
            className="ml-1 text-cyan-600 hover:text-cyan-700 font-medium text-xs transition-colors"
          >
            続きを読む
          </button>
        )}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Topic badge */}
      <div className="mb-3">
        <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          {post.topic}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
        <LikeButton initialCount={post.likeCount} initialLiked={post.isLiked} />

        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-500 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <span>{post.commentCount}</span>
        </button>

        <SaveButton initialSaved={post.isSaved} initialCount={post.savedCount} />

        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-500 transition-colors ml-auto"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          <span className="text-xs">シェア</span>
        </button>
      </div>
    </article>
  )
}
