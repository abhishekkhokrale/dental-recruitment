import Link from 'next/link'
import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center">
            <Image
              src="/bluejobs-logo.png"
              alt="ブルージョブズ"
              width={160}
              height={44}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
