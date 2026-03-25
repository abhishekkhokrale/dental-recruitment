import { redirect } from 'next/navigation'

// Legacy route — redirects to new /clinics/[slug] path
export default async function LegacyLpPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  redirect(`/clinics/${slug}`)
}
