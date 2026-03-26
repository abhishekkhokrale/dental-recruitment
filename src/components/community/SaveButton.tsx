'use client'

import { useState } from 'react'

interface SaveButtonProps {
  initialSaved?: boolean
  initialCount?: number
}

export default function SaveButton({ initialSaved = false, initialCount = 0 }: SaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved)
  const [count, setCount] = useState(initialCount)

  function toggle() {
    setSaved((v) => {
      const next = !v
      setCount((c) => (next ? c + 1 : Math.max(0, c - 1)))
      return next
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={saved ? '保存を解除' : '保存する'}
      className={[
        'flex items-center gap-1.5 text-sm transition-colors',
        saved ? 'text-cyan-600' : 'text-gray-400 hover:text-cyan-500',
      ].join(' ')}
    >
      <svg
        className="w-4 h-4"
        fill={saved ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
      {count > 0 && <span>{count}</span>}
    </button>
  )
}
