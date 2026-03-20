import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ユーザー管理 | 管理者画面',
}

interface Seeker {
  id: string
  name: string
  email: string
  qualification: string
  registeredAt: string
  status: 'active' | 'suspended'
}

interface ClinicUser {
  id: string
  name: string
  email: string
  clinicName: string
  prefecture: string
  registeredAt: string
  status: 'active' | 'suspended'
}

const mockSeekers: Seeker[] = [
  {
    id: 'usr-001',
    name: '田中 さくら',
    email: 'sakura.tanaka@example.com',
    qualification: '歯科衛生士',
    registeredAt: '2026-03-19',
    status: 'active',
  },
  {
    id: 'usr-002',
    name: '佐藤 健二',
    email: 'kenji.sato@example.com',
    qualification: '歯科医師',
    registeredAt: '2026-03-18',
    status: 'active',
  },
  {
    id: 'usr-003',
    name: '山田 美穂',
    email: 'miho.yamada@example.com',
    qualification: '歯科衛生士',
    registeredAt: '2026-03-16',
    status: 'active',
  },
  {
    id: 'usr-004',
    name: '木村 ゆい',
    email: 'yui.kimura@example.com',
    qualification: '歯科助手',
    registeredAt: '2026-03-15',
    status: 'active',
  },
  {
    id: 'usr-005',
    name: '中村 亮太',
    email: 'ryota.nakamura@example.com',
    qualification: '歯科技工士',
    registeredAt: '2026-03-12',
    status: 'suspended',
  },
  {
    id: 'usr-006',
    name: '伊藤 花',
    email: 'hana.ito@example.com',
    qualification: '歯科衛生士',
    registeredAt: '2026-03-10',
    status: 'active',
  },
  {
    id: 'usr-007',
    name: '渡辺 翔',
    email: 'sho.watanabe@example.com',
    qualification: '歯科医師',
    registeredAt: '2026-03-08',
    status: 'active',
  },
  {
    id: 'usr-008',
    name: '小林 あかね',
    email: 'akane.kobayashi@example.com',
    qualification: '歯科衛生士',
    registeredAt: '2026-03-05',
    status: 'active',
  },
]

const mockClinics: ClinicUser[] = [
  {
    id: 'cli-001',
    name: '鈴木 健一',
    email: 'info@smile-dental.example.com',
    clinicName: 'スマイル歯科クリニック',
    prefecture: '東京都',
    registeredAt: '2025-06-01',
    status: 'active',
  },
  {
    id: 'cli-002',
    name: '高橋 誠',
    email: 'contact@white-dental.example.com',
    clinicName: 'ホワイト歯科',
    prefecture: '神奈川県',
    registeredAt: '2025-07-15',
    status: 'active',
  },
  {
    id: 'cli-003',
    name: '田中 博',
    email: 'admin@green-kyosei.example.com',
    clinicName: 'グリーン矯正歯科',
    prefecture: '大阪府',
    registeredAt: '2025-09-03',
    status: 'active',
  },
  {
    id: 'cli-004',
    name: '山本 恵子',
    email: 'info@sakura-dental.example.com',
    clinicName: 'さくら歯科医院',
    prefecture: '愛知県',
    registeredAt: '2026-01-20',
    status: 'suspended',
  },
  {
    id: 'cli-005',
    name: '松田 浩二',
    email: 'hr@mirai-dental.example.com',
    clinicName: 'みらい歯科クリニック',
    prefecture: '福岡県',
    registeredAt: '2026-02-14',
    status: 'active',
  },
  {
    id: 'cli-006',
    name: '井上 智子',
    email: 'contact@blue-dental.example.com',
    clinicName: 'ブルーオーシャン歯科',
    prefecture: '東京都',
    registeredAt: '2026-03-01',
    status: 'active',
  },
]

function StatusBadge({ status }: { status: 'active' | 'suspended' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
        status === 'active'
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-rose-50 text-rose-700'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'
        }`}
        aria-hidden="true"
      />
      {status === 'active' ? '有効' : '停止中'}
    </span>
  )
}

export default function AdminUsersPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ユーザー管理</h1>
          <p className="text-sm text-gray-500 mt-1">求職者とクリニックのアカウントを管理します</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="search"
              placeholder="名前・メールで検索"
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white w-56"
              aria-label="ユーザー検索"
            />
          </div>
        </div>
      </div>

      {/* Seekers table */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">
            求職者
            <span className="ml-2 text-sm font-normal text-gray-400">（{mockSeekers.length}件）</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-24">
                  ID
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  名前
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  メールアドレス
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  資格
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  登録日
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  ステータス
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockSeekers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{user.id}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{user.email}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-cyan-50 text-cyan-700 font-medium px-2 py-0.5 rounded-full">
                      {user.qualification}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{user.registeredAt}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="text-xs font-medium text-gray-600 hover:text-gray-900 px-2.5 py-1 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
                      >
                        詳細
                      </button>
                      <button
                        type="button"
                        className={`text-xs font-medium px-2.5 py-1 border rounded-md transition-colors ${
                          user.status === 'active'
                            ? 'text-rose-600 border-rose-200 hover:bg-rose-50'
                            : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                        }`}
                      >
                        {user.status === 'active' ? '停止' : '有効化'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            全 <span className="font-semibold text-gray-700">8</span> 件中 1〜8 件を表示
          </p>
          <div className="flex items-center gap-1">
            {['前へ', '1', '2', '3', '次へ'].map((label, i) => (
              <button
                key={`seeker-page-${i}`}
                type="button"
                disabled={label === '前へ' || label === '1'}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                  label === '1'
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Clinics table */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">
            クリニック
            <span className="ml-2 text-sm font-normal text-gray-400">（{mockClinics.length}件）</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-24">
                  ID
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  担当者名
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  メールアドレス
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  クリニック名
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  都道府県
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  登録日
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  ステータス
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockClinics.map((clinic) => (
                <tr key={clinic.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{clinic.id}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{clinic.name}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{clinic.email}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">{clinic.clinicName}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{clinic.prefecture}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{clinic.registeredAt}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={clinic.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="text-xs font-medium text-gray-600 hover:text-gray-900 px-2.5 py-1 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
                      >
                        詳細
                      </button>
                      <button
                        type="button"
                        className={`text-xs font-medium px-2.5 py-1 border rounded-md transition-colors ${
                          clinic.status === 'active'
                            ? 'text-rose-600 border-rose-200 hover:bg-rose-50'
                            : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                        }`}
                      >
                        {clinic.status === 'active' ? '停止' : '有効化'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            全 <span className="font-semibold text-gray-700">6</span> 件中 1〜6 件を表示
          </p>
          <div className="flex items-center gap-1">
            {['前へ', '1', '2', '次へ'].map((label, i) => (
              <button
                key={`clinic-page-${i}`}
                type="button"
                disabled={label === '前へ' || label === '1'}
                className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                  label === '1'
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
