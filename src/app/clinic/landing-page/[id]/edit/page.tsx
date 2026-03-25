import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLandingPageById } from '@/lib/mock-data/landing-pages'
import LandingPageEditorWP from '@/components/clinic/landing-page/LandingPageEditorWP'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const lp = getLandingPageById(id)
  return { title: lp ? `${lp.title}を編集 | クリニック管理` : '編集' }
}

export default async function EditLandingPagePage({ params }: Props) {
  const { id } = await params
  const lp = getLandingPageById(id)

  if (!lp) notFound()

  return <LandingPageEditorWP landingPage={lp} />
}
