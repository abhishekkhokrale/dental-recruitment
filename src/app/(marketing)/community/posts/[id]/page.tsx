import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { trendingPosts } from '@/lib/mock-data/community'
import PostDetailClient from '@/components/community/PostDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = trendingPosts.find((p) => p.id === id)
  if (!post) return {}
  return { title: `${post.title} | 歯科コミュニティ` }
}

export default async function TrendingPostPage({ params }: Props) {
  const { id } = await params
  const post = trendingPosts.find((p) => p.id === id)
  if (!post) notFound()

  return <PostDetailClient post={post} />
}
