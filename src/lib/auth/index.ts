import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import { sessionStore } from './store'

const SESSION_COOKIE = 'bj_session'
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

// ── Password hashing ─────────────────────────────────────────────────────────

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const supplied = scryptSync(password, salt, 64)
  return timingSafeEqual(Buffer.from(hash, 'hex'), supplied)
}

// ── Session management ───────────────────────────────────────────────────────

export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString('hex')
  const expiresAt = Date.now() + SESSION_TTL_MS
  sessionStore.set(token, { userId, expiresAt })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  })
}

export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  const session = sessionStore.get(token)
  if (!session) return null
  if (Date.now() > session.expiresAt) {
    sessionStore.delete(token)
    return null
  }
  return { userId: session.userId }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (token) sessionStore.delete(token)
  cookieStore.delete(SESSION_COOKIE)
}

// ── Reset tokens ─────────────────────────────────────────────────────────────

export function createResetToken(userId: string): string {
  const token = randomBytes(32).toString('hex')
  // stored in resetTokenStore (in store.ts)
  return token
}
