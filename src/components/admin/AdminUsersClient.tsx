'use client'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClinicUser {
  id: string
  name: string
  email: string
  clinicName: string
  prefecture: string
  registeredAt: string
  status: 'active' | 'pending' | 'suspended'
}

interface SeekerUser {
  id: string
  name: string
  email: string
  qualification: string
  registeredAt: string
  status: 'active' | 'pending' | 'suspended'
}

type ClinicFormData = Omit<ClinicUser, 'id' | 'registeredAt'>

// ─── Mock data ────────────────────────────────────────────────────────────────

const initialClinics: ClinicUser[] = [
  { id: 'c1', name: '田中 院長', email: 'tanaka@smile-dental.jp', clinicName: 'スマイル歯科クリニック', prefecture: '東京都', registeredAt: '2024-01-15', status: 'active' },
  { id: 'c2', name: '鈴木 院長', email: 'suzuki@sakura-dental.jp', clinicName: 'さくら歯科医院', prefecture: '大阪府', registeredAt: '2024-02-03', status: 'active' },
  { id: 'c3', name: '佐藤 院長', email: 'sato@midori-dental.jp', clinicName: 'みどり歯科クリニック', prefecture: '神奈川県', registeredAt: '2024-02-18', status: 'pending' },
  { id: 'c4', name: '高橋 院長', email: 'takahashi@sunshine-dental.jp', clinicName: 'サンシャイン歯科', prefecture: '愛知県', registeredAt: '2024-03-05', status: 'active' },
  { id: 'c5', name: '伊藤 院長', email: 'ito@happy-dental.jp', clinicName: 'ハッピー歯科クリニック', prefecture: '福岡県', registeredAt: '2024-03-20', status: 'suspended' },
  { id: 'c6', name: '渡辺 院長', email: 'watanabe@forest-dental.jp', clinicName: 'フォレスト歯科', prefecture: '北海道', registeredAt: '2024-04-01', status: 'active' },
]

const initialSeekers: SeekerUser[] = [
  { id: 's1', name: '山田 花子', email: 'yamada@example.com', qualification: '歯科医師', registeredAt: '2024-01-20', status: 'active' },
  { id: 's2', name: '小林 太郎', email: 'kobayashi@example.com', qualification: '歯科衛生士', registeredAt: '2024-02-05', status: 'active' },
  { id: 's3', name: '加藤 美咲', email: 'kato@example.com', qualification: '歯科技工士', registeredAt: '2024-02-14', status: 'pending' },
  { id: 's4', name: '吉田 健一', email: 'yoshida@example.com', qualification: '歯科医師', registeredAt: '2024-02-28', status: 'active' },
  { id: 's5', name: '中村 さくら', email: 'nakamura@example.com', qualification: '歯科衛生士', registeredAt: '2024-03-10', status: 'active' },
  { id: 's6', name: '林 直樹', email: 'hayashi@example.com', qualification: '歯科助手', registeredAt: '2024-03-22', status: 'suspended' },
  { id: 's7', name: '松本 あかり', email: 'matsumoto@example.com', qualification: '歯科衛生士', registeredAt: '2024-04-03', status: 'active' },
  { id: 's8', name: '井上 雄二', email: 'inoue@example.com', qualification: '歯科技工士', registeredAt: '2024-04-10', status: 'pending' },
]

