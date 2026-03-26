'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { LandingPageRenderer, type PageSection, type ThemeId } from '@/components/clinic/LandingPageRenderer'
import { lpLoad } from '@/lib/lpStorage'

export default function PublicClinicLandingPage() {
  const params = useParams()
  const slug = params.slug as string

  const [sections, setSections] = useState<PageSection[] | null>(null)
  const [themeId, setThemeId] = useState<ThemeId>('clean')
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    lpLoad(slug).then((data) => {
      if (!data) { setNotFound(true); return }
      const parsed = data as { sections: PageSection[]; themeId: ThemeId }
      setSections(parsed.sections)
      setThemeId(parsed.themeId)
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

  return <LandingPageRenderer sections={sections} themeId={themeId} />
}
