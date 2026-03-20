import type { Metadata } from 'next'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'パスワードをお忘れの方 | ブルージョブズ',
  description: 'パスワードのリセット手続きを行います。',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
