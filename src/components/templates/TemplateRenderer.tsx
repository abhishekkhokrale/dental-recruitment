import type { LandingPageContent, TemplateId, SectionConfig, SectionId } from '@/lib/types/landing-page'
import TemplateModern from './TemplateModern'
import TemplateWarm from './TemplateWarm'
import TemplatePremium from './TemplatePremium'
import TemplateFresh from './TemplateFresh'
import TemplateTraditional from './TemplateTraditional'

interface Props {
  templateId: TemplateId
  content: LandingPageContent
  sections?: SectionConfig[]
  themeColor?: string
  wrapSection?: (id: SectionId, children: React.ReactNode) => React.ReactNode
}

export default function TemplateRenderer({ templateId, content, sections, themeColor, wrapSection }: Props) {
  const props = { content, sections, themeColor, wrapSection }
  switch (templateId) {
    case 'modern':      return <TemplateModern {...props} />
    case 'warm':        return <TemplateWarm {...props} />
    case 'premium':     return <TemplatePremium {...props} />
    case 'fresh':       return <TemplateFresh {...props} />
    case 'traditional': return <TemplateTraditional {...props} />
    default:            return <TemplateModern {...props} />
  }
}

