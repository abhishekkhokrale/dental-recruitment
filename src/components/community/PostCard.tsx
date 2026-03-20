import type { CommunityPost } from '@/lib/mock-data/community'
import LikeButton from './LikeButton'

const QUALIFICATION_COLORS: Record<string, string> = {
  '歯科衛生士': 'bg-cyan-50 text-cyan-700',
  '歯科医師': 'bg-indigo-50 text-indigo-700',
  '歯科助手': 'bg-emerald-50 text-emerald-700',
  '歯科技工士': 'bg-amber-50 text-amber-700',
}

const TOPIC_COLORS: Record<string, string> = {
  '職場環境': 'bg-teal-50 text-teal-700',
  '給与・待遇': 'bg-orange-50 text-orange-700',
  '転職相談': 'bg-blue-50 text-blue-700',
  'スキルアップ': 'bg-purple-50 text-purple-700',
  'その他': 'bg-gray-100 text-gray-600',
}

function formatRelativeDate(isoString: string): string {
  const posted = new Date(isoString)
  const now = new Date('2026-03-20T00:00:00Z')
  const diffMs = now.getTime() - posted.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) return `${diffMins}分前`
  if (diffHours < 24) return `${diffHours}時間前`
  if (diffDays < 30) return `${diffDays}日前`
  return posted.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })
}

interface PostCardProps {
  post: CommunityPost
}

export default function PostCard({ post }: PostCardProps) {
  const qualificationColor =
    QUALIFICATION_COLORS[post.authorQualification] ?? 'bg-gray-100 text-gray-600'
  const topicColor = TOPIC_COLORS[post.topic] ?? 'bg-gray-100 text-gray-600'
  const truncated = post.content.length > 150
  const displayContent = truncated ? post.content.slice(0, 150) + '…' : post.content

  return (
    <article className="bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
      {/* Author row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {/* Avatar placeholder */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shrink-0 text-white text-sm font-semibold">
            {post.authorName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${qualificationColor}`}
              >
                {post.authorQualification}
              </span>
              <span className="text-sm font-semibold text-gray-800">{post.authorName}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{formatRelativeDate(post.postedAt)}</p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${topicColor}`}
        >
          {post.topic}
        </span>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        {displayContent}
        {truncated && (
          <button
            type="button"
            className="ml-1 text-cyan-600 hover:text-cyan-700 font-medium text-xs transition-colors"
          >
            続きを読む
          </button>
        )}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
        <LikeButton initialCount={post.likeCount} initialLiked={post.isLiked} />
        <div className="flex items-center gap-1.5 text-sm text-gray-400">
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
        </div>
      </div>
    </article>
  )
}
