export interface CommunityPost {
  id: string
  authorName: string
  authorQualification: string // e.g. '歯科衛生士'
  content: string
  topic: string // e.g. '職場環境', '給与・待遇', '転職相談', 'スキルアップ'
  likeCount: number
  commentCount: number
  postedAt: string
  isLiked?: boolean
}

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-001',
    authorName: 'さくら',
    authorQualification: '歯科衛生士',
    content:
      '先日、院長から「超音波スケーラーの操作がとても上手になった」と褒めていただきました！入社して1年、毎日練習した甲斐がありました。新人の方へ：基礎を大切にすることが本当に重要です。テクニックは後からついてくるので、まずは患者さんとのコミュニケーションを磨いてください。定期的な勉強会への参加もおすすめです。',
    topic: 'スキルアップ',
    likeCount: 47,
    commentCount: 12,
    postedAt: '2026-03-19T14:32:00Z',
    isLiked: false,
  },
  {
    id: 'post-002',
    authorName: 'たかし',
    authorQualification: '歯科医師',
    content:
      '転職して半年が経ちました。前職と比べて給与は少し下がりましたが、残業がほとんどなく、週休2日が確保されているので生活の質が大幅に上がりました。家族との時間も増え、趣味の釣りも再開できています。給与だけで職場を選ぶのではなく、ワークライフバランスも考慮することをおすすめします。',
    topic: '転職相談',
    likeCount: 89,
    commentCount: 23,
    postedAt: '2026-03-18T09:15:00Z',
    isLiked: true,
  },
  {
    id: 'post-003',
    authorName: 'みほ',
    authorQualification: '歯科助手',
    content:
      '【質問】歯科助手から歯科衛生士の資格取得を目指している方いますか？現在働きながら夜間の専門学校に通うか検討中です。仕事と学業の両立についてアドバイスをいただけると嬉しいです。特に体力面・費用面での経験談が聞きたいです。よろしくお願いします！',
    topic: 'スキルアップ',
    likeCount: 34,
    commentCount: 18,
    postedAt: '2026-03-17T18:45:00Z',
    isLiked: false,
  },
  {
    id: 'post-004',
    authorName: 'けんじ',
    authorQualification: '歯科技工士',
    content:
      '歯科技工士の給与について正直に話します。私は都内の技工所に勤めて5年目ですが、月給は28万円ほどです。残業は月30時間程度あります。CAD/CAMの技術を習得してからは仕事の幅が広がり、今後の昇給も期待できそうです。技工士を目指している方の参考になれば幸いです。',
    topic: '給与・待遇',
    likeCount: 62,
    commentCount: 15,
    postedAt: '2026-03-16T11:20:00Z',
    isLiked: false,
  },
  {
    id: 'post-005',
    authorName: 'あかね',
    authorQualification: '歯科衛生士',
    content:
      '職場の雰囲気って本当に大切ですよね。私が今の職場を選んだ決め手は、見学の際にスタッフ同士が笑顔で話していたこと。面接の雰囲気だけでなく、実際に働いている人たちの様子を観察することをおすすめします。転職活動中の方は、ぜひ見学時間を有効活用してください。',
    topic: '職場環境',
    likeCount: 74,
    commentCount: 9,
    postedAt: '2026-03-15T16:00:00Z',
    isLiked: true,
  },
  {
    id: 'post-006',
    authorName: 'ゆうき',
    authorQualification: '歯科医師',
    content:
      '開業5年目の院長です。スタッフ採用で一番重視しているのは「患者さんへの思いやり」です。スキルは後から磨けますが、人柄は変えにくい。求職活動中の方へ：面接で志望動機を聞かれたとき、「患者さんのために何ができるか」を具体的に話せると印象が大きく変わります。',
    topic: '転職相談',
    likeCount: 103,
    commentCount: 31,
    postedAt: '2026-03-14T08:30:00Z',
    isLiked: false,
  },
  {
    id: 'post-007',
    authorName: 'なつき',
    authorQualification: '歯科衛生士',
    content:
      '産休から復帰して3ヶ月が経ちました。時短勤務を利用しながら働いています。職場の理解があるおかげで無理なく続けられています。育児と仕事の両立は大変ですが、専門職として働き続けることで自分自身の充実感も高まっています。子育て中の衛生士さん、一緒に頑張りましょう！',
    topic: '職場環境',
    likeCount: 91,
    commentCount: 27,
    postedAt: '2026-03-13T13:10:00Z',
    isLiked: false,
  },
  {
    id: 'post-008',
    authorName: 'りょうた',
    authorQualification: '歯科衛生士',
    content:
      '歯科衛生士の男性って少数派ですよね。私は男性衛生士ですが、最初は患者さんから驚かれることも多かったです。でも今では担当患者さんに「あなたに診てもらいたい」と言っていただけるまでになりました。男性衛生士を目指している方、需要は確実にあります。自信を持って進んでください！',
    topic: 'その他',
    likeCount: 58,
    commentCount: 14,
    postedAt: '2026-03-12T10:45:00Z',
    isLiked: true,
  },
  {
    id: 'post-009',
    authorName: 'ひろこ',
    authorQualification: '歯科助手',
    content:
      '【給与交渉の体験談】先月、思い切って院長に昇給のお願いをしました。3年間の実績と他院の相場データを持参して具体的に話したところ、月2万円のアップを認めてもらえました！怖かったですが、きちんと準備して話せば聞いてもらえることがわかりました。皆さんも遠慮せずに交渉してみてください。',
    topic: '給与・待遇',
    likeCount: 127,
    commentCount: 42,
    postedAt: '2026-03-11T15:30:00Z',
    isLiked: false,
  },
  {
    id: 'post-010',
    authorName: 'まさき',
    authorQualification: '歯科医師',
    content:
      '大学病院から一般開業医に転職して2年。正直なところ、最初はペースの違いに戸惑いました。大学病院では専門的な症例が多かったのに対し、開業医では総合的な診療が求められます。でも患者さんと長く関われることのやりがいは格別です。転職を検討している先生方、事前に院の診療スタイルをしっかり確認することをおすすめします。',
    topic: '転職相談',
    likeCount: 76,
    commentCount: 19,
    postedAt: '2026-03-10T09:00:00Z',
    isLiked: false,
  },
]

export const communityTopics = [
  'すべて',
  '職場環境',
  '給与・待遇',
  '転職相談',
  'スキルアップ',
  'その他',
] as const

export type CommunityTopic = (typeof communityTopics)[number]
