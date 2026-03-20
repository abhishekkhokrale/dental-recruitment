import Link from 'next/link'
import NavLinks from './NavLinks'

const navLinks = [
  { href: '/jobs', label: '求人を探す' },
  { href: '/clinic/dashboard', label: 'クリニックの方' },
  { href: '/community', label: 'コミュニティ' },
]

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl" aria-hidden="true">🦷</span>
            <span className="text-xl font-bold text-cyan-600 tracking-tight">
              デンタルキャリア
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="メインナビゲーション">
            <NavLinks links={navLinks} />
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-cyan-600 transition-colors"
            >
              ログイン
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
            >
              無料登録
            </Link>
          </div>

          {/* Mobile hamburger */}
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  // Static server-rendered hamburger icon; interactivity can be added via a client component if needed
  return (
    <button
      type="button"
      className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-cyan-600 hover:bg-gray-100 transition-colors"
      aria-label="メニューを開く"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  )
}
