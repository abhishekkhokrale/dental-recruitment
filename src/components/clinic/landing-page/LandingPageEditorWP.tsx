'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import type {
  LandingPage,
  LandingPageContent,
  SectionConfig,
  SectionId,
  PositionItem,
  BenefitItem,
  FaqItem,
} from '@/lib/types/landing-page'
import { SECTION_LABELS, DEFAULT_SECTIONS } from '@/lib/templates/landing-page-templates'
import TemplateRenderer from '@/components/templates/TemplateRenderer'

type Device = 'desktop' | 'tablet' | 'mobile'
type LeftPanel = 'blocks' | 'design' | 'settings'

interface EditorState {
  content: LandingPageContent
  sections: SectionConfig[]
  themeColor: string | undefined
}


const PRESET_COLORS = [
  { label: 'シアン', value: '#2ca9e1' },
  { label: 'ネイビー', value: '#1e3a8a' },
  { label: 'エメラルド', value: '#059669' },
  { label: 'バイオレット', value: '#7c3aed' },
  { label: 'ローズ', value: '#e11d48' },
  { label: 'オレンジ', value: '#ea580c' },
  { label: 'ゴールド', value: '#d97706' },
  { label: 'スレート', value: '#475569' },
]

function genId() {
  return Math.random().toString(36).slice(2, 9)
}

