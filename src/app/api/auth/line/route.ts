import { redirect } from 'next/navigation'
import { randomBytes } from 'crypto'
import { cookies } from 'next/headers'

// LINE Login v2.1 — requires LINE_CLIENT_ID env var
// Set up at: https://developers.line.biz/console/
export async function GET() {
  const clientId = process.env.LINE_CLIENT_ID
  if (!clientId) {
    // Graceful fallback for dev without credentials
    redirect('/login?error=line_not_configured')
  }

  const state = randomBytes(16).toString('hex')
  const cookieStore = await cookies()
  cookieStore.set('line_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
    path: '/',
  })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
  const callbackUrl = `${baseUrl}/api/auth/line/callback`

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: callbackUrl,
    state,
    scope: 'profile openid email',
  })

  redirect(`https://access.line.me/oauth2/v2.1/authorize?${params}`)
}
