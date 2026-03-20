export function formatSalary(
  min: number,
  max: number,
  type: '月給' | '時給' | '年収',
): string {
  if (type === '時給') {
    const formattedMin = min.toLocaleString('ja-JP')
    const formattedMax = max.toLocaleString('ja-JP')
    return `時給 ${formattedMin}〜${formattedMax}円`
  }

  // For 月給 and 年収, express in 万円
  const minMan = Math.floor(min / 10000)
  const maxMan = Math.floor(max / 10000)

  // Show decimal if not a round 万 number
  const formatMan = (yen: number): string => {
    const man = yen / 10000
    return Number.isInteger(man) ? `${man}` : `${man.toFixed(1)}`
  }

  return `${type} ${formatMan(min)}〜${formatMan(max)}万円`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
}

export function formatRelativeDate(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return '今日'
  }
  if (diffDays === 1) {
    return '1日前'
  }
  if (diffDays < 7) {
    return `${diffDays}日前`
  }
  if (diffDays < 14) {
    return '1週間前'
  }
  if (diffDays < 21) {
    return '2週間前'
  }
  if (diffDays < 28) {
    return '3週間前'
  }
  if (diffDays < 60) {
    return '1ヶ月前'
  }
  return '1ヶ月以上前'
}