const PREFECTURES = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県']

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_MAP = {
  active:    { label: '有効',   cls: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' },
  pending:   { label: '審査中', cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' },
  suspended: { label: '停止',   cls: 'bg-red-50 text-red-700 ring-1 ring-red-200' },
}

function StatusBadge({ status }: { status: 'active' | 'pending' | 'suspended' }) {
  const { label, cls } = STATUS_MAP[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {label}
    </span>
  )
}

// ─── Blank form ───────────────────────────────────────────────────────────────

function blankClinic(): ClinicFormData {
  return { name: '', email: '', clinicName: '', prefecture: '東京都', status: 'active' }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminUsersClient() {
  const [clinics, setClinics] = useState<ClinicUser[]>(initialClinics)
  const [seekers, setSeekers] = useState<SeekerUser[]>(initialSeekers)

  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<ClinicUser | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<ClinicUser | null>(null)
  const [form, setForm] = useState<ClinicFormData>(blankClinic())
  const [formError, setFormError] = useState('')

  // Stats
  const totalClinics = clinics.length
  const totalSeekers = seekers.length
  const activeClinics = clinics.filter(c => c.status === 'active').length
  const pendingClinics = clinics.filter(c => c.status === 'pending').length

  function openCreate() {
    setForm(blankClinic())
    setFormError('')
    setCreateOpen(true)
  }

  function openEdit(clinic: ClinicUser) {
    setForm({ name: clinic.name, email: clinic.email, clinicName: clinic.clinicName, prefecture: clinic.prefecture, status: clinic.status })
    setFormError('')
    setEditTarget(clinic)
  }

  function handleCreate() {
    if (!form.name.trim() || !form.email.trim() || !form.clinicName.trim()) {
      setFormError('氏名・メールアドレス・クリニック名は必須です。')
      return
    }
    setClinics(prev => [{
      id: `c${Date.now()}`,
      registeredAt: new Date().toISOString().slice(0, 10),
      ...form,
    }, ...prev])
    setCreateOpen(false)
  }

  function handleEdit() {
    if (!editTarget) return
    if (!form.name.trim() || !form.email.trim() || !form.clinicName.trim()) {
      setFormError('氏名・メールアドレス・クリニック名は必須です。')
      return
    }
    setClinics(prev => prev.map(c => c.id === editTarget.id ? { ...c, ...form } : c))
    setEditTarget(null)
  }

  function handleDelete() {
    if (!deleteTarget) return
    setClinics(prev => prev.filter(c => c.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  function toggleSeekerStatus(id: string) {
    setSeekers(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' } : s
    ))
  }

  return (
    <div className="p-6 space-y-6">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ユーザー管理</h1>
        <p className="text-sm text-gray-500 mt-1">クリニック・求職者の登録ユーザーを管理します</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="クリニック数"
          value={totalClinics}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          }
          color="bg-cyan-50 text-cyan-600"
        />
        <StatCard
          label="求職者数"
          value={totalSeekers}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          }
          color="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          label="有効クリニック"
          value={activeClinics}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          }
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="審査中"
          value={pendingClinics}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          }
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* ── Clinic table ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">クリニックユーザー</h2>
            <p className="text-xs text-gray-400 mt-0.5">登録済みクリニック一覧</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            クリニック追加
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">氏名</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">メール</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">クリニック名</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">都道府県</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">登録日</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ステータス</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clinics.map((clinic) => (
                <tr key={clinic.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {clinic.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900 whitespace-nowrap">{clinic.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{clinic.email}</td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap font-medium">{clinic.clinicName}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{clinic.prefecture}</td>
                  <td className="px-6 py-4 text-gray-400 whitespace-nowrap text-xs">{clinic.registeredAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={clinic.status} /></td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(clinic)}
                        className="px-3 py-1.5 text-xs font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => setDeleteTarget(clinic)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        削除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {clinics.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400">
                    クリニックユーザーがいません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
          <p className="text-xs text-gray-400">{clinics.length} 件</p>
        </div>
      </div>

      {/* ── Seeker table ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">求職者ユーザー</h2>
          <p className="text-xs text-gray-400 mt-0.5">登録済み求職者一覧</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">氏名</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">メール</th>
                {/* <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">資格</th> */}
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">登録日</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ステータス</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {seekers.map((seeker) => (
                <tr key={seeker.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {seeker.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900 whitespace-nowrap">{seeker.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{seeker.email}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-200">
                      {seeker.qualification}
                    </span>
                  </td> */}
                  <td className="px-6 py-4 text-gray-400 whitespace-nowrap text-xs">{seeker.registeredAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={seeker.status} /></td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => toggleSeekerStatus(seeker.id)}
                      className={[
                        'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
                        seeker.status === 'active'
                          ? 'text-red-600 bg-red-50 hover:bg-red-100'
                          : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100',
                      ].join(' ')}
                    >
                      {seeker.status === 'active' ? '停止' : '有効化'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
          <p className="text-xs text-gray-400">{seekers.length} 件</p>
        </div>
      </div>

      {/* ── Create modal ──────────────────────────────────────────────────── */}
      {createOpen && (
        <Modal title="クリニックユーザー追加" onClose={() => setCreateOpen(false)}>
          <ClinicForm form={form} onChange={setForm} error={formError} />
          <ModalFooter
            onCancel={() => setCreateOpen(false)}
            onConfirm={handleCreate}
            confirmLabel="追加する"
            confirmClass="bg-cyan-600 hover:bg-cyan-700 text-white"
          />
        </Modal>
      )}

      {/* ── Edit modal ────────────────────────────────────────────────────── */}
      {editTarget && (
        <Modal title="クリニックユーザー編集" onClose={() => setEditTarget(null)}>
          <ClinicForm form={form} onChange={setForm} error={formError} />
          <ModalFooter
            onCancel={() => setEditTarget(null)}
            onConfirm={handleEdit}
            confirmLabel="変更を保存"
            confirmClass="bg-cyan-600 hover:bg-cyan-700 text-white"
          />
        </Modal>
      )}

      {/* ── Delete confirm ────────────────────────────────────────────────── */}
      {deleteTarget && (
        <Modal title="ユーザーを削除しますか？" onClose={() => setDeleteTarget(null)}>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{deleteTarget.clinicName}</p>
              <p className="text-sm text-gray-500 mt-1">
                {deleteTarget.name}（{deleteTarget.email}）を削除します。この操作は元に戻せません。
              </p>
            </div>
          </div>
          <ModalFooter
            onCancel={() => setDeleteTarget(null)}
            onConfirm={handleDelete}
            confirmLabel="削除する"
            confirmClass="bg-red-600 hover:bg-red-700 text-white"
          />
        </Modal>
      )}
    </div>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon, color }: {
  label: string
  value: number
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="閉じる"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5 space-y-5">
          {children}
        </div>
      </div>
    </div>
  )
}

function ModalFooter({ onCancel, onConfirm, confirmLabel, confirmClass }: {
  onCancel: () => void
  onConfirm: () => void
  confirmLabel: string
  confirmClass: string
}) {
  return (
    <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors"
      >
        キャンセル
      </button>
      <button
        onClick={onConfirm}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm ${confirmClass}`}
      >
        {confirmLabel}
      </button>
    </div>
  )
}

// ─── Clinic form ──────────────────────────────────────────────────────────────

function ClinicForm({ form, onChange, error }: {
  form: ClinicFormData
  onChange: (f: ClinicFormData) => void
  error: string
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="氏名 *">
          <input
            type="text"
            value={form.name}
            onChange={e => onChange({ ...form, name: e.target.value })}
            placeholder="例：田中 院長"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </FormField>
        <FormField label="都道府県">
          <select
            value={form.prefecture}
            onChange={e => onChange({ ...form, prefecture: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </FormField>
      </div>

      <FormField label="メールアドレス *">
        <input
          type="email"
          value={form.email}
          onChange={e => onChange({ ...form, email: e.target.value })}
          placeholder="例：info@clinic.jp"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </FormField>

      <FormField label="クリニック名 *">
        <input
          type="text"
          value={form.clinicName}
          onChange={e => onChange({ ...form, clinicName: e.target.value })}
          placeholder="例：スマイル歯科クリニック"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </FormField>

      <FormField label="ステータス">
        <select
          value={form.status}
          onChange={e => onChange({ ...form, status: e.target.value as ClinicUser['status'] })}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        >
          <option value="active">有効</option>
          <option value="pending">審査中</option>
          <option value="suspended">停止</option>
        </select>
      </FormField>

      {error && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
          <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
    </div>
  )
}
