'use client'

import { useState } from 'react'
import type { JobType, EmploymentType } from '@/lib/types/job'

const jobTypes: JobType[] = ['歯科衛生士', '歯科医師', '歯科助手', '受付・事務', '歯科技工士']
const employmentTypes: EmploymentType[] = ['正社員', 'パート・アルバイト', '契約社員', '派遣社員']
const salaryTypes = ['月給', '時給', '年収'] as const
type SalaryType = typeof salaryTypes[number]

interface FormData {
  // Step 1
  jobType: JobType | ''
  employmentType: EmploymentType | ''
  title: string
  // Step 2
  salaryType: SalaryType
  salaryMin: string
  salaryMax: string
  workingHours: string
  holidays: string
  // Step 3
  description: string
  requirements: string
  benefits: string
}

const initialData: FormData = {
  jobType: '',
  employmentType: '',
  title: '',
  salaryType: '月給',
  salaryMin: '',
  salaryMax: '',
  workingHours: '',
  holidays: '',
  description: '',
  requirements: '',
  benefits: '',
}

const stepLabels = ['基本情報', '勤務条件', '仕事内容', '確認・公開']

function inputClass(hasError = false) {
  return [
    'w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 bg-white',
    'focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition',
    hasError ? 'border-red-400' : 'border-gray-300 hover:border-gray-400',
  ].join(' ')
}

function labelClass() {
  return 'block text-sm font-medium text-gray-700 mb-1.5'
}

