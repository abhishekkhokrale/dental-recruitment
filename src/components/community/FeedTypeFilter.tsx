'use client'

import { useState } from 'react'
import type { ContentType } from '@/lib/mock-data/community'

export type FeedType = 'all' | ContentType

const FILTERS: { value: FeedType; label: string; icon: string }[] = [
  { value: 'all', label: 'すべて', icon: '⊞' },
  { value: 'post', label: '投稿', icon: '✍️' },
  { value: 'article', label: '記事', icon: '📚' },
  { value: 'question', label: '質問', icon: '❓' },
  { value: 'case', label: 'ケース', icon: '🦷' },
]

interface FeedTypeFilterProps {
  onChange?: (type: FeedType) => void
}

export default function FeedTypeFilter({ onChange }: FeedTypeFilterProps) {
  const [active, setActive] = useState<FeedType>('all')

  function handleSelect(type: FeedType) {
    setActive(type)
    onChange?.(type)
  }

  return (
    <div className="flex gap-1 flex-wrap" role="tablist" aria-label="コンテンツタイプフィルター">
      {FILTERS.map(({ value, label, icon }) => {
        const isActive = active === value
        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => handleSelect(value)}
            className={[
              'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border',
              isActive
                ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-cyan-300 hover:text-cyan-600',
            ].join(' ')}
          >
            <span className="text-base leading-none">{icon}</span>
            <span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
