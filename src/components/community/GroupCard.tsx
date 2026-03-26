import type { CommunityGroup } from '@/lib/mock-data/community'
import { PROFESSION_LABELS } from '@/lib/mock-data/community'

interface GroupCardProps {
  group: CommunityGroup
  compact?: boolean
}

export default function GroupCard({ group, compact = false }: GroupCardProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg ${group.color} flex items-center justify-center shrink-0`}>
          <span className="text-sm font-bold text-gray-700">{group.name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{group.name}</p>
          <p className="text-xs text-gray-400">{group.memberCount.toLocaleString()}人のメンバー</p>
        </div>
        {group.isJoined ? (
          <span className="text-xs text-cyan-600 font-medium shrink-0">参加済み</span>
        ) : (
          <button
            type="button"
            className="text-xs font-medium text-gray-600 border border-gray-300 rounded-full px-3 py-1 hover:border-cyan-400 hover:text-cyan-600 transition-colors shrink-0"
          >
            参加
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${group.color} flex items-center justify-center shrink-0`}>
          <span className="text-xl font-bold text-gray-700">{group.name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{group.name}</h3>
          {(group.profession || group.specialty) && (
            <p className="text-xs text-cyan-600 font-medium mb-1">
              {group.profession ? PROFESSION_LABELS[group.profession] : group.specialty}
            </p>
          )}
          <p className="text-sm text-gray-500 leading-relaxed mb-3">{group.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
            <span>{group.memberCount.toLocaleString()}人のメンバー</span>
            <span>{group.postCount}件の投稿</span>
          </div>
          <button
            type="button"
            className={[
              'w-full py-2 rounded-lg text-sm font-semibold transition-colors',
              group.isJoined
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'bg-cyan-600 text-white hover:bg-cyan-700',
            ].join(' ')}
          >
            {group.isJoined ? '参加済み' : 'グループに参加'}
          </button>
        </div>
      </div>
    </div>
  )
}
