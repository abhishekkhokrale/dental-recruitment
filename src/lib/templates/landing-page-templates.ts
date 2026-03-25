import type { TemplateDefinition, LandingPageContent, TemplateId, SectionConfig } from '@/lib/types/landing-page'

export const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: 'hero',       enabled: true, order: 0 },
  { id: 'clinic',     enabled: true, order: 1 },
  { id: 'positions',  enabled: true, order: 2 },
  { id: 'benefits',   enabled: true, order: 3 },
  { id: 'conditions', enabled: true, order: 4 },
  { id: 'faq',        enabled: true, order: 5 },
  { id: 'contact',    enabled: true, order: 6 },
]

export const SECTION_LABELS: Record<string, string> = {
  hero:       'ヒーロー',
  clinic:     'クリニック紹介',
  positions:  '募集職種',
  benefits:   '福利厚生',
  conditions: '勤務条件',
  faq:        'よくある質問',
  contact:    'お問い合わせ',
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    nameJa: 'モダン・プロフェッショナル',
    tagline: 'スッキリとしたプロフェッショナルなデザイン',
    primaryColor: '#2ca9e1',
    accentColor: '#0891b2',
    gradientFrom: '#2ca9e1',
    gradientTo: '#1d8fc0',
    tags: ['シンプル', 'プロ', '清潔感'],
    recommended: true,
  },
  {
    id: 'warm',
    name: 'Warm & Friendly',
    nameJa: '温かみと親しみ',
    tagline: '親しみやすく温かい雰囲気のデザイン',
    primaryColor: '#f97316',
    accentColor: '#ea580c',
    gradientFrom: '#fb923c',
    gradientTo: '#f43f5e',
    tags: ['温かみ', '親しみやすい', '家族的'],
    recommended: false,
  },
  {
    id: 'premium',
    name: 'Premium Luxury',
    nameJa: 'プレミアム・ラグジュアリー',
    tagline: '高級感と洗練されたエレガントなデザイン',
    primaryColor: '#d4a843',
    accentColor: '#b8922a',
    gradientFrom: '#1e293b',
    gradientTo: '#0f172a',
    tags: ['高級感', 'エレガント', 'プレミアム'],
    recommended: false,
  },
  {
    id: 'fresh',
    name: 'Fresh & Energetic',
    nameJa: 'フレッシュ・エナジェティック',
    tagline: 'エネルギッシュで活気あるデザイン',
    primaryColor: '#10b981',
    accentColor: '#059669',
    gradientFrom: '#10b981',
    gradientTo: '#0d9488',
    tags: ['活気', '若々しい', 'フレッシュ'],
    recommended: false,
  },
  {
    id: 'traditional',
    name: 'Traditional Trust',
    nameJa: '伝統と信頼',
    tagline: '安心感と信頼感を伝える王道デザイン',
    primaryColor: '#1e40af',
    accentColor: '#1d4ed8',
    gradientFrom: '#1e40af',
    gradientTo: '#312e81',
    tags: ['信頼感', '安心', '実績'],
    recommended: false,
  },
]

const defaultPositions = [
  {
    id: 'pos1',
    title: '歯科衛生士',
    jobType: '歯科衛生士',
    employmentType: '正社員',
    salaryText: '月給 25万円〜35万円',
    description: 'チームワークを大切にしながら、患者様の口腔健康をサポートするお仕事です。経験者はもちろん、ブランクのある方も歓迎します。',
    highlights: ['経験者優遇', '産休・育休実績あり', '研修制度充実'],
  },
  {
    id: 'pos2',
    title: '歯科助手',
    jobType: '歯科助手',
    employmentType: 'パート・アルバイト',
    salaryText: '時給 1,200円〜1,500円',
    description: '未経験の方もしっかりとした研修があるので安心してご応募ください。院内の雰囲気を感じながらお仕事を学べます。',
    highlights: ['未経験歓迎', '週3日〜OK', 'シフト相談可'],
  },
]

const defaultBenefits = [
  { id: 'b1', icon: '🏥', title: '社会保険完備', description: '健康保険・厚生年金・雇用保険・労災保険完備' },
  { id: 'b2', icon: '📚', title: '充実した研修制度', description: '入社時研修から定期的なスキルアップ研修まで充実' },
  { id: 'b3', icon: '🌸', title: '産休・育休取得実績', description: '育児との両立をサポート。復職実績も多数あります' },
  { id: 'b4', icon: '⏰', title: '残業ほぼなし', description: '定時退社を推進。プライベートとの両立が可能です' },
  { id: 'b5', icon: '💰', title: '賞与・昇給制度', description: '年2回の賞与と、実績に応じた昇給制度があります' },
  { id: 'b6', icon: '🦷', title: '歯科治療費補助', description: '従業員とご家族の歯科治療費用を一部補助します' },
]

export function getDefaultContent(clinicName = '○○歯科クリニック'): LandingPageContent {
  return {
    hero: {
      heading: `${clinicName}で一緒に働きませんか？`,
      subheading: '患者様に寄り添い、笑顔があふれる職場で\nあなたの力を発揮してください。',
      ctaText: '求人に応募する',
      badgeText: '積極採用中',
    },
    clinicIntro: {
      name: clinicName,
      tagline: '地域に根ざした、信頼の歯科医院',
      description:
        '私たちは患者様の笑顔のために、最新の設備と技術で質の高い歯科治療を提供しています。スタッフ一人ひとりが輝ける職場環境を大切にしています。',
      directorName: '院長 田中 太郎',
      directorTitle: '歯学博士',
      directorMessage:
        'スタッフが笑顔で働ける環境こそが、患者様への最高のサービスにつながると信じています。一緒に素晴らしい歯科医院を作り上げていきましょう。',
      foundedYear: '2010',
      staffCount: '15',
      clinicImages: [],
    },
    positions: defaultPositions,
    benefits: defaultBenefits,
    workConditions: {
      hours: '9:00〜18:00（休憩1時間）',
      holidays: '日曜日・祝日・木曜日午後',
      training: '入社時研修あり・定期勉強会・外部セミナー参加可',
      environment: '完全禁煙・院内駐車場完備・院内着貸与',
    },
    faq: [
      {
        id: 'faq1',
        question: '未経験でも応募できますか？',
        answer: 'はい、歯科助手職は未経験の方も大歓迎です。入社後の研修制度が充実していますので、安心してお仕事を始めていただけます。',
      },
      {
        id: 'faq2',
        question: 'パートから正社員になることはできますか？',
        answer: 'はい、実績やご本人の希望に応じて、パートから正社員への登用実績があります。詳しくは面接時にご相談ください。',
      },
      {
        id: 'faq3',
        question: '子育て中でも働けますか？',
        answer: 'はい、育児中のスタッフが多数活躍中です。時短勤務やシフト調整にも柔軟に対応しています。産休・育休取得実績もございます。',
      },
    ],
    contact: {
      address: '東京都渋谷区○○1-2-3',
      phone: '03-1234-5678',
      email: 'recruit@example-dental.jp',
      applicationNote: 'お電話またはメールにてお気軽にお問い合わせください。面接日程は応相談です。',
    },
    seo: {
      metaTitle: `${clinicName} クリニックページ | スタッフ募集・診療案内`,
      metaDescription: `${clinicName}の公式クリニックページです。診療案内・求人情報をご覧いただけます。`,
    },
  }
}

export function getTemplate(id: TemplateId): TemplateDefinition {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]
}
