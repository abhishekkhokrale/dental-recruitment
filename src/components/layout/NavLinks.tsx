'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinksProps {
  links: { href: string; label: string }[]
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? 'border-b-2 border-cyan-600 text-cyan-600 font-medium pb-1 transition-colors'
                : 'text-gray-600 hover:text-cyan-600 pb-1 transition-colors'
            }
          >
            {link.label}
          </Link>
        )
      })}
    </>
  )
}
