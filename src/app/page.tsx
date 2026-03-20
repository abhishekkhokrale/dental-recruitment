import Link from 'next/link'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JobSearchBar from '@/components/jobs/JobSearchBar'
import JobCard from '@/components/jobs/JobCard'
import { mockJobs } from '@/lib/mock-data/jobs'

const featuredJobs = mockJobs.slice(0, 6)

const stats = [
  { label: '求人数', value: '3,000件以上' },
  { label: '登録クリニック', value: '500件' },
  { label: '転職成功者', value: '10,000人+' },
]

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-cyan-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
    title: '豊富な求人数',
    description: '全国3,000件以上の歯科求人を掲載。歯科衛生士・歯科医師・歯科助手など職種も幅広く対応しています。',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-cyan-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: '簡単応募',
    description: '無料会員登録後、気になる求人にワンクリックで応募できます。履歴書の作成・管理もサポートします。',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-cyan-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    title: 'クリニックとのマッチング',
    description: 'あなたのスキルや希望条件をもとに、最適なクリニックをご提案。理想の職場との出会いをサポートします。',
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-cyan-600 to-cyan-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
                歯科業界の転職・求人サイト
              </h1>
              <p className="text-lg sm:text-xl text-cyan-100 mb-10 leading-relaxed">
                歯科衛生士・歯科医師など歯科のお仕事探しに特化した求人プラットフォーム
              </p>

              {/* Search bar */}
              <div className="max-w-2xl mx-auto mb-12">
                <Suspense fallback={
                  <div className="h-14 bg-white/20 rounded-full animate-pulse" />
                }>
                  <JobSearchBar />
                </Suspense>
              </div>

              {/* Stats row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-cyan-200 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="relative h-12 overflow-hidden">
            <svg
              className="absolute bottom-0 w-full"
              viewBox="0 0 1440 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 48V24C240 0 480 0 720 24C960 48 1200 48 1440 24V48H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">注目の求人</h2>
                <p className="text-sm text-gray-500 mt-1">最新の歯科求人をピックアップしました</p>
              </div>
              <Link
                href="/jobs"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
              >
                すべて見る
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-full transition-colors shadow-sm"
              >
                もっと見る
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900">デンタルキャリアの3つの特徴</h2>
              <p className="text-gray-500 mt-2">あなたの転職活動をトータルサポートします</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-50 rounded-2xl mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Clinics CTA Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 bg-cyan-600/20 text-cyan-400 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                  </svg>
                  採用担当者の方へ
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
                  優秀な歯科スタッフを<br className="hidden sm:block" />効率よく採用しましょう
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  全国の求職者に求人情報をアピールできます。掲載費用は業界最安水準。応募管理から内定まで、採用プロセスをデジタル化できます。
                </p>
                <ul className="mt-5 space-y-2">
                  {['求人掲載・管理が簡単', '応募者との連絡がスムーズ', '採用コストの大幅削減'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <Link
                  href="/clinic/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-colors shadow-lg"
                >
                  クリニック管理画面へ
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <p className="text-xs text-gray-500 mt-3 text-center">初期費用0円・掲載開始まで最短1日</p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration CTA */}
        <section className="bg-linear-to-r from-cyan-600 to-cyan-700 text-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              無料で会員登録して<br className="sm:hidden" />理想の職場を見つけよう
            </h2>
            <p className="text-cyan-100 mb-8 leading-relaxed">
              会員登録は無料。スカウト機能やお気に入り求人の管理など、転職活動をサポートする機能が全て使えます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-cyan-700 font-bold rounded-full hover:bg-cyan-50 transition-colors shadow-md text-lg"
              >
                無料で会員登録
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/jobs"
                className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 border-2 border-white/60 text-white font-medium rounded-full hover:bg-white/10 transition-colors text-lg"
              >
                求人を探す
              </Link>
            </div>
            <p className="text-xs text-cyan-200 mt-5">登録は1分で完了。クレジットカード不要。</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
