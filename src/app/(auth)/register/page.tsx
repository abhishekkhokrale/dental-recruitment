import type { Metadata } from 'next'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: '無料会員登録 | ブルージョブズ',
  description: 'ブルージョブズに無料登録して、歯科業界の求人に応募しましょう。',
}

export default function RegisterPage() {
  return <RegisterForm />
}
