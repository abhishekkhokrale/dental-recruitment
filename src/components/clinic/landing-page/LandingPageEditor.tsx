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

type EditorTab = 'hero' | 'clinic' | 'positions' | 'benefits' | 'conditions' | 'faq' | 'contact' | 'seo' | 'sections' | 'theme'

const EDITOR_TABS: { id: EditorTab; label: string; icon: string }[] = [
  { id: 'sections',   label: 'セクション管理', icon: '⚙️' },
  { id: 'theme',      label: 'テーマカラー',   icon: '🎨' },
  { id: 'hero',       label: 'ヒーロー',       icon: '🏠' },
  { id: 'clinic',     label: 'クリニック紹介', icon: '🦷' },
  { id: 'positions',  label: '募集職種',       icon: '💼' },
  { id: 'benefits',   label: '福利厚生',       icon: '🎁' },
  { id: 'conditions', label: '勤務条件',       icon: '⏰' },
  { id: 'faq',        label: 'よくある質問',   icon: '💬' },
  { id: 'contact',    label: 'お問い合わせ',   icon: '📞' },
  { id: 'seo',        label: 'SEO設定',        icon: '🔍' },
]

function genId() {
  return Math.random().toString(36).slice(2, 9)
}

interface EditorState {
  content: LandingPageContent
  sections: SectionConfig[]
  themeColor: string | undefined
}

interface Props {
  landingPage: LandingPage
}

