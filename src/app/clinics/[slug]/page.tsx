import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLandingPageBySlug } from '@/lib/mock-data/landing-pages'
import TemplateRenderer from '@/components/templates/TemplateRenderer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lp = getLandingPageBySlug(slug)
  if (!lp) return { title: 'ページが見つかりません' }

  return {
    title: lp.content.seo.metaTitle,
    description: lp.content.seo.metaDescription,
    openGraph: {
      title: lp.content.seo.metaTitle,
      description: lp.content.seo.metaDescription,
      type: 'website',
    },
  }
}

export default async function PublicClinicLandingPage({ params }: Props) {
  const { slug } = await params
  const lp = getLandingPageBySlug(slug)

  if (!lp) notFound()

  return (
    <TemplateRenderer
      templateId={lp.templateId}
      content={lp.content}
      sections={lp.sections}
      themeColor={lp.themeColor}
    />
  )
}
