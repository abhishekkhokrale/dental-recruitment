import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 ページが見つかりません | ブルージョブズ',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white flex flex-col items-center justify-center px-4 py-16">
      {/* 404 number */}
      <p
        className="text-8xl font-extrabold text-cyan-100 select-none leading-none tracking-tight"
        aria-hidden="true"
      >
        404
      </p>

      {/* Icon */}
      <div className="mt-4 mb-6 w-20 h-20 rounded-full bg-cyan-50 border-2 border-cyan-100 flex items-center justify-center text-4xl">
        🦷
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
        ページが見つかりません
      </h1>

      {/* Description */}
      <p className="text-base text-gray-500 text-center max-w-md leading-relaxed mb-8">
        お探しのページは存在しないか、移動した可能性があります。
        URLをご確認いただくか、以下のリンクからご利用ください。
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
        <Link
          href="/"
          className="w-full sm:w-auto px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm rounded-xl transition-colors text-center shadow-sm hover:shadow"
        >
          トップページへ戻る
        </Link>
        <Link
          href="/jobs"
          className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl border border-gray-200 hover:border-gray-300 transition-colors text-center"
        >
          求人を探す
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-10 text-center">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium">よく使われるページ</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { href: '/register', label: '無料会員登録' },
            { href: '/community', label: 'コミュニティ' },
            { href: '/clinic/dashboard', label: 'クリニックの方' },
            { href: '/contact', label: 'お問い合わせ' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
