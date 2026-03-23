import { scryptSync, randomBytes, timingSafeEqual, createHmac } from 'crypto'
import { cookies } from 'next/headers'
import { findUserById } from './store'
import type { StoredUser } from './store'

const SESSION_COOKIE = 'bj_session'
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days
// HMAC secret — set SESSION_SECRET env var in production
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'bluejobs-dev-secret-do-not-use-in-prod'

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

// ── Session management (signed cookie — no in-memory store) ─────────────────
//
// Cookie value: base64url(userId:expiresAt) + '.' + hmac-sha256(payload)
// This survives dev-server HMR full reloads.

function _sign(payload: string): string {
  return createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
}

export async function createSession(userId: string): Promise<void> {
  const expiresAt = Date.now() + SESSION_TTL_MS
  const payload   = `${userId}:${expiresAt}`
  const encoded   = Buffer.from(payload).toString('base64url')
  const sig       = _sign(payload)
  const token     = `${encoded}.${sig}`

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path:     '/',
    maxAge:   SESSION_TTL_MS / 1000,
  })
}

export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies()
  const token       = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  const dotIdx = token.lastIndexOf('.')
  if (dotIdx === -1) return null

  const encoded = token.substring(0, dotIdx)
  const sig     = token.substring(dotIdx + 1)

  let payload: string
  try {
    payload = Buffer.from(encoded, 'base64url').toString()
  } catch {
    return null
  }

  // Constant-time signature check
  const expectedSig = _sign(payload)
  if (sig.length !== expectedSig.length) return null
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return null

  // Extract userId and expiry
  const colonIdx  = payload.lastIndexOf(':')
  const userId    = payload.substring(0, colonIdx)
  const expiresAt = parseInt(payload.substring(colonIdx + 1), 10)

  if (!userId || isNaN(expiresAt) || Date.now() > expiresAt) return null

  return { userId }
}

/** Returns the full StoredUser (including role) for the current session. */
export async function getSessionUser(): Promise<StoredUser | null> {
  const session = await getSession()
  if (!session) return null
  return findUserById(session.userId)
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
