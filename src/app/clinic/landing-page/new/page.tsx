'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TEMPLATES } from '@/lib/templates/landing-page-templates'
import type { TemplateId } from '@/lib/types/landing-page'

export default function NewLandingPagePage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(null)
  const [title, setTitle] = useState('')

  function handleCreate() {
    if (!selectedTemplate || !title.trim()) return
    // In production: POST to API. For mock, navigate to edit with lp1.
    router.push(`/clinic/landing-page/lp1/edit`)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/clinic/landing-page" className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">新しい採用LPを作成</h1>
          <p className="text-sm text-gray-500 mt-0.5">テンプレートを選択してカスタマイズしましょう</p>
        </div>
      </div>

      {/* Step 1: LP title */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">ステップ 1：LPタイトル（管理用）</h2>
        <p className="text-xs text-gray-500 mb-4">公開ページには表示されません。管理画面でのみ使用します。</p>
        <input
          type="text"
          placeholder="例: スマイル歯科 春の採用LP 2026"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Step 2: Template selection */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">ステップ 2：テンプレートを選択</h2>
        <p className="text-xs text-gray-500 mb-5">後からでも変更できます。選択後にすべてのテキスト・内容を自由に編集できます。</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className={[
                'text-left rounded-2xl border-2 overflow-hidden transition-all hover:shadow-md',
                selectedTemplate === t.id
                  ? 'border-cyan-500 shadow-md ring-2 ring-cyan-200'
                  : 'border-gray-200 hover:border-gray-300',
              ].join(' ')}
            >
              {/* Template preview gradient */}
              <div
                className="h-28 flex flex-col items-center justify-center gap-2 relative"
                style={{ background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})` }}
              >
                {t.recommended && (
                  <span className="absolute top-2 right-2 bg-white/90 text-xs font-bold text-cyan-700 px-2 py-0.5 rounded-full">
                    おすすめ
                  </span>
                )}
                {/* Fake LP elements */}
                <div className="w-24 h-2 bg-white/30 rounded-full" />
                <div className="w-16 h-1.5 bg-white/20 rounded-full" />
                <div className="w-10 h-5 bg-white/20 rounded-full" />
              </div>

              {/* Template info */}
              <div className="p-4 bg-white">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-900 text-sm">{t.nameJa}</h3>
                  {selectedTemplate === t.id && (
                    <svg className="w-4 h-4 text-cyan-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-2">{t.tagline}</p>
                <div className="flex flex-wrap gap-1">
                  {t.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between">
        <Link href="/clinic/landing-page" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          キャンセル
        </Link>
        <button
          onClick={handleCreate}
          disabled={!selectedTemplate || !title.trim()}
          className={[
            'flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl transition-all',
            selectedTemplate && title.trim()
              ? 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-sm hover:shadow'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed',
          ].join(' ')}
        >
          エディタで編集を開始
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}
