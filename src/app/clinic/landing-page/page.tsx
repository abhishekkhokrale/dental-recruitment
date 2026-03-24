import type { Metadata } from 'next'
import LandingPageBuilder from '@/components/clinic/LandingPageBuilder'

export const metadata: Metadata = {
  title: '採用ページ作成 | スマイル歯科クリニック',
}

export default function LandingPageBuilderPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">採用ランディングページ作成</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          コーディング不要で、クリニック専用の採用ページを作成・公開できます。
        </p>
      </div>
      <LandingPageBuilder />
    </div>
  )
}
