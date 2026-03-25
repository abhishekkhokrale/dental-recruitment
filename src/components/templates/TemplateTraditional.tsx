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

export default function TemplateTraditional({ content, sections, themeColor, wrapSection }: Props) {
  const { hero, clinicIntro, positions, benefits, workConditions, faq, contact } = content
  const primary = themeColor ?? '#1e40af'
  const ordered = getOrdered(sections)

  function HeroBlock() {
    return (
      <>
        <div style={{ background: primary }} className="text-white text-xs text-center py-2 tracking-wider">
          ◆ 地域医療に貢献 {clinicIntro.foundedYear}年創業　|　スタッフ数 {clinicIntro.staffCount}名　|　産休・育休取得実績100% ◆
        </div>
        <section
          className="relative min-h-140 flex flex-col items-center justify-center text-center px-6 py-24"
          style={{ background: `linear-gradient(180deg, ${primary} 0%, ${primary}ee 60%, ${primary}cc 100%)` }}
        >
          <div className="absolute top-0 left-0 right-0 h-2" style={{ background: `repeating-linear-gradient(90deg, ${primary}80 0px, ${primary}80 8px, ${primary} 8px, ${primary} 16px)` }} />
          {hero.heroImage && (
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${hero.heroImage})` }} />
          )}
          <div className="relative z-10 max-w-3xl mx-auto">
            {hero.badgeText && (
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12 bg-blue-300" />
                <span className="text-blue-200 text-sm font-semibold tracking-widest">{hero.badgeText}</span>
                <div className="h-px w-12 bg-blue-300" />
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 tracking-wide">{hero.heading}</h1>
            <p className="text-lg text-blue-100 whitespace-pre-line mb-10 leading-relaxed">{hero.subheading}</p>
            <a href="#contact" className="inline-block bg-white font-bold px-10 py-4 rounded text-base hover:bg-blue-50 transition-colors shadow-lg border-b-4 border-blue-300" style={{ color: primary }}>
              {hero.ctaText}
            </a>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: `repeating-linear-gradient(90deg, ${primary}80 0px, ${primary}80 8px, ${primary} 8px, ${primary} 16px)` }} />
        </section>
        <div style={{ background: primary + '15', borderBottom: `2px solid ${primary}20` }}>
          <div className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-6">
            {['✅ 社会保険完備', '✅ 産休・育休実績', '✅ 残業ほぼなし', '✅ 退職金制度あり', '✅ 研修制度充実'].map((item) => (
              <span key={item} className="text-sm font-semibold" style={{ color: primary }}>{item}</span>
            ))}
          </div>
        </div>
      </>
    )
  }

  function ClinicBlock() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-8 rounded-full" style={{ background: primary }} />
          <h2 className="text-2xl font-bold text-gray-900">クリニックについて</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2" style={{ color: primary }}>{clinicIntro.name}</h3>
            <p className="text-gray-500 text-sm mb-4 border-l-2 pl-3" style={{ borderColor: primary + '50' }}>{clinicIntro.tagline}</p>
            <p className="text-gray-600 leading-relaxed text-sm">{clinicIntro.description}</p>
            {(clinicIntro.clinicImages ?? []).length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {(clinicIntro.clinicImages ?? []).map((img, i) => (
                  <img key={i} src={img} alt="" className="w-full h-20 object-cover rounded border border-blue-100" />
                ))}
              </div>
            )}
          </div>
          <div className="rounded border p-6" style={{ background: primary + '08', borderColor: primary + '30' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5" style={{ background: primary }} />
              <p className="font-bold text-sm" style={{ color: primary }}>院長メッセージ</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">「{clinicIntro.directorMessage}」</p>
            <div className="pt-4 flex items-center gap-3" style={{ borderTop: `1px solid ${primary}20` }}>
              <div className="w-10 h-10 rounded flex items-center justify-center text-white text-xs font-bold" style={{ background: primary + '40', color: primary }}>院長</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{clinicIntro.directorName}</p>
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
      <section className="py-16" style={{ background: primary + '08', borderTop: `1px solid ${primary}15`, borderBottom: `1px solid ${primary}15` }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-8 rounded-full" style={{ background: primary }} />
            <h2 className="text-2xl font-bold text-gray-900">募集職種</h2>
          </div>
          <div className="space-y-4">
            {positions.map((pos) => (
              <div key={pos.id} className="bg-white border rounded p-6 shadow-sm" style={{ borderColor: primary + '30' }}>
                <div className="flex flex-wrap items-center gap-3 mb-3 pb-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <h3 className="text-lg font-bold text-gray-900">{pos.title}</h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded" style={{ background: primary + '15', color: primary }}>{pos.employmentType}</span>
                  <span className="text-gray-600 font-semibold text-sm">{pos.salaryText}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{pos.description}</p>
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    <tr>
                      {pos.highlights.map((h, i) => (
                        <td key={i} className="border px-3 py-2 text-center font-medium" style={{ background: primary + '08', borderColor: primary + '20', color: primary }}>
                          {h}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#contact" className="inline-block text-white font-bold px-10 py-4 rounded hover:opacity-90 transition-opacity border-b-4" style={{ background: primary, borderColor: primary + 'aa' }}>
              {hero.ctaText}
            </a>
          </div>
        </div>
      </section>
    )
  }

  function BenefitsBlock() {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-8 rounded-full" style={{ background: primary }} />
          <h2 className="text-2xl font-bold text-gray-900">福利厚生・待遇</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <div key={b.id} className="border rounded p-4 bg-white hover:bg-blue-50 transition-colors" style={{ borderColor: primary + '30' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{b.icon}</span>
                <h3 className="font-bold text-gray-900 text-sm">{b.title}</h3>
              </div>
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
          <h2 className="text-2xl font-bold text-white mb-8 text-center border-b border-white/30 pb-4">勤務条件</h2>
          <div className="bg-white rounded overflow-hidden border border-blue-200">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: '勤務時間', value: workConditions.hours },
                  { label: '休日・休暇', value: workConditions.holidays },
                  { label: '研修・教育', value: workConditions.training },
                  { label: '職場環境', value: workConditions.environment },
                ].map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                    <th className="text-left px-5 py-4 font-bold w-36 border-r text-xs" style={{ color: primary, borderColor: primary + '20' }}>{row.label}</th>
                    <td className="px-5 py-4 text-gray-700">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }

  function FaqBlock() {
    return (
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-8 rounded-full" style={{ background: primary }} />
          <h2 className="text-2xl font-bold text-gray-900">よくあるご質問</h2>
        </div>
        <div className="space-y-3">
          {faq.map((item) => (
            <div key={item.id} className="border rounded overflow-hidden" style={{ borderColor: primary + '30' }}>
              <div className="px-5 py-4 flex gap-3" style={{ background: primary }}>
                <span className="bg-white font-bold text-xs w-6 h-6 rounded flex items-center justify-center shrink-0" style={{ color: primary }}>Q</span>
                <p className="font-semibold text-white text-sm">{item.question}</p>
              </div>
              <div className="px-5 py-4 flex gap-3">
                <span className="font-bold text-xs w-6 h-6 rounded flex items-center justify-center shrink-0" style={{ background: primary + '15', color: primary }}>A</span>
                <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  function ContactBlock() {
    return (
      <section id="contact" className="py-16" style={{ background: primary }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">採用へのお問い合わせ</h2>
          <div className="w-16 h-0.5 bg-blue-300 mx-auto mb-6" />
          <p className="text-blue-200 mb-8 text-sm leading-relaxed">{contact.applicationNote}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 rounded p-5 text-left border border-white/20">
              <p className="text-blue-300 text-xs mb-1">所在地</p>
              <p className="text-white font-semibold text-sm">{contact.address}</p>
            </div>
            <div className="bg-white/10 rounded p-5 text-left border border-white/20">
              <p className="text-blue-300 text-xs mb-1">お電話</p>
              <p className="text-white font-bold text-base">{contact.phone}</p>
            </div>
            {contact.email && (
              <div className="bg-white/10 rounded p-5 text-left border border-white/20 sm:col-span-2">
                <p className="text-blue-300 text-xs mb-1">メール</p>
                <p className="text-white text-sm">{contact.email}</p>
              </div>
            )}
          </div>
          <a href={`tel:${contact.phone}`} className="inline-block bg-white font-bold px-10 py-4 rounded hover:bg-blue-50 transition-colors border-b-4 border-blue-200 text-base" style={{ color: primary }}>
            お電話でお問い合わせ
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
      <footer className="py-6 text-center border-t-2" style={{ background: primary + 'ee', borderColor: primary }}>
        <p className="text-blue-200 text-xs">&copy; {clinicIntro.name}　クリニックページ</p>
      </footer>
    </div>
  )
}
