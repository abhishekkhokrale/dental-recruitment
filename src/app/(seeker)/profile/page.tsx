import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import type { SeekerProfile } from '@/lib/types/seeker'
import { getSessionUser } from '@/lib/auth'
import ProfileEditForm from '@/components/profile/ProfileEditForm'

export const metadata: Metadata = {
  title: 'マイプロフィール | ブルージョブズ',
  description: 'プロフィールを管理して、より良い求人にマッチングしましょう。',
}

function calcCompletionPercent(seeker: SeekerProfile): number {
  const fields = [
    seeker.name,
    seeker.email,
    seeker.phone,
    seeker.prefecture,
    seeker.age,
    seeker.qualification.length > 0,
    seeker.experienceYears >= 0,
    seeker.specialties.length > 0,
    seeker.preferredPrefectures.length > 0,
    seeker.preferredEmploymentType.length > 0,
    seeker.desiredSalaryMin,
    seeker.bio,
  ]
  const filled = fields.filter(Boolean).length
  return Math.round((filled / fields.length) * 100)
}

export default async function ProfilePage() {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  const seeker: SeekerProfile = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: undefined,
    prefecture: user.prefecture || undefined,
    age: undefined,
    qualification: user.qualifications ?? [],
    experienceYears: user.experienceYears ?? 0,
    specialties: [],
    preferredPrefectures: [],
    preferredEmploymentType: user.employmentTypes ?? [],
    desiredSalaryMin: user.desiredSalaryMin ?? undefined,
    bio: user.bio || undefined,
    isPublic: true,
    createdAt: user.createdAt,
  }

  const completion = calcCompletionPercent(seeker)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">マイプロフィール</h1>
        <span
          className={[
            'text-xs font-medium px-2.5 py-1 rounded-full',
            seeker.isPublic
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-500',
          ].join(' ')}
        >
          {seeker.isPublic ? '公開中' : '非公開'}
        </span>
      </div>

      {/* Completion bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">プロフィール完成度</span>
          <span className="text-sm font-bold text-cyan-600">{completion}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-cyan-600 h-2.5 rounded-full transition-all"
            style={{ width: `${completion}%` }}
          />
        </div>
        {completion < 100 && (
          <p className="text-xs text-gray-500 mt-2">
            プロフィールを充実させることで、クリニックからスカウトされやすくなります。
          </p>
        )}
      </div>

      {/* Profile sections */}
      <div className="space-y-4 mb-6">
        {/* 基本情報 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-cyan-600 rounded-full inline-block" />
            基本情報
          </h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <dt className="text-gray-500">氏名</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{seeker.name}</dd>
            </div>
            <div>
              <dt className="text-gray-500">メールアドレス</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{seeker.email}</dd>
            </div>
            <div>
              <dt className="text-gray-500">電話番号</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{seeker.phone ?? '未設定'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">年齢</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{seeker.age ? `${seeker.age}歳` : '未設定'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">都道府県</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{seeker.prefecture ?? '未設定'}</dd>
            </div>
          </dl>
          {seeker.bio && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <dt className="text-gray-500 text-sm mb-1">自己紹介</dt>
              <dd className="text-sm text-gray-700 leading-relaxed">{seeker.bio}</dd>
            </div>
          )}
        </section>

        {/* 資格・スキル */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-cyan-600 rounded-full inline-block" />
            資格・スキル
          </h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">保有資格</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {seeker.qualification.length > 0 ? seeker.qualification.map((q) => (
                  <span key={q} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700 border border-cyan-100">
                    {q}
                  </span>
                )) : <span className="text-gray-400">未設定</span>}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">経験年数</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{seeker.experienceYears}年</dd>
            </div>
            {seeker.specialties.length > 0 && (
              <div>
                <dt className="text-gray-500">得意分野・スペシャリティ</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {seeker.specialties.map((s) => (
                    <span key={s} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </section>

        {/* 希望条件 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-cyan-600 rounded-full inline-block" />
            希望条件
          </h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-gray-500">希望雇用形態</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {seeker.preferredEmploymentType.length > 0 ? seeker.preferredEmploymentType.map((t) => (
                  <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {t}
                  </span>
                )) : <span className="text-gray-400">未設定</span>}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">希望勤務地</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {seeker.preferredPrefectures.length > 0 ? seeker.preferredPrefectures.map((p) => (
                  <span key={p} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {p}
                  </span>
                )) : <span className="text-gray-400">未設定</span>}
              </dd>
            </div>
            {seeker.desiredSalaryMin && (
              <div>
                <dt className="text-gray-500">希望月給（最低）</dt>
                <dd className="font-medium text-gray-800 mt-0.5">
                  {seeker.desiredSalaryMin.toLocaleString('ja-JP')}円〜
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      {/* Edit form (client component) */}
      <ProfileEditForm seeker={seeker} />
    </div>
  )
}
