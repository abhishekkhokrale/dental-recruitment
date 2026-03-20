'use client'

import { useState } from 'react'

interface LikeButtonProps {
  initialCount: number
  initialLiked?: boolean
}

export default function LikeButton({ initialCount, initialLiked = false }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)
  const [animating, setAnimating] = useState(false)

  function handleClick() {
    if (animating) return
    setAnimating(true)
    const nextLiked = !liked
    setLiked(nextLiked)
    setCount((prev) => (nextLiked ? prev + 1 : prev - 1))
    setTimeout(() => setAnimating(false), 300)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={liked ? 'いいねを取り消す' : 'いいね'}
      aria-pressed={liked}
      className={[
        'flex items-center gap-1.5 text-sm font-medium transition-all duration-200 select-none',
        liked
          ? 'text-rose-500'
          : 'text-gray-400 hover:text-rose-400',
        animating ? 'scale-125' : 'scale-100',
      ].join(' ')}
    >
      <svg
        className={[
          'w-4 h-4 transition-transform duration-200',
          animating ? 'scale-125' : 'scale-100',
        ].join(' ')}
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={liked ? 0 : 1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span>{count}</span>
    </button>
  )
}
