export type TemplateId = 'modern' | 'warm' | 'premium' | 'fresh' | 'traditional'
export type LandingPageStatus = 'draft' | 'published'
export type SectionId = 'hero' | 'clinic' | 'positions' | 'benefits' | 'conditions' | 'faq' | 'contact'

export interface SectionConfig {
  id: SectionId
  enabled: boolean
  order: number
}

export interface HeroContent {
  heading: string
  subheading: string
  ctaText: string
  badgeText: string
  heroImage?: string  // URL or data URL for background image
}

export interface ClinicIntroContent {
  name: string
  tagline: string
  description: string
  directorName: string
  directorTitle: string
  directorMessage: string
  foundedYear: string
  staffCount: string
  clinicImages?: string[]  // gallery images (URLs or data URLs)
}

export interface PositionItem {
  id: string
  title: string
  jobType: string
  employmentType: string
  salaryText: string
  description: string
  highlights: string[]
}

export interface BenefitItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface WorkConditionsContent {
  hours: string
  holidays: string
  training: string
  environment: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface ContactContent {
  address: string
  phone: string
  email: string
  applicationNote: string
}

export interface SeoContent {
  metaTitle: string
  metaDescription: string
}

export interface LandingPageContent {
  hero: HeroContent
  clinicIntro: ClinicIntroContent
  positions: PositionItem[]
  benefits: BenefitItem[]
  workConditions: WorkConditionsContent
  faq: FaqItem[]
  contact: ContactContent
  seo: SeoContent
}

export interface LandingPage {
  id: string
  clinicId: string
  clinicSlug: string         // public URL: /clinics/[clinicSlug]
  templateId: TemplateId
  title: string
  status: LandingPageStatus
  sections: SectionConfig[]  // section visibility & order
  themeColor?: string        // overrides template primary color
  content: LandingPageContent
  createdAt: string
  updatedAt: string
  publishedAt?: string
  viewCount: number
  isClinicPage: boolean      // true = this is the clinic's official page
}

export interface TemplateDefinition {
  id: TemplateId
  name: string
  nameJa: string
  tagline: string
  primaryColor: string
  accentColor: string
  gradientFrom: string
  gradientTo: string
  tags: string[]
  recommended: boolean
}
