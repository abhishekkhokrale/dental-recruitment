'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Qualification } from '@/lib/types/seeker'

type Step = 1 | 2 | 3

const QUALIFICATIONS: Qualification[] = ['歯科衛生士', '歯科医師', '歯科助手', '歯科技工士', 'なし']
const EXPERIENCE_OPTIONS = [
  { value: 0, label: '0年（未経験）' },
  { value: 1, label: '1年' },
  { value: 2, label: '2年' },
  { value: 3, label: '3年' },
  { value: 5, label: '5年' },
  { value: 10, label: '10年以上' },
]
const EMPLOYMENT_TYPES = ['正社員', 'パート・アルバイト', '契約社員']
const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
]

function StepIndicator({ current }: { current: Step }) {
  const steps: { num: Step; label: string }[] = [
    { num: 1, label: '基本情報' },
    { num: 2, label: '資格・経験' },
    { num: 3, label: '希望条件' },
  ]
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                current === step.num
                  ? 'bg-cyan-600 text-white'
                  : current > step.num
                  ? 'bg-cyan-100 text-cyan-700'
                  : 'bg-gray-100 text-gray-400',
              ].join(' ')}
            >
              {current > step.num ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span className={[
              'text-xs mt-1',
              current === step.num ? 'text-cyan-600 font-medium' : 'text-gray-400',
            ].join(' ')}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={[
                'w-12 h-0.5 mx-1 mb-4',
                current > step.num ? 'bg-cyan-200' : 'bg-gray-200',
              ].join(' ')}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function RegisterForm() {
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)

  // Step 1 fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [prefecture, setPrefecture] = useState('')

  // Step 2 fields
  const [qualifications, setQualifications] = useState<Qualification[]>([])
  const [experienceYears, setExperienceYears] = useState(0)

  // Step 3 fields
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([])
  const [desiredSalaryMin, setDesiredSalaryMin] = useState('')
  const [bio, setBio] = useState('')
  const [agreed, setAgreed] = useState(false)

  function toggleQualification(q: Qualification) {
    setQualifications((prev) =>
      prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]
    )
  }

  function toggleEmploymentType(t: string) {
    setEmploymentTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    )
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('新規登録:', {
      name, email, password, prefecture,
      qualifications, experienceYears,
      employmentTypes, desiredSalaryMin, bio, agreed,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">登録完了！</h2>
        <p className="text-gray-600 text-sm mb-6">アカウントが作成されました。求人を探してみましょう。</p>
        <Link
          href="/jobs"
          className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
        >
          求人を探す
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">無料会員登録</h1>
      <p className="text-sm text-gray-500 text-center mb-6">歯科業界の転職・就職をサポートします</p>

      <StepIndicator current={step} />

      {step === 1 && (
        <form
          onSubmit={(e) => { e.preventDefault(); setStep(2) }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              氏名 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="山田 花子"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              id="reg-email"
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1">
              パスワード <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="8文字以上"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700 mb-1">
              都道府県
            </label>
            <select
              id="prefecture"
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-white"
            >
              <option value="">選択してください</option>
              {PREFECTURES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors mt-2"
          >
            次へ
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => { e.preventDefault(); setStep(3) }}
          className="space-y-5"
        >
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              保有資格 <span className="text-gray-400 font-normal">（複数選択可）</span>
            </p>
            <div className="space-y-2">
              {QUALIFICATIONS.map((q) => (
                <label key={q} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={qualifications.includes(q)}
                    onChange={() => toggleQualification(q)}
                    className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-700">{q}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
              経験年数
            </label>
            <select
              id="experience"
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-white"
            >
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              戻る
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
            >
              次へ
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              希望雇用形態 <span className="text-gray-400 font-normal">（複数選択可）</span>
            </p>
            <div className="space-y-2">
              {EMPLOYMENT_TYPES.map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={employmentTypes.includes(t)}
                    onChange={() => toggleEmploymentType(t)}
                    className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-700">{t}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="salary-min" className="block text-sm font-medium text-gray-700 mb-1">
              希望月給（最低）<span className="text-gray-400 font-normal text-xs ml-1">任意</span>
            </label>
            <div className="relative">
              <input
                id="salary-min"
                type="number"
                placeholder="200000"
                value={desiredSalaryMin}
                onChange={(e) => setDesiredSalaryMin(e.target.value)}
                min={0}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">円</span>
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              自己紹介<span className="text-gray-400 font-normal text-xs ml-1">任意</span>
            </label>
            <textarea
              id="bio"
              placeholder="経験やアピールポイントを自由にご記入ください"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition resize-none"
            />
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 shrink-0"
            />
            <span className="text-sm text-gray-600">
              <Link href="/terms" className="text-cyan-600 hover:underline">利用規約</Link>
              と
              <Link href="/privacy" className="text-cyan-600 hover:underline">プライバシーポリシー</Link>
              に同意します
            </span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              戻る
            </button>
            <button
              type="submit"
              disabled={!agreed}
              className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              登録する
            </button>
          </div>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        すでにアカウントをお持ちの方は{' '}
        <Link href="/login" className="text-cyan-600 font-medium hover:text-cyan-700 hover:underline">
          ログイン
        </Link>
      </p>
    </div>
  )
}
