'use client'

import { useState, useMemo } from 'react'
import type { TrendingPost } from '@/lib/mock-data/community'
import { PROFESSION_LABELS } from '@/lib/mock-data/community'
import Link from 'next/link'

// ── Seed comments per post ────────────────────────────────────────────────────

interface Comment {
  id: string
  author: string
  authorInitial: string
  avatarColor: string
  time: string
  content: string
  upvotes: number
  replies: Comment[]
}

const SEED_COMMENTS: Record<string, Comment[]> = {
  t1: [
    {
      id: 'c1', author: '小林 達也 先生', authorInitial: '小', avatarColor: 'from-violet-400 to-violet-600', time: '3日前',
      content: '咬合高径の回復量をどのくらいに設定しましたか？私の症例では4mm挙上したところ、2週間後に筋肉疲労の訴えがありました。プロビジョナルで慎重に確認する重要性を痛感しています。',
      upvotes: 18, replies: [
        { id: 'c1r1', author: '森 健二 先生', authorInitial: '森', avatarColor: 'from-indigo-400 to-indigo-600', time: '2日前', content: '私は3mm以内に抑えることを原則にしています。4mm以上は分割して複数回に分けることをお勧めします。', upvotes: 9, replies: [] },
      ],
    },
    {
      id: 'c2', author: '田中 恵子', authorInitial: '田', avatarColor: 'from-cyan-400 to-cyan-600', time: '2日前',
      content: 'デジタルスキャンの活用は本当に助かります。特にフルマウスでは分割印象のつなぎ合わせ誤差が問題でしたが、スキャンに切り替えてから精度が格段に向上しました。',
      upvotes: 12, replies: [],
    },
    {
      id: 'c3', author: '松本 裕二', authorInitial: '松', avatarColor: 'from-emerald-400 to-emerald-600', time: '1日前',
      content: 'モノリシックジルコニアの審美性についてはどうお考えですか？前歯部はレイヤリングとの使い分けが難しいと感じています。',
      upvotes: 7, replies: [
        { id: 'c3r1', author: '山本 拓也 先生', authorInitial: '山', avatarColor: 'from-blue-400 to-blue-600', time: '1日前', content: '前歯部は確かに難しいですね。私は透光性の高いジルコニアを前歯部に使い、臼歯部は高強度タイプを使い分けています。', upvotes: 5, replies: [] },
      ],
    },
  ],
  t2: [
    {
      id: 'c1', author: '渡辺 由紀', authorInitial: '渡', avatarColor: 'from-pink-400 to-pink-600', time: '5日前',
      content: '個人面談の頻度はどのくらいですか？月1回は工数的に大変そうですが、それだけの効果がありましたか？',
      upvotes: 24, replies: [
        { id: 'c1r1', author: '佐藤 誠一 院長', authorInitial: '佐', avatarColor: 'from-emerald-400 to-emerald-600', time: '5日前', content: '最初は工数がかかりますが、慣れると15〜20分で完了します。問題が小さいうちに発見できるので、長期的には工数削減になります。', upvotes: 19, replies: [] },
      ],
    },
    {
      id: 'c2', author: '加藤 弘樹', authorInitial: '加', avatarColor: 'from-amber-400 to-amber-600', time: '4日前',
      content: '給与の評価基準の透明化が一番効いた気がします。うちも「なんとなく」の昇給から、スキルと行動目標に基づく評価に変えたら不満の声が減りました。',
      upvotes: 31, replies: [],
    },
    {
      id: 'c3', author: '中島 さゆり', authorInitial: '中', avatarColor: 'from-rose-400 to-rose-600', time: '3日前',
      content: 'シフトの柔軟化は具体的にどうされましたか？小さなクリニックだと難しいと感じていて…。',
      upvotes: 15, replies: [
        { id: 'c3r1', author: '佐藤 誠一 院長', authorInitial: '佐', avatarColor: 'from-emerald-400 to-emerald-600', time: '3日前', content: 'コアタイムを設けつつ、前後1時間の調整可能枠を作りました。子育て中のスタッフに特に好評でした。', upvotes: 11, replies: [] },
      ],
    },
  ],
  t3: [
    {
      id: 'c1', author: '高橋 俊介', authorInitial: '高', avatarColor: 'from-sky-400 to-sky-600', time: '4日前',
      content: 'コンプライアンスの見極めはどうしていますか？初診で「ちゃんと使います」と言う患者ほど使わないことが多くて困っています。',
      upvotes: 22, replies: [
        { id: 'c1r1', author: '田村 恵子 先生', authorInitial: '田', avatarColor: 'from-rose-400 to-rose-600', time: '4日前', content: 'スマートフォンのリマインダー設定を一緒に行うことと、装着時間を記録するノートを渡すようにしてから改善しました。', upvotes: 14, replies: [] },
      ],
    },
    {
      id: 'c2', author: '岡田 美咲', authorInitial: '岡', avatarColor: 'from-violet-400 to-violet-600', time: '3日前',
      content: 'ブラケットの方が良いとわかっていても、患者さんが「絶対マウスピースで」と言う場合はどう対応されますか？',
      upvotes: 18, replies: [],
    },
  ],
  t4: [
    {
      id: 'c1', author: '伊藤 大輔', authorInitial: '伊', avatarColor: 'from-orange-400 to-orange-600', time: '6日前',
      content: '全くその通りだと思います。CADで設計した形態を見て「これはダメ」と判断する目も、手で作る経験がないと養われません。',
      upvotes: 27, replies: [],
    },
    {
      id: 'c2', author: '石田 遼', authorInitial: '石', avatarColor: 'from-teal-400 to-teal-600', time: '5日前',
      content: '専門学校でも「CADができれば手技は不要」という風潮が出てきていて不安です。先生のような声をもっと若い世代に届けてほしいです。',
      upvotes: 21, replies: [
        { id: 'c2r1', author: '鈴木 浩二', authorInitial: '鈴', avatarColor: 'from-orange-400 to-orange-600', time: '5日前', content: '機会があれば学校に講師として行っています。現場の声を直接伝えることが大切だと思っています。', upvotes: 13, replies: [] },
      ],
    },
  ],
  t5: [
    {
      id: 'c1', author: '吉田 麻衣', authorInitial: '吉', avatarColor: 'from-lime-400 to-lime-600', time: '7日前',
      content: 'SDFの色素沈着について保護者への説明はどうされていますか？黒くなることへの抵抗感が強くて、使いたくても使えないことがあります。',
      upvotes: 19, replies: [
        { id: 'c1r1', author: '中村 陽子 先生', authorInitial: '中', avatarColor: 'from-green-400 to-green-600', time: '7日前', content: '「治療せずに進行させる色 vs 止めた証拠の色」という言い方で説明すると受け入れていただけることが多いです。', upvotes: 16, replies: [] },
      ],
    },
    {
      id: 'c2', author: '藤田 健', authorInitial: '藤', avatarColor: 'from-cyan-400 to-cyan-600', time: '5日前',
      content: 'Tell-Show-Do以外で効果を感じているアプローチはありますか？特に3〜4歳の幼児には難しさを感じています。',
      upvotes: 14, replies: [],
    },
  ],
}

