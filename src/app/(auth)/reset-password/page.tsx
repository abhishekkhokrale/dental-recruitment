import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'パスワードの再設定 | ブルージョブズ',
  description: '新しいパスワードを設定します。',
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  if (!token) redirect('/forgot-password')

  return <ResetPasswordForm token={token} />
}
