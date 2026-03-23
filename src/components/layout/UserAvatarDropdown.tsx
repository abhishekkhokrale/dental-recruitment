'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { logoutAction } from '@/app/actions/auth'

interface Props {
  name: string
  email: string
  initials: string
  profileHref: string
  avatarClass: string   // e.g. "bg-cyan-100 text-cyan-700"
}

export default function UserAvatarDropdown({ name, email, initials, profileHref, avatarClass }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-current transition-all select-none ${avatarClass}`}
        aria-label="ユーザーメニュー"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
          {/* User info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
            <p className="text-xs text-gray-400 truncate mt-0.5">{email}</p>
          </div>

          {/* Actions */}
          <div className="py-1">
            {profileHref !== '#' && (
              <Link
                href={profileHref}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                プロフィール
              </Link>
            )}
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
                ログアウト
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
