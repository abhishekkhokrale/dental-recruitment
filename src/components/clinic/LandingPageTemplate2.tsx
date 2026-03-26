'use client'

// ─── Template 2: Professional (プロフェッショナル) ────────────────────────────
// Layout: split-screen hero, numbered features, horizontal staff card,
//         two-column footer, uppercase section labels

import { type PageSection, type LPTheme } from './LandingPageRenderer'

type SP = { c: Record<string, unknown>; t: LPTheme }

function ProTopBar({ c, t }: SP) {
  const text = (c.marqueeText as string) || '新患受付中 | お気軽にご連絡ください'
  const duration = Math.max(10, (c.speed as number) ?? 40)
  return (
    <div style={{ overflow: 'hidden', padding: '8px 0', fontSize: 13, fontWeight: 500, background: t.topbarBg, color: t.topbarText }}>
      <style>{`@keyframes lp-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      <div style={{ display: 'inline-flex', whiteSpace: 'nowrap', animation: `lp-scroll ${duration}s linear infinite` }}>
        {[0, 1, 2, 3].map(i => <span key={i} style={{ padding: '0 40px' }}>{text}</span>)}
      </div>
    </div>
  )
}

function ProHeader({ c, t }: SP) {
  const navItems = ((c.navItems as string) || '').split(',').map((item: string) => {
    const [label, href] = item.split('|')
    return { label: label?.trim(), href: href?.trim() || '#' }
  }).filter((n: { label: string; href: string }) => n.label)
  return (
    <header style={{ background: t.headerBg, borderBottom: `2px solid ${t.accent}`, position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 64 }}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em', color: t.logoColor }}>
          {(c.clinicName as string) || 'クリニック名'}
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navItems.map(({ label, href }: { label: string; href: string }) => (
            <a key={label} href={href} style={{ padding: '8px 14px', fontSize: 13, fontWeight: 600, color: t.headerText, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {label}
            </a>
          ))}
          <a href={(c.reserveUrl as string) || '#'} style={{ marginLeft: 8, padding: '8px 20px', fontSize: 13, fontWeight: 700, background: t.accent, color: t.heroBtnText, borderRadius: 4, textDecoration: 'none' }}>
            {(c.reserveLabel as string) || '予約する'}
          </a>
        </nav>
      </div>
    </header>
  )
}

function ProHero({ c, t }: SP) {
  const hasImage = !!c.imageUrl
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 580 }}>
      {/* Left: accent-colored text panel */}
      <div style={{ background: t.accent, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ width: 40, height: 3, background: 'rgba(255,255,255,0.5)', marginBottom: 24 }} />
        <h1 style={{ fontSize: 38, fontWeight: 900, color: '#ffffff', lineHeight: 1.25, marginBottom: 20 }}>
          {(c.title as string) || 'あなたの笑顔のために'}
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, marginBottom: 32 }}>
          {(c.subtitle as string) || 'サブテキストを入力してください'}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#" style={{ padding: '13px 28px', background: '#ffffff', color: t.accent, fontWeight: 700, borderRadius: 4, fontSize: 14, textDecoration: 'none' }}>
            {(c.ctaText as string) || '今すぐ予約する'}
          </a>
          {!!(c.ctaText2 as string) && (
            <a href="#concept" style={{ padding: '13px 28px', border: '2px solid rgba(255,255,255,0.6)', color: '#ffffff', fontWeight: 600, borderRadius: 4, fontSize: 14, textDecoration: 'none' }}>
              {c.ctaText2 as string}
            </a>
          )}
        </div>
      </div>
      {/* Right: image panel */}
      <div style={{ position: 'relative', background: t.sectionAltBg, overflow: 'hidden' }}>
        {hasImage ? (
          <img src={c.imageUrl as string} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 64, opacity: 0.2 }}>🏥</span>
            <span style={{ fontSize: 12, color: t.accentText, opacity: 0.5 }}>クリニック画像をアップロード</span>
          </div>
        )}
      </div>
    </section>
  )
}

function ProConcept({ c, t }: SP) {
  const hasImage = !!c.imageUrl
  return (
    <section id="concept" style={{ background: t.sectionAltBg, padding: '100px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: hasImage ? '1fr 1fr' : '1fr', gap: 60, alignItems: 'center' }}>
        {hasImage && (
          <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3' }}>
            <img src={c.imageUrl as string} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: t.accentText, textTransform: 'uppercase', marginBottom: 12 }}>CONCEPT</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText, marginBottom: 8 }}>{(c.title as string) || 'クリニックの想い'}</h2>
          <p style={{ fontSize: 14, color: t.accentText, fontWeight: 600, marginBottom: 20 }}>{c.subtitle as string}</p>
          <div style={{ width: 40, height: 2, background: t.accent, marginBottom: 24 }} />
          <div style={{ fontSize: 15, lineHeight: 1.9, color: '#6b7280' }} dangerouslySetInnerHTML={{ __html: (c.body as string) || '' }} />
        </div>
      </div>
    </section>
  )
}

function ProFeatures({ c, t }: SP) {
  const items = Array.isArray(c.items) ? (c.items as { icon?: string; title?: string; desc?: string }[]) : []
  return (
    <section style={{ background: '#ffffff', padding: '100px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: t.accentText, textTransform: 'uppercase', marginBottom: 8 }}>FEATURES</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText }}>{(c.title as string) || '選ばれる理由'}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              {/* Large number */}
              <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1, color: t.accentLight, minWidth: 80, textAlign: 'right', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1, paddingTop: 6, borderTop: `2px solid ${t.dividerColor}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 20 }}>{item.icon || '✦'}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: t.headerText, margin: 0 }}>{item.title}</h3>
                </div>
                <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: item.desc || '' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProServices({ c, t }: SP) {
  const items = Array.isArray(c.items)
    ? (c.items as string[])
    : ((c.items as string) || '').split(',').map(s => s.trim()).filter(Boolean)
  return (
    <section id="services" style={{ background: t.sectionAltBg, padding: '80px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: t.accentText, textTransform: 'uppercase', marginBottom: 8 }}>SERVICES</p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText, marginBottom: 40 }}>{(c.title as string) || '診療内容'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: '#ffffff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ width: 4, height: 32, borderRadius: 2, background: t.accent, flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: t.headerText }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProStaff({ c, t }: SP) {
  return (
    <section id="staff" style={{ background: '#ffffff', padding: '100px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: t.accentText, textTransform: 'uppercase', marginBottom: 8 }}>STAFF</p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText, marginBottom: 40 }}>{(c.title as string) || 'スタッフ紹介'}</h2>
        {/* Horizontal card */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center', background: t.sectionAltBg, borderRadius: 12, padding: '40px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 160, height: 200, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: t.cardIconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {c.staffImageUrl ? (
              <img src={c.staffImageUrl as string} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: 52, opacity: 0.3 }}>👨‍⚕️</span>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: t.headerText }}>{(c.staffName as string) || '院長名'}</span>
              <span style={{ fontSize: 13, color: t.accentText, fontWeight: 600 }}>{(c.staffTitle as string) || '院長'}</span>
            </div>
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 20 }}>{c.staffCredentials as string}</p>
            <div style={{ width: 32, height: 2, background: t.accent, marginBottom: 16 }} />
            <div style={{ fontSize: 14, lineHeight: 1.9, color: '#6b7280', fontStyle: 'italic' }}
              dangerouslySetInnerHTML={{ __html: c.staffMessage ? `"${c.staffMessage as string}"` : '' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProGallery({ c, t }: SP) {
  const images = (Array.isArray(c.images) ? (c.images as string[]) : []).filter(url => !!url)
  if (images.length === 0) return null
  return (
    <section style={{ background: t.sectionAltBg, padding: '80px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: t.accentText, textTransform: 'uppercase', marginBottom: 8 }}>GALLERY</p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText, marginBottom: 32 }}>{(c.title as string) || '院内のご案内'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(images.length, 3)}, 1fr)`, gap: 12 }}>
          {images.map((url, i) => (
            <div key={i} style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProContact({ c, t }: SP) {
  const hoursRows = ((c.hours as string) || '').split('\n').filter(Boolean).map((row: string) => {
    const [days, time] = row.split('|')
    return { days: days?.trim(), time: time?.trim() }
  })
  return (
    <section id="access" style={{ background: '#ffffff', padding: '100px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: t.accentText, textTransform: 'uppercase', marginBottom: 8 }}>ACCESS</p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText, marginBottom: 40 }}>{(c.title as string) || 'アクセス'}</h2>
        <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: 40, height: 320, border: `1px solid ${t.dividerColor}` }}>
          <iframe title="map" width="100%" height="100%" style={{ border: 0, display: 'block' }}
            src={`https://maps.google.com/maps?q=${encodeURIComponent((c.address as string) || '')}&t=m&z=16&output=embed&iwloc=B&hl=ja`}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: t.accentText, textTransform: 'uppercase', marginBottom: 8 }}>住所</p>
            <p style={{ fontSize: 15, fontWeight: 600, color: t.headerText, marginBottom: 4 }}>{c.address as string}</p>
            <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 24 }}>{c.access as string}</p>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: t.accentText, textTransform: 'uppercase', marginBottom: 8 }}>お電話</p>
            <p style={{ fontSize: 26, fontWeight: 900, color: t.accent }}>{c.phone as string}</p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: t.accentText, textTransform: 'uppercase', marginBottom: 12 }}>診療時間</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <tbody>
                {hoursRows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${t.dividerColor}` }}>
                    <td style={{ padding: '8px 0', fontWeight: 600, color: t.headerText }}>{row.days}</td>
                    <td style={{ padding: '8px 0', color: '#6b7280', textAlign: 'right' }}>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProCtaBanner({ c, t }: SP) {
  return (
    <section style={{ background: t.accent, padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: '#ffffff', marginBottom: 12 }}>{(c.title as string) || 'まずはお気軽にご相談ください'}</h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', marginBottom: 32 }}>{c.subtitle as string}</p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#" style={{ padding: '14px 36px', background: '#ffffff', color: t.accent, fontWeight: 700, fontSize: 15, borderRadius: 4, textDecoration: 'none' }}>
            {(c.ctaText as string) || 'Web予約する'}
          </a>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#ffffff' }}>📞 {c.phone as string}</span>
        </div>
      </div>
    </section>
  )
}

function ProFooter({ c, t }: SP) {
  return (
    <footer style={{ background: t.footerBg, color: t.footerText, padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, paddingBottom: 32, marginBottom: 24, borderBottom: `1px solid ${t.footerBorder}` }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#ffffff', marginBottom: 16 }}>{c.clinicName as string}</div>
            <p style={{ fontSize: 13, marginBottom: 6 }}>〒 {c.address as string}</p>
            <p style={{ fontSize: 13, marginBottom: 4 }}>TEL: {c.phone as string}</p>
            <p style={{ fontSize: 13 }}>{c.hours as string}</p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Menu</p>
            {['診療内容', 'クリニックの想い', 'スタッフ紹介', 'アクセス'].map(item => (
              <a key={item} href="#" style={{ display: 'block', fontSize: 13, color: t.footerText, textDecoration: 'none', marginBottom: 8, borderBottom: `1px solid ${t.footerBorder}`, paddingBottom: 8 }}>{item}</a>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 12, textAlign: 'center' }}>{(c.copyright as string) || '© 2024 クリニック'}</p>
      </div>
    </footer>
  )
}

export function Template2Renderer({ sections, t }: { sections: PageSection[]; t: LPTheme }) {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif", color: '#374151', background: '#ffffff' }}>
      {sections.filter(s => s.visible).map(s => {
        const props = { c: s.content, t }
        switch (s.type) {
          case 'topbar':     return <ProTopBar key={s.id} {...props} />
          case 'header':     return <ProHeader key={s.id} {...props} />
          case 'hero':       return <ProHero key={s.id} {...props} />
          case 'concept':    return <ProConcept key={s.id} {...props} />
          case 'features':   return <ProFeatures key={s.id} {...props} />
          case 'services':   return <ProServices key={s.id} {...props} />
          case 'staff':      return <ProStaff key={s.id} {...props} />
          case 'gallery':    return <ProGallery key={s.id} {...props} />
          case 'contact':    return <ProContact key={s.id} {...props} />
          case 'cta_banner': return <ProCtaBanner key={s.id} {...props} />
          case 'footer':     return <ProFooter key={s.id} {...props} />
          default:           return null
        }
      })}
    </div>
  )
}
