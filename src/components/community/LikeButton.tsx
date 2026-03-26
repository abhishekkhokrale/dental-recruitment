'use client'

import { useState } from 'react'

interface LikeButtonProps {
  initialCount: number
  initialLiked?: boolean
}

export default function LikeButton({ initialCount, initialLiked = false }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [count, setCount] = useState(initialCount)

  function toggle() {
    setLiked((v) => {
      const next = !v
      setCount((c) => (next ? c + 1 : Math.max(0, c - 1)))
      return next
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={liked ? 'Unlike' : 'Like'}
      className={[
        'flex items-center gap-1.5 text-sm transition-colors',
        liked ? 'text-cyan-600' : 'text-gray-400 hover:text-cyan-500',
      ].join(' ')}
    >
      <svg
        className="w-4 h-4"
        fill={liked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053a4.5 4.5 0 0 1 1.423.23l.777.26A7.5 7.5 0 0 0 5.904 18.5Z"
        />
      </svg>
      <span>{count}</span>
    </button>
  )
}
