'use client'

import { useState } from 'react'
import type { CommunityPost } from '@/lib/mock-data/community'
import { PROFESSION_LABELS, PROFESSION_COLORS, EXPERIENCE_LABELS } from '@/lib/mock-data/community'
import CommentSection from './CommentSection'

function formatRelativeDate(isoString: string): string {
  const posted = new Date(isoString)
  const now = new Date('2026-03-25T00:00:00Z')
  const diffMs = now.getTime() - posted.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  if (diffMins < 1) return 'たった今'
  if (diffMins < 60) return `${diffMins}分前`
  if (diffHours < 24) return `${diffHours}時間前`
  if (diffDays < 30) return `${diffDays}日前`
  return posted.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })
}

const TYPE_CONFIG = {
  post:    { label: '投稿',  bg: 'bg-gray-100',   text: 'text-gray-600',   icon: '✍️' },
  article: { label: '記事',  bg: 'bg-blue-100',   text: 'text-blue-700',   icon: '📚' },
  question:{ label: '質問',  bg: 'bg-amber-100',  text: 'text-amber-700',  icon: '❓' },
  case:    { label: 'ケース', bg: 'bg-violet-100', text: 'text-violet-700', icon: '🦷' },
}

const THUMBNAIL_COLORS = {
  post:    'bg-gradient-to-br from-gray-200 to-gray-300',
  article: 'bg-gradient-to-br from-blue-400 to-blue-600',
  question:'bg-gradient-to-br from-amber-400 to-orange-500',
  case:    'bg-gradient-to-br from-violet-400 to-purple-600',
}

interface RedditPostCardProps {
  post: CommunityPost
}

export default function RedditPostCard({ post }: RedditPostCardProps) {
  const [liked, setLiked] = useState(post.isLiked ?? false)
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [disliked, setDisliked] = useState(false)
  const [saved, setSaved] = useState(post.isSaved ?? false)
  const [following, setFollowing] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [shareToast, setShareToast] = useState(false)

  const typeConfig = TYPE_CONFIG[post.contentType]
  const profColor = PROFESSION_COLORS[post.author.profession] ?? 'bg-gray-100 text-gray-600'
  const isLong = post.content.length > 180
  const displayContent = !expanded && isLong ? post.content.slice(0, 180) + '…' : post.content

  function handleUpvote() {
    if (liked) {
      setLiked(false)
      setLikeCount((c) => Math.max(0, c - 1))
    } else {
      if (disliked) setDisliked(false)
      setLiked(true)
      setLikeCount((c) => c + 1)
    }
  }

  function handleDownvote() {
    if (disliked) {
      setDisliked(false)
    } else {
      if (liked) {
        setLiked(false)
        setLikeCount((c) => Math.max(0, c - 1))
      }
      setDisliked(true)
    }
  }

  function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/community/post/${post.id}`).catch(() => {})
    }
    setShareToast(true)
    setTimeout(() => setShareToast(false), 2000)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:border-gray-400 transition-colors group">
      <div className="flex gap-3 p-3">

        {/* Thumbnail */}
        <div className={`shrink-0 w-20 h-20 rounded-md ${THUMBNAIL_COLORS[post.contentType]} flex items-center justify-center text-2xl`}>
          <span>{typeConfig.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Meta row */}
          <div className="flex items-center gap-1.5 flex-wrap mb-1 text-xs text-gray-500">
            <span className={`font-semibold px-2 py-0.5 rounded-full ${typeConfig.bg} ${typeConfig.text}`}>
              {typeConfig.label}
            </span>
            <span className={`px-2 py-0.5 rounded-full font-medium ${profColor}`}>
              {PROFESSION_LABELS[post.author.profession]}
            </span>
            <span className="font-semibold text-gray-700">{post.author.name}</span>
            {post.author.specialty && (
              <><span>·</span><span className="text-gray-400">{post.author.specialty}</span></>
            )}
            <span>·</span>
            <span>{EXPERIENCE_LABELS[post.author.experience]}</span>
            <span>·</span>
            <span>{formatRelativeDate(post.postedAt)}</span>
            <span>·</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{post.topic}</span>

            {/* Join / Follow pill */}
            <button
              type="button"
              onClick={() => setFollowing((v) => !v)}
              className={[
                'px-3 py-0.5 rounded-full border text-xs font-bold transition-colors',
                following
                  ? 'border-gray-300 text-gray-500 bg-gray-50 hover:bg-gray-100'
                  : 'border-cyan-500 text-cyan-600 hover:bg-cyan-50',
              ].join(' ')}
            >
              {following ? 'フォロー中' : '+ フォロー'}
            </button>
          </div>

          {/* Title */}
          {post.title && (
            <h2 className="text-sm font-bold text-gray-900 mb-1 leading-snug group-hover:text-cyan-700 transition-colors cursor-pointer line-clamp-2">
              {post.title}
            </h2>
          )}

          {/* Content */}
          <p className="text-xs text-gray-600 leading-relaxed mb-2 line-clamp-2">
            {displayContent}
            {isLong && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="ml-1 text-cyan-600 hover:text-cyan-700 font-medium"
              >
                {expanded ? '閉じる' : '続きを読む'}
              </button>
            )}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-cyan-600 hover:text-cyan-800 cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Action bar — Reddit style inline */}
          <div className="flex items-center gap-0.5 -ml-1.5 flex-wrap relative">

            {/* Vote group */}
            <div className={[
              'flex items-center rounded-full border transition-colors',
              liked ? 'border-orange-300 bg-orange-50' : disliked ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-gray-50',
            ].join(' ')}>
              <button
                type="button"
                onClick={handleUpvote}
                aria-label="アップボート"
                className={[
                  'flex items-center gap-1 px-2 py-1.5 rounded-l-full text-xs font-bold transition-colors',
                  liked ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500',
                ].join(' ')}
              >
                <svg className="w-3.5 h-3.5" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
                <span className={liked ? 'text-orange-500' : disliked ? 'text-blue-500' : 'text-gray-700'}>
                  {likeCount >= 1000 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}
                </span>
              </button>
              <div className="w-px h-4 bg-gray-200" />
              <button
                type="button"
                onClick={handleDownvote}
                aria-label="ダウンボート"
                className={[
                  'flex items-center px-2 py-1.5 rounded-r-full text-xs transition-colors',
                  disliked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500',
                ].join(' ')}
              >
                <svg className="w-3.5 h-3.5" fill={disliked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>

            {/* Comments */}
            <button
              type="button"
              onClick={() => setShowComments((v) => !v)}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                showComments ? 'bg-cyan-50 text-cyan-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
              ].join(' ')}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              <span>{post.commentCount.toLocaleString()} コメント</span>
            </button>

            {/* Save */}
            <button
              type="button"
              onClick={() => setSaved((v) => !v)}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                saved ? 'bg-cyan-50 text-cyan-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
              ].join(' ')}
            >
              <svg className="w-3.5 h-3.5" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              <span>{saved ? '保存済み' : '保存'}</span>
            </button>

            {/* Share */}
            <div className="relative">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                <span>シェア</span>
              </button>
              {shareToast && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap shadow-lg z-20">
                  リンクをコピーしました！
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                </div>
              )}
            </div>

            {/* Report */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 9m0 6V9" />
              </svg>
              <span>報告</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inline comment section */}
      {showComments && (
        <div className="border-t border-gray-100 px-3 pb-3">
          <CommentSection postId={post.id} initialCount={post.commentCount} />
        </div>
      )}
    </div>
  )
}
