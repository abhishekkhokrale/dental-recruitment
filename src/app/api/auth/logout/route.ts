import { type NextRequest, NextResponse } from 'next/server'
import { deleteSession } from '@/lib/auth'

export async function POST(_request: NextRequest) {
  await deleteSession()
  return NextResponse.redirect(new URL('/login', _request.url))
}
