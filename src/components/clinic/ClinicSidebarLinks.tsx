'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { href: '/clinic/dashboard', label: 'ダッシュボード', icon: '🏠' },
  { href: '/clinic/jobs', label: '求人管理', icon: '📋' },
  { href: '/clinic/jobs/new', label: '求人作成', icon: '➕' },
  { href: '/clinic/ats', label: '応募者管理（ATS）', icon: '👥' },
  { href: '/clinic/messages', label: 'メッセージ', icon: '💬' },
  { href: '/clinic/settings', label: '設定', icon: '⚙️' },
]

export default function ClinicSidebarLinks() {
  const pathname = usePathname()

  return (
    <nav className="mt-2 px-3 space-y-0.5">
      {navItems.map((item) => {
        const isActive =
          item.href === '/clinic/jobs'
            ? pathname === '/clinic/jobs'
            : pathname === item.href || pathname.startsWith(item.href + '/')

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-cyan-50 text-cyan-700 border-r-2 border-cyan-600 rounded-r-none'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            ].join(' ')}
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
