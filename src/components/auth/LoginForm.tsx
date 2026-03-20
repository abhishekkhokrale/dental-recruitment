'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { loginAction } from '@/app/actions/auth'

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, {})

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">ログイン</h1>

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
            id="email"
            name="email"
            type="email"
            placeholder="メールアドレス"
            required
            autoComplete="email"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="パスワード"
            required
            autoComplete="current-password"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
          />
        </div>

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline"
          >
            パスワードを忘れた方はこちら
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 disabled:cursor-wait text-white font-semibold rounded-lg transition-colors"
        >
          {isPending ? 'ログイン中...' : 'ログインする'}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">または</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <a
        href="/api/auth/line"
        className="w-full py-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <span className="inline-flex items-center justify-center w-5 h-5 bg-white rounded-sm">
          <svg viewBox="0 0 24 24" fill="#06C755" className="w-4 h-4" aria-hidden="true">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
        </span>
        LINEでログイン
      </a>

      <p className="mt-6 text-center text-sm text-gray-600">
        アカウントをお持ちでない方は{' '}
        <Link
          href="/register"
          className="text-cyan-600 font-medium hover:text-cyan-700 hover:underline"
        >
          無料登録
        </Link>
      </p>
    </div>
  )
}
