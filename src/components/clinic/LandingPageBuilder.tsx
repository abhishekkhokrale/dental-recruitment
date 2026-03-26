'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  LandingPageRenderer,
  DEFAULT_SECTIONS,
  THEMES,
  type PageSection,
  type ThemeId,
} from './LandingPageRenderer'
import { lpSave } from '@/lib/lpStorage'

// ─── Section meta ────────────────────────────────────────────────────────────

const SECTION_META: Record<string, { icon: string; label: string }> = {
  topbar:     { icon: '📢', label: 'お知らせバー' },
  header:     { icon: '🏷️', label: 'ヘッダー' },
  hero:       { icon: '🖼️', label: 'ヒーロー画像' },
  concept:    { icon: '💭', label: 'クリニックの想い' },
  features:   { icon: '⭐', label: '選ばれる理由' },
  services:   { icon: '🦷', label: '診療内容' },
  staff:      { icon: '👨‍⚕️', label: 'スタッフ紹介' },
  gallery:    { icon: '🖼️', label: 'ギャラリー' },
  contact:    { icon: '📍', label: 'アクセス・診療時間' },
  cta_banner: { icon: '📣', label: '予約CTAバー' },
  footer:     { icon: '📄', label: 'フッター' },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ic = 'w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent'
const ta = `${ic} resize-none`

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-gray-600 mb-1">{children}</label>
}

// ─── Rich Text Editor ────────────────────────────────────────────────────────

const RTF_TOOLS = [
  { cmd: 'bold',            label: <strong>B</strong>,        title: '太字' },
  { cmd: 'italic',          label: <em>I</em>,                title: '斜体' },
  { cmd: 'underline',       label: <u>U</u>,                  title: '下線' },
  { cmd: 'strikeThrough',   label: <s>S</s>,                  title: '取消線' },
  { cmd: 'separator' },
  { cmd: 'formatBlock:<h2>', label: <span className="font-bold text-xs">H2</span>, title: '大見出し' },
  { cmd: 'formatBlock:<h3>', label: <span className="font-bold text-xs">H3</span>, title: '小見出し' },
  { cmd: 'formatBlock:<p>',  label: <span className="text-xs">¶</span>,            title: '本文' },
  { cmd: 'separator' },
  { cmd: 'insertUnorderedList', label: <span className="text-xs">• リスト</span>, title: '箇条書き' },
  { cmd: 'insertOrderedList',   label: <span className="text-xs">1. リスト</span>,title: '番号リスト' },
  { cmd: 'separator' },
  { cmd: 'removeFormat',    label: <span className="text-xs text-red-400">✕ 解除</span>, title: '書式解除' },
] satisfies { cmd: string; label?: React.ReactNode; title?: string }[]


function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null)

  // Set initial HTML once
  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = value || ''
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function exec(cmdStr: string) {
    editorRef.current?.focus()
    if (cmdStr.startsWith('formatBlock:')) {
      document.execCommand('formatBlock', false, cmdStr.slice('formatBlock:'.length))
    } else {
      document.execCommand(cmdStr, false, undefined)
    }
    onChange(editorRef.current?.innerHTML || '')
  }


  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-cyan-400 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
        {RTF_TOOLS.map((tool, i) =>
          tool.cmd === 'separator'
            ? <div key={i} className="w-px h-4 bg-gray-300 mx-1" />
            : (
              <button
                key={tool.cmd}
                type="button"
                title={tool.title}
                onMouseDown={e => { e.preventDefault(); exec(tool.cmd) }}
                className="px-2 py-1 rounded hover:bg-gray-200 transition text-sm text-gray-700 leading-none"
              >
                {tool.label}
              </button>
            )
        )}
      </div>
      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(editorRef.current?.innerHTML || '')}
        className="px-3 py-2.5 text-sm text-gray-900 min-h-[120px] focus:outline-none prose prose-sm max-w-none"
      />
    </div>
  )
}

// ─── Icon Picker ─────────────────────────────────────────────────────────────

