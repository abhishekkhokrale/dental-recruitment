import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
          >
            <span aria-hidden="true">🦷</span>
            <span>デンタルキャリア</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
