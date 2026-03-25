'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getLandingPageById } from '@/lib/mock-data/landing-pages'
import TemplateRenderer from '@/components/templates/TemplateRenderer'
import type { LandingPage, LandingPageContent, SectionConfig } from '@/lib/types/landing-page'

interface EditorState {
  content: LandingPageContent
  sections: SectionConfig[]
  themeColor: string | undefined
}

function PreviewContent() {
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const silent = searchParams.get('silent') === '1'
  const [lp, setLp] = useState<LandingPage | null>(null)
  const [editorState, setEditorState] = useState<EditorState | null>(null)

  useEffect(() => {
    const base = getLandingPageById(id)
    if (!base) return
    setLp(base)

    const storageKey = `clinic-lp-${id}`
    const saved = localStorage.getItem(storageKey)
    if (saved) setEditorState(JSON.parse(saved) as EditorState)

    /* Live-sync: re-render when the editor saves to localStorage (fires across frames) */
    function onStorage(e: StorageEvent) {
      if (e.key === storageKey && e.newValue) {
        try { setEditorState(JSON.parse(e.newValue) as EditorState) } catch {}
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [id])

  if (!lp) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">読み込み中...</div>
  }

  const content = editorState?.content ?? lp.content
  const sections = editorState?.sections ?? lp.sections
  const themeColor = editorState?.themeColor ?? lp.themeColor

  return (
    <div>
      {!silent && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-5 py-2.5 flex items-center justify-between text-sm shadow-lg">
          <div className="flex items-center gap-3">
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">プレビュー</span>
            <span className="text-gray-300 truncate max-w-xs text-xs">{lp.title}</span>
            {themeColor && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-3 h-3 rounded-full border border-gray-600" style={{ background: themeColor }} />
                カスタムカラー適用中
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs">
            <Link href={`/clinic/landing-page/${id}/edit`} className="text-gray-300 hover:text-white transition-colors">
              ← エディタに戻る
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/clinic/landing-page" className="text-gray-300 hover:text-white transition-colors">
              LP一覧
            </Link>
          </div>
        </div>
      )}
      <div className={silent ? '' : 'mt-11'}>
        <TemplateRenderer
          templateId={lp.templateId}
          content={content}
          sections={sections}
          themeColor={themeColor}
        />
      </div>
    </div>
  )
}

export default function PreviewLandingPagePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">読み込み中...</div>}>
      <PreviewContent />
    </React.Suspense>
  )
}
