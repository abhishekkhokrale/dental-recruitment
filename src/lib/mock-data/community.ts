export type ContentType = 'post' | 'article' | 'question' | 'case'
export type ProfessionType = 'dentist' | 'hygienist' | 'technician' | 'clinic_owner'
export type ExperienceLevel = 'student' | 'fresher' | 'experienced'

export const PROFESSION_LABELS: Record<ProfessionType, string> = {
  dentist: '歯科医師',
  hygienist: '歯科衛生士',
  technician: '歯科技工士',
  clinic_owner: 'クリニックオーナー',
}

export const PROFESSION_COLORS: Record<ProfessionType, string> = {
  dentist: 'bg-indigo-50 text-indigo-700',
  hygienist: 'bg-cyan-50 text-cyan-700',
  technician: 'bg-amber-50 text-amber-700',
  clinic_owner: 'bg-emerald-50 text-emerald-700',
}

export const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  student: '学生',
  fresher: '新卒・フレッシャー',
  experienced: '経験者',
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  post: '投稿',
  article: '記事',
  question: '質問',
  case: 'ケース',
}

export interface CommunityAuthor {
  id: string
  name: string
  profession: ProfessionType
  experience: ExperienceLevel
  specialty?: string
}

export interface CommunityPost {
  id: string
  contentType: ContentType
  author: CommunityAuthor
  title?: string
  content: string
  topic: string
  tags?: string[]
  likeCount: number
  commentCount: number
  savedCount?: number
  postedAt: string
  isLiked?: boolean
  isSaved?: boolean
  caseSpecialty?: string
}

export interface CommunityGroup {
  id: string
  slug: string
  name: string
  description: string
  profession?: ProfessionType
  specialty?: string
  memberCount: number
  postCount: number
  isJoined?: boolean
  color: string
}

export const communityTopics = [
  'すべて',
  '症例',
  'キャリア・成長',
  '職場環境',
  'Q&A',
  '技術・機器',
  '教育',
] as const

export type CommunityTopic = (typeof communityTopics)[number]

export const mockCurrentUser = {
  id: 'me',
  name: '田中 美咲',
  profession: 'dentist' as ProfessionType,
  experience: 'experienced' as ExperienceLevel,
  specialty: '補綴科',
  isOpenToOpportunities: false,
  followerCount: 284,
  followingCount: 103,
  postCount: 47,
}

