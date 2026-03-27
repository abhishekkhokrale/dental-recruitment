'use client'

import { useEffect } from 'react'
import { useState } from 'react'
import { communityTopics, type CommunityTopic, type ContentType, type CommunityPost, type CommunityAuthor } from '@/lib/mock-data/community'

const TOPIC_OPTIONS = communityTopics.filter((t) => t !== 'すべて') as CommunityTopic[]
const MAX_CHARS = 2000

const CONTENT_TYPES: { value: ContentType; label: string; icon: string; hint: string }[] = [
  { value: 'post', label: '投稿', icon: '✍️', hint: '短い知見や経験をシェアする' },
  { value: 'article', label: '記事', icon: '📚', hint: 'コミュニティへの深掘り記事を書く' },
  { value: 'question', label: '質問', icon: '❓', hint: 'コミュニティに何でも質問する' },
  { value: 'case', label: 'ケース', icon: '🦷', hint: '仲間の意見をもらうために症例を共有する' },
]

interface NewPostModalProps {
  open: boolean
  onClose: () => void
  onNewPost?: (post: CommunityPost) => void
  currentAuthor: CommunityAuthor
}

export default function NewPostModal({ open, onClose, onNewPost, currentAuthor }: NewPostModalProps) {
  const [contentType, setContentType] = useState<ContentType>('post')
  const [topic, setTopic] = useState<string>('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const needsTitle = contentType === 'article' || contentType === 'case'

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setContentType('post')
        setTopic('')
        setTitle('')
        setContent('')
        setSubmitted(false)
      }, 300)
    }
  }, [open])

  function handleClose() {
    onClose()
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!topic || !content.trim()) return
    if (needsTitle && !title.trim()) return
    setSubmitting(true)
    setTimeout(() => {
      const newPost: CommunityPost = {
        id: `post-${Date.now()}`,
        contentType,
        author: currentAuthor,
        title: needsTitle && title.trim() ? title.trim() : undefined,
        content: content.trim(),
        topic,
        tags: [],
        likeCount: 0,
        commentCount: 0,
        savedCount: 0,
        postedAt: new Date().toISOString(),
        isLiked: false,
        isSaved: false,
      }
      onNewPost?.(newPost)
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        handleClose()
      }, 1200)
    }, 600)
  }

  const remaining = MAX_CHARS - content.length
  const isOverLimit = remaining < 0
  const isValid = topic && content.trim() && !isOverLimit && (!needsTitle || title.trim())

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-post-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 id="new-post-title" className="text-lg font-semibold text-gray-900">
            投稿を作成する
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="閉じる"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 text-3xl">✓</div>
              <p className="text-lg font-semibold text-gray-900">投稿しました！</p>
              <p className="text-sm text-gray-500">フィードに表示されます。</p>
            </div>
          ) : (
            <form id="new-post-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Content type selector */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">投稿タイプ</p>
                <div className="grid grid-cols-4 gap-2">
                  {CONTENT_TYPES.map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setContentType(value)}
                      className={[
                        'flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-center transition-all',
                        contentType === value ? 'border-cyan-500 bg-cyan-50' : 'border-gray-200 hover:border-gray-300 bg-white',
                      ].join(' ')}
                    >
                      <span className="text-xl">{icon}</span>
                      <span className={`text-xs font-medium ${contentType === value ? 'text-cyan-700' : 'text-gray-600'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  {CONTENT_TYPES.find((t) => t.value === contentType)?.hint}
                </p>
              </div>

              {/* Title */}
              {needsTitle && (
                <div>
                  <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-1.5">
                    タイトル <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="post-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required={needsTitle}
                    placeholder={contentType === 'case' ? '例：65歳・歯ぎしり患者のフルマウスリハビリ' : '例：マウスピース矯正を断るべき場合'}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  />
                </div>
              )}

              {/* Topic */}
              <div>
                <label htmlFor="post-topic" className="block text-sm font-medium text-gray-700 mb-1.5">
                  トピック <span className="text-rose-500">*</span>
                </label>
                <select
                  id="post-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                >
                  <option value="" disabled>トピックを選択してください</option>
                  {TOPIC_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-1.5">
                  {contentType === 'question' ? '質問内容' : '内容'}{' '}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="post-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  maxLength={MAX_CHARS}
                  placeholder={
                    contentType === 'question'
                      ? '質問の詳細を記入してください...'
                      : contentType === 'case'
                      ? '患者情報・臨床所見・治療計画、そして必要なフィードバックの内容を記入してください...'
                      : '歯科コミュニティのみなさんに知見・経験・考えをシェアしましょう...'
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
                <div className="flex justify-end mt-1">
                  <span className={`text-xs font-medium ${isOverLimit ? 'text-rose-500' : remaining <= 200 ? 'text-amber-500' : 'text-gray-400'}`}>
                    {content.length} / {MAX_CHARS}
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              form="new-post-form"
              disabled={submitting || !isValid}
              className="px-6 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {submitting ? '投稿中…' : '投稿する'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