// ── Vote button ───────────────────────────────────────────────────────────────

function VoteButtons({ initialVotes, size = 'md' }: { initialVotes: number; size?: 'sm' | 'md' }) {
  const [voted, setVoted] = useState<'up' | 'down' | null>(null)
  const displayVotes = Math.max(0, initialVotes + (voted === 'up' ? 1 : voted === 'down' ? -1 : 0))
  // Clicking the same direction cancels the vote; clicking the opposite also cancels first (no ±2 jump)
  const toggle = (dir: 'up' | 'down') => setVoted((p) => (p === null ? dir : null))

  if (size === 'sm') {
    return (
      <div className="flex items-center gap-0.5">
        <button type="button" onClick={() => toggle('up')} className="p-0.5 rounded hover:bg-gray-100 transition-colors" aria-label="upvote">
          <svg className={`w-4 h-4 ${voted === 'up' ? 'text-orange-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
        <span className={`text-xs font-bold min-w-5 text-center ${voted === 'up' ? 'text-orange-500' : voted === 'down' ? 'text-blue-500' : 'text-gray-700'}`}>
          {displayVotes}
        </span>
        <button type="button" onClick={() => toggle('down')} className="p-0.5 rounded hover:bg-gray-100 transition-colors" aria-label="downvote">
          <svg className={`w-4 h-4 ${voted === 'down' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </button>
      </div>
    )
  }

  // md — pill matching screenshot: ▲ 312 ∨
  return (
    <div className={`inline-flex items-center rounded-full border transition-colors ${
      voted === 'up' ? 'border-orange-400' : voted === 'down' ? 'border-blue-400' : 'border-gray-300'
    }`}>
      {/* Upvote */}
      <button
        type="button"
        onClick={() => toggle('up')}
        aria-label="upvote"
        className={`flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-l-full transition-colors ${
          voted === 'up' ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500 hover:bg-orange-50'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
        <span className="text-sm font-bold">{displayVotes}</span>
      </button>

      {/* Divider */}
      <span className={`w-px h-5 ${voted === 'up' ? 'bg-orange-300' : voted === 'down' ? 'bg-blue-300' : 'bg-gray-300'}`} />

      {/* Downvote — chevron ∨ */}
      <button
        type="button"
        onClick={() => toggle('down')}
        aria-label="downvote"
        className={`px-2.5 py-1.5 rounded-r-full transition-colors ${
          voted === 'down' ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}

// ── Saved button ─────────────────────────────────────────────────────────────

function SavedButton() {
  const [saved, setSaved] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setSaved((p) => !p)}
      className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors ${
        saved
          ? 'bg-cyan-50 border-cyan-500 text-cyan-600'
          : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700'
      }`}
    >
      <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
      </svg>
      {saved ? 'Saved' : 'Save'}
    </button>
  )
}

// ── Single comment ────────────────────────────────────────────────────────────

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replies, setReplies] = useState<Comment[]>(comment.replies)

  function submitReply() {
    if (!replyText.trim()) return
    setReplies((prev) => [
      ...prev,
      {
        id: `r-${Date.now()}`,
        author: 'あなた',
        authorInitial: 'あ',
        avatarColor: 'from-cyan-400 to-indigo-500',
        time: 'たった今',
        content: replyText.trim(),
        upvotes: 0,
        replies: [],
      },
    ])
    setReplyText('')
    setShowReply(false)
  }

  return (
    <div className={depth > 0 ? 'ml-6 border-l-2 border-gray-100 pl-4' : ''}>
      <div className="flex gap-3 py-3">
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full bg-linear-to-br ${comment.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {comment.authorInitial}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
            <span className="text-xs text-gray-400">{comment.time}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-2">{comment.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <VoteButtons initialVotes={comment.upvotes} size="sm" />
            <button
              type="button"
              onClick={() => setShowReply(!showReply)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-cyan-600 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
              返信
            </button>
            <button type="button" className="flex items-center gap-1 text-xs text-gray-400 hover:text-cyan-600 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
              シェア
            </button>
          </div>

          {/* Reply form */}
          {showReply && (
            <div className="mt-3 flex gap-2">
              <input
                autoFocus
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitReply()}
                placeholder="返信を入力..."
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="button"
                onClick={submitReply}
                disabled={!replyText.trim()}
                className="px-3 py-1.5 bg-cyan-600 text-white text-xs font-semibold rounded-lg hover:bg-cyan-700 disabled:opacity-40 transition-colors"
              >
                返信
              </button>
              <button type="button" onClick={() => setShowReply(false)} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700">
                キャンセル
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {replies.map((r) => (
        <CommentItem key={r.id} comment={r} depth={depth + 1} />
      ))}
    </div>
  )
}

// ── Main client component ─────────────────────────────────────────────────────

interface Props {
  post: TrendingPost
}

type SortType = 'best' | 'new' | 'top'

export default function PostDetailClient({ post }: Props) {
  const seedComments = SEED_COMMENTS[post.id] ?? []
  const [comments, setComments] = useState<Comment[]>(seedComments)
  const [newComment, setNewComment] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const [sort, setSort] = useState<SortType>('best')
  const [search, setSearch] = useState('')

  const postedDate = new Date(post.postedAt).toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  function submitComment() {
    if (!newComment.trim()) return
    setComments((prev) => [
      {
        id: `new-${Date.now()}`,
        author: 'あなた',
        authorInitial: 'あ',
        avatarColor: 'from-cyan-400 to-indigo-500',
        time: 'たった今',
        content: newComment.trim(),
        upvotes: 0,
        replies: [],
      },
      ...prev,
    ])
    setNewComment('')
    setInputFocused(false)
  }

  const sortedComments = useMemo(() => {
    const filtered = search.trim()
      ? comments.filter((c) => c.content.includes(search) || c.author.includes(search))
      : comments
    if (sort === 'best' || sort === 'top') return [...filtered].sort((a, b) => b.upvotes - a.upvotes)
    return [...filtered].reverse() // new
  }, [comments, sort, search])

  return (
    <div className="bg-[#dae0e6] min-h-screen">

      {/* ── Post card ─────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* Back / breadcrumb */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <Link href="/community" className="flex items-center gap-1 text-gray-500 hover:text-cyan-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            コミュニティ
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500">{post.group}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          {/* Gradient hero */}
          <div
            className="w-full h-36 flex items-end px-5 pb-4"
            style={{ background: `linear-gradient(135deg, ${post.bgFrom} 0%, ${post.bgTo} 100%)` }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-base border-2 border-white/30"
                style={{ backgroundColor: post.accent + '33' }}
              >
                {post.avatar}
              </div>
              <span className="text-sm font-semibold" style={{ color: post.accent }}>{post.group}</span>
              <span className="text-white/40 text-xs">· {postedDate}</span>
            </div>
          </div>

          <div className="p-5">
            {/* Author row */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {post.author.charAt(0)}
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">{post.author}</span>
                <span className="text-xs text-gray-400 ml-2">{PROFESSION_LABELS[post.authorProfession]}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl font-extrabold text-gray-900 leading-snug mb-2">{post.title}</h1>
            <p className="text-sm font-medium text-cyan-600 mb-4">{post.desc}</p>

            {/* Body */}
            <div className="text-sm text-gray-700 leading-relaxed space-y-3 mb-5 border-t border-gray-50 pt-4">
              {post.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Actions bar — exact match to screenshot */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100 flex-wrap">

              {/* ▲ 312 ∨  pill */}
              <VoteButtons initialVotes={Math.floor(post.comments * 3.5)} />

              {/* 💬 89 comments — borderless */}
              <button
                type="button"
                onClick={() => setInputFocused(true)}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                {comments.length} comments
              </button>

              {/* 🔖 Saved — blue filled pill */}
              <SavedButton />

              {/* < share — borderless */}
              <button type="button" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                share
              </button>

              {/* ⚑ report — borderless */}
              <button type="button" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
                report
              </button>
            </div>
          </div>
        </div>

        {/* ── Comments ──────────────────────────────────────── */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-8">

          {/* Join the conversation */}
          <div className="mb-5">
            {inputFocused ? (
              <div className="border border-cyan-400 rounded-xl overflow-hidden">
                <textarea
                  autoFocus
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="会話に参加する"
                  rows={4}
                  className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none"
                />
                <div className="flex justify-end gap-2 px-3 pb-3">
                  <button
                    type="button"
                    onClick={() => { setInputFocused(false); setNewComment('') }}
                    className="px-4 py-1.5 text-sm text-gray-500 hover:text-gray-700 rounded-full transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    onClick={submitComment}
                    disabled={!newComment.trim()}
                    className="px-4 py-1.5 bg-cyan-600 text-white text-sm font-semibold rounded-full hover:bg-cyan-700 disabled:opacity-40 transition-colors"
                  >
                    コメントする
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setInputFocused(true)}
                className="w-full text-left px-4 py-3 border border-gray-200 rounded-full text-sm text-gray-400 hover:border-cyan-400 hover:bg-gray-50 transition-colors"
              >
                会話に参加する
              </button>
            )}
          </div>

          {/* Sort + search bar */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="font-medium">並び替え:</span>
              {(['best', 'new', 'top'] as SortType[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSort(s)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    sort === s ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  {s === 'best' ? 'ベスト' : s === 'new' ? '新着' : 'トップ'}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 text-sm text-gray-500 hover:border-gray-300 focus-within:border-cyan-400 transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="コメントを検索"
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-36"
              />
            </div>
          </div>

          {/* Comment list */}
          {sortedComments.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              {search ? '検索結果がありません。' : 'まだコメントがありません。最初のコメントを投稿しましょう。'}
            </p>
          ) : (
            <div className="divide-y divide-gray-50">
              {sortedComments.map((c) => (
                <CommentItem key={c.id} comment={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