/* ─── Section Overlay Wrapper ─── */
function SectionOverlay({
  id,
  isActive,
  onClick,
  children,
}: {
  id: SectionId
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <div
      id={`wp-section-${id}`}
      className="relative group cursor-pointer"
      onClick={(e) => { e.stopPropagation(); onClick() }}
    >
      {/* Content – non-interactive so clicks bubble to wrapper */}
      <div className="pointer-events-none select-none">{children}</div>

      {/* Hover/active outline */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-150"
        style={{
          outline: isActive
            ? '2px solid #2ca9e1'
            : undefined,
          boxShadow: isActive ? 'inset 0 0 0 2px #2ca9e1' : undefined,
        }}
      >
        {/* Section label chip */}
        <div className={[
          'absolute top-0 left-0 z-20 transition-opacity duration-100',
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        ].join(' ')}>
          <span className="inline-flex items-center gap-1.5 bg-cyan-500 text-white text-xs font-bold px-3 py-1.5 shadow-md">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
            </svg>
            {SECTION_LABELS[id]}
          </span>
        </div>
        {/* Click hint */}
        {!isActive && (
          <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-150" />
        )}
      </div>
    </div>
  )
}

/* ─── Main Editor Component ─── */
export default function LandingPageEditorWP({ landingPage }: { landingPage: LandingPage }) {
  const storageKey = `clinic-lp-${landingPage.id}`
  const relativeUrl = `/clinics/${landingPage.clinicSlug}`

  // Server-safe initial state — localStorage is loaded after mount via useEffect
  const [state, setState] = useState<EditorState>({
    content: landingPage.content,
    sections: landingPage.sections ?? DEFAULT_SECTIONS,
    themeColor: landingPage.themeColor,
  })

  const [activeSection, setActiveSection] = useState<SectionId | null>('hero')
  const [leftPanel, setLeftPanel] = useState<LeftPanel>('blocks')
  const [device, setDevice] = useState<Device>('desktop')
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [isPublished, setIsPublished] = useState(landingPage.status === 'published')
  const [urlCopied, setUrlCopied] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [iframeVersion, setIframeVersion] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)

  // Load saved draft from localStorage after mount (avoids hydration mismatch)
  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try { setState(JSON.parse(saved) as EditorState) } catch {}
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Auto-save */
  useEffect(() => {
    if (saveStatus !== 'unsaved') return
    setSaveStatus('saving')
    const t = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(state))
      setSaveStatus('saved')
      setIframeVersion((v) => v + 1)
    }, 600)
    return () => clearTimeout(t)
  }, [state, storageKey, saveStatus])

  /* Scroll preview to active section */
  useEffect(() => {
    if (!activeSection || !previewRef.current) return
    const el = previewRef.current.querySelector(`#wp-section-${activeSection}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [activeSection])

  const updateContent = useCallback((updates: Partial<LandingPageContent>) => {
    setState((p) => ({ ...p, content: { ...p.content, ...updates } }))
    setSaveStatus('unsaved')
  }, [])

  const updateSections = useCallback((sections: SectionConfig[]) => {
    setState((p) => ({ ...p, sections }))
    setSaveStatus('unsaved')
  }, [])

  const updateTheme = useCallback((themeColor: string | undefined) => {
    setState((p) => ({ ...p, themeColor }))
    setSaveStatus('unsaved')
  }, [])

  function handlePublish() {
    localStorage.setItem(storageKey, JSON.stringify(state))
    setSaveStatus('saved')
    setIsPublished(true)
  }

  function copyUrl() {
    navigator.clipboard.writeText(`${window.location.origin}${relativeUrl}`)
    setUrlCopied(true)
    setTimeout(() => setUrlCopied(false), 2000)
  }

  /* wrapSection callback for the live preview */
  const wrapSection = useCallback(
    (id: SectionId, children: React.ReactNode) => (
      <SectionOverlay
        key={id}
        id={id}
        isActive={activeSection === id}
        onClick={() => { setActiveSection(id); setLeftPanel('blocks') }}
      >
        {children}
      </SectionOverlay>
    ),
    [activeSection],
  )

  const sortedSections = [...state.sections].sort((a, b) => a.order - b.order)

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="h-12 bg-gray-900 text-white flex items-center px-4 gap-3 shrink-0 z-30">
        {/* Sidebar toggle */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded"
          title="サイドバーを開閉"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        </button>

        {/* WP logo-like icon */}
        <div className="w-7 h-7 rounded bg-cyan-500 flex items-center justify-center shrink-0 text-sm">🦷</div>

        <div className="text-sm font-medium text-gray-200 truncate max-w-48">{landingPage.title}</div>

        {/* Device preview toggle */}
        <div className="flex items-center bg-gray-800 rounded-lg p-0.5 mx-auto">
          {(['desktop', 'tablet', 'mobile'] as Device[]).map((d) => (
            <button
              key={d}
              onClick={() => setDevice(d)}
              title={d === 'desktop' ? 'デスクトップ' : d === 'tablet' ? 'タブレット' : 'モバイル'}
              className={[
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                device === d ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-white',
              ].join(' ')}
            >
              {d === 'desktop' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" /></svg>
              ) : d === 'tablet' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className={[
            'text-xs',
            saveStatus === 'saved' ? 'text-green-400' : saveStatus === 'saving' ? 'text-gray-500' : 'text-yellow-400',
          ].join(' ')}>
            {saveStatus === 'saved' ? '✓ 保存済み' : saveStatus === 'saving' ? '保存中...' : '●'}
          </span>

          <Link
            href="/clinic/landing-page"
            className="text-xs text-gray-400 hover:text-white px-2 py-1.5 rounded transition-colors"
          >
            一覧へ
          </Link>

          <Link
            href={`/clinic/landing-page/${landingPage.id}/preview`}
            target="_blank"
            className="flex items-center gap-1 text-xs text-gray-300 bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            全画面プレビュー
          </Link>

          <button
            onClick={handlePublish}
            className={[
              'text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors',
              isPublished
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-cyan-500 text-white hover:bg-cyan-400',
            ].join(' ')}
          >
            {isPublished ? '✓ 公開中' : '公開する'}
          </button>
        </div>
      </header>

      {/* Published URL banner */}
      {isPublished && (
        <div className="bg-green-900 border-b border-green-700 px-4 py-2 flex items-center gap-3 shrink-0">
          <span className="text-green-300 text-xs font-semibold">🌐 公開URL</span>
          <Link
            href={`/clinics/${landingPage.clinicSlug}`}
            target="_blank"
            className="text-green-200 text-xs font-mono hover:text-white transition-colors flex-1 truncate"
          >
            {relativeUrl}
          </Link>
          <button
            onClick={copyUrl}
            className="text-xs text-green-300 hover:text-white bg-green-800 hover:bg-green-700 px-3 py-1 rounded transition-colors shrink-0"
          >
            {urlCopied ? '✓ コピー済み' : 'URLをコピー'}
          </button>
        </div>
      )}

      {/* ── Body: Sidebar + Preview ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left Sidebar ── */}
        <aside
          className={[
            'bg-white border-r border-gray-200 flex flex-col shrink-0 transition-all duration-200 overflow-hidden z-20',
            sidebarOpen ? 'w-80' : 'w-0',
          ].join(' ')}
        >
          {/* Panel tabs */}
          <div className="flex border-b border-gray-200 shrink-0">
            {([
              { id: 'blocks' as LeftPanel,   icon: '☰', label: 'ブロック' },
              { id: 'design' as LeftPanel,   icon: '🎨', label: 'デザイン' },
              { id: 'settings' as LeftPanel, icon: '⚙', label: '設定' },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLeftPanel(tab.id)}
                className={[
                  'flex-1 flex flex-col items-center py-2.5 text-xs font-medium gap-0.5 transition-colors border-b-2',
                  leftPanel === tab.id
                    ? 'border-cyan-500 text-cyan-700 bg-cyan-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                ].join(' ')}
              >
                <span className="text-sm">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto">

            {/* ── Blocks Panel ── */}
            {leftPanel === 'blocks' && (
              activeSection ? (
                /* ── Section Edit View ── */
                <div key={activeSection}>
                  {/* Header with back button */}
                  <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-100 bg-gray-50 shrink-0">
                    <button
                      onClick={() => setActiveSection(null)}
                      className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
                      title="セクション一覧に戻る"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                      <span className="text-sm font-semibold text-gray-800 truncate">{SECTION_LABELS[activeSection]}</span>
                    </div>
                    {/* Prev / Next section */}
                    <div className="flex gap-1 ml-auto shrink-0">
                      {(() => {
                        const idx = sortedSections.findIndex((s) => s.id === activeSection)
                        const prev = sortedSections[idx - 1]
                        const next = sortedSections[idx + 1]
                        return (
                          <>
                            <button
                              onClick={() => prev && setActiveSection(prev.id)}
                              disabled={!prev}
                              title="前のセクション"
                              className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 disabled:opacity-25 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>
                            </button>
                            <button
                              onClick={() => next && setActiveSection(next.id)}
                              disabled={!next}
                              title="次のセクション"
                              className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 disabled:opacity-25 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                            </button>
                          </>
                        )
                      })()}
                    </div>
                  </div>
                  {/* Form body */}
                  <div className="p-4">
                    <SectionForm
                      sectionId={activeSection}
                      content={state.content}
                      onChange={updateContent}
                    />
                  </div>
                </div>
              ) : (
                /* ── Section List View ── */
                <div>
                  <div className="px-3 pt-3 pb-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">セクション一覧</p>
                    <p className="text-xs text-gray-400 mt-0.5">クリックして編集</p>
                  </div>
                  <div className="p-2 space-y-0.5">
                    {sortedSections.map((sec, idx) => (
                      <div
                        key={sec.id}
                        className={[
                          'flex items-center gap-2 px-2 py-2.5 rounded-lg cursor-pointer transition-colors group',
                          !sec.enabled ? 'opacity-40' : 'hover:bg-gray-50',
                        ].join(' ')}
                        onClick={() => setActiveSection(sec.id)}
                      >
                        {/* Reorder arrows */}
                        <div className="flex flex-col gap-px shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); moveSection(idx, -1, state.sections, updateSections) }}
                            disabled={idx === 0}
                            className="w-4 h-3.5 flex items-center justify-center text-gray-300 hover:text-gray-600 disabled:opacity-20"
                          >
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); moveSection(idx, 1, state.sections, updateSections) }}
                            disabled={idx === sortedSections.length - 1}
                            className="w-4 h-3.5 flex items-center justify-center text-gray-300 hover:text-gray-600 disabled:opacity-20"
                          >
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                          </button>
                        </div>

                        {/* Section name + edit chevron */}
                        <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-cyan-700 transition-colors">{SECTION_LABELS[sec.id]}</span>
                        <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-cyan-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>

                        {/* Eye toggle */}
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleSection(sec.id, state.sections, updateSections) }}
                          className={[
                            'p-1 rounded transition-colors shrink-0',
                            sec.enabled ? 'text-gray-400 hover:text-gray-700' : 'text-gray-300 hover:text-gray-500',
                          ].join(' ')}
                          title={sec.enabled ? '非表示にする' : '表示する'}
                        >
                          {sec.enabled ? (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                          ) : (
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* ── Design Panel ── */}
            {leftPanel === 'design' && (
              <div className="p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">テーマカラー</p>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="color"
                    className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 p-0.5"
                    value={state.themeColor ?? '#2ca9e1'}
                    onChange={(e) => updateTheme(e.target.value)}
                  />
                  <input
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    value={state.themeColor ?? ''}
                    placeholder="#2ca9e1"
                    onChange={(e) => updateTheme(e.target.value || undefined)}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => updateTheme(c.value)}
                      title={c.label}
                      className={[
                        'h-9 rounded-lg border-2 transition-all hover:scale-105',
                        state.themeColor === c.value ? 'border-gray-900 scale-110' : 'border-transparent',
                      ].join(' ')}
                      style={{ background: c.value }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {PRESET_COLORS.map((c) => (
                    <p key={c.value} className="text-center text-xs text-gray-400 truncate">{c.label}</p>
                  ))}
                </div>
                {state.themeColor && (
                  <button onClick={() => updateTheme(undefined)} className="text-xs text-gray-400 hover:text-gray-600 underline">
                    デフォルトに戻す
                  </button>
                )}
              </div>
            )}

            {/* ── Settings Panel (SEO) ── */}
            {leftPanel === 'settings' && (
              <div className="p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">SEO設定</p>
                <FormField label="ページタイトル" hint="60文字以内推奨">
                  <input
                    className={inputCls}
                    value={state.content.seo.metaTitle}
                    onChange={(e) => updateContent({ seo: { ...state.content.seo, metaTitle: e.target.value } })}
                  />
                  <p className="text-xs text-gray-400 mt-1">{state.content.seo.metaTitle.length} 文字</p>
                </FormField>
                <FormField label="ページ説明文" hint="120〜160文字推奨">
                  <textarea
                    className={textareaCls}
                    rows={4}
                    value={state.content.seo.metaDescription}
                    onChange={(e) => updateContent({ seo: { ...state.content.seo, metaDescription: e.target.value } })}
                  />
                  <p className="text-xs text-gray-400 mt-1">{state.content.seo.metaDescription.length} 文字</p>
                </FormField>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">公開設定</p>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">ステータス</span>
                      <span className={isPublished ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                        {isPublished ? '公開中' : '下書き'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">公式クリニックページ</span>
                      <span className={landingPage.isClinicPage ? 'text-cyan-600 font-semibold' : 'text-gray-400'}>
                        {landingPage.isClinicPage ? '設定済み' : '未設定'}
                      </span>
                    </div>
                    {isPublished && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">公開URL</p>
                        <div className="flex items-center gap-2">
                          <code className="text-xs text-cyan-600 flex-1 truncate font-mono bg-white px-2 py-1 rounded border border-gray-200">
                            /clinics/{landingPage.clinicSlug}
                          </code>
                          <button onClick={copyUrl} className="text-xs text-gray-500 hover:text-gray-700 shrink-0">
                            {urlCopied ? '✓' : 'コピー'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ── Live Preview Area ── */}
        <main className="flex-1 overflow-auto bg-gray-200 flex flex-col items-center" ref={previewRef}>
          {/* Device label pill */}
          <div className="w-full flex justify-center py-3 shrink-0">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-sm text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              {device === 'desktop' ? 'デスクトップ表示' : device === 'tablet' ? 'タブレット (768px)' : 'モバイル (390px)'}
              {device === 'desktop' && (
                <>
                  <span className="text-gray-300 mx-1">|</span>
                  <span className="text-cyan-600">クリックしてセクションを選択</span>
                </>
              )}
            </div>
          </div>

          {device === 'desktop' ? (
            /* Desktop — direct live render with click-to-select */
            <div className="bg-white shadow-2xl w-full mb-8" onClick={() => setActiveSection(null)}>
              <TemplateRenderer
                templateId={landingPage.templateId}
                content={state.content}
                sections={state.sections}
                themeColor={state.themeColor}
                wrapSection={wrapSection}
              />
            </div>
          ) : (
            /* Tablet / Mobile — iframe so viewport-based responsive CSS fires correctly */
            <div
              className="bg-white shadow-2xl mb-8 shrink-0"
              style={{ width: device === 'tablet' ? 768 : 390 }}
            >
              <iframe
                key={`${device}-${iframeVersion}`}
                src={`/clinic/landing-page/${landingPage.id}/preview?silent=1`}
                style={{ display: 'block', border: 'none', width: '100%', height: 'calc(100vh - 160px)' }}
                title={device === 'tablet' ? 'タブレットプレビュー' : 'モバイルプレビュー'}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

/* ─── Helper functions ─── */

function moveSection(idx: number, dir: -1 | 1, sections: SectionConfig[], onChange: (s: SectionConfig[]) => void) {
  const sorted = [...sections].sort((a, b) => a.order - b.order)
  const target = idx + dir
  if (target < 0 || target >= sorted.length) return
  const tmp = sorted[target].order
  sorted[target] = { ...sorted[target], order: sorted[idx].order }
  sorted[idx] = { ...sorted[idx], order: tmp }
  onChange(sorted)
}

function toggleSection(id: SectionId, sections: SectionConfig[], onChange: (s: SectionConfig[]) => void) {
  onChange(sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
}

/* ─── Shared Form UI ─── */

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors bg-white'
const textareaCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors resize-none bg-white'

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {children}
    </div>
  )
}

function ImageUploadField({ label, value, onChange, hint }: {
  label: string; value?: string; onChange: (v: string | undefined) => void; hint?: string
}) {
  const ref = useRef<HTMLInputElement>(null)
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange(ev.target?.result as string)
    reader.readAsDataURL(file)
  }
  return (
    <FormField label={label} hint={hint}>
      {value ? (
        <div className="relative">
          <img src={value} alt="" className="w-full h-24 object-cover rounded-lg border border-gray-200" />
          <button onClick={() => onChange(undefined)} className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded hover:bg-red-600">削除</button>
        </div>
      ) : (
        <div onClick={() => ref.current?.click()} className="w-full h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-cyan-400 hover:bg-cyan-50 transition-colors">
          <span className="text-xs text-gray-400">📷 画像を選択またはURLを入力</span>
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {!value && (
        <input className={inputCls + ' mt-1'} placeholder="https://..." onChange={(e) => e.target.value && onChange(e.target.value)} />
      )}
    </FormField>
  )
}

/* ─── Section Form Router ─── */

function SectionForm({ sectionId, content, onChange }: {
  sectionId: SectionId
  content: LandingPageContent
  onChange: (u: Partial<LandingPageContent>) => void
}) {
  switch (sectionId) {
    case 'hero':       return <HeroForm       value={content.hero}          onChange={(hero) => onChange({ hero })} />
    case 'clinic':     return <ClinicForm     value={content.clinicIntro}   onChange={(clinicIntro) => onChange({ clinicIntro })} />
    case 'positions':  return <PositionsForm  value={content.positions}     onChange={(positions) => onChange({ positions })} />
    case 'benefits':   return <BenefitsForm   value={content.benefits}      onChange={(benefits) => onChange({ benefits })} />
    case 'conditions': return <ConditionsForm value={content.workConditions} onChange={(workConditions) => onChange({ workConditions })} />
    case 'faq':        return <FaqForm        value={content.faq}           onChange={(faq) => onChange({ faq })} />
    case 'contact':    return <ContactForm    value={content.contact}       onChange={(contact) => onChange({ contact })} />
    default: return null
  }
}

function HeroForm({ value, onChange }: { value: LandingPageContent['hero']; onChange: (v: LandingPageContent['hero']) => void }) {
  return (
    <div>
      <ImageUploadField label="背景画像（任意）" value={value.heroImage} onChange={(heroImage) => onChange({ ...value, heroImage: heroImage ?? undefined })} hint="グラデーションに重ねて表示されます" />
      <FormField label="バッジテキスト"><input className={inputCls} value={value.badgeText} onChange={(e) => onChange({ ...value, badgeText: e.target.value })} /></FormField>
      <FormField label="見出し（キャッチコピー）"><textarea className={textareaCls} rows={2} value={value.heading} onChange={(e) => onChange({ ...value, heading: e.target.value })} /></FormField>
      <FormField label="サブテキスト"><textarea className={textareaCls} rows={3} value={value.subheading} onChange={(e) => onChange({ ...value, subheading: e.target.value })} /></FormField>
      <FormField label="ボタンテキスト"><input className={inputCls} value={value.ctaText} onChange={(e) => onChange({ ...value, ctaText: e.target.value })} /></FormField>
    </div>
  )
}

function ClinicForm({ value, onChange }: { value: LandingPageContent['clinicIntro']; onChange: (v: LandingPageContent['clinicIntro']) => void }) {
  const imgRef = useRef<HTMLInputElement>(null)
  function addImg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange({ ...value, clinicImages: [...(value.clinicImages ?? []), ev.target?.result as string] })
    reader.readAsDataURL(file)
  }
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <FormField label="クリニック名"><input className={inputCls} value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} /></FormField>
        <FormField label="スタッフ数"><input className={inputCls} value={value.staffCount} onChange={(e) => onChange({ ...value, staffCount: e.target.value })} /></FormField>
        <FormField label="創業年"><input className={inputCls} value={value.foundedYear} onChange={(e) => onChange({ ...value, foundedYear: e.target.value })} /></FormField>
        <FormField label="院長名"><input className={inputCls} value={value.directorName} onChange={(e) => onChange({ ...value, directorName: e.target.value })} /></FormField>
      </div>
      <FormField label="キャッチフレーズ"><input className={inputCls} value={value.tagline} onChange={(e) => onChange({ ...value, tagline: e.target.value })} /></FormField>
      <FormField label="クリニック概要"><textarea className={textareaCls} rows={3} value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} /></FormField>
      <FormField label="院長メッセージ"><textarea className={textareaCls} rows={3} value={value.directorMessage} onChange={(e) => onChange({ ...value, directorMessage: e.target.value })} /></FormField>
      {/* Gallery */}
      <div className="mt-1">
        <p className="text-xs font-semibold text-gray-600 mb-2">写真ギャラリー</p>
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {(value.clinicImages ?? []).map((img, i) => (
            <div key={i} className="relative">
              <img src={img} alt="" className="w-full h-16 object-cover rounded border border-gray-200" />
              <button onClick={() => { const imgs = [...(value.clinicImages ?? [])]; imgs.splice(i, 1); onChange({ ...value, clinicImages: imgs }) }} className="absolute top-0.5 right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">×</button>
            </div>
          ))}
          <button onClick={() => imgRef.current?.click()} className="h-16 border-2 border-dashed border-gray-200 rounded flex items-center justify-center text-xs text-gray-400 hover:border-cyan-400 hover:text-cyan-500 transition-colors">+ 追加</button>
        </div>
        <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={addImg} />
      </div>
    </div>
  )
}

function PositionsForm({ value, onChange }: { value: PositionItem[]; onChange: (v: PositionItem[]) => void }) {
  const add = () => onChange([...value, { id: genId(), title: '新しい職種', jobType: '歯科衛生士', employmentType: '正社員', salaryText: '月給 XX万円〜', description: '', highlights: [] }])
  const remove = (id: string) => onChange(value.filter((p) => p.id !== id))
  const update = (id: string, u: Partial<PositionItem>) => onChange(value.map((p) => p.id === id ? { ...p, ...u } : p))
  return (
    <div>
      {value.map((pos, idx) => (
        <div key={pos.id} className="border border-gray-200 rounded-xl p-3 mb-3 bg-gray-50">
          <div className="flex justify-between mb-2"><span className="text-xs font-bold text-gray-500">職種 {idx + 1}</span><button onClick={() => remove(pos.id)} className="text-xs text-red-400 hover:text-red-600">削除</button></div>
          <div className="grid grid-cols-2 gap-2">
            <FormField label="職種名"><input className={inputCls} value={pos.title} onChange={(e) => update(pos.id, { title: e.target.value })} /></FormField>
            <FormField label="雇用形態">
              <select className={inputCls} value={pos.employmentType} onChange={(e) => update(pos.id, { employmentType: e.target.value })}>
                {['正社員', 'パート・アルバイト', '契約社員', '派遣社員'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="給与"><input className={inputCls} value={pos.salaryText} onChange={(e) => update(pos.id, { salaryText: e.target.value })} /></FormField>
          <FormField label="仕事内容"><textarea className={textareaCls} rows={2} value={pos.description} onChange={(e) => update(pos.id, { description: e.target.value })} /></FormField>
          <FormField label="アピールポイント（カンマ区切り）"><input className={inputCls} value={pos.highlights.join(', ')} onChange={(e) => update(pos.id, { highlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} /></FormField>
        </div>
      ))}
      <button onClick={add} className="w-full border-2 border-dashed border-gray-200 text-gray-400 text-sm py-2.5 rounded-xl hover:border-cyan-400 hover:text-cyan-500 transition-colors">+ 職種を追加</button>
    </div>
  )
}

function BenefitsForm({ value, onChange }: { value: BenefitItem[]; onChange: (v: BenefitItem[]) => void }) {
  const add = () => onChange([...value, { id: genId(), icon: '⭐', title: '', description: '' }])
  const remove = (id: string) => onChange(value.filter((b) => b.id !== id))
  const update = (id: string, u: Partial<BenefitItem>) => onChange(value.map((b) => b.id === id ? { ...b, ...u } : b))
  return (
    <div>
      {value.map((b) => (
        <div key={b.id} className="border border-gray-200 rounded-xl p-3 mb-2 bg-gray-50">
          <div className="flex items-start gap-2">
            <div className="w-14 shrink-0"><label className="text-xs text-gray-500 block mb-1">絵文字</label><input className={inputCls + ' text-center text-base'} value={b.icon} onChange={(e) => update(b.id, { icon: e.target.value })} /></div>
            <div className="flex-1"><label className="text-xs text-gray-500 block mb-1">タイトル</label><input className={inputCls} value={b.title} onChange={(e) => update(b.id, { title: e.target.value })} /></div>
            <button onClick={() => remove(b.id)} className="text-xs text-red-400 mt-5 shrink-0">削除</button>
          </div>
          <div className="mt-2"><label className="text-xs text-gray-500 block mb-1">説明</label><input className={inputCls} value={b.description} onChange={(e) => update(b.id, { description: e.target.value })} /></div>
        </div>
      ))}
      <button onClick={add} className="w-full border-2 border-dashed border-gray-200 text-gray-400 text-sm py-2.5 rounded-xl hover:border-cyan-400 hover:text-cyan-500 transition-colors">+ 追加</button>
    </div>
  )
}

function ConditionsForm({ value, onChange }: { value: LandingPageContent['workConditions']; onChange: (v: LandingPageContent['workConditions']) => void }) {
  return (
    <div>
      <FormField label="勤務時間"><input className={inputCls} value={value.hours} onChange={(e) => onChange({ ...value, hours: e.target.value })} /></FormField>
      <FormField label="休日・休暇"><input className={inputCls} value={value.holidays} onChange={(e) => onChange({ ...value, holidays: e.target.value })} /></FormField>
      <FormField label="研修・教育制度"><input className={inputCls} value={value.training} onChange={(e) => onChange({ ...value, training: e.target.value })} /></FormField>
      <FormField label="職場環境"><input className={inputCls} value={value.environment} onChange={(e) => onChange({ ...value, environment: e.target.value })} /></FormField>
    </div>
  )
}

function FaqForm({ value, onChange }: { value: FaqItem[]; onChange: (v: FaqItem[]) => void }) {
  const add = () => onChange([...value, { id: genId(), question: '', answer: '' }])
  const remove = (id: string) => onChange(value.filter((f) => f.id !== id))
  const update = (id: string, u: Partial<FaqItem>) => onChange(value.map((f) => f.id === id ? { ...f, ...u } : f))
  return (
    <div>
      {value.map((item, idx) => (
        <div key={item.id} className="border border-gray-200 rounded-xl p-3 mb-2 bg-gray-50">
          <div className="flex justify-between mb-2"><span className="text-xs font-bold text-gray-500">Q{idx + 1}</span><button onClick={() => remove(item.id)} className="text-xs text-red-400">削除</button></div>
          <FormField label="質問"><input className={inputCls} value={item.question} onChange={(e) => update(item.id, { question: e.target.value })} /></FormField>
          <FormField label="回答"><textarea className={textareaCls} rows={3} value={item.answer} onChange={(e) => update(item.id, { answer: e.target.value })} /></FormField>
        </div>
      ))}
      <button onClick={add} className="w-full border-2 border-dashed border-gray-200 text-gray-400 text-sm py-2.5 rounded-xl hover:border-cyan-400 hover:text-cyan-500 transition-colors">+ 質問を追加</button>
    </div>
  )
}

function ContactForm({ value, onChange }: { value: LandingPageContent['contact']; onChange: (v: LandingPageContent['contact']) => void }) {
  return (
    <div>
      <FormField label="住所"><input className={inputCls} value={value.address} onChange={(e) => onChange({ ...value, address: e.target.value })} /></FormField>
      <FormField label="電話番号"><input className={inputCls} value={value.phone} onChange={(e) => onChange({ ...value, phone: e.target.value })} /></FormField>
      <FormField label="メール"><input className={inputCls} type="email" value={value.email} onChange={(e) => onChange({ ...value, email: e.target.value })} /></FormField>
      <FormField label="応募に関するメモ"><textarea className={textareaCls} rows={3} value={value.applicationNote} onChange={(e) => onChange({ ...value, applicationNote: e.target.value })} /></FormField>
    </div>
  )
}
