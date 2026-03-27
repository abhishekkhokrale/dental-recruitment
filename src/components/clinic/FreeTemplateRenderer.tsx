'use client'

import type { LPTheme, PageSection } from './LandingPageRenderer'
import type { Block, FontChoice, FreeTemplate, ImageSlot, TemplateSection } from '@/lib/templateStorage'

// ── Variable + image resolution ───────────────────────────────────────────────

function buildVarMap(sections: PageSection[]): Record<string, string> {
  const m: Record<string, string> = {}
  for (const s of sections) {
    const c = s.content
    if (s.type === 'header')  { m['clinicName'] = c.clinicName ?? '' }
    if (s.type === 'topbar')  { m['tagline']    = c.text ?? '' }
    if (s.type === 'hero')    {
      m['heroTitle']    = c.title ?? ''
      m['heroSubtitle'] = c.subtitle ?? ''
      m['ctaText']      = c.ctaText ?? ''
    }
    if (s.type === 'staff') {
      m['staffName']    = c.staffName    ?? ''
      m['staffTitle']   = c.staffTitle   ?? ''
      m['staffMessage'] = c.staffMessage ?? ''
    }
    if (s.type === 'contact') {
      m['address'] = c.address ?? ''
      m['phone']   = c.phone   ?? ''
      m['hours']   = c.hours   ?? ''
    }
  }
  return m
}

function buildImageMap(sections: PageSection[]): Record<string, string> {
  const m: Record<string, string> = {}
  for (const s of sections) {
    const c = s.content
    if (s.type === 'hero')    m['hero']    = c.imageUrl      ?? ''
    if (s.type === 'staff')   m['staff']   = c.staffImageUrl ?? ''
    if (s.type === 'concept') m['concept'] = c.imageUrl      ?? ''
    if (s.type === 'gallery') {
      const imgs = Array.isArray(c.images) ? c.images : []
      imgs.forEach((u: string, i: number) => { m[`gallery-${i + 1}`] = u })
    }
  }
  return m
}

