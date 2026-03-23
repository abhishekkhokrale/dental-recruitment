import type { Metadata } from 'next'
import AdminUsersClient from '@/components/admin/AdminUsersClient'

export const metadata: Metadata = {
  title: 'クリニック管理 | 管理者画面',
}

export default function AdminUsersPage() {
  return <AdminUsersClient />
}
