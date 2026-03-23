'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Prefecture } from '@/lib/types/job'

const prefectures: Prefecture[] = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
  '岐阜県', '静岡県', '愛知県', '三重県',
  '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

export default function JobSearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [prefecture, setPrefecture] = useState(searchParams.get('prefecture') ?? '')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (prefecture) params.set('prefecture', prefecture)
    const qs = params.toString()
    router.push('/jobs' + (qs ? '?' + qs : ''))
  }

  return (
    <form
      action="/jobs"
      method="GET"
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white rounded-full shadow-md px-3 py-2"
    >
      {/* Keyword input */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <svg
          className="w-5 h-5 text-gray-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="職種・キーワードを入力"
          autoComplete="off"
          className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-6 bg-gray-200 shrink-0" aria-hidden="true" />

      {/* Prefecture select */}
      <div className="flex items-center gap-2 sm:w-44">
        <svg
          className="w-5 h-5 text-gray-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <select
          name="prefecture"
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          className="w-full bg-transparent text-sm text-gray-800 outline-none cursor-pointer"
        >
          <option value="">都道府県を選択</option>
          {prefectures.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </select>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="shrink-0 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-full transition-colors"
      >
        求人を探す
      </button>
    </form>
  )
}
