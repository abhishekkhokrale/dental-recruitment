'use client'

import { useState } from 'react'

interface VoteButtonProps {
  initialScore: number
  initialVote?: 'up' | 'down' | null
}

export default function VoteButton({ initialScore, initialVote = null }: VoteButtonProps) {
  const [vote, setVote] = useState<'up' | 'down' | null>(initialVote)
  const [score, setScore] = useState(initialScore)

  function handleUpvote() {
    if (vote === 'up') {
      setVote(null)
      setScore(initialScore)
    } else if (vote === 'down') {
      setVote('up')
      setScore(initialScore + 1)
    } else {
      setVote('up')
      setScore(initialScore + 1)
    }
  }

  function handleDownvote() {
    if (vote === 'down') {
      setVote(null)
      setScore(initialScore)
    } else if (vote === 'up') {
      setVote('down')
      setScore(initialScore - 1)
    } else {
      setVote('down')
      setScore(initialScore - 1)
    }
  }

  return (
    <div className="flex flex-col items-center gap-0.5 w-8 shrink-0">
      <button
        type="button"
        onClick={handleUpvote}
        aria-label="アップボート"
        className={[
          'p-1 rounded transition-colors',
          vote === 'up' ? 'text-orange-500' : 'text-gray-400 hover:text-orange-400 hover:bg-orange-50',
        ].join(' ')}
      >
        <svg className="w-5 h-5" fill={vote === 'up' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
      <span className={[
        'text-xs font-bold leading-none',
        vote === 'up' ? 'text-orange-500' : vote === 'down' ? 'text-blue-500' : 'text-gray-600',
      ].join(' ')}>
        {score >= 1000 ? `${(score / 1000).toFixed(1)}k` : score}
      </span>
      <button
        type="button"
        onClick={handleDownvote}
        aria-label="ダウンボート"
        className={[
          'p-1 rounded transition-colors',
          vote === 'down' ? 'text-blue-500' : 'text-gray-400 hover:text-blue-400 hover:bg-blue-50',
        ].join(' ')}
      >
        <svg className="w-5 h-5" fill={vote === 'down' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
    </div>
  )
}
