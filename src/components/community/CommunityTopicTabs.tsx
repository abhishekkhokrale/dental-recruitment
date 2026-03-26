'use client'

import { useState } from 'react'
import { communityTopics, type CommunityTopic } from '@/lib/mock-data/community'

interface CommunityTopicTabsProps {
  onTopicChange?: (topic: CommunityTopic) => void
}

export default function CommunityTopicTabs({ onTopicChange }: CommunityTopicTabsProps) {
  const [active, setActive] = useState<CommunityTopic>('すべて')

  function handleSelect(topic: CommunityTopic) {
    setActive(topic)
    onTopicChange?.(topic)
  }

  return (
    <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="トピックフィルター">
      {communityTopics.map((topic) => {
        const isActive = active === topic
        return (
          <button
            key={topic}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => handleSelect(topic)}
            className={[
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150',
              isActive
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ].join(' ')}
          >
            {topic}
          </button>
        )
      })}
    </div>
  )
}
