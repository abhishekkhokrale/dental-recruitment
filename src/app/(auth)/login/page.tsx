import type { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'ログイン | デンタルキャリア',
  description: 'デンタルキャリアにログインして、求人情報の応募・管理を行いましょう。',
}

export default function LoginPage() {
  return <LoginForm />
}
