'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

const TRENDING = [
  {
    id: 't1',
    title: 'フルマウスリハビリの最新アプローチ',
    desc: '重度咬耗患者へのジルコニアクラウン全顎適用',
    group: '補綴科',
    bgFrom: '#1e1b4b',
    bgTo: '#312e81',
    accent: '#818cf8',
    icon: '🦷',
    avatar: '🦷',
    comments: 23,
  },
  {
    id: 't2',
    title: '辞めないスタッフチームの作り方',
    desc: '離職率40%を10%未満にした実践的な取り組み',
    group: 'クリニックオーナー',
    bgFrom: '#0c4a6e',
    bgTo: '#0369a1',
    accent: '#38bdf8',
    icon: '🏥',
    avatar: '🏥',
    comments: 67,
  },
  {
    id: 't3',
    title: 'マウスピース矯正の適応基準を見直す',
    desc: '成人患者でNOと言うべきケースの見極め方',
    group: '矯正科',
    bgFrom: '#4a0519',
    bgTo: '#9f1239',
    accent: '#fb7185',
    icon: '😁',
    avatar: '😁',
    comments: 56,
  },
  {
    id: 't4',
    title: 'CAD/CAMとハンドスキルの両立',
    desc: 'テクノロジー時代に職人技を磨く理由',
    group: '歯科技工士',
    bgFrom: '#431407',
    bgTo: '#9a3412',
    accent: '#fb923c',
    icon: '⚙️',
    avatar: '⚙️',
    comments: 38,
  },
  {
    id: 't5',
    title: '小児歯科における行動管理の最前線',
    desc: '非協力的な幼児への最新アプローチとSDF活用法',
    group: '小児歯科',
    bgFrom: '#052e16',
    bgTo: '#166534',
    accent: '#4ade80',
    icon: '👶',
    avatar: '👶',
    comments: 29,
  },
]

export default function TrendingCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const cardWidth = card ? card.offsetWidth + 8 : 300
    el.scrollBy({ left: dir === 'right' ? cardWidth : -cardWidth, behavior: 'smooth' })
  }

  return (
    <div className="relative mb-4">
      {/* ← Prev button — hidden at start */}
      <button
        type="button"
        onClick={() => scroll('left')}
        aria-label="前のスライド"
        className={[
          'absolute left-2 top-1/2 -translate-y-1/2 z-20',
          'flex items-center justify-center w-10 h-10',
          'bg-white rounded-full shadow-xl border border-gray-200',
          'text-gray-700 text-xs font-semibold',
          'hover:bg-gray-50 hover:shadow-2xl active:scale-95',
          'transition-all duration-200',
          canScrollLeft
            ? 'opacity-100 pointer-events-auto translate-x-0'
            : 'opacity-0 pointer-events-none -translate-x-2',
        ].join(' ')}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TRENDING.map((item) => (
          <button
            key={item.id}
            type="button"
            className="relative shrink-0 snap-start w-[calc(33.33%-6px)] min-w-64 h-52 rounded-xl overflow-hidden text-white text-left group cursor-pointer shadow-md hover:shadow-2xl hover:scale-[1.01] transition-all duration-200"
            style={{ background: `linear-gradient(135deg, ${item.bgFrom} 0%, ${item.bgTo} 100%)` }}
          >
            {/* Large decorative icon */}
            <div
              className="absolute top-0 right-0 text-[110px] leading-none select-none pointer-events-none"
              style={{ color: item.accent, opacity: 0.18, transform: 'translate(10px, -10px)' }}
              aria-hidden="true"
            >
              {item.icon}
            </div>

            {/* Bottom dark scrim */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-white/30"
                  style={{ backgroundColor: item.accent + '33' }}
                >
                  {item.avatar}
                </div>
                <span className="text-xs font-semibold text-white/90">{item.group}</span>
                <span className="text-xs text-white/50 ml-auto">and more</span>
              </div>
              <p className="font-bold text-sm leading-snug line-clamp-2 text-white drop-shadow">
                {item.title}
              </p>
              <p className="text-xs mt-1 line-clamp-1" style={{ color: item.accent, opacity: 0.85 }}>
                {item.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* → Next button — hidden at end */}
      <button
        type="button"
        onClick={() => scroll('right')}
        aria-label="次のスライド"
        className={[
          'absolute right-2 top-1/2 -translate-y-1/2 z-20',
          'flex items-center justify-center w-10 h-10',
          'bg-white rounded-full shadow-xl border border-gray-200',
          'text-gray-700 text-xs font-semibold',
          'hover:bg-gray-50 hover:shadow-2xl active:scale-95',
          'transition-all duration-200',
          canScrollRight
            ? 'opacity-100 pointer-events-auto translate-x-0'
            : 'opacity-0 pointer-events-none translate-x-2',
        ].join(' ')}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  )
}