export const mockCommunityGroups: CommunityGroup[] = [
  {
    id: 'g-01',
    slug: 'dentists-network',
    name: '歯科医師ネットワーク',
    description: '歯科医師同士が臨床の知見を共有し、難症例を議論し、互いに支え合うためのスペースです。',
    profession: 'dentist',
    memberCount: 842,
    postCount: 234,
    isJoined: true,
    color: 'bg-indigo-100',
  },
  {
    id: 'g-02',
    slug: 'dental-hygienists',
    name: '歯科衛生士コミュニティ',
    description: 'ベストプラクティスや患者ケアのヒント、キャリアアドバイスを共有する歯科衛生士のためのコミュニティです。',
    profession: 'hygienist',
    memberCount: 1204,
    postCount: 387,
    isJoined: true,
    color: 'bg-cyan-100',
  },
  {
    id: 'g-03',
    slug: 'dental-technicians',
    name: '歯科技工士グループ',
    description: 'ラボ技工士同士が材料・CAD/CAM技術・職人技について語り合うグループです。',
    profession: 'technician',
    memberCount: 421,
    postCount: 156,
    isJoined: false,
    color: 'bg-amber-100',
  },
  {
    id: 'g-04',
    slug: 'clinic-owners',
    name: 'クリニックオーナー',
    description: '開業医や経営者が運営・人材・成長について議論するグループです。',
    profession: 'clinic_owner',
    memberCount: 318,
    postCount: 112,
    isJoined: false,
    color: 'bg-emerald-100',
  },
  {
    id: 'g-05',
    slug: 'prosthodontics',
    name: '補綴科',
    description: 'クラウン・ブリッジ・インプラント・フルマウスリハビリの症例や技術を深掘りするグループです。',
    specialty: '補綴科',
    memberCount: 567,
    postCount: 203,
    isJoined: false,
    color: 'bg-violet-100',
  },
  {
    id: 'g-06',
    slug: 'orthodontics',
    name: '矯正科',
    description: 'アライナーとブラケットの比較、成長期への介入、保定プロトコルなど矯正に関するすべてを扱います。',
    specialty: '矯正科',
    memberCount: 489,
    postCount: 178,
    isJoined: false,
    color: 'bg-pink-100',
  },
  {
    id: 'g-07',
    slug: 'fresh-graduates',
    name: '新卒・フレッシャーズ',
    description: '新卒歓迎のスペースです。初めての就職・継続教育・キャリア初期の疑問を気軽に相談できます。',
    memberCount: 736,
    postCount: 265,
    isJoined: true,
    color: 'bg-lime-100',
  },
  {
    id: 'g-08',
    slug: 'oral-surgery',
    name: '口腔外科',
    description: '抜歯・インプラント・顎手術など外科的手技と症例アウトカムについて議論するグループです。',
    specialty: '口腔外科',
    memberCount: 302,
    postCount: 89,
    isJoined: false,
    color: 'bg-red-100',
  },
  {
    id: 'g-09',
    slug: 'paediatric-dentistry',
    name: '小児歯科',
    description: '小児患者への対応・行動管理・予防的介入・成長について話し合うグループです。',
    specialty: '小児歯科',
    memberCount: 445,
    postCount: 134,
    isJoined: false,
    color: 'bg-orange-100',
  },
]

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-001',
    contentType: 'case',
    author: {
      id: 'u-01',
      name: '森 健二 先生',
      profession: 'dentist',
      experience: 'experienced',
      specialty: '補綴科',
    },
    title: '重度の咬耗を有する68歳患者のフルマウスリハビリテーション',
    content:
      '長年の歯ぎしりによる重度の歯の摩耗で来院した患者様です。咬合高径が約6mm低下していました。治療計画として、まず3か月間の暫間コンポジットベニアで新しい咬合高径を試してからフルアーチジルコニアクラウンを装着しました。X線写真と経過写真を共有できますが、材料選択と咬合様式についてのご意見をいただけると幸いです。',
    topic: '症例',
    tags: ['補綴科', 'フルマウスリハビリ', '咬合高径', '歯ぎしり'],
    likeCount: 87,
    commentCount: 23,
    savedCount: 34,
    postedAt: '2026-03-24T09:15:00Z',
    isLiked: false,
    isSaved: false,
    caseSpecialty: '補綴科',
  },
  {
    id: 'post-002',
    contentType: 'post',
    author: {
      id: 'u-02',
      name: '中村 あゆみ',
      profession: 'hygienist',
      experience: 'experienced',
    },
    content:
      '臨床8年目になって気づいたこと。患者さんのコンプライアンスを最も左右するのは、口腔内の問題の「なぜ」を丁寧に説明できているかどうかです。バイオフィルムの蓄積や酸性化のサイクルを患者さんが理解してくれると、本当に意識が変わります。チェアタイムに3分余分にかかっても、再治療の何時間もの時間を節約できます。',
    topic: '職場環境',
    tags: ['患者教育', '歯周病', 'コンプライアンス'],
    likeCount: 134,
    commentCount: 41,
    savedCount: 62,
    postedAt: '2026-03-24T07:30:00Z',
    isLiked: true,
    isSaved: false,
  },
  {
    id: 'post-003',
    contentType: 'article',
    author: {
      id: 'u-03',
      name: '鈴木 はな 先生',
      profession: 'dentist',
      experience: 'experienced',
      specialty: '矯正科',
    },
    title: '成人患者へのマウスピース矯正：適応を断るべき場合',
    content:
      'マウスピース矯正は成人矯正のアプローチを大きく変えました。しかしすべての患者が適応ではなく、ケース選択を適切に行わないことが業界の課題になっています。この記事では私が用いる臨床スクリーニング基準、不良転帰を予測するレッドフラグ、そしてSNS広告でマウスピース矯正への期待を高めて来院した患者との対話方法について解説します。',
    topic: '症例',
    tags: ['矯正科', 'マウスピース矯正', '成人矯正', '症例選択'],
    likeCount: 201,
    commentCount: 56,
    savedCount: 89,
    postedAt: '2026-03-23T14:00:00Z',
    isLiked: false,
    isSaved: true,
  },
  {
    id: 'post-004',
    contentType: 'question',
    author: {
      id: 'u-04',
      name: '山本 太郎',
      profession: 'hygienist',
      experience: 'fresher',
    },
    content:
      '就職して3か月が経ちました。歯周ポケット検査を拒否する患者さんへの対応について教えてください。表面麻酔を使用しても、プローブを当てようとすると非常に不安がって動いてしまう患者様がいます。行動管理のヒントや代替的な評価方法があれば教えていただけると助かります。',
    topic: 'Q&A',
    tags: ['歯周病', '不安患者', '新卒'],
    likeCount: 28,
    commentCount: 19,
    savedCount: 12,
    postedAt: '2026-03-23T10:45:00Z',
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'post-005',
    contentType: 'post',
    author: {
      id: 'u-05',
      name: '田中 博',
      profession: 'technician',
      experience: 'experienced',
    },
    content:
      'CAD/CAMは歯科技工の芸術を殺してはいない——むしろ底上げをしてくれた。もはや機能的なクラウンを作るために10年間のワックスアップ経験は必要ない。しかしその天井を作るのは、解剖学・光の反射・マイクロレベルのキャラクタライゼーションを理解した技工士たちだ。ソフトウェアも芸術も、両方学んでほしい。',
    topic: '技術・機器',
    tags: ['CAD/CAM', 'デンタルラボ', 'ジルコニア', 'テクノロジー'],
    likeCount: 167,
    commentCount: 38,
    savedCount: 71,
    postedAt: '2026-03-22T16:20:00Z',
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'post-006',
    contentType: 'case',
    author: {
      id: 'u-06',
      name: '渡辺 勇樹 先生',
      profession: 'dentist',
      experience: 'experienced',
      specialty: '口腔外科',
    },
    title: '抜歯即時インプラント埋入——骨質の考察（左下6番）',
    content:
      '昨日、Type IV骨質の左下6番部位に即時インプラントを埋入しました。初期固定は25 Ncmで境界線上でした。早期荷重失敗のリスクを避けるため、二期法で埋入することを選択しました。即時プロビジョナルへの移行に際するISQ閾値や、同じ判断をされるかどうか、インプラント専門家の方のご意見をいただけると幸いです。',
    topic: '症例',
    tags: ['インプラント', '即時埋入', '口腔外科', '骨質'],
    likeCount: 73,
    commentCount: 31,
    savedCount: 28,
    postedAt: '2026-03-22T11:10:00Z',
    isLiked: true,
    isSaved: false,
    caseSpecialty: '口腔外科',
  },
  {
    id: 'post-007',
    contentType: 'article',
    author: {
      id: 'u-07',
      name: '佐藤 美香 先生',
      profession: 'clinic_owner',
      experience: 'experienced',
    },
    title: '辞めないチームを作る：小規模クリニックのスタッフ定着戦略',
    content:
      '18か月で歯科衛生士が3人辞めて気づきました——問題は給与ではなく「成長機会」でした。特に若い歯科スタッフは、学びが止まると去っていきます。この記事では、定期的なCPD研修・メンタリングペアリング・院内ケースプレゼンテーションなど、離職率を40%から10%未満に下げた具体的な取り組みを紹介します。',
    topic: '職場環境',
    tags: ['クリニック経営', 'スタッフ定着', 'リーダーシップ', 'CPD'],
    likeCount: 245,
    commentCount: 67,
    savedCount: 112,
    postedAt: '2026-03-21T08:00:00Z',
    isLiked: true,
    isSaved: true,
  },
  {
    id: 'post-008',
    contentType: 'question',
    author: {
      id: 'u-08',
      name: '井上 れな',
      profession: 'hygienist',
      experience: 'student',
    },
    content:
      '歯科衛生士学校の最終学年です。6週間後に臨床試験があり、臼歯部の縁下デブライドメントのテクニックに最も苦労しています。ハンドポジション・フルクラム・直視できない状態でのルートプレーニング達成の確認方法について、アドバイスをいただけると助かります。',
    topic: '教育',
    tags: ['学生', '歯周病', '臨床試験', 'テクニック'],
    likeCount: 44,
    commentCount: 27,
    savedCount: 18,
    postedAt: '2026-03-20T19:30:00Z',
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'post-009',
    contentType: 'post',
    author: {
      id: 'u-09',
      name: '森 健二 先生',
      profession: 'dentist',
      experience: 'experienced',
      specialty: '補綴科',
    },
    content:
      '歯科大学で誰かに教えてほしかったこと：今日の「これで十分」は、10年後の「これで十分」とは違う。12時間勤務の深夜2時に妥協した0.2mmのオープンマージン——5年後にはすべてのプレップでそれを許せなくなる。経験と共に基準は上がる。自分に辛抱強く、でも妥協には決して慣れないでほしい。',
    topic: 'キャリア・成長',
    tags: ['メンタリング', '成長', '基準', 'マインドセット'],
    likeCount: 312,
    commentCount: 89,
    savedCount: 143,
    postedAt: '2026-03-20T12:00:00Z',
    isLiked: true,
    isSaved: true,
  },
  {
    id: 'post-010',
    contentType: 'post',
    author: {
      id: 'u-10',
      name: '藤井 朋子',
      profession: 'technician',
      experience: 'fresher',
    },
    content:
      '初めての独り立ちケース——モノリシックジルコニアの3ユニットポステリアブリッジ。ラボ照明と自然光下でのシェードマッチングが予想以上に難しかったです。Vita 3Dマスターシステムとデジタルシェードガイドを何度も照合して対応しました。患者様に受け入れていただけた時は、小さな勝利でも本当に嬉しかったです。',
    topic: 'キャリア・成長',
    tags: ['デンタルラボ', 'ジルコニア', 'シェードマッチング', '初症例'],
    likeCount: 98,
    commentCount: 33,
    savedCount: 41,
    postedAt: '2026-03-19T15:45:00Z',
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'post-011',
    contentType: 'question',
    author: {
      id: 'u-11',
      name: '加藤 直樹 先生',
      profession: 'dentist',
      experience: 'fresher',
    },
    content:
      '費用を気にしながら「最善の治療」を求める患者様に、コンポジットとセラミック修復の違いをどう説明していますか？セラミックを売り込みすぎているか、耐久性の差を十分に説明できていないか、うまくバランスが取れません。明確で誠実なフレームワークがあれば教えてください。',
    topic: 'Q&A',
    tags: ['患者コミュニケーション', '治療計画', '修復治療'],
    likeCount: 56,
    commentCount: 44,
    savedCount: 23,
    postedAt: '2026-03-19T09:00:00Z',
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'post-012',
    contentType: 'case',
    author: {
      id: 'u-12',
      name: '林 あみ 先生',
      profession: 'dentist',
      experience: 'experienced',
      specialty: '小児歯科',
    },
    title: '4歳・乳歯う蝕：フッ化ジアミン銀（SDF）vsホール法クラウン',
    content:
      '非協力的な幼児の乳歯う蝕への対応は大きな課題です。3本の乳臼歯に実質欠損があり、協力度が境界線上の4歳のお子さんがいます。SDFは非侵襲的でチェアサイドで処置できますが、ホール法クラウンは長期的な保護効果が高く非外傷的です。皆さんの第一選択と、保護者とのシェアードディシジョンメイキングの方法を教えてください。',
    topic: '症例',
    tags: ['小児歯科', '乳歯う蝕', 'SDF', 'ホール法', '共同意思決定'],
    likeCount: 61,
    commentCount: 29,
    savedCount: 35,
    postedAt: '2026-03-18T14:30:00Z',
    isLiked: false,
    isSaved: false,
    caseSpecialty: '小児歯科',
  },
]
