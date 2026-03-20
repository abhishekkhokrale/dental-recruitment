import Link from 'next/link'
import Image from 'next/image'

const jobseekerLinks = [
  { href: '/jobs', label: '求人を探す' },
  { href: '/register', label: '無料会員登録' },
  { href: '/community', label: 'コミュニティ' },
]

const clinicLinks = [
  { href: '/clinic/dashboard', label: 'クリニック管理' },
  { href: '/clinic/register', label: '掲載のお申し込み' },
  { href: '/clinic/pricing', label: '料金プラン' },
]

const legalLinks = [
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/terms', label: '利用規約' },
  { href: '/contact', label: 'お問い合わせ' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-3">
              <Image
                src="/bluejobs-logo.png"
                alt="ブルージョブズ"
                width={140}
                height={38}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              歯科業界の求職・採用をもっと簡単に
            </p>
          </div>

          {/* Jobseeker links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              求職者の方
            </h3>
            <ul className="space-y-2">
              {jobseekerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              クリニックの方
            </h3>
            <ul className="space-y-2">
              {clinicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              サポート
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            © 2025 ブルージョブズ株式会社 All Rights Reserved.
          </p>
          <a
            href="https://corp.bluejobs.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 hover:text-cyan-400 transition-colors"
          >
            corp.bluejobs.net
          </a>
        </div>
      </div>
    </footer>
  )
}
