import Link from 'next/link'
import { redirect } from 'next/navigation'
import AdminSidebarLinks from '@/components/admin/AdminSidebarLinks'
import { getSessionUser } from '@/lib/auth'
import { logoutAction } from '@/app/actions/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser()
  if (!user || user.role !== 'admin') redirect('/login')
  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 h-screen sticky top-0 flex flex-col shrink-0 overflow-y-auto border-r border-gray-800">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center shrink-0 text-white text-sm font-bold shadow-sm">
              管
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white leading-tight tracking-tight">
                ブルージョブズ
              </p>
              <p className="text-xs text-orange-400 mt-0.5 font-medium">管理者画面</p>
            </div>
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex-1 py-4">
          <AdminSidebarLinks />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            <span>採用サイトを見る</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto bg-gray-50">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 shrink-0 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-orange-600">管理者画面</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {/* Alert badge */}
            <button
              type="button"
              className="relative w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="通知"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500" aria-hidden="true" />
            </button>
            {/* Admin name */}
            <span className="text-sm text-gray-600 hidden sm:inline">{user.name}</span>
            {/* Logout */}
            <form action={logoutAction}>
              <button type="submit" className="text-xs text-gray-500 hover:text-red-600 transition-colors px-2 py-1 rounded hover:bg-red-50">
                ログアウト
              </button>
            </form>
            {/* Admin avatar */}
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-700">
              管
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
