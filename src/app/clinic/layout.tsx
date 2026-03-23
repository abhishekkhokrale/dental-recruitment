import Link from 'next/link'
import { redirect } from 'next/navigation'
import ClinicSidebarLinks from '@/components/clinic/ClinicSidebarLinks'
import { getSessionUser } from '@/lib/auth'
import UserAvatarDropdown from '@/components/layout/UserAvatarDropdown'

export default async function ClinicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSessionUser()
  if (!user || user.role !== 'clinic') redirect('/login')
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col shrink-0 overflow-y-auto">
        {/* Clinic identity */}
        <div className="px-5 py-5 border-b border-gray-100">
          <Link href="/clinic/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center shrink-0 text-white text-lg font-bold shadow-sm">
              🦷
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">管理者</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-3">
          <ClinicSidebarLinks />
        </div>

        {/* Footer links */}
        <div className="px-5 py-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span>🌐</span>
            <span>採用サイトを見る</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
            <span className="text-gray-400">{user.name}</span>
            <svg
              className="w-4 h-4 shrink-0 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-gray-700 font-medium">クリニック管理画面</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:inline">{user.name}</span>
            <UserAvatarDropdown
              name={user.name}
              email={user.email}
              initials={user.name.charAt(0)}
              profileHref="#"
              avatarClass="bg-cyan-100 text-cyan-700"
            />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
