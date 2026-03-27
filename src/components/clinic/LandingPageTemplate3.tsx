'use client'

// ─── Template 3: Boutique (ブティック) ───────────────────────────────────────
// Layout: centered header with flanking lines, organic blob hero,
//         left-border feature cards, circle staff photo, masonry gallery,
//         pill-style services, centered footer
// Font: serif for warmth

import { type PageSection, type LPTheme } from './LandingPageRenderer'

type SP = { c: Record<string, unknown>; t: LPTheme }

function BqTopBar({ c, t }: SP) {
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

function BqHeader({ c, t }: SP) {
  const navItems = ((c.navItems as string) || '').split(',').map((item: string) => {
    const [label, href] = item.split('|')
    return { label: label?.trim(), href: href?.trim() || '#' }
  }).filter((n: { label: string; href: string }) => n.label)
  return (
    <header style={{ background: t.headerBg, borderBottom: `1px solid ${t.headerBorder}`, padding: '16px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Centered name with flanking decorative lines */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 1, background: t.headerBorder }} />
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '0.12em', color: t.logoColor }}>
            {(c.clinicName as string) || 'クリニック名'}
          </span>
          <div style={{ flex: 1, height: 1, background: t.headerBorder }} />
        </div>
        {/* Centered navigation */}
        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          {navItems.map(({ label, href }: { label: string; href: string }) => (
            <a key={label} href={href} style={{ fontSize: 12, fontWeight: 600, color: t.headerText, letterSpacing: '0.06em', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {label}
            </a>
          ))}
          <a href={(c.reserveUrl as string) || '#'} style={{ fontSize: 12, fontWeight: 700, color: '#ffffff', background: t.accent, padding: '6px 20px', borderRadius: 20, textDecoration: 'none' }}>
            {(c.reserveLabel as string) || 'ご予約'}
          </a>
        </nav>
      </div>
    </header>
  )
}

function BqHero({ c, t }: SP) {
  const hasImage = !!c.imageUrl
  return (
    <section style={{ background: t.sectionAltBg, padding: '80px 24px', overflow: 'hidden', position: 'relative' }}>
      {/* Organic decorative blobs */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 340, height: 340, borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', background: t.accentLight, opacity: 0.6, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', background: t.cardIconBg, opacity: 0.4, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', gap: 60, alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: t.accentText, textTransform: 'uppercase', marginBottom: 16 }}>WELCOME TO OUR CLINIC</p>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: t.headerText, lineHeight: 1.25, marginBottom: 20 }}>
            {(c.title as string) || 'あなたの笑顔のために'}
          </h1>
          <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.85, marginBottom: 32 }}>
            {(c.subtitle as string) || 'サブテキスト'}
          </p>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: t.accent, color: '#ffffff', fontWeight: 700, borderRadius: 40, fontSize: 14, textDecoration: 'none' }}>
            {(c.ctaText as string) || '予約する'} →
          </a>
        </div>
        {/* Organic blob image frame */}
        <div style={{ width: 360, height: 400, flexShrink: 0, borderRadius: '60% 40% 40% 60% / 50% 50% 50% 50%', overflow: 'hidden', background: t.cardIconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 24px 60px ${t.accentLight}` }}>
          {hasImage ? (
            <img src={c.imageUrl as string} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 80, opacity: 0.2 }}>🏥</span>
          )}
        </div>
      </div>
    </section>
  )
}

function BqConcept({ c, t }: SP) {
  const hasImage = !!c.imageUrl
  return (
    <section id="concept" style={{ background: '#ffffff', padding: '100px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 60, alignItems: 'center' }}>
        {hasImage && (
          <div style={{ width: 360, flexShrink: 0, borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%', overflow: 'hidden', aspectRatio: '1' }}>
            <img src={c.imageUrl as string} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ flex: 1, textAlign: hasImage ? 'left' : 'center' }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: t.accentText, textTransform: 'uppercase', marginBottom: 12 }}>CONCEPT</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText, marginBottom: 8 }}>{c.title as string}</h2>
          <p style={{ fontSize: 14, color: t.accentText, fontWeight: 600, marginBottom: 20 }}>{c.subtitle as string}</p>
          <div style={{ width: 40, height: 3, background: t.accent, borderRadius: 2, marginBottom: 24, ...(hasImage ? {} : { margin: '0 auto 24px' }) }} />
          <div style={{ fontSize: 15, lineHeight: 1.9, color: '#6b7280' }} dangerouslySetInnerHTML={{ __html: (c.body as string) || '' }} />
        </div>
      </div>
    </section>
  )
}

function BqFeatures({ c, t }: SP) {
  const items = Array.isArray(c.items) ? (c.items as { icon?: string; title?: string; desc?: string }[]) : []
  return (
    <section style={{ background: t.sectionAltBg, padding: '100px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: t.accentText, textTransform: 'uppercase', marginBottom: 10 }}>FEATURES</p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText }}>{(c.title as string) || '選ばれる理由'}</h2>
        </div>
        {/* Left-border stacked cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, padding: '20px 24px', background: '#ffffff', borderRadius: 16, borderLeft: `5px solid ${t.accent}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 24, width: 48, height: 48, borderRadius: '50%', background: t.cardIconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.icon || '✦'}
              </div>
              <div style={{ flex: 1, paddingTop: 2 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: t.headerText, marginBottom: 6 }}>{item.title}</h3>
                <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item.desc || '' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BqServices({ c, t }: SP) {
  const items = Array.isArray(c.items)
    ? (c.items as string[])
    : ((c.items as string) || '').split(',').map(s => s.trim()).filter(Boolean)
  return (
    <section id="services" style={{ background: '#ffffff', padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: t.accentText, textTransform: 'uppercase', marginBottom: 10 }}>SERVICES</p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText, marginBottom: 40 }}>{(c.title as string) || '診療内容'}</h2>
        {/* Pill / bubble style */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {items.map((item, i) => (
            <span key={i} style={{ padding: '10px 26px', borderRadius: 40, border: `1.5px solid ${t.accent}`, color: t.accentText, fontSize: 14, fontWeight: 600 }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function BqStaff({ c, t }: SP) {
  return (
    <section id="staff" style={{ background: t.cardBg, padding: '100px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: t.accentText, textTransform: 'uppercase', marginBottom: 10 }}>STAFF</p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText, marginBottom: 40 }}>{(c.title as string) || 'スタッフ紹介'}</h2>
        {/* Large circle photo */}
        <div style={{ width: 160, height: 160, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', background: t.cardIconBg, border: `4px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 40px ${t.accentLight}` }}>
          {c.staffImageUrl ? (
            <img src={c.staffImageUrl as string} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 56, opacity: 0.3 }}>👨‍⚕️</span>
          )}
        </div>
        <p style={{ fontSize: 22, fontWeight: 800, color: t.headerText, marginBottom: 4 }}>{(c.staffName as string) || '院長名'}</p>
        <p style={{ fontSize: 13, color: t.accentText, fontWeight: 600, marginBottom: 6 }}>{(c.staffTitle as string) || '院長'}</p>
        <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 28 }}>{c.staffCredentials as string}</p>
        <div style={{ width: 36, height: 2, background: t.accent, borderRadius: 2, margin: '0 auto 24px' }} />
        <div style={{ fontSize: 14, lineHeight: 1.9, color: '#6b7280', fontStyle: 'italic' }}
          dangerouslySetInnerHTML={{ __html: c.staffMessage ? `"${c.staffMessage as string}"` : '' }} />
      </div>
    </section>
  )
}

function BqGallery({ c, t }: SP) {
  const images = (Array.isArray(c.images) ? (c.images as string[]) : []).filter(url => !!url)
  if (images.length === 0) return null
  return (
    <section style={{ background: t.sectionAltBg, padding: '80px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: t.accentText, textTransform: 'uppercase', marginBottom: 10 }}>GALLERY</p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText, marginBottom: 32 }}>{(c.title as string) || '院内のご案内'}</h2>
        {/* Masonry via CSS columns */}
        <div style={{ columns: images.length <= 2 ? images.length : 3, columnGap: 12 }}>
          {images.map((url, i) => (
            <div key={i} style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 12, breakInside: 'avoid' }}>
              <img src={url} alt="" style={{ width: '100%', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BqContact({ c, t }: SP) {
  const hoursRows = ((c.hours as string) || '').split('\n').filter(Boolean).map((row: string) => {
    const [days, time] = row.split('|')
    return { days: days?.trim(), time: time?.trim() }
  })
  return (
    <section id="access" style={{ background: '#ffffff', padding: '100px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: t.accentText, textTransform: 'uppercase', marginBottom: 10 }}>ACCESS</p>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: t.headerText, marginBottom: 40 }}>{(c.title as string) || 'アクセス'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, textAlign: 'left' }}>
          <div style={{ borderRadius: 24, overflow: 'hidden', height: 340, border: `1px solid ${t.dividerColor}` }}>
            <iframe title="map" width="100%" height="100%" style={{ border: 0, display: 'block' }}
              src={`https://maps.google.com/maps?q=${encodeURIComponent((c.address as string) || '')}&t=m&z=16&output=embed&iwloc=B&hl=ja`}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: t.sectionAltBg, borderRadius: 20, padding: '20px 24px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: t.accentText, marginBottom: 6 }}>📍 住所</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: t.headerText, marginBottom: 4 }}>{c.address as string}</p>
              <p style={{ fontSize: 12, color: '#9ca3af' }}>{c.access as string}</p>
            </div>
            <div style={{ background: t.sectionAltBg, borderRadius: 20, padding: '20px 24px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: t.accentText, marginBottom: 6 }}>📞 お電話</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: t.accent }}>{c.phone as string}</p>
            </div>
            <div style={{ background: t.sectionAltBg, borderRadius: 20, padding: '20px 24px', flex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: t.accentText, marginBottom: 10 }}>🕐 診療時間</p>
              {hoursRows.map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < hoursRows.length - 1 ? `1px solid ${t.dividerColor}` : 'none' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: t.headerText }}>{row.days}</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BqCtaBanner({ c, t }: SP) {
  return (
    <section style={{ background: t.sectionAltBg, padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', background: '#ffffff', borderRadius: 32, padding: '60px 48px', boxShadow: '0 8px 48px rgba(0,0,0,0.07)', border: `1px solid ${t.dividerColor}` }}>
        <div style={{ width: 48, height: 4, background: t.accent, borderRadius: 2, margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 26, fontWeight: 900, color: t.headerText, marginBottom: 12 }}>{(c.title as string) || 'まずはお気軽にご相談ください'}</h2>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32 }}>{c.subtitle as string}</p>
        <a href="#" style={{ display: 'inline-block', padding: '14px 44px', background: t.accent, color: '#ffffff', fontWeight: 700, fontSize: 15, borderRadius: 40, textDecoration: 'none', marginBottom: 20 }}>
          {(c.ctaText as string) || 'Web予約する'}
        </a>
        <p style={{ fontSize: 20, fontWeight: 800, color: t.accent }}>📞 {c.phone as string}</p>
      </div>
    </section>
  )
}

function BqFooter({ c, t }: SP) {
  return (
    <footer style={{ background: t.footerBg, color: t.footerText, padding: '60px 24px 32px', textAlign: 'center' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: t.footerBorder }} />
          <span style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', letterSpacing: '0.12em' }}>{c.clinicName as string}</span>
          <div style={{ flex: 1, height: 1, background: t.footerBorder }} />
        </div>
        <p style={{ fontSize: 13, marginBottom: 6 }}>{c.address as string}</p>
        <p style={{ fontSize: 13, marginBottom: 4 }}>TEL: {c.phone as string}</p>
        <p style={{ fontSize: 13, marginBottom: 32 }}>{c.hours as string}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
          {['診療内容', 'クリニックの想い', 'スタッフ紹介', 'アクセス'].map(item => (
            <a key={item} href="#" style={{ fontSize: 12, color: t.footerText, textDecoration: 'none', letterSpacing: '0.06em' }}>{item}</a>
          ))}
        </div>
        <p style={{ fontSize: 11, borderTop: `1px solid ${t.footerBorder}`, paddingTop: 20 }}>{(c.copyright as string) || '© 2024 クリニック'}</p>
      </div>
    </footer>
  )
}

export function Template3Renderer({ sections, t }: { sections: PageSection[]; t: LPTheme }) {
  return (
    <div style={{ fontFamily: "'Georgia', 'Hiragino Mincho ProN', 'Yu Mincho', serif", color: '#374151', background: '#ffffff' }}>
      {sections.filter(s => s.visible).map(s => {
        const props = { c: s.content, t }
        switch (s.type) {
          case 'topbar':     return <BqTopBar key={s.id} {...props} />
          case 'header':     return <BqHeader key={s.id} {...props} />
          case 'hero':       return <BqHero key={s.id} {...props} />
          case 'concept':    return <BqConcept key={s.id} {...props} />
          case 'features':   return <BqFeatures key={s.id} {...props} />
          case 'services':   return <BqServices key={s.id} {...props} />
          case 'staff':      return <BqStaff key={s.id} {...props} />
          case 'gallery':    return <BqGallery key={s.id} {...props} />
          case 'contact':    return <BqContact key={s.id} {...props} />
          case 'cta_banner': return <BqCtaBanner key={s.id} {...props} />
          case 'footer':     return <BqFooter key={s.id} {...props} />
          default:           return null
        }
      })}
    </div>
  )
}
