import type { LandingPage } from '@/lib/types/landing-page'
import { getDefaultContent, DEFAULT_SECTIONS } from '@/lib/templates/landing-page-templates'

export const mockLandingPages: LandingPage[] = [
  {
    id: 'lp1',
    clinicId: 'clinic-001',
    clinicSlug: 'smile-dental-shibuya',
    templateId: 'modern',
    title: 'スマイル歯科クリニック 公式ページ',
    status: 'published',
    sections: DEFAULT_SECTIONS,
    themeColor: undefined,
    isClinicPage: true,
    content: {
      ...getDefaultContent('スマイル歯科クリニック'),
      hero: {
        heading: 'スマイル歯科クリニックへようこそ',
        subheading: '渋谷の地域医療を支える歯科クリニック\n採用情報・診療案内はこちらからご覧ください。',
        ctaText: '採用情報を見る',
        badgeText: '正社員・パート 積極採用中',
      },
      clinicIntro: {
        name: 'スマイル歯科クリニック',
        tagline: '渋谷・新宿エリアで予防歯科を中心に地域医療を支えています',
        description:
          '2005年の開院以来、渋谷エリアで予防歯科と審美歯科を中心に地域の皆さまの口腔健康をサポートしてきました。痛みの少ない治療と丁寧なカウンセリングを心がけています。',
        directorName: '院長 鈴木 健一',
        directorTitle: '歯学博士',
        directorMessage:
          '歯科医療は治すだけでなく、予防して健康を維持することが大切だと信じています。スタッフ一同、皆さまのお越しをお待ちしています。',
        foundedYear: '2005',
        staffCount: '18',
        clinicImages: [],
      },
    },
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-02-20T14:30:00Z',
    publishedAt: '2026-02-20T14:35:00Z',
    viewCount: 342,
  },
  {
    id: 'lp2',
    clinicId: 'clinic-002',
    clinicSlug: 'sakura-dental-osaka',
    templateId: 'warm',
    title: 'さくら歯科医院 公式ページ',
    status: 'published',
    sections: DEFAULT_SECTIONS,
    themeColor: undefined,
    isClinicPage: true,
    content: {
      ...getDefaultContent('さくら歯科医院'),
      clinicIntro: {
        ...getDefaultContent('さくら歯科医院').clinicIntro,
        name: 'さくら歯科医院',
        tagline: '梅田の総合歯科医院 — 一般歯科から矯正・インプラントまで',
        directorName: '院長 中村 桜子',
        directorTitle: '歯学博士・矯正専門医',
        foundedYear: '1998',
        staffCount: '32',
      },
    },
    createdAt: '2026-02-01T09:00:00Z',
    updatedAt: '2026-03-01T11:00:00Z',
    publishedAt: '2026-03-01T11:05:00Z',
    viewCount: 128,
  },
  {
    id: 'lp3',
    clinicId: 'clinic-001',
    clinicSlug: 'smile-dental-spring-2026',
    templateId: 'fresh',
    title: '2026年春 採用キャンペーンLP',
    status: 'draft',
    sections: DEFAULT_SECTIONS,
    themeColor: undefined,
    isClinicPage: false,
    content: {
      ...getDefaultContent('スマイル歯科クリニック'),
      hero: {
        heading: '春からスタート！新スタッフ募集中',
        subheading: '4月入社に向けて採用活動を開始しました。\n温かいチームであなたをお待ちしています。',
        ctaText: '詳細を見る',
        badgeText: '2026年春 新卒・第二新卒歓迎',
      },
    },
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-03-10T11:00:00Z',
    viewCount: 0,
  },
]

export function getLandingPageByClinicId(clinicId: string): LandingPage[] {
  return mockLandingPages.filter((lp) => lp.clinicId === clinicId)
}

export function getLandingPageBySlug(slug: string): LandingPage | undefined {
  return mockLandingPages.find((lp) => lp.clinicSlug === slug && lp.status === 'published')
}

export function getLandingPageById(id: string): LandingPage | undefined {
  return mockLandingPages.find((lp) => lp.id === id)
}

export function getClinicOfficialPage(clinicId: string): LandingPage | undefined {
  return mockLandingPages.find((lp) => lp.clinicId === clinicId && lp.isClinicPage && lp.status === 'published')
}
