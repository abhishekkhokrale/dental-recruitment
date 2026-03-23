'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { loginAction } from '@/app/actions/auth'

const DEMO = [
  { label: '求職者',     email: 'seeker@bluejobs.jp', password: 'seeker1234', badge: 'bg-cyan-100 text-cyan-700'   },
  { label: 'クリニック', email: 'clinic@bluejobs.jp', password: 'clinic1234', badge: 'bg-teal-100 text-teal-700'   },
  { label: '管理者',     email: 'admin@bluejobs.jp',  password: 'admin1234',  badge: 'bg-orange-100 text-orange-700' },
]

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, {})

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">ログイン</h1>
      <p className="text-xs text-gray-400 text-center mb-5">
        ロールに応じてダッシュボードへリダイレクトされます
      </p>

      {/* Demo accounts */}
      <div className="mb-5 rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
        {DEMO.map((d) => (
          <div key={d.label} className="flex items-center gap-3 px-3 py-2 bg-gray-50">
            <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${d.badge}`}>
              {d.label}
            </span>
            <span className="text-xs text-gray-600 font-mono truncate">{d.email}</span>
            <span className="text-xs text-gray-400 font-mono ml-auto shrink-0">{d.password}</span>
          </div>
        ))}
      </div>

      {state.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {state.error}
        </div>
      )}

      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <input
            id="email" name="email" type="email"
            placeholder="メールアドレス" required autoComplete="email"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード
          </label>
          <input
            id="password" name="password" type="password"
            placeholder="パスワード" required autoComplete="current-password"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
          />
        </div>

        <div className="text-right">
          <Link href="/forgot-password" className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline">
            パスワードを忘れた方はこちら
          </Link>
        </div>

        <button
          type="submit" disabled={isPending}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 disabled:cursor-wait text-white font-semibold rounded-lg transition-colors"
        >
          {isPending ? 'ログイン中...' : 'ログインする'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        アカウントをお持ちでない方は{' '}
        <Link href="/register" className="text-cyan-600 font-medium hover:text-cyan-700 hover:underline">
          無料登録
        </Link>
      </p>
    </div>
  )
}
