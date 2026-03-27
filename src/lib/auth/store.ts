import fs from 'fs'
import path from 'path'
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'
import type { Qualification } from '@/lib/types/seeker'

// ── Types ─────────────────────────────────────────────────────────────────────

export type UserRole = 'seeker' | 'clinic' | 'admin'

export interface StoredUser {
  id: string
  name: string
  email: string
  passwordHash: string | null   // null for OAuth-only (LINE) accounts
  role: UserRole
  prefecture: string
  qualifications: Qualification[]
  experienceYears: number
  employmentTypes: string[]
  desiredSalaryMin: number | null
  bio: string
  provider: 'email' | 'line'
  lineId: string | null
  createdAt: string
}

interface ResetTokenRecord {
  userId: string
  expiresAt: number
}

// ── In-memory stores ──────────────────────────────────────────────────────────

export const userStore       = new Map<string, StoredUser>()
export const emailIndex      = new Map<string, string>()        // email  → id
export const lineIndex       = new Map<string, string>()        // lineId → id
export const resetTokenStore = new Map<string, ResetTokenRecord>()

// ── Helpers ───────────────────────────────────────────────────────────────────

export function findUserByEmail(email: string): StoredUser | null {
  syncUsersFromJson()
  const id = emailIndex.get(email.toLowerCase())
  return id ? (userStore.get(id) ?? null) : null
}

export function findUserById(id: string): StoredUser | null {
  syncUsersFromJson()
  return userStore.get(id) ?? null
}

export function findUserByLineId(lineId: string): StoredUser | null {
  syncUsersFromJson()
  const id = lineIndex.get(lineId)
  return id ? (userStore.get(id) ?? null) : null
}

export function saveUser(user: StoredUser): void {
  userStore.set(user.id, user)
  emailIndex.set(user.email.toLowerCase(), user.id)
  if (user.lineId) lineIndex.set(user.lineId, user.id)
}

// ── Internal hash (no import from index.ts — avoids circular dep) ─────────────

function _hash(password: string): string {
  const salt = randomBytes(16).toString('hex')
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`
}

export function verifyStoredPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  return timingSafeEqual(Buffer.from(hash, 'hex'), scryptSync(password, salt, 64))
}

// ── JSON file ─────────────────────────────────────────────────────────────────

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')

// Shape of a record in data/users.json
interface UserJsonRecord {
  id: string
  name: string
  email: string
  password?: string       // plaintext  → hashed in memory on load
  passwordHash?: string   // pre-hashed → used as-is
  role: UserRole
  prefecture?: string
  qualifications?: Qualification[]
  experienceYears?: number
  employmentTypes?: string[]
  desiredSalaryMin?: number | null
  bio?: string
  provider?: 'email' | 'line'
  lineId?: string | null
  createdAt?: string
}

/**
 * Sync data/users.json into the in-memory store on every call.
 * Always overwrites profile fields so edits to users.json are reflected
 * immediately without a server restart.
 * For plaintext-password users, the computed hash is preserved across calls.
 */
function syncUsersFromJson(): void {
  try {
    const raw     = fs.readFileSync(USERS_FILE, 'utf-8')
    const records = JSON.parse(raw) as UserJsonRecord[]

    for (const r of records) {
      // Preserve already-computed hash for plaintext-password dev accounts
      const existing = userStore.get(r.id)
      const passwordHash =
        existing?.passwordHash ??
        r.passwordHash ??
        (r.password ? _hash(r.password) : null)

      saveUser({
        id: r.id,
        name: r.name,
        email: r.email,
        passwordHash,
        role: r.role,
        prefecture: r.prefecture ?? '',
        qualifications: r.qualifications ?? [],
        experienceYears: r.experienceYears ?? 0,
        employmentTypes: r.employmentTypes ?? [],
        desiredSalaryMin: r.desiredSalaryMin ?? null,
        bio: r.bio ?? '',
        provider: r.provider ?? 'email',
        lineId: r.lineId ?? null,
        createdAt: r.createdAt ?? new Date().toISOString(),
      })
    }
  } catch {
    console.warn('[auth] data/users.json not found or invalid — starting with empty store')
  }
}

syncUsersFromJson()

/**
 * Append a newly registered seeker to data/users.json so they survive
 * server restarts.  Writes `passwordHash` (never the plaintext password).
 */
export function appendUserToJson(user: StoredUser): void {
  try {
    let records: UserJsonRecord[] = []
    try { records = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) } catch { /* new file */ }

    records.push({
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash ?? undefined,
      role: user.role,
      prefecture: user.prefecture,
      qualifications: user.qualifications,
      experienceYears: user.experienceYears,
      employmentTypes: user.employmentTypes,
      desiredSalaryMin: user.desiredSalaryMin,
      bio: user.bio,
      provider: user.provider,
      lineId: user.lineId,
      createdAt: user.createdAt,
    })

    fs.writeFileSync(USERS_FILE, JSON.stringify(records, null, 2), 'utf-8')
  } catch (err) {
    console.error('[auth] Failed to write users.json:', err)
  }
}
