import React from 'react'
import type { LandingPageContent, SectionConfig, SectionId } from '@/lib/types/landing-page'
import { DEFAULT_SECTIONS } from '@/lib/templates/landing-page-templates'

interface Props {
  content: LandingPageContent
  sections?: SectionConfig[]
  themeColor?: string
  wrapSection?: (id: SectionId, children: React.ReactNode) => React.ReactNode
}

function getOrdered(sections?: SectionConfig[]): SectionId[] {
  return (sections ?? DEFAULT_SECTIONS)
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)
    .map((s) => s.id)
}

export default function TemplatePremium({ content, sections, themeColor, wrapSection }: Props) {
  const { hero, clinicIntro, positions, benefits, workConditions, faq, contact } = content
  const gold = themeColor ?? '#d4a843'
  const ordered = getOrdered(sections)

  function HeroBlock() {
    return (
      <>
        <section
          className="relative min-h-160 flex flex-col items-center justify-center text-center px-6 py-24"
          style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #1e3a5f 100%)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle, ${gold} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }} />
          {hero.heroImage && (
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${hero.heroImage})` }} />
          )}
          <div className="relative z-10 max-w-3xl mx-auto">
            {hero.badgeText && (
              <span className="inline-block border text-xs font-semibold tracking-[0.15em] uppercase px-5 py-2 rounded-full mb-8" style={{ borderColor: gold, color: gold }}>
                {hero.badgeText}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 tracking-wide">{hero.heading}</h1>
            <div className="w-16 h-0.5 mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
            <p className="text-lg text-slate-300 whitespace-pre-line mb-10 leading-relaxed">{hero.subheading}</p>
            <a href="#contact" className="inline-block font-semibold px-10 py-4 rounded-full text-slate-900 text-base tracking-wide hover:opacity-90 transition-opacity shadow-lg" style={{ background: `linear-gradient(135deg, ${gold}, ${gold}cc)` }}>
              {hero.ctaText}
            </a>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        </section>
        <div style={{ background: '#0f172a', borderTop: `1px solid ${gold}10`, borderBottom: `1px solid ${gold}10` }}>
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-10 text-center text-sm">
            {[
              { v: `創業 ${clinicIntro.foundedYear}年`, l: '歴史と実績' },
              { v: `${clinicIntro.staffCount}名`, l: '専門スタッフ' },
              { v: '最新設備', l: '院内完備' },
              { v: 'キャリア', l: '成長支援制度' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-bold text-base" style={{ color: gold }}>{s.v}</div>
                <div className="text-slate-400 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  function ClinicBlock() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-20" style={{ background: '#1e293b' }}>
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: gold }}>About Our Clinic</p>
          <h2 className="text-3xl font-bold text-white">{clinicIntro.name}</h2>
          <p className="text-slate-400 mt-2 text-sm">{clinicIntro.tagline}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-slate-300 leading-relaxed text-base">{clinicIntro.description}</p>
            {(clinicIntro.clinicImages ?? []).length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {(clinicIntro.clinicImages ?? []).map((img, i) => (
                  <img key={i} src={img} alt="" className="w-full h-20 object-cover rounded-lg opacity-80" />
                ))}
              </div>
            )}
          </div>
          <div className="rounded-2xl p-6" style={{ background: '#0f172a', border: `1px solid ${gold}1a` }}>
            <div className="w-8 h-0.5 mb-4" style={{ background: gold }} />
            <p className="text-slate-300 italic text-sm leading-relaxed mb-5">「{clinicIntro.directorMessage}」</p>
            <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${gold}1a` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${gold}20`, color: gold, border: `1px solid ${gold}40` }}>院長</div>
              <div>
                <p className="font-semibold text-white text-sm">{clinicIntro.directorName}</p>
                <p className="text-xs text-slate-400">{clinicIntro.directorTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  function PositionsBlock() {
    return (
      <section className="py-20" style={{ background: '#0f172a' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: gold }}>Open Positions</p>
            <h2 className="text-3xl font-bold text-white">募集職種</h2>
          </div>
          <div className="space-y-5">
            {positions.map((pos) => (
              <div key={pos.id} className="rounded-2xl p-6" style={{ background: '#1e293b', border: `1px solid ${gold}20` }}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-white">{pos.title}</h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${gold}20`, color: gold, border: `1px solid ${gold}40` }}>{pos.employmentType}</span>
                  <span className="text-xs font-semibold text-slate-300 bg-slate-700 px-3 py-1 rounded-full">{pos.salaryText}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{pos.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pos.highlights.map((h, i) => (
                    <span key={i} className="text-xs text-slate-400 border border-slate-600 px-3 py-1 rounded-full">◆ {h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#contact" className="inline-block font-semibold px-10 py-4 rounded-full text-slate-900 hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(135deg, ${gold}, ${gold}cc)` }}>
              {hero.ctaText}
            </a>
          </div>
        </div>
      </section>
    )
  }

  function BenefitsBlock() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-20" style={{ background: '#1e293b' }}>
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: gold }}>Benefits & Perks</p>
          <h2 className="text-3xl font-bold text-white">福利厚生</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <div key={b.id} className="rounded-xl p-5 text-center" style={{ background: '#0f172a', border: `1px solid ${gold}15` }}>
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-semibold text-white text-sm mb-1">{b.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  function ConditionsBlock() {
    return (
      <section className="py-16" style={{ background: '#0f172a', borderTop: `1px solid ${gold}1a`, borderBottom: `1px solid ${gold}1a` }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.25em] uppercase mb-2" style={{ color: gold }}>Working Conditions</p>
            <h2 className="text-2xl font-bold text-white">勤務条件</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: '勤務時間', value: workConditions.hours },
              { label: '休日・休暇', value: workConditions.holidays },
              { label: '研修・教育制度', value: workConditions.training },
              { label: '職場環境', value: workConditions.environment },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 rounded-xl p-4" style={{ background: '#1e293b' }}>
                <div className="w-1 rounded-full shrink-0" style={{ background: gold }} />
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: gold }}>{item.label}</p>
                  <p className="text-slate-300 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  function FaqBlock() {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20" style={{ background: '#1e293b' }}>
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] uppercase mb-2" style={{ color: gold }}>FAQ</p>
          <h2 className="text-3xl font-bold text-white">よくある質問</h2>
        </div>
        <div className="space-y-3">
          {faq.map((item) => (
            <div key={item.id} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${gold}20` }}>
              <div className="px-6 py-4" style={{ background: '#0f172a' }}>
                <p className="font-semibold text-white text-sm flex gap-3">
                  <span style={{ color: gold }}>Q</span>{item.question}
                </p>
              </div>
              <div className="px-6 py-4" style={{ background: '#162032' }}>
                <p className="text-slate-400 text-sm leading-relaxed flex gap-3">
                  <span style={{ color: gold }}>A</span>{item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  function ContactBlock() {
    return (
      <section id="contact" className="py-20" style={{ background: 'linear-gradient(160deg, #0f172a, #1e293b)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-12 h-0.5 mx-auto mb-6" style={{ background: gold }} />
          <h2 className="text-3xl font-bold text-white mb-3">ご応募・お問い合わせ</h2>
          <p className="text-slate-400 mb-8 text-sm leading-relaxed">{contact.applicationNote}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
            {[
              { label: '所在地', value: contact.address },
              { label: 'お電話', value: contact.phone },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-5" style={{ background: '#1e293b', border: `1px solid ${gold}20` }}>
                <p className="text-xs mb-1" style={{ color: gold }}>{item.label}</p>
                <p className="text-white font-semibold text-sm">{item.value}</p>
              </div>
            ))}
            {contact.email && (
              <div className="rounded-xl p-5 sm:col-span-2" style={{ background: '#1e293b', border: `1px solid ${gold}20` }}>
                <p className="text-xs mb-1" style={{ color: gold }}>メール</p>
                <p className="text-white font-semibold text-sm">{contact.email}</p>
              </div>
            )}
          </div>
          <a href={`tel:${contact.phone}`} className="inline-block font-bold px-10 py-4 rounded-full text-slate-900 hover:opacity-90 transition-opacity text-base" style={{ background: `linear-gradient(135deg, ${gold}, ${gold}cc)` }}>
            お問い合わせはこちら
          </a>
          <div className="w-12 h-0.5 mx-auto mt-8" style={{ background: gold }} />
        </div>
      </section>
    )
  }

  const W = wrapSection ?? ((_: SectionId, c: React.ReactNode) => c)
  const blockMap: Partial<Record<SectionId, () => React.ReactNode>> = {
    hero:       () => W('hero',       <HeroBlock />),
    clinic:     () => W('clinic',     <ClinicBlock />),
    positions:  () => W('positions',  <PositionsBlock />),
    benefits:   () => W('benefits',   <BenefitsBlock />),
    conditions: () => W('conditions', <ConditionsBlock />),
    faq:        () => W('faq',        <FaqBlock />),
    contact:    () => W('contact',    <ContactBlock />),
  }

  return (
    <div className="font-sans text-slate-100" style={{ background: '#1e293b' }}>
      {ordered.map((id) => <React.Fragment key={id}>{blockMap[id]?.()}</React.Fragment>)}
      <footer className="py-6 text-center" style={{ background: '#020617', borderTop: `1px solid ${gold}0d` }}>
        <p className="text-slate-600 text-xs tracking-widest">&copy; {clinicIntro.name.toUpperCase()}</p>
      </footer>
    </div>
  )
}
