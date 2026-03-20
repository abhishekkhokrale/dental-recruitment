import type { Metadata } from 'next'
import JobPostForm from '@/components/clinic/JobPostForm'

export const metadata: Metadata = {
  title: '求人を作成 | スマイル歯科クリニック',
}

export default function NewJobPage() {
  return (
    <div className="py-6">
      <div className="max-w-2xl mx-auto px-6 mb-6">
        <h1 className="text-xl font-bold text-gray-900">求人を作成</h1>
        <p className="text-sm text-gray-500 mt-1">
          4ステップで求人票を作成できます。内容を確認してから公開してください。
        </p>
      </div>
      <JobPostForm />
    </div>
  )
}