export default function JobPostForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialData)
  const [published, setPublished] = useState(false)
  const [draft, setDraft] = useState(false)

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handlePublish() {
    setPublished(true)
  }

  function handleDraft() {
    setDraft(true)
  }

  if (published) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
          ✅
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">求人を公開しました</h2>
          <p className="text-sm text-gray-500 mt-2">求人票が公開されました。応募者の連絡をお待ちください。</p>
        </div>
        <div className="flex gap-3 mt-2">
          <a
            href="/clinic/jobs"
            className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            求人一覧へ
          </a>
          <button
            type="button"
            onClick={() => { setForm(initialData); setPublished(false); setStep(1) }}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            新しい求人を作成
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress steps */}
      <div className="flex items-center justify-between mb-8">
        {stepLabels.map((label, idx) => {
          const num = idx + 1
          const isActive = num === step
          const isDone = num < step
          return (
            <div key={num} className="flex items-center gap-2 flex-1 last:flex-none">
              <div
                className={[
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                  isDone
                    ? 'bg-cyan-600 text-white'
                    : isActive
                    ? 'bg-cyan-600 text-white ring-4 ring-cyan-100'
                    : 'bg-gray-200 text-gray-500',
                ].join(' ')}
              >
                {isDone ? '✓' : num}
              </div>
              <span
                className={`text-xs font-medium hidden sm:inline ${
                  isActive ? 'text-cyan-700' : isDone ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
              {idx < stepLabels.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 ${isDone ? 'bg-cyan-400' : 'bg-gray-200'}`}
                />
              )}
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* Step 1: 基本情報 */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-gray-900 border-l-4 border-cyan-600 pl-3">
              基本情報
            </h2>

            <div>
              <label className={labelClass()} htmlFor="jobType">職種</label>
              <select
                id="jobType"
                value={form.jobType}
                onChange={(e) => set('jobType', e.target.value as JobType)}
                className={inputClass()}
              >
                <option value="">選択してください</option>
                {jobTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass()} htmlFor="employmentType">雇用形態</label>
              <select
                id="employmentType"
                value={form.employmentType}
                onChange={(e) => set('employmentType', e.target.value as EmploymentType)}
                className={inputClass()}
              >
                <option value="">選択してください</option>
                {employmentTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass()} htmlFor="title">求人タイトル</label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="例：歯科衛生士（正社員）｜渋谷駅徒歩3分・残業ほぼなし"
                className={inputClass()}
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!form.jobType || !form.employmentType || !form.title.trim()}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                次へ →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: 勤務条件 */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-gray-900 border-l-4 border-cyan-600 pl-3">
              勤務条件
            </h2>

            <div>
              <p className={labelClass()}>給与タイプ</p>
              <div className="flex gap-4">
                {salaryTypes.map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="salaryType"
                      value={t}
                      checked={form.salaryType === t}
                      onChange={() => set('salaryType', t)}
                      className="accent-cyan-600"
                    />
                    <span className="text-sm text-gray-700">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass()} htmlFor="salaryMin">
                  最低{form.salaryType === '時給' ? '時給' : '給与'}
                </label>
                <div className="relative">
                  <input
                    id="salaryMin"
                    type="number"
                    value={form.salaryMin}
                    onChange={(e) => set('salaryMin', e.target.value)}
                    placeholder={form.salaryType === '時給' ? '1200' : '250000'}
                    className={inputClass()}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">円</span>
                </div>
              </div>
              <div>
                <label className={labelClass()} htmlFor="salaryMax">
                  最高{form.salaryType === '時給' ? '時給' : '給与'}
                </label>
                <div className="relative">
                  <input
                    id="salaryMax"
                    type="number"
                    value={form.salaryMax}
                    onChange={(e) => set('salaryMax', e.target.value)}
                    placeholder={form.salaryType === '時給' ? '1600' : '350000'}
                    className={inputClass()}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">円</span>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass()} htmlFor="workingHours">勤務時間</label>
              <input
                id="workingHours"
                type="text"
                value={form.workingHours}
                onChange={(e) => set('workingHours', e.target.value)}
                placeholder="例：9:00〜18:00（休憩1時間）"
                className={inputClass()}
              />
            </div>

            <div>
              <label className={labelClass()} htmlFor="holidays">休日・休暇</label>
              <textarea
                id="holidays"
                rows={3}
                value={form.holidays}
                onChange={(e) => set('holidays', e.target.value)}
                placeholder="例：土日祝日、年末年始、夏季休暇"
                className={inputClass()}
              />
            </div>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← 戻る
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                次へ →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: 仕事内容 */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-gray-900 border-l-4 border-cyan-600 pl-3">
              仕事内容
            </h2>

            <div>
              <label className={labelClass()} htmlFor="description">仕事内容</label>
              <textarea
                id="description"
                rows={5}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="業務内容、職場環境、チームの雰囲気などを記載してください"
                className={inputClass()}
              />
            </div>

            <div>
              <label className={labelClass()} htmlFor="requirements">応募要件</label>
              <textarea
                id="requirements"
                rows={4}
                value={form.requirements}
                onChange={(e) => set('requirements', e.target.value)}
                placeholder="必須資格、経験年数、スキルなどを記載してください（1行ずつ入力）"
                className={inputClass()}
              />
            </div>

            <div>
              <label className={labelClass()} htmlFor="benefits">福利厚生</label>
              <textarea
                id="benefits"
                rows={3}
                value={form.benefits}
                onChange={(e) => set('benefits', e.target.value)}
                placeholder="社会保険、交通費支給、産休・育休など（1行ずつ入力）"
                className={inputClass()}
              />
            </div>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← 戻る
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                次へ →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: 確認・公開 */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-gray-900 border-l-4 border-cyan-600 pl-3">
              確認・公開
            </h2>

            {draft && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
                <span>💾</span>
                下書きとして保存しました。後から編集・公開できます。
              </div>
            )}

            {/* Preview card */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-lg shrink-0">
                  🦷
                </div>
                <div>
                  <p className="text-xs text-gray-500">スマイル歯科クリニック</p>
                  <h3 className="text-base font-bold text-gray-900 mt-0.5 leading-snug">
                    {form.title || '（タイトル未入力）'}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {form.jobType && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700">
                    {form.jobType}
                  </span>
                )}
                {form.employmentType && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {form.employmentType}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">給与</p>
                  <p className="text-gray-800 font-medium">
                    {form.salaryType}{' '}
                    {form.salaryMin && form.salaryMax
                      ? `${Number(form.salaryMin).toLocaleString('ja-JP')}〜${Number(form.salaryMax).toLocaleString('ja-JP')}円`
                      : '（未入力）'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">勤務時間</p>
                  <p className="text-gray-800">{form.workingHours || '（未入力）'}</p>
                </div>
              </div>

              {form.description && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">仕事内容</p>
                  <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                    {form.description}
                  </p>
                </div>
              )}

              {form.holidays && (
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">休日・休暇</p>
                  <p className="text-sm text-gray-700">{form.holidays}</p>
                </div>
              )}

              {form.benefits && (
                <div>
                  <p className="text-xs text-gray-400 mb-1.5">福利厚生</p>
                  <div className="flex flex-wrap gap-1.5">
                    {form.benefits
                      .split('\n')
                      .filter(Boolean)
                      .map((b, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700"
                        >
                          {b}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← 戻る
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDraft}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  💾 下書き保存
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors shadow-sm"
                >
                  🚀 公開する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
