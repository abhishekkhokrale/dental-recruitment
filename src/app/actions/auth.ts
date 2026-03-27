'use server'

import { randomBytes } from 'crypto'
import { redirect } from 'next/navigation'
import { hashPassword, verifyPassword, createSession, deleteSession } from '@/lib/auth'
import {
  findUserByEmail,
  findUserById,
  saveUser,
  appendUserToJson,
  resetTokenStore,
} from '@/lib/auth/store'
import type { UserRole } from '@/lib/auth/store'
import type { Qualification } from '@/lib/types/seeker'

export type ActionResult = { error?: string; success?: string }

// Where each role lands after login
const ROLE_HOME: Record<UserRole, string> = {
  seeker: '/jobs',
  clinic: '/clinic/dashboard',
  admin:  '/admin',
}

// ── Login (all roles) ─────────────────────────────────────────────────────────

export async function loginAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const email    = String(formData.get('email')    ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'メールアドレスとパスワードを入力してください。' }
  }

  const user = findUserByEmail(email)
  if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
    return { error: 'メールアドレスまたはパスワードが正しくありません。' }
  }

  await createSession(user.id)
  redirect(ROLE_HOME[user.role])
}

// ── Logout ────────────────────────────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  await deleteSession()
  redirect('/login')
}

// ── Register (seeker only — writes to data/users.json) ───────────────────────

export async function registerAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const name             = String(formData.get('name')             ?? '').trim()
  const email            = String(formData.get('email')            ?? '').trim()
  const password         = String(formData.get('password')         ?? '')
  const prefecture       = String(formData.get('prefecture')       ?? '').trim()
  const qualifications   = formData.getAll('qualifications')  as Qualification[]
  const experienceYears  = Number(formData.get('experienceYears')  ?? 0)
  const employmentTypes  = formData.getAll('employmentTypes')  as string[]
  const desiredSalaryMin = Number(formData.get('desiredSalaryMin') ?? 0) || null
  const bio              = String(formData.get('bio')              ?? '').trim()

  if (!name || !email || !password) return { error: '氏名・メールアドレス・パスワードは必須です。' }
  if (password.length < 8)          return { error: 'パスワードは8文字以上で入力してください。' }
  if (findUserByEmail(email))        return { error: 'このメールアドレスはすでに登録されています。' }

  const newUser = {
    id: randomBytes(8).toString('hex'),
    name,
    email,
    passwordHash: hashPassword(password),
    role: 'seeker' as const,
    prefecture,
    qualifications,
    experienceYears,
    employmentTypes,
    desiredSalaryMin,
    bio,
    provider: 'email' as const,
    lineId: null,
    createdAt: new Date().toISOString(),
  }

  saveUser(newUser)
  appendUserToJson(newUser)   // ← persists to data/users.json

  await createSession(newUser.id)
  redirect('/jobs')
}

// ── Forgot password ───────────────────────────────────────────────────────────

const RESET_TTL_MS = 60 * 60 * 1000

export async function forgotPasswordAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const email = String(formData.get('email') ?? '').trim()
  if (!email) return { error: 'メールアドレスを入力してください。' }

  const user = findUserByEmail(email)
  if (user) {
    const token = randomBytes(32).toString('hex')
    resetTokenStore.set(token, { userId: user.id, expiresAt: Date.now() + RESET_TTL_MS })
    console.log('[DEV] Password reset link: /reset-password?token=' + token)
  }

  return { success: 'パスワードリセットのメールを送信しました。メールボックスをご確認ください。' }
}

// ── Reset password ────────────────────────────────────────────────────────────

export async function resetPasswordAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const token    = String(formData.get('token')    ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const confirm  = String(formData.get('confirm')  ?? '')

  if (!token)                    return { error: '無効なリセットリンクです。' }
  if (password.length < 8)       return { error: 'パスワードは8文字以上で入力してください。' }
  if (password !== confirm)      return { error: 'パスワードが一致しません。' }

  const record = resetTokenStore.get(token)
  if (!record || Date.now() > record.expiresAt) {
    return { error: 'リセットリンクの有効期限が切れています。再度お試しください。' }
  }

  const user = findUserById(record.userId)
  if (!user) return { error: '無効なリセットリンクです。' }

  saveUser({ ...user, passwordHash: hashPassword(password) })
  resetTokenStore.delete(token)

  await createSession(user.id)
  redirect(ROLE_HOME[user.role])
}
