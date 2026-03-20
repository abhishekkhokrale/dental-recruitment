import React from 'react'
import type { ApplicationStatus } from '@/lib/types/application'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-cyan-100 text-cyan-700',
}

const applicationStatusVariant: Record<ApplicationStatus, NonNullable<BadgeProps['variant']>> = {
  '書類選考中': 'info',
  '面接調整中': 'warning',
  '一次面接': 'warning',
  '二次面接': 'warning',
  '最終面接': 'warning',
  '内定': 'success',
  '不採用': 'danger',
  '辞退': 'default',
}

export function getApplicationStatusVariant(status: ApplicationStatus): NonNullable<BadgeProps['variant']> {
  return applicationStatusVariant[status]
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const classes = [
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{children}</span>
}
