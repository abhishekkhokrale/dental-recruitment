'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { LandingPageRenderer, type LPTheme, type PageSection, type TemplateId, type ThemeId } from '@/components/clinic/LandingPageRenderer'
import { lpLoad } from '@/lib/lpStorage'
import { loadAllThemes } from '@/lib/themeStorage'
import { loadAllTemplates, type FreeTemplate } from '@/lib/templateStorage'

export default function PublicClinicLandingPage() {
  const params = useParams()
  const slug = params.slug as string

  const [sections, setSections] = useState<PageSection[] | null>(null)
  const [templateId, setTemplateId] = useState<TemplateId>('modern')
  const [themeId, setThemeId] = useState<ThemeId>('clean')
  const [customTheme, setCustomTheme] = useState<Partial<LPTheme>>({})
  const [adminThemes, setAdminThemes] = useState<Record<string, LPTheme>>({})
  const [freeTemplate, setFreeTemplate] = useState<FreeTemplate | undefined>(undefined)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    loadAllThemes().then(setAdminThemes).catch(() => {})
    lpLoad(slug).then(async (data) => {
      if (!data) { setNotFound(true); return }
      const parsed = data as { sections: PageSection[]; templateId?: TemplateId; themeId: ThemeId; customTheme?: Partial<LPTheme> }
      const tid = parsed.templateId ?? 'modern'
      setSections(parsed.sections)
      setTemplateId(tid)
      setThemeId(parsed.themeId)
      setCustomTheme(parsed.customTheme ?? {})
      if (tid.startsWith('free_')) {
        const templates = await loadAllTemplates().catch(() => ({} as Record<string, FreeTemplate>))
        setFreeTemplate(templates[tid])
      }
    }).catch(() => setNotFound(true))
  }, [slug])

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <div className="text-5xl">🦷</div>
        <h1 className="text-xl font-bold text-gray-900">ページが見つかりません</h1>
        <p className="text-sm text-gray-500">このURLの採用ページは存在しないか、まだ公開されていません。</p>
        <Link href="/jobs" className="mt-2 px-5 py-2.5 text-sm font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition">
          求人一覧へ戻る
        </Link>
      </div>
    )
  }

  if (!sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <LandingPageRenderer sections={sections} templateId={templateId} themeId={themeId} customTheme={customTheme} extraThemes={adminThemes} freeTemplate={freeTemplate} />
}
