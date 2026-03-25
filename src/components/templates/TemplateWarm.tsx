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

export default function TemplateWarm({ content, sections, themeColor, wrapSection }: Props) {
  const { hero, clinicIntro, positions, benefits, workConditions, faq, contact } = content
  const primary = themeColor ?? '#f97316'
  const ordered = getOrdered(sections)

  function HeroBlock() {
    return (
      <>
        <section
          className="relative min-h-150 flex flex-col items-center justify-center text-center px-6 py-24"
          style={{ background: `linear-gradient(135deg, ${primary} 0%, #f43f5e 100%)` }}
        >
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="#fef9f0" /></svg>
          </div>
          {hero.heroImage && (
            <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${hero.heroImage})` }} />
          )}
          <div className="relative z-10 max-w-3xl mx-auto">
            {hero.badgeText && (
              <span className="inline-block bg-white/25 border-2 border-white/50 text-white text-sm font-bold px-5 py-2 rounded-full mb-6">
                🌸 {hero.badgeText}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5 drop-shadow-sm">{hero.heading}</h1>
            <p className="text-xl text-white/90 whitespace-pre-line mb-10 leading-relaxed">{hero.subheading}</p>
            <a href="#contact" className="inline-block bg-white font-extrabold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-all text-base" style={{ color: primary }}>
              {hero.ctaText} 🌟
            </a>
          </div>
        </section>
        <div className="bg-amber-50 pb-4 pt-8">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '📅', label: '創業', value: `${clinicIntro.foundedYear}年` },
              { emoji: '👥', label: 'スタッフ', value: `${clinicIntro.staffCount}名` },
              { emoji: '👶', label: '育休', value: '取得率100%' },
              { emoji: '😊', label: '定着率', value: '95%以上' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-orange-100">
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="text-xl font-extrabold" style={{ color: primary }}>{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  function ClinicBlock() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-14 bg-amber-50">
        <div className="text-center mb-10">
          <span className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-3" style={{ background: primary }}>私たちのこと</span>
          <h2 className="text-3xl font-extrabold text-gray-900">{clinicIntro.name}</h2>
          <p className="text-gray-500 mt-2 text-base">{clinicIntro.tagline}</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100">
          <p className="text-gray-600 leading-relaxed mb-6 text-base">{clinicIntro.description}</p>
          {(clinicIntro.clinicImages ?? []).length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-6">
              {(clinicIntro.clinicImages ?? []).map((img, i) => (
                <img key={i} src={img} alt="" className="w-full h-24 object-cover rounded-xl" />
              ))}
            </div>
          )}
          <div className="rounded-2xl p-6 border border-orange-100" style={{ background: `linear-gradient(to right, ${primary}10, #f43f5e10)` }}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-200 flex items-center justify-center text-2xl shrink-0">👨‍⚕️</div>
              <div>
                <p className="text-xs font-bold mb-1" style={{ color: primary }}>院長からのメッセージ</p>
                <p className="text-gray-700 italic leading-relaxed text-sm mb-3">「{clinicIntro.directorMessage}」</p>
                <p className="text-sm font-bold text-gray-900">{clinicIntro.directorName}</p>
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
      <section className="py-16" style={{ background: `linear-gradient(to bottom, ${primary}10, ${primary}05)` }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-3" style={{ background: primary }}>募集中</span>
            <h2 className="text-3xl font-extrabold text-gray-900">一緒に働く仲間を募集中！</h2>
          </div>
          <div className="space-y-5">
            {positions.map((pos) => (
              <div key={pos.id} className="bg-white rounded-3xl p-6 shadow-sm border-2 border-orange-100 hover:border-orange-300 transition-colors">
                <div className="flex flex-wrap gap-2 mb-3">
                  <h3 className="text-xl font-extrabold text-gray-900 w-full">{pos.title}</h3>
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: primary + '15', color: primary }}>{pos.employmentType}</span>
                  <span className="bg-rose-100 text-rose-600 text-xs font-bold px-3 py-1 rounded-full">💰 {pos.salaryText}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{pos.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pos.highlights.map((h, i) => (
                    <span key={i} className="bg-amber-50 border border-amber-200 text-amber-700 text-xs px-3 py-1 rounded-full">🌟 {h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#contact" className="inline-block text-white font-extrabold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-all text-base" style={{ background: primary }}>
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
          <h2 className="text-3xl font-extrabold text-gray-900">嬉しい福利厚生 🎁</h2>
          <p className="text-gray-500 mt-2 text-sm">スタッフが笑顔で働けるよう充実した制度を整えています</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-orange-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-extrabold text-gray-900 text-sm mb-1">{b.title}</h3>
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
          <h2 className="text-2xl font-extrabold text-white text-center mb-8">⏰ 勤務条件</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: '勤務時間', value: workConditions.hours },
              { label: '休日・休暇', value: workConditions.holidays },
              { label: '研修・サポート', value: workConditions.training },
              { label: '職場環境', value: workConditions.environment },
            ].map((item) => (
              <div key={item.label} className="bg-white/20 rounded-2xl p-5">
                <p className="text-white/80 text-xs font-bold mb-1">{item.label}</p>
                <p className="text-white font-bold text-sm">{item.value}</p>
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
          <h2 className="text-3xl font-extrabold text-gray-900">よくある質問 💬</h2>
        </div>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100">
              <p className="font-extrabold text-sm mb-2 flex gap-2" style={{ color: primary }}>
                <span className="rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 bg-orange-100" style={{ color: primary }}>Q{i + 1}</span>
                {item.question}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed pl-8">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  function ContactBlock() {
    return (
      <section id="contact" className="py-16" style={{ background: `linear-gradient(135deg, ${primary}, #f43f5e)` }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">一歩踏み出してみませんか？ 🌸</h2>
          <p className="text-white/85 mb-8 text-sm leading-relaxed">{contact.applicationNote}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur">
              <p className="text-white/70 text-xs mb-1">📍 所在地</p>
              <p className="text-white font-semibold text-sm">{contact.address}</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur">
              <p className="text-white/70 text-xs mb-1">📞 お電話</p>
              <p className="text-white font-bold text-base">{contact.phone}</p>
            </div>
            {contact.email && (
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur sm:col-span-2">
                <p className="text-white/70 text-xs mb-1">✉️ メール</p>
                <p className="text-white text-sm">{contact.email}</p>
              </div>
            )}
          </div>
          <a href={`tel:${contact.phone}`} className="inline-block bg-white font-extrabold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-transform text-base" style={{ color: primary }}>
            📞 今すぐ問い合わせる
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
    <div className="font-sans text-gray-900 bg-amber-50">
      {ordered.map((id) => <React.Fragment key={id}>{blockMap[id]?.()}</React.Fragment>)}
      <footer className="bg-amber-900 py-6 text-center">
        <p className="text-amber-200 text-xs">&copy; {clinicIntro.name}</p>
      </footer>
    </div>
  )
}
