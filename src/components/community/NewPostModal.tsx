'use client'

import { useState } from 'react'
import { communityTopics, type CommunityTopic } from '@/lib/mock-data/community'

const TOPIC_OPTIONS = communityTopics.filter((t) => t !== 'すべて') as CommunityTopic[]
const MAX_CHARS = 1000

export default function NewPostModal() {
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState<string>('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleOpen() {
    setOpen(true)
    setSubmitted(false)
  }

  function handleClose() {
    setOpen(false)
    setTopic('')
    setContent('')
    setSubmitted(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!topic || !content.trim()) return
    setSubmitting(true)
    // Simulate async submit
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => handleClose(), 1500)
    }, 800)
  }

  const remaining = MAX_CHARS - content.length
  const isOverLimit = remaining < 0

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={handleOpen}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white font-semibold text-sm px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="新しい投稿を作成"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>新しい投稿</span>
      </button>

      {/* Backdrop + modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-post-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 id="new-post-title" className="text-lg font-semibold text-gray-900">
                新しい投稿を作成
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="閉じる"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 text-3xl">
                    ✓
                  </div>
                  <p className="text-lg font-semibold text-gray-900">投稿しました！</p>
                  <p className="text-sm text-gray-500">コミュニティに投稿が公開されました。</p>
                </div>
              ) : (
                <form id="new-post-form" onSubmit={handleSubmit} className="space-y-5">
                  {/* Topic select */}
                  <div>
                    <label
                      htmlFor="post-topic"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      トピック <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="post-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                    >
                      <option value="" disabled>
                        トピックを選択してください
                      </option>
                      {TOPIC_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Content textarea */}
                  <div>
                    <label
                      htmlFor="post-content"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      内容 <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="post-content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      rows={7}
                      maxLength={MAX_CHARS}
                      placeholder="歯科コミュニティのみんなに伝えたいことを書いてみましょう..."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                    />
                    <div className="flex justify-end mt-1">
                      <span
                        className={`text-xs font-medium ${
                          isOverLimit
                            ? 'text-rose-500'
                            : remaining <= 100
                            ? 'text-amber-500'
                            : 'text-gray-400'
                        }`}
                      >
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
                  disabled={submitting || !topic || !content.trim() || isOverLimit}
                  className="px-6 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  {submitting ? '投稿中…' : '投稿する'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
