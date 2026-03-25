import type { Metadata } from 'next'
import Link from 'next/link'
import { mockLandingPages } from '@/lib/mock-data/landing-pages'
import { TEMPLATES } from '@/lib/templates/landing-page-templates'

export const metadata: Metadata = {
  title: 'クリニックLP管理 | クリニック管理',
}

function StatusBadge({ status, isClinicPage }: { status: 'draft' | 'published'; isClinicPage: boolean }) {
  if (status === 'published') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          公開中
        </span>
        {isClinicPage && (
          <span className="text-xs font-semibold text-cyan-700 bg-cyan-100 px-2 py-1 rounded-full">クリニック公式</span>
        )}
      </div>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
      下書き
    </span>
  )
}

export default function LandingPageListPage() {
  const pages = mockLandingPages

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-900">クリニックランディングページ</h1>
          <p className="text-sm text-gray-500 mt-1">
            テンプレートを使ってクリニックの公式LPを作成・管理します。公開すると専用URLが発行されます。
          </p>
        </div>
        <Link
          href="/clinic/landing-page/new"
          className="flex items-center gap-2 bg-cyan-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-cyan-700 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          新しいLPを作成
        </Link>
      </div>

      {/* LP list */}
      {pages.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <div className="text-5xl mb-4">📄</div>
          <p className="text-gray-500 font-medium">まだクリニックLPがありません</p>
          <p className="text-gray-400 text-sm mt-1 mb-6">テンプレートを選んで最初のLPを作成しましょう</p>
          <Link href="/clinic/landing-page/new" className="inline-block bg-cyan-600 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-cyan-700 transition-colors">
            LPを作成する
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {pages.map((lp) => {
            const template = TEMPLATES.find((t) => t.id === lp.templateId)
            const publicUrl = `/clinics/${lp.clinicSlug}`
            return (
              <div key={lp.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-5 hover:shadow-sm transition-shadow">
                {/* Template preview */}
                <div
                  className="w-20 h-14 rounded-xl shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${template?.gradientFrom ?? '#2ca9e1'}, ${template?.gradientTo ?? '#1d8fc0'})` }}
                >
                  LP
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{lp.title}</h3>
                    <StatusBadge status={lp.status} isClinicPage={lp.isClinicPage} />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>テンプレート: {template?.nameJa}</span>
                    {lp.status === 'published' && (
                      <>
                        <span className="font-mono text-cyan-600">{publicUrl}</span>
                        <span className="text-green-600">👁 {lp.viewCount.toLocaleString()} 表示</span>
                      </>
                    )}
                    <span>更新: {new Date(lp.updatedAt).toLocaleDateString('ja-JP')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {lp.status === 'published' && (
                    <Link
                      href={publicUrl}
                      target="_blank"
                      className="text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      公開ページ ↗
                    </Link>
                  )}
                  <Link
                    href={`/clinic/landing-page/${lp.id}/preview`}
                    target="_blank"
                    className="text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
                  >
                    プレビュー
                  </Link>
                  <Link
                    href={`/clinic/landing-page/${lp.id}/edit`}
                    className="text-xs text-white bg-cyan-600 hover:bg-cyan-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                  >
                    編集する
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* URL info box */}
      <div className="mt-8 bg-cyan-50 border border-cyan-200 rounded-2xl p-5">
        <h3 className="font-semibold text-cyan-900 text-sm mb-2">🌐 公開URLについて</h3>
        <p className="text-cyan-700 text-xs leading-relaxed">
          LPを公開すると <span className="font-mono bg-white/50 px-1 rounded">/clinics/[クリニックスラッグ]</span> の形式で専用URLが発行されます。
          このURLをSNSや求人サイトに掲載してください。クリニック公式ページとして設定したLPは採用サイトからもリンクされます。
        </p>
      </div>

      {/* Templates gallery */}
      <div className="mt-10">
        <h2 className="text-base font-bold text-gray-900 mb-4">利用可能なテンプレート（5種類）</h2>
        <div className="grid grid-cols-5 gap-3">
          {TEMPLATES.map((t) => (
            <div key={t.id} className="text-center">
              <div
                className="w-full h-20 rounded-xl mb-2 flex items-end justify-center pb-2 shadow-sm"
                style={{ background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})` }}
              >
                {t.recommended && <span className="bg-white/80 text-cyan-700 text-xs font-bold px-2 py-0.5 rounded-full">推奨</span>}
              </div>
              <p className="text-xs font-semibold text-gray-700 leading-tight">{t.nameJa}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/clinic/landing-page/new" className="text-sm text-cyan-600 hover:text-cyan-800 font-medium">
            テンプレートを選んでLPを作成する →
          </Link>
        </div>
      </div>
    </div>
  )
}
