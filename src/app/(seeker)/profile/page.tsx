import type { Metadata } from 'next'
import type { SeekerProfile } from '@/lib/types/seeker'
import ProfileEditForm from '@/components/profile/ProfileEditForm'

export const metadata: Metadata = {
  title: 'マイプロフィール | ブルージョブズ',
  description: 'プロフィールを管理して、より良い求人にマッチングしましょう。',
}

const mockSeeker: SeekerProfile = {
  id: 'seeker-001',
  name: '山田 花子',
  email: 'hanako.yamada@example.com',
  phone: '090-1234-5678',
  prefecture: '東京都',
  age: 28,
  qualification: ['歯科衛生士'],
  experienceYears: 5,
  specialties: ['予防歯科', 'スケーリング', '小児歯科'],
  preferredPrefectures: ['東京都', '神奈川県'],
  preferredEmploymentType: ['正社員'],
  desiredSalaryMin: 250000,
  bio: '歯科衛生士として5年間、予防歯科に力を入れたクリニックで勤務してきました。患者さんとの信頼関係を大切にしながら、丁寧な施術を心がけています。',
  isPublic: true,
  createdAt: '2025-04-01',
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

export default function ProfilePage() {
  const completion = calcCompletionPercent(mockSeeker)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">マイプロフィール</h1>
        <span
          className={[
            'text-xs font-medium px-2.5 py-1 rounded-full',
            mockSeeker.isPublic
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-500',
          ].join(' ')}
        >
          {mockSeeker.isPublic ? '公開中' : '非公開'}
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
              <dd className="font-medium text-gray-800 mt-0.5">{mockSeeker.name}</dd>
            </div>
            <div>
              <dt className="text-gray-500">メールアドレス</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{mockSeeker.email}</dd>
            </div>
            <div>
              <dt className="text-gray-500">電話番号</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{mockSeeker.phone ?? '未設定'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">年齢</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{mockSeeker.age ? `${mockSeeker.age}歳` : '未設定'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">都道府県</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{mockSeeker.prefecture ?? '未設定'}</dd>
            </div>
          </dl>
          {mockSeeker.bio && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <dt className="text-gray-500 text-sm mb-1">自己紹介</dt>
              <dd className="text-sm text-gray-700 leading-relaxed">{mockSeeker.bio}</dd>
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
                {mockSeeker.qualification.map((q) => (
                  <span key={q} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700 border border-cyan-100">
                    {q}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">経験年数</dt>
              <dd className="font-medium text-gray-800 mt-0.5">{mockSeeker.experienceYears}年</dd>
            </div>
            {mockSeeker.specialties.length > 0 && (
              <div>
                <dt className="text-gray-500">得意分野・スペシャリティ</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {mockSeeker.specialties.map((s) => (
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
                {mockSeeker.preferredEmploymentType.map((t) => (
                  <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">希望勤務地</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {mockSeeker.preferredPrefectures.map((p) => (
                  <span key={p} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {p}
                  </span>
                ))}
              </dd>
            </div>
            {mockSeeker.desiredSalaryMin && (
              <div>
                <dt className="text-gray-500">希望月給（最低）</dt>
                <dd className="font-medium text-gray-800 mt-0.5">
                  {mockSeeker.desiredSalaryMin.toLocaleString('ja-JP')}円〜
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      {/* Edit form (client component) */}
      <ProfileEditForm seeker={mockSeeker} />
    </div>
  )
}
