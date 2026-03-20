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
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="トピックフィルター">
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
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 border',
              isActive
                ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-cyan-300 hover:text-cyan-600',
            ].join(' ')}
          >
            {topic}
          </button>
        )
      })}
    </div>
  )
}
