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

export default function TemplateFresh({ content, sections, themeColor, wrapSection }: Props) {
  const { hero, clinicIntro, positions, benefits, workConditions, faq, contact } = content
  const primary = themeColor ?? '#10b981'
  const ordered = getOrdered(sections)

  function HeroBlock() {
    return (
      <>
        <section
          className="relative min-h-145 flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${primary} 0%, ${primary}99 100%)` }}
        >
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-20 bg-emerald-300" />
          <div className="absolute bottom-16 right-16 w-56 h-56 rounded-full opacity-15 bg-teal-300" />
          {hero.heroImage && (
            <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${hero.heroImage})` }} />
          )}
          <div className="relative z-10 max-w-3xl mx-auto">
            {hero.badgeText && (
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white text-sm font-bold px-5 py-2 rounded-full mb-6 border border-white/30">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {hero.badgeText}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">{hero.heading}</h1>
            <p className="text-lg text-white/85 whitespace-pre-line mb-10 leading-relaxed">{hero.subheading}</p>
            <a href="#contact" className="inline-block bg-white font-black px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-base" style={{ color: primary }}>
              {hero.ctaText} ↓
            </a>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 40" fill="none">
              <path d="M0 40L100 0L200 40L300 0L400 40L500 0L600 40L700 0L800 40L900 0L1000 40L1100 0L1200 40V40H0V40Z" fill="white" />
            </svg>
          </div>
        </section>
        <div className="bg-white pb-6 pt-2">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-4 gap-3">
            {[
              { n: `${clinicIntro.foundedYear}年`, d: '設立' },
              { n: `${clinicIntro.staffCount}人`, d: 'スタッフ' },
              { n: '年2回', d: '賞与あり' },
              { n: '育休', d: '100%取得' },
            ].map((s) => (
              <div key={s.d} className="text-center py-4 border-b-2" style={{ borderColor: primary }}>
                <div className="text-2xl font-black" style={{ color: primary }}>{s.n}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  function ClinicBlock() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="w-8 h-1 rounded-full" style={{ background: primary }} />
          <span className="font-black text-sm uppercase tracking-wider" style={{ color: primary }}>About</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-8">{clinicIntro.name}</h2>
        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <p className="text-lg font-bold mb-3" style={{ color: primary }}>{clinicIntro.tagline}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{clinicIntro.description}</p>
            {(clinicIntro.clinicImages ?? []).length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {(clinicIntro.clinicImages ?? []).map((img, i) => (
                  <img key={i} src={img} alt="" className="w-full h-20 object-cover rounded-xl" />
                ))}
              </div>
            )}
          </div>
          <div className="md:col-span-2 rounded-r-2xl p-6 border-l-4" style={{ background: primary + '10', borderColor: primary }}>
            <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: primary }}>DIRECTOR&apos;S MESSAGE</p>
            <p className="text-gray-700 text-sm italic leading-relaxed mb-4">「{clinicIntro.directorMessage}」</p>
            <p className="font-black text-gray-900 text-sm">{clinicIntro.directorName}</p>
            <p className="text-xs text-gray-500">{clinicIntro.directorTitle}</p>
          </div>
        </div>
      </section>
    )
  }

  function PositionsBlock() {
    return (
      <section className="bg-gray-50 py-16" id="positions">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="w-8 h-1 rounded-full" style={{ background: primary }} />
            <span className="font-black text-sm uppercase tracking-wider" style={{ color: primary }}>Positions</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-8">募集職種</h2>
          <div className="space-y-4">
            {positions.map((pos) => (
              <div key={pos.id} className="bg-white rounded-2xl p-6 border-l-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: primary }}>
                <div className="flex flex-wrap gap-2 mb-3">
                  <h3 className="text-xl font-black text-gray-900 w-full">{pos.title}</h3>
                  <span className="text-xs font-black px-3 py-1 rounded-lg" style={{ background: primary + '15', color: primary }}>{pos.employmentType}</span>
                  <span className="text-xs font-black px-3 py-1 rounded-lg bg-teal-100 text-teal-700">{pos.salaryText}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{pos.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pos.highlights.map((h, i) => (
                    <span key={i} className="text-xs font-semibold px-3 py-1 rounded-lg border" style={{ background: primary + '0a', color: primary, borderColor: primary + '30' }}>
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#contact" className="inline-block text-white font-black px-10 py-4 rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg text-base" style={{ background: primary }}>
              {hero.ctaText} →
            </a>
          </div>
        </div>
      </section>
    )
  }

  function BenefitsBlock() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="w-8 h-1 rounded-full" style={{ background: primary }} />
          <span className="font-black text-sm uppercase tracking-wider" style={{ color: primary }}>Benefits</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-8">福利厚生</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <div key={b.id} className="group border-2 border-gray-100 rounded-2xl p-5 transition-all hover:shadow-md" style={{}}>
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-black text-gray-900 text-sm mb-1">{b.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  function ConditionsBlock() {
    return (
      <section className="py-14" style={{ background: primary }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-white mb-8 text-center">勤務条件</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: '勤務時間', value: workConditions.hours, icon: '⏰' },
              { label: '休日', value: workConditions.holidays, icon: '🌿' },
              { label: '研修・教育', value: workConditions.training, icon: '🎓' },
              { label: '職場環境', value: workConditions.environment, icon: '✨' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-4 flex items-start gap-3">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-xs font-black mb-0.5" style={{ color: primary }}>{item.label}</p>
                  <p className="text-gray-800 font-semibold text-sm">{item.value}</p>
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
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="w-8 h-1 rounded-full" style={{ background: primary }} />
          <span className="font-black text-sm uppercase tracking-wider" style={{ color: primary }}>FAQ</span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-8">よくある質問</h2>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <div key={item.id} className="border-2 border-gray-100 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 flex gap-3 items-start" style={{ background: primary + '10' }}>
                <span className="text-white text-xs font-black w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: primary }}>
                  {i + 1}
                </span>
                <p className="font-black text-gray-900 text-sm">{item.question}</p>
              </div>
              <div className="px-5 py-4">
                <p className="text-gray-600 text-sm leading-relaxed pl-9">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  function ContactBlock() {
    return (
      <section id="contact" className="bg-gray-900 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="inline-block text-white text-xs font-black px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider" style={{ background: primary }}>
            Apply Now
          </span>
          <h2 className="text-3xl font-black text-white mb-3">一緒に働きましょう</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">{contact.applicationNote}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-xs mb-1">📍 住所</p>
              <p className="text-white text-sm font-semibold">{contact.address}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-xs mb-1">📞 電話</p>
              <p className="text-white text-base font-black">{contact.phone}</p>
            </div>
            {contact.email && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 sm:col-span-2">
                <p className="text-gray-400 text-xs mb-1">✉️ メール</p>
                <p className="text-white text-sm">{contact.email}</p>
              </div>
            )}
          </div>
          <a href={`tel:${contact.phone}`} className="inline-block text-white font-black px-10 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg text-base" style={{ background: primary }}>
            今すぐ問い合わせる →
          </a>
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
    <div className="font-sans text-gray-900 bg-white">
      {ordered.map((id) => <React.Fragment key={id}>{blockMap[id]?.()}</React.Fragment>)}
      <footer className="bg-gray-950 py-6 text-center">
        <p className="text-gray-600 text-xs">&copy; {clinicIntro.name}</p>
      </footer>
    </div>
  )
}
