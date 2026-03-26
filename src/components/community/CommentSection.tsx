'use client'

import { useState } from 'react'
import type { ProfessionType } from '@/lib/mock-data/community'
import { PROFESSION_LABELS, PROFESSION_COLORS } from '@/lib/mock-data/community'

interface Comment {
  id: string
  author: string
  profession: ProfessionType
  content: string
  likeCount: number
  postedAt: string
  isLiked: boolean
}

const BASE_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: '山田 健太 先生',
    profession: 'dentist',
    content: '非常に参考になりました。私も同様のケースを経験しましたが、プロビジョナルを6か月使用しました。3か月でも十分なのか気になります。',
    likeCount: 14,
    postedAt: '2026-03-24T11:00:00Z',
    isLiked: false,
  },
  {
    id: 'c2',
    author: '佐々木 麻美',
    profession: 'hygienist',
    content: 'とても丁寧な説明ありがとうございます！患者さんへの説明資料としても使えそうです。シェアしてよいですか？',
    likeCount: 8,
    postedAt: '2026-03-24T12:30:00Z',
    isLiked: true,
  },
  {
    id: 'c3',
    author: '中野 俊介',
    profession: 'technician',
    content: 'ジルコニア素材の選択について補足です。モノリシックとレイヤリングで最終的な審美性がかなり変わります。前歯部は特に慎重に選定が必要かと思います。',
    likeCount: 21,
    postedAt: '2026-03-24T14:15:00Z',
    isLiked: false,
  },
]

function formatDate(iso: string) {
  const d = new Date(iso)
  const now = new Date('2026-03-25T00:00:00Z')
  const diffH = Math.floor((now.getTime() - d.getTime()) / 3600000)
  if (diffH < 24) return `${diffH}時間前`
  return `${Math.floor(diffH / 24)}日前`
}

interface CommentSectionProps {
  postId: string
  initialCount: number
}

export default function CommentSection({ postId, initialCount }: CommentSectionProps) {
  const seed = postId.charCodeAt(postId.length - 1) % 3
  const [comments, setComments] = useState<Comment[]>(
    BASE_COMMENTS.slice(seed, seed + 2).concat(BASE_COMMENTS.slice(0, seed))
  )
  const [input, setInput] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function toggleLike(id: string) {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, isLiked: !c.isLiked, likeCount: c.isLiked ? c.likeCount - 1 : c.likeCount + 1 }
          : c
      )
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    setSubmitting(true)
    setTimeout(() => {
      const newComment: Comment = {
        id: `c-${Date.now()}`,
        author: '田中 美咲',
        profession: 'dentist',
        content: input.trim(),
        likeCount: 0,
        postedAt: new Date().toISOString(),
        isLiked: false,
      }
      setComments((prev) => [newComment, ...prev])
      setInput('')
      setSubmitting(false)
    }, 400)
  }

  return (
    <div className="border-t border-gray-100 pt-3 mt-1">
      {/* Add comment */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-linear-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
          田
        </div>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="コメントを追加..."
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim() || submitting}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 text-white text-xs font-semibold rounded-full transition-colors"
          >
            {submitting ? '送信中' : '送信'}
          </button>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
              {comment.author.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="text-xs font-semibold text-gray-900">{comment.author}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${PROFESSION_COLORS[comment.profession]}`}>
                  {PROFESSION_LABELS[comment.profession]}
                </span>
                <span className="text-xs text-gray-400">{formatDate(comment.postedAt)}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <button
                  type="button"
                  onClick={() => toggleLike(comment.id)}
                  className={[
                    'flex items-center gap-1 text-xs font-medium transition-colors',
                    comment.isLiked ? 'text-rose-500' : 'text-gray-400 hover:text-rose-400',
                  ].join(' ')}
                >
                  <svg className="w-3.5 h-3.5" fill={comment.isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  <span>{comment.likeCount}</span>
                </button>
                <button type="button" className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium">
                  返信
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {initialCount > comments.length && (
        <button
          type="button"
          className="mt-3 text-xs text-cyan-600 hover:text-cyan-700 font-medium"
        >
          残り{initialCount - comments.length}件のコメントを表示
        </button>
      )}
    </div>
  )
}
