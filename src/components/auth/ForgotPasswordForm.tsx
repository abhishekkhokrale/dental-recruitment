'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { forgotPasswordAction } from '@/app/actions/auth'

export default function ForgotPasswordForm() {
  const [state, action, isPending] = useActionState(forgotPasswordAction, {})

  if (state.success) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-14 h-14 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">メールを送信しました</h2>
        <p className="text-sm text-gray-600 mb-6">{state.success}</p>
        <Link href="/login" className="text-sm text-cyan-600 hover:underline">
          ログインページへ戻る
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">パスワードをお忘れの方</h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        登録済みのメールアドレスを入力してください。
        <br />パスワードリセットのリンクをお送りします。
      </p>

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

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 disabled:cursor-wait text-white font-semibold rounded-lg transition-colors"
        >
          {isPending ? '送信中...' : 'リセットメールを送信'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        <Link href="/login" className="text-cyan-600 hover:underline">
          ← ログインページへ戻る
        </Link>
      </p>
    </div>
  )
}
