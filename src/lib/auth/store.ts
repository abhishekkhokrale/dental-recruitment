import type { Qualification } from '@/lib/types/seeker'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface StoredUser {
  id: string
  name: string
  email: string
  passwordHash: string | null // null for OAuth-only accounts
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

interface SessionRecord {
  userId: string
  expiresAt: number
}

interface ResetTokenRecord {
  userId: string
  expiresAt: number
}

// ── In-memory stores ──────────────────────────────────────────────────────────
// These reset on server restart — fine for a study/demo project.

export const userStore = new Map<string, StoredUser>()         // id -> user
export const emailIndex = new Map<string, string>()            // email -> id
export const lineIndex = new Map<string, string>()             // lineId -> id
export const sessionStore = new Map<string, SessionRecord>()   // token -> session
export const resetTokenStore = new Map<string, ResetTokenRecord>() // token -> record

// ── Helpers ───────────────────────────────────────────────────────────────────

export function findUserByEmail(email: string): StoredUser | null {
  const id = emailIndex.get(email.toLowerCase())
  return id ? (userStore.get(id) ?? null) : null
}

export function findUserById(id: string): StoredUser | null {
  return userStore.get(id) ?? null
}

export function findUserByLineId(lineId: string): StoredUser | null {
  const id = lineIndex.get(lineId)
  return id ? (userStore.get(id) ?? null) : null
}

export function saveUser(user: StoredUser): void {
  userStore.set(user.id, user)
  emailIndex.set(user.email.toLowerCase(), user.id)
  if (user.lineId) lineIndex.set(user.lineId, user.id)
}