function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`)
}

// ── Block renderer ────────────────────────────────────────────────────────────

const SIZE_CLASS: Record<string, string> = {
  sm: 'text-sm', base: 'text-base', lg: 'text-lg',
  xl: 'text-xl', '2xl': 'text-2xl', '3xl': 'text-3xl', '4xl': 'text-4xl',
}
const WEIGHT_CLASS: Record<string, string> = {
  normal: 'font-normal', semibold: 'font-semibold', bold: 'font-bold', black: 'font-black',
}
const ALIGN_CLASS: Record<string, string> = {
  left: 'text-left', center: 'text-center', right: 'text-right',
}

function blockColor(color: string | undefined, t: LPTheme): string {
  if (color === 'accent')  return t.accent
  if (color === 'muted')   return '#94a3b8'
  if (color === 'white')   return '#ffffff'
  return 'inherit'
}

function BlockRender({
  block, vars, images, t, showPlaceholders = false,
}: {
  block: Block
  vars:  Record<string, string>
  images: Record<string, string>
  t: LPTheme
  showPlaceholders?: boolean
}) {
  const align  = ALIGN_CLASS[block.align ?? 'left']
  const size   = SIZE_CLASS[block.size   ?? 'base']
  const weight = WEIGHT_CLASS[block.weight ?? 'normal']
  const color  = blockColor(block.color, t)
  const text   = interpolate(block.text ?? '', vars)

  if (block.type === 'image-slot') {
    const src    = images[block.slot ?? 'hero']
    const h      = block.imgHeight ?? 240
    const radius = block.imgShape === 'circle'
      ? '50%'
      : block.imgShape === 'rounded'
      ? '16px'
      : '0px'
    if (src) return (
      <img
        src={src} alt=""
        className="w-full object-cover"
        style={{ height: h, borderRadius: radius }}
      />
    )
    if (showPlaceholders) return (
      <div
        className="w-full flex items-center justify-center text-sm text-gray-400"
        style={{ height: h, background: t.sectionAltBg, borderRadius: radius, border: `2px dashed ${t.dividerColor}` }}
      >
        画像なし
      </div>
    )
    return null
  }

  if (block.type === 'heading') {
    return (
      <p className={[size, weight, align, 'leading-tight'].join(' ')} style={{ color }}>
        {text || 'タイトル'}
      </p>
    )
  }

  if (block.type === 'paragraph') {
    return (
      <p className={[size, align, 'leading-relaxed whitespace-pre-line'].join(' ')} style={{ color }}>
        {text || '本文テキスト'}
      </p>
    )
  }

  if (block.type === 'button') {
    const style = block.btnStyle ?? 'filled'
    const base  = 'inline-block px-6 py-2.5 font-bold rounded-full cursor-default text-sm'
    const s = style === 'filled'
      ? { background: t.heroBtnBg, color: t.heroBtnText }
      : style === 'outlined'
      ? { background: 'transparent', color: t.accent, border: `2px solid ${t.accent}` }
      : { background: 'transparent', color: t.accent }
    return (
      <div className={align}>
        <span className={base} style={s}>{text || 'ボタン'}</span>
      </div>
    )
  }

  if (block.type === 'divider') {
    return <hr style={{ border: 'none', borderTop: `1px solid ${t.dividerColor}`, margin: '8px 0' }} />
  }

  if (block.type === 'spacer') {
    return <div style={{ height: block.height ?? 24 }} />
  }

  return null
}

// ── Column grid mapping ───────────────────────────────────────────────────────

function colStyle(layout: string): React.CSSProperties {
  const map: Record<string, string> = {
    '1':   '1fr',
    '2':   '1fr 1fr',
    '3':   '1fr 1fr 1fr',
    '2+1': '2fr 1fr',
    '1+2': '1fr 2fr',
  }
  return { display: 'grid', gridTemplateColumns: map[layout] ?? '1fr', gap: '24px' }
}

const PY_MAP: Record<string, string> = {
  sm: '24px', md: '48px', lg: '80px', xl: '120px',
}

// ── Section renderer ──────────────────────────────────────────────────────────

function SectionRender({
  section, vars, images, t, showPlaceholders,
}: {
  section: TemplateSection
  vars:    Record<string, string>
  images:  Record<string, string>
  t: LPTheme
  showPlaceholders: boolean
}) {
  // Section-type-aware background: named sections use their dedicated theme colours
  let bg = '#ffffff'
  if      (section.sectionType === 'topbar')                      bg = t.topbarBg
  else if (section.sectionType === 'header')                      bg = t.headerBg
  else if (section.sectionType === 'footer')                      bg = t.footerBg
  else if (section.bg === 'alt')                                  bg = t.sectionAltBg
  else if (section.bg === 'accent')                               bg = t.accent
  else if (section.bg === 'dark')                                 bg = t.footerBg

  const py = PY_MAP[section.py] ?? '48px'

  return (
    <section style={{ background: bg, paddingTop: py, paddingBottom: py }}>
      <div className="max-w-5xl mx-auto px-6" style={colStyle(section.layout)}>
        {section.columns.map(col => (
          <div key={col.id} className="flex flex-col gap-4">
            {col.blocks.map(block => (
              <BlockRender key={block.id} block={block} vars={vars} images={images} t={t} showPlaceholders={showPlaceholders} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Font map ──────────────────────────────────────────────────────────────────

const FONT_CSS: Record<FontChoice, string> = {
  'noto-sans':     'var(--font-noto-sans-jp), sans-serif',
  'sans':          'var(--font-noto-sans-jp), sans-serif',
  'noto-serif':    'var(--font-noto-serif-jp), serif',
  'serif':         'var(--font-noto-serif-jp), serif',
  'mplus-rounded': 'var(--font-mplus-rounded), sans-serif',
  'biz-ud':        'var(--font-biz-ud), sans-serif',
  'zen-gothic':    'var(--font-zen-gothic), sans-serif',
  'shippori':      'var(--font-shippori), serif',
}

// ── Main export ───────────────────────────────────────────────────────────────

export function FreeTemplateRenderer({
  template, sections, t, showPlaceholders = false,
}: {
  template: FreeTemplate
  sections: PageSection[]
  t: LPTheme
  showPlaceholders?: boolean
}) {
  const vars   = buildVarMap(sections)
  const images = buildImageMap(sections)
  const font   = FONT_CSS[template.fontFamily] ?? FONT_CSS['noto-sans']

  return (
    <div style={{ fontFamily: font }}>
      {template.sections.map(section => (
        <SectionRender key={section.id} section={section} vars={vars} images={images} t={t} showPlaceholders={showPlaceholders} />
      ))}
    </div>
  )
}
