'use client'

import { useState } from 'react'
import type { SeekerProfile, Qualification } from '@/lib/types/seeker'

const QUALIFICATIONS: Qualification[] = ['歯科衛生士', '歯科医師', '歯科助手', '歯科技工士', 'なし']
const EMPLOYMENT_TYPES = ['正社員', 'パート・アルバイト', '契約社員']
const COMMON_PREFECTURES = [
  '北海道', '宮城県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '愛知県', '京都府', '大阪府', '兵庫県', '福岡県', '沖縄県',
]
const EXPERIENCE_OPTIONS = [
  { value: 0, label: '0年（未経験）' },
  { value: 1, label: '1年' },
  { value: 2, label: '2年' },
  { value: 3, label: '3年' },
  { value: 5, label: '5年' },
  { value: 10, label: '10年以上' },
]

interface Props {
  seeker: SeekerProfile
}

export default function ProfileEditForm({ seeker }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [saved, setSaved] = useState(false)

  const [name, setName] = useState(seeker.name)
  const [email, setEmail] = useState(seeker.email)
  const [phone, setPhone] = useState(seeker.phone ?? '')
  const [age, setAge] = useState(seeker.age?.toString() ?? '')
  const [prefecture, setPrefecture] = useState(seeker.prefecture ?? '')
  const [qualifications, setQualifications] = useState<Qualification[]>(seeker.qualification)
  const [experienceYears, setExperienceYears] = useState(seeker.experienceYears)
  const [specialties, setSpecialties] = useState<string[]>(seeker.specialties)
  const [specialtyInput, setSpecialtyInput] = useState('')
  const [preferredPrefectures, setPreferredPrefectures] = useState<string[]>(seeker.preferredPrefectures)
  const [employmentTypes, setEmploymentTypes] = useState<string[]>(seeker.preferredEmploymentType)
  const [desiredSalaryMin, setDesiredSalaryMin] = useState(seeker.desiredSalaryMin?.toString() ?? '')
  const [bio, setBio] = useState(seeker.bio ?? '')

  function toggleQualification(q: Qualification) {
    setQualifications((prev) => prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q])
  }
  function toggleEmploymentType(t: string) {
    setEmploymentTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])
  }
  function togglePreferredPrefecture(p: string) {
    setPreferredPrefectures((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p])
  }

  function addSpecialty() {
    const trimmed = specialtyInput.trim()
    if (trimmed && !specialties.includes(trimmed)) {
      setSpecialties((prev) => [...prev, trimmed])
    }
    setSpecialtyInput('')
  }
  function removeSpecialty(s: string) {
    setSpecialties((prev) => prev.filter((x) => x !== s))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('プロフィール保存:', {
      name, email, phone, age, prefecture,
      qualifications, experienceYears, specialties,
      preferredPrefectures, employmentTypes, desiredSalaryMin, bio,
    })
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setIsOpen(false)
    }, 1500)
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-3 border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 font-semibold rounded-lg transition-colors"
      >
        プロフィールを編集
      </button>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">プロフィール編集</h2>
        {saved && (
          <span className="text-sm text-green-600 font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            保存しました
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info section */}
        <fieldset>
          <legend className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-cyan-600 rounded-full inline-block" />
            基本情報
          </legend>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">氏名</label>
              <input
                id="edit-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="edit-phone" className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
              <input
                id="edit-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="090-0000-0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="edit-age" className="block text-sm font-medium text-gray-700 mb-1">年齢</label>
              <input
                id="edit-age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="28"
                min={18}
                max={80}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="edit-prefecture" className="block text-sm font-medium text-gray-700 mb-1">居住都道府県</label>
              <select
                id="edit-prefecture"
                value={prefecture}
                onChange={(e) => setPrefecture(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-white"
              >
                <option value="">選択してください</option>
                {COMMON_PREFECTURES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <hr className="border-gray-100" />

        {/* Qualifications */}
        <fieldset>
          <legend className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-cyan-600 rounded-full inline-block" />
            資格・スキル
          </legend>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">保有資格</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {QUALIFICATIONS.map((q) => (
                <label key={q} className="flex items-center gap-1.5 cursor-pointer">
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

          <div className="mb-4">
            <label htmlFor="edit-experience" className="block text-sm text-gray-600 mb-1">経験年数</label>
            <select
              id="edit-experience"
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-white"
            >
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">得意分野・スペシャリティ</p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); addSpecialty() }
                }}
                placeholder="例: 予防歯科"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={addSpecialty}
                className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {specialties.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {s}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(s)}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-0.5"
                    aria-label={`${s}を削除`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </fieldset>

        <hr className="border-gray-100" />

        {/* Preferences */}
        <fieldset>
          <legend className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-cyan-600 rounded-full inline-block" />
            希望条件
          </legend>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">希望勤務地</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-2">
              {COMMON_PREFECTURES.map((p) => (
                <label key={p} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferredPrefectures.includes(p)}
                    onChange={() => togglePreferredPrefecture(p)}
                    className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-700">{p}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">希望雇用形態</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {EMPLOYMENT_TYPES.map((t) => (
                <label key={t} className="flex items-center gap-1.5 cursor-pointer">
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
            <label htmlFor="edit-salary-min" className="block text-sm text-gray-600 mb-1">
              希望月給（最低）
            </label>
            <div className="relative w-full sm:w-48">
              <input
                id="edit-salary-min"
                type="number"
                value={desiredSalaryMin}
                onChange={(e) => setDesiredSalaryMin(e.target.value)}
                placeholder="200000"
                min={0}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">円</span>
            </div>
          </div>
        </fieldset>

        <hr className="border-gray-100" />

        <div>
          <label htmlFor="edit-bio" className="block text-sm font-semibold text-gray-700 mb-2">
            自己紹介
          </label>
          <textarea
            id="edit-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="経験やアピールポイントを自由にご記入ください"
            rows={4}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
          >
            保存する
          </button>
        </div>
      </form>
    </div>
  )
}
