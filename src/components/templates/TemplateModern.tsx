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

export default function TemplateModern({ content, sections, themeColor, wrapSection }: Props) {
  const { hero, clinicIntro, positions, benefits, workConditions, faq, contact } = content
  const primary = themeColor ?? '#2ca9e1'
  const ordered = getOrdered(sections)

  function HeroBlock() {
    return (
      <>
        <section
          className="relative min-h-[560px] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${primary} 0%, ${primary}cc 50%, #19448e 100%)` }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 bg-white translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 bg-white -translate-x-1/3 translate-y-1/3" />
          {hero.heroImage && (
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${hero.heroImage})` }} />
          )}
          <div className="relative z-10 max-w-3xl mx-auto">
            {hero.badgeText && (
              <span className="inline-block bg-white/20 border border-white/40 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                {hero.badgeText}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">{hero.heading}</h1>
            <p className="text-lg text-white/85 whitespace-pre-line mb-8 max-w-xl mx-auto leading-relaxed">{hero.subheading}</p>
            <a href="#contact" className="inline-block bg-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-base" style={{ color: primary }}>
              {hero.ctaText} →
            </a>
          </div>
        </section>
        <div style={{ background: primary + 'dd' }}>
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-8 text-center text-sm text-white">
            <div><span className="font-bold text-lg">{clinicIntro.foundedYear}年</span><span className="ml-1 text-white/70">創業</span></div>
            <div><span className="font-bold text-lg">{clinicIntro.staffCount}名</span><span className="ml-1 text-white/70">スタッフ在籍</span></div>
            <div><span className="font-bold text-lg">産休</span><span className="ml-1 text-white/70">取得実績あり</span></div>
            <div><span className="font-bold text-lg">残業</span><span className="ml-1 text-white/70">ほぼなし</span></div>
          </div>
        </div>
      </>
    )
  }

  function ClinicBlock() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: primary }}>About Us</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{clinicIntro.name}</h2>
          <p className="text-gray-500 mt-2">{clinicIntro.tagline}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-gray-600 leading-relaxed text-base">{clinicIntro.description}</p>
            {(clinicIntro.clinicImages ?? []).length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {(clinicIntro.clinicImages ?? []).map((img, i) => (
                  <img key={i} src={img} alt="" className="w-full h-20 object-cover rounded-lg" />
                ))}
              </div>
            )}
          </div>
          <div className="rounded-2xl p-6 border" style={{ background: primary + '10', borderColor: primary + '30' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: primary }}>院長メッセージ</p>
            <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">「{clinicIntro.directorMessage}」</p>
            <div className="flex items-center gap-3 pt-3" style={{ borderTop: `1px solid ${primary}30` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: primary }}>院長</div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{clinicIntro.directorName}</p>
                <p className="text-xs text-gray-500">{clinicIntro.directorTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  function PositionsBlock() {
    return (
      <section className="bg-gray-50 py-16" id="positions">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: primary }}>Open Positions</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">募集職種</h2>
          </div>
          <div className="space-y-4">
            {positions.map((pos) => (
              <div key={pos.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{pos.title}</h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: primary + '15', color: primary }}>{pos.employmentType}</span>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">{pos.salaryText}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{pos.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pos.highlights.map((h, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">✓ {h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#contact" className="inline-block text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity" style={{ background: primary }}>
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
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: primary }}>Benefits</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">福利厚生・待遇</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <div key={b.id} className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-sm transition-all">
              <div className="text-3xl mb-2">{b.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{b.title}</h3>
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
          <h2 className="text-2xl font-bold text-white text-center mb-8">勤務条件</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: '勤務時間', value: workConditions.hours, icon: '🕐' },
              { label: '休日', value: workConditions.holidays, icon: '📅' },
              { label: '研修・教育', value: workConditions.training, icon: '📚' },
              { label: '職場環境', value: workConditions.environment, icon: '🏢' },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white/70 text-xs font-medium">{item.label}</span>
                </div>
                <p className="text-white font-medium text-sm">{item.value}</p>
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
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: primary }}>FAQ</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">よくある質問</h2>
        </div>
        <div className="space-y-4">
          {faq.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4" style={{ background: primary + '10' }}>
                <p className="font-semibold text-gray-900 text-sm flex gap-2">
                  <span className="font-bold" style={{ color: primary }}>Q.</span>
                  {item.question}
                </p>
              </div>
              <div className="px-5 py-4">
                <p className="text-gray-600 text-sm leading-relaxed flex gap-2">
                  <span className="font-bold" style={{ color: primary }}>A.</span>
                  {item.answer}
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
      <section id="contact" className="bg-gray-900 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">お問い合わせ・ご応募</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">{contact.applicationNote}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-xs mb-1">住所</p>
              <p className="text-white text-sm">{contact.address}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-xs mb-1">電話番号</p>
              <p className="text-white text-sm font-semibold">{contact.phone}</p>
            </div>
            {contact.email && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 sm:col-span-2">
                <p className="text-gray-400 text-xs mb-1">メール</p>
                <p className="text-white text-sm">{contact.email}</p>
              </div>
            )}
          </div>
          <a href={`tel:${contact.phone}`} className="inline-block text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-base" style={{ background: primary }}>
            📞 電話で問い合わせる
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
        <p className="text-gray-500 text-xs">&copy; {clinicIntro.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}