export default function LandingPageEditor({ landingPage }: Props) {
  const storageKey = `clinic-lp-${landingPage.id}`
  const publicUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/clinics/${landingPage.clinicSlug}`

  const [state, setState] = useState<EditorState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey)
      if (saved) return JSON.parse(saved) as EditorState
    }
    return {
      content: landingPage.content,
      sections: landingPage.sections ?? DEFAULT_SECTIONS,
      themeColor: landingPage.themeColor,
    }
  })

  const [activeTab, setActiveTab] = useState<EditorTab>('hero')
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [isPublished, setIsPublished] = useState(landingPage.status === 'published')
  const [publishedUrl, setPublishedUrl] = useState(landingPage.status === 'published' ? publicUrl : '')
  const [urlCopied, setUrlCopied] = useState(false)

  const updateContent = useCallback((updates: Partial<LandingPageContent>) => {
    setState((prev) => ({ ...prev, content: { ...prev.content, ...updates } }))
    setSaveStatus('unsaved')
  }, [])

  const updateSections = useCallback((sections: SectionConfig[]) => {
    setState((prev) => ({ ...prev, sections }))
    setSaveStatus('unsaved')
  }, [])

  const updateThemeColor = useCallback((themeColor: string | undefined) => {
    setState((prev) => ({ ...prev, themeColor }))
    setSaveStatus('unsaved')
  }, [])

  // Auto-save
  useEffect(() => {
    if (saveStatus !== 'unsaved') return
    setSaveStatus('saving')
    const t = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(state))
      setSaveStatus('saved')
    }, 800)
    return () => clearTimeout(t)
  }, [state, storageKey, saveStatus])

  function handleSave() {
    localStorage.setItem(storageKey, JSON.stringify(state))
    setSaveStatus('saved')
  }

  function handlePublish() {
    localStorage.setItem(storageKey, JSON.stringify(state))
    setSaveStatus('saved')
    setIsPublished(true)
    setPublishedUrl(publicUrl)
  }

  function handleUnpublish() {
    setIsPublished(false)
    setPublishedUrl('')
  }

  function copyUrl() {
    navigator.clipboard.writeText(publishedUrl)
    setUrlCopied(true)
    setTimeout(() => setUrlCopied(false), 2000)
  }

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <aside className="w-52 bg-white border-r border-gray-200 shrink-0 flex flex-col">
        <div className="px-4 py-4 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">編集項目</p>
        </div>
        <nav className="flex-1 py-2 overflow-y-auto">
          {EDITOR_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-left transition-colors',
                activeTab === tab.id
                  ? 'bg-cyan-50 text-cyan-700 border-r-2 border-cyan-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                (tab.id === 'sections' || tab.id === 'theme') ? 'border-t border-gray-100 first:border-t-0' : '',
              ].join(' ')}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-0.5">テンプレート</p>
          <p className="text-xs font-semibold text-gray-700 capitalize">{landingPage.templateId}</p>
        </div>
      </aside>

      {/* Main editor */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* Toolbar */}
        <div className="h-auto min-h-14 bg-white border-b border-gray-200 flex flex-wrap items-center px-5 gap-3 shrink-0 sticky top-0 z-10 py-2.5">
          <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
            <Link href="/clinic/landing-page" className="hover:text-gray-900 transition-colors text-xs">クリニックLP</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium truncate text-sm">{landingPage.title}</span>
          </div>

          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {/* Save status */}
            <span className={[
              'text-xs font-medium',
              saveStatus === 'saved' ? 'text-green-600' : saveStatus === 'saving' ? 'text-gray-400' : 'text-amber-500',
            ].join(' ')}>
              {saveStatus === 'saved' ? '✓ 保存済み' : saveStatus === 'saving' ? '保存中...' : '未保存'}
            </span>

            <Link
              href={`/clinic/landing-page/${landingPage.id}/preview`}
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              プレビュー
            </Link>

            <button
              onClick={handleSave}
              className="text-xs text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors font-medium"
            >
              下書き保存
            </button>

            {isPublished ? (
              <button
                onClick={handleUnpublish}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-green-100 text-green-700 border border-green-200 hover:bg-green-200 transition-colors"
              >
                ✓ 公開中
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
              >
                公開する
              </button>
            )}
          </div>

          {/* Published URL bar */}
          {isPublished && publishedUrl && (
            <div className="w-full flex items-center gap-2 mt-1 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <span className="text-green-600 text-xs">🌐 公開URL:</span>
              <Link href={`/clinics/${landingPage.clinicSlug}`} target="_blank" className="text-xs text-cyan-600 hover:underline font-mono flex-1 truncate">
                {publishedUrl}
              </Link>
              <button onClick={copyUrl} className="text-xs text-gray-500 hover:text-gray-700 shrink-0">
                {urlCopied ? '✓ コピー済み' : 'コピー'}
              </button>
            </div>
          )}
        </div>

        {/* Form panel */}
        <div className="flex-1 p-6 bg-gray-50">
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            {activeTab === 'sections' && (
              <SectionsPanel
                sections={state.sections}
                onChange={updateSections}
              />
            )}
            {activeTab === 'theme' && (
              <ThemePanel
                themeColor={state.themeColor}
                templateId={landingPage.templateId}
                onChange={updateThemeColor}
              />
            )}
            {activeTab === 'hero' && (
              <HeroForm value={state.content.hero} onChange={(hero) => updateContent({ hero })} />
            )}
            {activeTab === 'clinic' && (
              <ClinicForm value={state.content.clinicIntro} onChange={(clinicIntro) => updateContent({ clinicIntro })} />
            )}
            {activeTab === 'positions' && (
              <PositionsForm value={state.content.positions} onChange={(positions) => updateContent({ positions })} />
            )}
            {activeTab === 'benefits' && (
              <BenefitsForm value={state.content.benefits} onChange={(benefits) => updateContent({ benefits })} />
            )}
            {activeTab === 'conditions' && (
              <ConditionsForm value={state.content.workConditions} onChange={(workConditions) => updateContent({ workConditions })} />
            )}
            {activeTab === 'faq' && (
              <FaqForm value={state.content.faq} onChange={(faq) => updateContent({ faq })} />
            )}
            {activeTab === 'contact' && (
              <ContactForm value={state.content.contact} onChange={(contact) => updateContent({ contact })} />
            )}
            {activeTab === 'seo' && (
              <SeoForm value={state.content.seo} onChange={(seo) => updateContent({ seo })} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Shared UI ─── */

function SectionHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-gray-100">
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      {desc && <p className="text-xs text-gray-500 mt-1">{desc}</p>}
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors'
const textareaCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors resize-none'

/* ─── Sections Panel ─── */

function SectionsPanel({ sections, onChange }: { sections: SectionConfig[]; onChange: (s: SectionConfig[]) => void }) {
  const sorted = [...sections].sort((a, b) => a.order - b.order)

  function toggle(id: SectionId) {
    onChange(sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  function moveUp(idx: number) {
    if (idx === 0) return
    const next = [...sorted]
    const tmp = next[idx - 1].order
    next[idx - 1] = { ...next[idx - 1], order: next[idx].order }
    next[idx] = { ...next[idx], order: tmp }
    onChange(next)
  }

  function moveDown(idx: number) {
    if (idx === sorted.length - 1) return
    const next = [...sorted]
    const tmp = next[idx + 1].order
    next[idx + 1] = { ...next[idx + 1], order: next[idx].order }
    next[idx] = { ...next[idx], order: tmp }
    onChange(next)
  }

  function resetToDefault() {
    onChange(DEFAULT_SECTIONS.map((s) => ({ ...s })))
  }

  return (
    <div>
      <SectionHeader
        title="⚙️ セクション管理"
        desc="各セクションの表示・非表示と順序を管理します。非表示にしたセクションは公開ページに表示されません。"
      />
      <div className="space-y-2">
        {sorted.map((sec, idx) => (
          <div
            key={sec.id}
            className={[
              'flex items-center gap-3 rounded-xl p-3 border transition-colors',
              sec.enabled ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100',
            ].join(' ')}
          >
            {/* Drag handle / order indicator */}
            <span className="text-xs text-gray-400 w-5 text-center font-mono">{idx + 1}</span>

            {/* Up/Down */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              </button>
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === sorted.length - 1}
                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>

            <span className={['flex-1 text-sm font-medium', sec.enabled ? 'text-gray-900' : 'text-gray-400'].join(' ')}>
              {SECTION_LABELS[sec.id] ?? sec.id}
            </span>

            {/* Toggle */}
            <button
              onClick={() => toggle(sec.id)}
              className={[
                'relative w-10 h-5 rounded-full transition-colors shrink-0',
                sec.enabled ? 'bg-cyan-500' : 'bg-gray-300',
              ].join(' ')}
              aria-label={sec.enabled ? 'セクションを非表示' : 'セクションを表示'}
            >
              <span
                className={[
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform',
                  sec.enabled ? 'translate-x-5' : 'translate-x-0.5',
                ].join(' ')}
              />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={resetToDefault}
        className="mt-4 text-xs text-gray-500 hover:text-gray-700 underline"
      >
        デフォルト順に戻す
      </button>
    </div>
  )
}

/* ─── Theme Panel ─── */

const PRESET_COLORS = [
  { label: 'シアン（デフォルト）', value: '#2ca9e1' },
  { label: 'ネイビー', value: '#1e3a8a' },
  { label: 'エメラルド', value: '#059669' },
  { label: 'バイオレット', value: '#7c3aed' },
  { label: 'ローズ', value: '#e11d48' },
  { label: 'オレンジ', value: '#ea580c' },
  { label: 'ゴールド', value: '#d97706' },
  { label: 'スレート', value: '#475569' },
]

function ThemePanel({ themeColor, templateId, onChange }: {
  themeColor: string | undefined
  templateId: string
  onChange: (c: string | undefined) => void
}) {
  return (
    <div>
      <SectionHeader
        title="🎨 テーマカラー"
        desc="テンプレートのプライマリカラーを変更できます。ヒーロー背景、ボタン、アクセントカラーに反映されます。"
      />
      <Field label="カラーピッカー">
        <div className="flex items-center gap-3">
          <input
            type="color"
            className="w-12 h-10 rounded-lg cursor-pointer border border-gray-300"
            value={themeColor ?? '#2ca9e1'}
            onChange={(e) => onChange(e.target.value)}
          />
          <input
            className={inputCls + ' font-mono'}
            value={themeColor ?? ''}
            placeholder="#2ca9e1"
            onChange={(e) => onChange(e.target.value || undefined)}
          />
          {themeColor && (
            <button onClick={() => onChange(undefined)} className="text-xs text-gray-400 hover:text-gray-600 whitespace-nowrap">
              リセット
            </button>
          )}
        </div>
      </Field>

      <Field label="プリセットカラー">
        <div className="grid grid-cols-4 gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c.value}
              title={c.label}
              onClick={() => onChange(c.value)}
              className={[
                'w-full h-10 rounded-lg border-2 transition-all hover:scale-105',
                themeColor === c.value ? 'border-gray-900 scale-105' : 'border-transparent',
              ].join(' ')}
              style={{ background: c.value }}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mt-1">
          {PRESET_COLORS.map((c) => (
            <p key={c.value} className="text-center text-xs text-gray-400 truncate">{c.label}</p>
          ))}
        </div>
      </Field>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-500">
          現在のテンプレート: <span className="font-semibold capitalize text-gray-700">{templateId}</span>
          <br />
          {themeColor ? (
            <span>適用中のカラー: <span className="font-mono font-semibold" style={{ color: themeColor }}>{themeColor}</span></span>
          ) : (
            <span className="text-gray-400">テンプレートのデフォルトカラーを使用中</span>
          )}
        </p>
      </div>
    </div>
  )
}

/* ─── Image Upload Helper ─── */

function ImageUpload({ label, value, onChange, hint }: {
  label: string
  value?: string
  onChange: (url: string | undefined) => void
  hint?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {value ? (
          <div className="relative">
            <img src={value} alt="" className="w-full h-32 object-cover rounded-lg border border-gray-200" />
            <button
              onClick={() => onChange(undefined)}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600 transition-colors"
            >
              削除
            </button>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            className="w-full h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 hover:bg-cyan-50 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p className="text-xs text-gray-500">クリックして画像を選択</p>
            <p className="text-xs text-gray-400">JPG, PNG, WebP</p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {!value && (
          <input
            className={inputCls}
            placeholder="または画像URLを入力（例: https://...）"
            onChange={(e) => e.target.value && onChange(e.target.value)}
          />
        )}
      </div>
    </Field>
  )
}

/* ─── Section Forms ─── */

function HeroForm({ value, onChange }: { value: LandingPageContent['hero']; onChange: (v: LandingPageContent['hero']) => void }) {
  return (
    <div>
      <SectionHeader title="🏠 ヒーローセクション" desc="ページ最上部のメインビジュアルを編集します。" />
      <ImageUpload
        label="ヒーロー背景画像（任意）"
        hint="テンプレートのグラデーションに重ねて表示されます"
        value={value.heroImage}
        onChange={(heroImage) => onChange({ ...value, heroImage: heroImage ?? undefined })}
      />
      <Field label="バッジテキスト" hint="例: 積極採用中 / 2026年春 新卒歓迎">
        <input className={inputCls} value={value.badgeText} onChange={(e) => onChange({ ...value, badgeText: e.target.value })} />
      </Field>
      <Field label="メインキャッチコピー（見出し）">
        <input className={inputCls} value={value.heading} onChange={(e) => onChange({ ...value, heading: e.target.value })} />
      </Field>
      <Field label="サブキャッチコピー">
        <textarea className={textareaCls} rows={3} value={value.subheading} onChange={(e) => onChange({ ...value, subheading: e.target.value })} />
      </Field>
      <Field label="CTAボタンのテキスト" hint="例: 今すぐ応募する / 詳細を見る">
        <input className={inputCls} value={value.ctaText} onChange={(e) => onChange({ ...value, ctaText: e.target.value })} />
      </Field>
    </div>
  )
}

function ClinicForm({ value, onChange }: { value: LandingPageContent['clinicIntro']; onChange: (v: LandingPageContent['clinicIntro']) => void }) {
  function addImage(url: string) {
    onChange({ ...value, clinicImages: [...(value.clinicImages ?? []), url] })
  }
  function removeImage(idx: number) {
    const imgs = [...(value.clinicImages ?? [])]
    imgs.splice(idx, 1)
    onChange({ ...value, clinicImages: imgs })
  }

  const imgInputRef = useRef<HTMLInputElement>(null)
  function handleImgFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => addImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <SectionHeader title="🦷 クリニック紹介" desc="クリニックの基本情報と院長メッセージを入力します。" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="クリニック名">
          <input className={inputCls} value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} />
        </Field>
        <Field label="キャッチフレーズ">
          <input className={inputCls} value={value.tagline} onChange={(e) => onChange({ ...value, tagline: e.target.value })} />
        </Field>
        <Field label="創業年">
          <input className={inputCls} value={value.foundedYear} onChange={(e) => onChange({ ...value, foundedYear: e.target.value })} />
        </Field>
        <Field label="スタッフ数">
          <input className={inputCls} value={value.staffCount} onChange={(e) => onChange({ ...value, staffCount: e.target.value })} />
        </Field>
      </div>
      <Field label="クリニック概要">
        <textarea className={textareaCls} rows={3} value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="院長名">
          <input className={inputCls} value={value.directorName} onChange={(e) => onChange({ ...value, directorName: e.target.value })} />
        </Field>
        <Field label="肩書き">
          <input className={inputCls} value={value.directorTitle} onChange={(e) => onChange({ ...value, directorTitle: e.target.value })} />
        </Field>
      </div>
      <Field label="院長メッセージ">
        <textarea className={textareaCls} rows={4} value={value.directorMessage} onChange={(e) => onChange({ ...value, directorMessage: e.target.value })} />
      </Field>

      {/* Gallery images */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">クリニック写真ギャラリー</label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {(value.clinicImages ?? []).map((img, i) => (
            <div key={i} className="relative">
              <img src={img} alt="" className="w-full h-20 object-cover rounded-lg border border-gray-200" />
              <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-600">×</button>
            </div>
          ))}
          <button
            onClick={() => imgInputRef.current?.click()}
            className="h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-cyan-400 hover:text-cyan-500 transition-colors text-xs"
          >
            + 追加
          </button>
        </div>
        <input ref={imgInputRef} type="file" accept="image/*" className="hidden" onChange={handleImgFile} />
      </div>
    </div>
  )
}

function PositionsForm({ value, onChange }: { value: PositionItem[]; onChange: (v: PositionItem[]) => void }) {
  function add() {
    onChange([...value, { id: genId(), title: '新しい職種', jobType: '歯科衛生士', employmentType: '正社員', salaryText: '月給 XX万円〜', description: '', highlights: [] }])
  }
  function remove(id: string) { onChange(value.filter((p) => p.id !== id)) }
  function update(id: string, u: Partial<PositionItem>) { onChange(value.map((p) => (p.id === id ? { ...p, ...u } : p))) }

  return (
    <div>
      <SectionHeader title="💼 募集職種" desc="求人として掲載する職種を追加・編集します。" />
      <div className="space-y-5">
        {value.map((pos, idx) => (
          <div key={pos.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500">職種 {idx + 1}</span>
              <button onClick={() => remove(pos.id)} className="text-xs text-red-500 hover:text-red-700">削除</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="職種名">
                <input className={inputCls} value={pos.title} onChange={(e) => update(pos.id, { title: e.target.value })} />
              </Field>
              <Field label="雇用形態">
                <select className={inputCls} value={pos.employmentType} onChange={(e) => update(pos.id, { employmentType: e.target.value })}>
                  {['正社員', 'パート・アルバイト', '契約社員', '派遣社員'].map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
            </div>
            <Field label="給与・報酬" hint="例: 月給 25万円〜35万円 / 時給 1,200円〜">
              <input className={inputCls} value={pos.salaryText} onChange={(e) => update(pos.id, { salaryText: e.target.value })} />
            </Field>
            <Field label="仕事内容">
              <textarea className={textareaCls} rows={3} value={pos.description} onChange={(e) => update(pos.id, { description: e.target.value })} />
            </Field>
            <Field label="アピールポイント" hint="カンマ区切り 例: 未経験歓迎, 週3日〜OK">
              <input
                className={inputCls}
                value={pos.highlights.join(', ')}
                onChange={(e) => update(pos.id, { highlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
              />
            </Field>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-4 w-full border-2 border-dashed border-gray-300 text-gray-500 text-sm py-3 rounded-xl hover:border-cyan-400 hover:text-cyan-600 transition-colors">
        + 職種を追加
      </button>
    </div>
  )
}

function BenefitsForm({ value, onChange }: { value: BenefitItem[]; onChange: (v: BenefitItem[]) => void }) {
  function add() { onChange([...value, { id: genId(), icon: '⭐', title: '', description: '' }]) }
  function remove(id: string) { onChange(value.filter((b) => b.id !== id)) }
  function update(id: string, u: Partial<BenefitItem>) { onChange(value.map((b) => (b.id === id ? { ...b, ...u } : b))) }

  return (
    <div>
      <SectionHeader title="🎁 福利厚生" desc="福利厚生・待遇をカード形式で表示します。" />
      <div className="space-y-3">
        {value.map((b) => (
          <div key={b.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div className="flex items-start gap-3">
              <div className="w-16">
                <label className="block text-xs text-gray-500 mb-1">アイコン</label>
                <input className={inputCls + ' text-center text-lg'} value={b.icon} onChange={(e) => update(b.id, { icon: e.target.value })} />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">タイトル</label>
                <input className={inputCls} value={b.title} onChange={(e) => update(b.id, { title: e.target.value })} />
              </div>
              <button onClick={() => remove(b.id)} className="text-xs text-red-500 hover:text-red-700 mt-5 shrink-0">削除</button>
            </div>
            <div className="mt-2">
              <label className="block text-xs text-gray-500 mb-1">説明</label>
              <input className={inputCls} value={b.description} onChange={(e) => update(b.id, { description: e.target.value })} />
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-4 w-full border-2 border-dashed border-gray-300 text-gray-500 text-sm py-3 rounded-xl hover:border-cyan-400 hover:text-cyan-600 transition-colors">
        + 福利厚生を追加
      </button>
    </div>
  )
}

function ConditionsForm({ value, onChange }: { value: LandingPageContent['workConditions']; onChange: (v: LandingPageContent['workConditions']) => void }) {
  return (
    <div>
      <SectionHeader title="⏰ 勤務条件" />
      <Field label="勤務時間"><input className={inputCls} value={value.hours} onChange={(e) => onChange({ ...value, hours: e.target.value })} /></Field>
      <Field label="休日・休暇"><input className={inputCls} value={value.holidays} onChange={(e) => onChange({ ...value, holidays: e.target.value })} /></Field>
      <Field label="研修・教育制度"><input className={inputCls} value={value.training} onChange={(e) => onChange({ ...value, training: e.target.value })} /></Field>
      <Field label="職場環境"><input className={inputCls} value={value.environment} onChange={(e) => onChange({ ...value, environment: e.target.value })} /></Field>
    </div>
  )
}

function FaqForm({ value, onChange }: { value: FaqItem[]; onChange: (v: FaqItem[]) => void }) {
  function add() { onChange([...value, { id: genId(), question: '', answer: '' }]) }
  function remove(id: string) { onChange(value.filter((f) => f.id !== id)) }
  function update(id: string, u: Partial<FaqItem>) { onChange(value.map((f) => (f.id === id ? { ...f, ...u } : f))) }

  return (
    <div>
      <SectionHeader title="💬 よくある質問" />
      <div className="space-y-4">
        {value.map((item, idx) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Q{idx + 1}</span>
              <button onClick={() => remove(item.id)} className="text-xs text-red-500 hover:text-red-700">削除</button>
            </div>
            <Field label="質問"><input className={inputCls} value={item.question} onChange={(e) => update(item.id, { question: e.target.value })} /></Field>
            <Field label="回答"><textarea className={textareaCls} rows={3} value={item.answer} onChange={(e) => update(item.id, { answer: e.target.value })} /></Field>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-4 w-full border-2 border-dashed border-gray-300 text-gray-500 text-sm py-3 rounded-xl hover:border-cyan-400 hover:text-cyan-600 transition-colors">
        + 質問を追加
      </button>
    </div>
  )
}

function ContactForm({ value, onChange }: { value: LandingPageContent['contact']; onChange: (v: LandingPageContent['contact']) => void }) {
  return (
    <div>
      <SectionHeader title="📞 お問い合わせ" />
      <Field label="住所"><input className={inputCls} value={value.address} onChange={(e) => onChange({ ...value, address: e.target.value })} /></Field>
      <Field label="電話番号"><input className={inputCls} value={value.phone} onChange={(e) => onChange({ ...value, phone: e.target.value })} /></Field>
      <Field label="メールアドレス"><input className={inputCls} type="email" value={value.email} onChange={(e) => onChange({ ...value, email: e.target.value })} /></Field>
      <Field label="応募に関するメモ・注意事項">
        <textarea className={textareaCls} rows={3} value={value.applicationNote} onChange={(e) => onChange({ ...value, applicationNote: e.target.value })} />
      </Field>
    </div>
  )
}

function SeoForm({ value, onChange }: { value: LandingPageContent['seo']; onChange: (v: LandingPageContent['seo']) => void }) {
  return (
    <div>
      <SectionHeader title="🔍 SEO設定" desc="検索エンジン向けのメタ情報を設定します。" />
      <Field label="ページタイトル（meta title）" hint="60文字以内推奨">
        <input className={inputCls} value={value.metaTitle} onChange={(e) => onChange({ ...value, metaTitle: e.target.value })} />
        <p className="text-xs text-gray-400 mt-1">{value.metaTitle.length} 文字</p>
      </Field>
      <Field label="ページ説明文（meta description）" hint="120〜160文字推奨">
        <textarea className={textareaCls} rows={4} value={value.metaDescription} onChange={(e) => onChange({ ...value, metaDescription: e.target.value })} />
        <p className="text-xs text-gray-400 mt-1">{value.metaDescription.length} 文字</p>
      </Field>
    </div>
  )
}