const ICON_CATEGORIES = [
  {
    label: '歯科・医療',
    icons: ['🦷', '🏥', '🩺', '🩻', '💉', '💊', '🔬', '🧬', '🩹', '🧪', '🫀', '🫁'],
  },
  {
    label: 'ケア・スタッフ',
    icons: ['👨‍⚕️', '👩‍⚕️', '🤝', '👥', '😊', '😁', '🙏', '💪', '🫶', '❤️', '💛', '💙'],
  },
  {
    label: '品質・信頼',
    icons: ['⭐', '🌟', '✨', '🏆', '🥇', '🎯', '💯', '✅', '☑️', '🔝', '💎', '🏅'],
  },
  {
    label: '安全・設備',
    icons: ['🛡️', '🔒', '⚙️', '🔧', '💡', '🖥️', '📱', '📡', '🔭', '🏗️', '🏢', '🚪'],
  },
  {
    label: '自然・温もり',
    icons: ['🌿', '🌸', '🌺', '🍃', '🌱', '🌾', '🌻', '🍀', '💚', '🌈', '☀️', '🌙'],
  },
  {
    label: 'スケジュール',
    icons: ['📅', '⏰', '🕐', '📆', '⌚', '🗓️', '⏱️', '🔔', '📢', '📣', '💬', '📞'],
  },
]

function IconPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (icon: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <Label>アイコン</Label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:border-cyan-400 transition text-left"
      >
        <span className="text-2xl leading-none">{value || '☐'}</span>
        <span className="text-xs text-gray-400 flex-1">クリックして選択</span>
        <svg className={`w-3 h-3 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-xl w-72 p-3 space-y-3">
          {ICON_CATEGORIES.map(cat => (
            <div key={cat.label}>
              <p className="text-xs font-bold text-gray-400 mb-1.5">{cat.label}</p>
              <div className="grid grid-cols-6 gap-1">
                {cat.icons.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => { onChange(icon); setOpen(false) }}
                    className={[
                      'w-9 h-9 rounded-lg text-xl flex items-center justify-center hover:bg-cyan-50 transition',
                      value === icon ? 'bg-cyan-100 ring-2 ring-cyan-400' : '',
                    ].join(' ')}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {/* Custom input */}
          <div className="pt-1 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 mb-1">カスタム入力</p>
            <input
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder="絵文字を直接入力"
              className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Compress image to max 900px wide, JPEG 0.72 quality — keeps base64 small enough for localStorage
function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const MAX = 900
        const scale = Math.min(1, MAX / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.72))
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}

function UploadBtn({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (base64: string) => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const compressed = await compressImage(file)
    onChange(compressed)
  }
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition"
        >
          📁 画像を選択
        </button>
        {value && (
          <div className="flex items-center gap-1.5">
            <img src={value} alt="" className="w-8 h-8 rounded object-cover border border-gray-200" />
            <button type="button" onClick={() => onChange('')} className="text-xs text-red-500 hover:underline">削除</button>
          </div>
        )}
        {!value && <span className="text-xs text-gray-400">未選択</span>}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}

// ─── Edit forms per section type ─────────────────────────────────────────────

function EditForm({
  section,
  update,
}: {
  section: PageSection
  update: (id: string, patch: Record<string, unknown>) => void
}) {
  const c = section.content
  const set = (key: string, value: unknown) => update(section.id, { [key]: value })

  switch (section.type) {
    case 'topbar':
      return (
        <div className="space-y-3">
          <div><Label>スクロールテキスト</Label><textarea rows={3} value={c.marqueeText || ''} onChange={e => set('marqueeText', e.target.value)} className={ta} /></div>
          <div><Label>スクロール速度（秒・大きいほど遅い）</Label>
            <input type="range" min={15} max={80} value={c.speed ?? 40} onChange={e => set('speed', Number(e.target.value))} className="w-full accent-cyan-600" />
            <span className="text-xs text-gray-400">{c.speed ?? 40}秒</span>
          </div>
        </div>
      )

    case 'header':
      return (
        <div className="space-y-3">
          <UploadBtn label="ロゴ画像" value={c.logoImageUrl || ''} onChange={v => set('logoImageUrl', v)} />
          <div><Label>クリニック名（テキストロゴ）</Label><input type="text" value={c.logoText || ''} onChange={e => set('logoText', e.target.value)} className={ic} /></div>
          <div><Label>電話番号</Label><input type="text" value={c.phone || ''} onChange={e => set('phone', e.target.value)} className={ic} /></div>
          <div>
            <Label>ナビゲーション（ラベル|リンク をカンマで区切る）</Label>
            <textarea rows={5} value={c.navItems || ''} onChange={e => set('navItems', e.target.value)} className={ta} placeholder={'診療案内|#concept\nスタッフ紹介|#staff\n施設案内|#gallery\nアクセス|#contact\nご予約|#cta_banner'} />
            <p className="text-xs text-gray-400 mt-1">例: <code className="bg-gray-100 px-1 rounded">診療案内|#concept</code> または外部リンク <code className="bg-gray-100 px-1 rounded">ご予約|https://...</code></p>
          </div>
        </div>
      )

    case 'hero':
      return (
        <div className="space-y-3">
          <UploadBtn label="背景画像" value={c.imageUrl || ''} onChange={v => set('imageUrl', v)} />
          <div>
            <Label>画像オーバーレイの暗さ（%）</Label>
            <input type="range" min={0} max={80} value={c.overlayOpacity ?? 45} onChange={e => set('overlayOpacity', Number(e.target.value))} className="w-full accent-cyan-600" />
            <span className="text-xs text-gray-400">{c.overlayOpacity ?? 45}%</span>
          </div>
          <div><Label>大見出し</Label><input type="text" value={c.title || ''} onChange={e => set('title', e.target.value)} className={ic} /></div>
          <div><Label>サブテキスト</Label><textarea rows={2} value={c.subtitle || ''} onChange={e => set('subtitle', e.target.value)} className={ta} /></div>
          <div><Label>ボタン①テキスト</Label><input type="text" value={c.ctaText || ''} onChange={e => set('ctaText', e.target.value)} className={ic} /></div>
          <div><Label>ボタン②テキスト</Label><input type="text" value={c.ctaText2 || ''} onChange={e => set('ctaText2', e.target.value)} className={ic} /></div>
        </div>
      )

    case 'concept':
      return (
        <div className="space-y-3">
          <div><Label>英語サブタイトル</Label><input type="text" value={c.subtitle || ''} onChange={e => set('subtitle', e.target.value)} className={ic} placeholder="Clinic Philosophy" /></div>
          <div><Label>見出し</Label><input type="text" value={c.title || ''} onChange={e => set('title', e.target.value)} className={ic} /></div>
          <div>
            <Label>本文</Label>
            <RichTextEditor value={c.body || ''} onChange={v => set('body', v)} />
          </div>
          <UploadBtn label="画像（任意）" value={c.imageUrl || ''} onChange={v => set('imageUrl', v)} />
        </div>
      )

    case 'features':
      return (
        <div className="space-y-3">
          <div><Label>見出し</Label><input type="text" value={c.title || ''} onChange={e => set('title', e.target.value)} className={ic} /></div>
          {(c.items || []).map((item: { icon?: string; title?: string; desc?: string }, i: number) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <p className="text-xs font-bold text-gray-500">特徴 {i + 1}</p>
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-4">
                  <IconPicker
                    value={item.icon || ''}
                    onChange={v => { const items = [...c.items]; items[i] = { ...item, icon: v }; set('items', items) }}
                  />
                </div>
              </div>
              <div><Label>タイトル</Label><input type="text" value={item.title || ''} onChange={e => { const items = [...c.items]; items[i] = { ...item, title: e.target.value }; set('items', items) }} className={ic} /></div>
              <div>
                <Label>説明</Label>
                <RichTextEditor
                  value={item.desc || ''}
                  onChange={v => { const items = [...c.items]; items[i] = { ...item, desc: v }; set('items', items) }}
                />
              </div>
            </div>
          ))}
        </div>
      )

    case 'services':
      return (
        <div className="space-y-3">
          <div><Label>見出し</Label><input type="text" value={c.title || ''} onChange={e => set('title', e.target.value)} className={ic} /></div>
          <div><Label>診療項目（カンマ区切り）</Label><textarea rows={4} value={c.items || ''} onChange={e => set('items', e.target.value)} className={ta} placeholder="一般歯科,小児歯科,矯正歯科,インプラント" /></div>
        </div>
      )

    case 'staff':
      return (
        <div className="space-y-3">
          <div><Label>英語サブタイトル</Label><input type="text" value={c.subtitle || ''} onChange={e => set('subtitle', e.target.value)} className={ic} placeholder="Our Doctor" /></div>
          <div><Label>セクション見出し</Label><input type="text" value={c.title || ''} onChange={e => set('title', e.target.value)} className={ic} /></div>
          <UploadBtn label="プロフィール写真" value={c.staffImageUrl || ''} onChange={v => set('staffImageUrl', v)} />
          <div><Label>氏名</Label><input type="text" value={c.staffName || ''} onChange={e => set('staffName', e.target.value)} className={ic} /></div>
          <div><Label>役職</Label><input type="text" value={c.staffTitle || ''} onChange={e => set('staffTitle', e.target.value)} className={ic} placeholder="院長・歯科医師" /></div>
          <div><Label>資格・経歴</Label><input type="text" value={c.staffCredentials || ''} onChange={e => set('staffCredentials', e.target.value)} className={ic} /></div>
          <div>
            <Label>メッセージ</Label>
            <RichTextEditor value={c.staffMessage || ''} onChange={v => set('staffMessage', v)} />
          </div>
        </div>
      )

    case 'gallery':
      return (
        <div className="space-y-3">
          <div><Label>見出し</Label><input type="text" value={c.title || ''} onChange={e => set('title', e.target.value)} className={ic} /></div>
          <p className="text-xs text-gray-400">最大6枚アップロードできます</p>
          {(c.images || []).map((url: string, i: number) => (
            <UploadBtn
              key={i}
              label={`写真 ${i + 1}`}
              value={url}
              onChange={v => { const imgs = [...c.images]; imgs[i] = v; set('images', imgs) }}
            />
          ))}
        </div>
      )

    case 'contact':
      return (
        <div className="space-y-3">
          <div><Label>見出し</Label><input type="text" value={c.title || ''} onChange={e => set('title', e.target.value)} className={ic} /></div>
          <div><Label>住所</Label><input type="text" value={c.address || ''} onChange={e => set('address', e.target.value)} className={ic} /></div>
          <div><Label>アクセス</Label><input type="text" value={c.access || ''} onChange={e => set('access', e.target.value)} className={ic} /></div>
          <div><Label>電話番号</Label><input type="text" value={c.phone || ''} onChange={e => set('phone', e.target.value)} className={ic} /></div>
          <div>
            <Label>診療時間（1行: 曜日|時間）</Label>
            <textarea rows={4} value={c.hours || ''} onChange={e => set('hours', e.target.value)} className={ta} placeholder={'月・火・木・金|9:00〜18:30\n水・土|9:00〜13:00\n日・祝|休診'} />
          </div>
        </div>
      )

    case 'cta_banner':
      return (
        <div className="space-y-3">
          <div><Label>見出し</Label><input type="text" value={c.title || ''} onChange={e => set('title', e.target.value)} className={ic} /></div>
          <div><Label>サブテキスト</Label><input type="text" value={c.subtitle || ''} onChange={e => set('subtitle', e.target.value)} className={ic} /></div>
          <div><Label>ボタンテキスト</Label><input type="text" value={c.ctaText || ''} onChange={e => set('ctaText', e.target.value)} className={ic} /></div>
          <div><Label>電話番号</Label><input type="text" value={c.phone || ''} onChange={e => set('phone', e.target.value)} className={ic} /></div>
        </div>
      )

    case 'footer':
      return (
        <div className="space-y-3">
          <div><Label>クリニック名</Label><input type="text" value={c.clinicName || ''} onChange={e => set('clinicName', e.target.value)} className={ic} /></div>
          <div><Label>住所</Label><input type="text" value={c.address || ''} onChange={e => set('address', e.target.value)} className={ic} /></div>
          <div><Label>電話番号</Label><input type="text" value={c.phone || ''} onChange={e => set('phone', e.target.value)} className={ic} /></div>
          <div><Label>診療時間（短縮版）</Label><input type="text" value={c.hours || ''} onChange={e => set('hours', e.target.value)} className={ic} /></div>
          <div><Label>コピーライト</Label><input type="text" value={c.copyright || ''} onChange={e => set('copyright', e.target.value)} className={ic} /></div>
        </div>
      )

    default:
      return <p className="text-xs text-gray-400">編集項目なし</p>
  }
}

// ─── Main Builder ─────────────────────────────────────────────────────────────

export default function LandingPageBuilder() {
  const [sections, setSections] = useState<PageSection[]>(DEFAULT_SECTIONS)
  const [themeId, setThemeId] = useState<ThemeId>('clean')
  const [expandedId, setExpandedId] = useState<string | null>('hero')
  const [previewMode, setPreviewMode] = useState(false)
  const [published, setPublished] = useState(false)
  const [slug, setSlug] = useState('smile-dental')
  const [copied, setCopied] = useState(false)

  // Drag-drop state
  const dragIdx = useRef<number | null>(null)
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null)

  const updateSection = useCallback((id: string, patch: Record<string, any>) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, content: { ...s.content, ...patch } } : s))
  }, [])

  const toggleVisible = (id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s))
  }

  function onDragStart(i: number) { dragIdx.current = i }
  function onDragOver(e: React.DragEvent, i: number) { e.preventDefault(); setDragOverIdx(i) }
  function onDrop(i: number) {
    if (dragIdx.current === null) return
    const next = [...sections]
    const [moved] = next.splice(dragIdx.current, 1)
    next.splice(i, 0, moved)
    setSections(next)
    dragIdx.current = null
    setDragOverIdx(null)
  }
  function onDragEnd() { dragIdx.current = null; setDragOverIdx(null) }

  const [publishError, setPublishError] = useState<string | null>(null)

  async function handlePublish() {
    setPublishError(null)
    try {
      await lpSave(slug, { sections, themeId })
      setPublished(true)
    } catch {
      setPublishError('保存に失敗しました。ページを再読み込みして再度お試しください。')
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(`${window.location.origin}/clinics/${slug}`).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Published screen
  if (published) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 p-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">🎉</div>
        <h2 className="text-xl font-bold text-gray-900">採用ページを公開しました！</h2>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 w-full max-w-md">
          <span className="text-sm text-cyan-700 font-mono flex-1 truncate">{typeof window !== 'undefined' ? window.location.origin : ''}/clinics/{slug}</span>
          <button onClick={handleCopy} className="shrink-0 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 px-3 py-1.5 rounded-lg transition">
            {copied ? '✓ コピー済み' : 'コピー'}
          </button>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setPublished(false)} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            編集に戻る
          </button>
          <button
            type="button"
            onClick={() => window.open(`/clinics/${slug}`, '_blank')}
            className="px-5 py-2.5 text-sm font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition shadow-sm">
            ページを見る →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* ── Toolbar ── */}
      <div className="shrink-0 bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3 flex-wrap">
        {/* Theme selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">テンプレート:</span>
          <div className="flex gap-1.5">
            {Object.entries(THEMES).map(([id, theme]) => (
              <button
                key={id}
                onClick={() => setThemeId(id as ThemeId)}
                title={theme.nameJa}
                className={['w-6 h-6 rounded-full border-2 transition', themeId === id ? 'border-gray-800 scale-110' : 'border-transparent'].join(' ')}
                style={{ background: theme.accent }}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1 self-center">{THEMES[themeId].nameJa}</span>
          </div>
        </div>

        <div className="h-5 w-px bg-gray-200 mx-1" />

        {/* Preview toggle */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-semibold">
          <button onClick={() => setPreviewMode(false)} className={['px-3 py-1.5 transition', !previewMode ? 'bg-cyan-600 text-white' : 'text-gray-500 hover:bg-gray-50'].join(' ')}>
            🖊 編集
          </button>
          <button onClick={() => setPreviewMode(true)} className={['px-3 py-1.5 transition', previewMode ? 'bg-cyan-600 text-white' : 'text-gray-500 hover:bg-gray-50'].join(' ')}>
            👁 プレビュー
          </button>
        </div>

        <div className="flex-1" />

        {/* Publish */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden text-sm">
            <span className="px-2.5 py-2 text-xs text-gray-400 bg-gray-50">/clinics/</span>
            <input
              type="text"
              value={slug}
              onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              className="w-32 px-2 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
              placeholder="your-clinic"
            />
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={handlePublish}
              className="px-4 py-2 text-sm font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition shadow-sm"
            >
              🚀 公開する
            </button>
            {publishError && (
              <p className="text-xs text-red-500 max-w-xs text-right">{publishError}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Main area ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── Left: section list ── (hidden in preview mode) */}
        {!previewMode && (
          <div className="w-72 shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">セクション（ドラッグで並替）</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {sections.map((section, i) => {
                const meta = SECTION_META[section.type] ?? { icon: '📦', label: section.type }
                const isExpanded = expandedId === section.id
                const isDragOver = dragOverIdx === i

                return (
                  <div
                    key={section.id}
                    className={['border-b border-gray-100 transition-all', isDragOver ? 'border-t-2 border-t-cyan-400' : ''].join(' ')}
                    draggable
                    onDragStart={() => onDragStart(i)}
                    onDragOver={e => onDragOver(e, i)}
                    onDrop={() => onDrop(i)}
                    onDragEnd={onDragEnd}
                  >
                    {/* Section row */}
                    <div
                      className={['flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition group', isExpanded ? 'bg-cyan-50' : ''].join(' ')}
                      onClick={() => setExpandedId(isExpanded ? null : section.id)}
                    >
                      {/* Drag handle */}
                      <span className="text-gray-300 group-hover:text-gray-400 cursor-grab select-none text-base shrink-0">⠿</span>
                      <span className="text-base shrink-0">{meta.icon}</span>
                      <span className={['flex-1 text-xs font-semibold truncate', isExpanded ? 'text-cyan-700' : 'text-gray-700'].join(' ')}>
                        {meta.label}
                      </span>
                      {/* Visibility toggle */}
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); toggleVisible(section.id) }}
                        title={section.visible ? '非表示にする' : '表示する'}
                        className="shrink-0 text-sm opacity-50 hover:opacity-100 transition"
                      >
                        {section.visible ? '👁' : '🙈'}
                      </button>
                      {/* Expand arrow */}
                      <svg className={`w-3 h-3 text-gray-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>

                    {/* Expanded edit form */}
                    {isExpanded && (
                      <div className="px-3 pb-4 pt-2 bg-cyan-50/50 border-t border-cyan-100">
                        <EditForm section={section} update={updateSection} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Right: live preview ── */}
        <div className="flex-1 overflow-auto bg-gray-100">
          {previewMode ? (
            /* Full preview */
            <div className="bg-white min-h-full">
              <LandingPageRenderer sections={sections} themeId={themeId} />
            </div>
          ) : (
            /* Editor preview in a browser frame */
            <div className="p-4">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 font-mono">
                    {typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/clinics/{slug || 'your-clinic'}
                  </div>
                </div>
                {/* Page content */}
                <LandingPageRenderer sections={sections} themeId={themeId} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
