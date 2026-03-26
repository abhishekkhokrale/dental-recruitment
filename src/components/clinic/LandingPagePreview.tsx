export type TemplateId = 'modern' | 'warm' | 'professional'

export interface PageData {
  clinicName: string
  tagline: string
  coverImageUrl: string
  description: string
  directorMessage: string
  features: string
  jobTitle: string
  jobType: string
  salaryRange: string
  workingHours: string
  imageUrls: string
  benefits: string
  address: string
  phone: string
  access: string
  slug: string
}

export function PreviewPage({ data, template }: { data: PageData; template: TemplateId }) {
  const themeHeader =
    template === 'modern'
      ? 'bg-cyan-600'
      : template === 'warm'
      ? 'bg-amber-500'
      : 'bg-slate-800'

  const themeBadge =
    template === 'modern'
      ? 'bg-cyan-100 text-cyan-700'
      : template === 'warm'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-slate-100 text-slate-700'

  const themeBtn =
    template === 'modern'
      ? 'bg-cyan-600 hover:bg-cyan-700'
      : template === 'warm'
      ? 'bg-amber-500 hover:bg-amber-600'
      : 'bg-slate-800 hover:bg-slate-900'

  const themeBorder =
    template === 'modern'
      ? 'border-cyan-500'
      : template === 'warm'
      ? 'border-amber-500'
      : 'border-slate-600'

  const themeDivider =
    template === 'modern'
      ? 'border-cyan-200'
      : template === 'warm'
      ? 'border-amber-200'
      : 'border-slate-200'

  const features = data.features.split('\n').filter(Boolean)
  const benefits = data.benefits.split('\n').filter(Boolean)
  const images = data.imageUrls.split('\n').filter(Boolean)

  return (
    <div className="bg-white font-sans text-gray-800 leading-relaxed">
      {/* Hero */}
      <div
        className={`${themeHeader} text-white px-6 py-14 text-center`}
        style={
          data.coverImageUrl
            ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${data.coverImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <p className="text-white/70 text-xs mb-2 font-medium tracking-widest uppercase">Recruitment</p>
        <h1 className="text-3xl font-bold mb-3">{data.clinicName || 'クリニック名'}</h1>
        <p className="text-white/90 text-base max-w-xl mx-auto">{data.tagline}</p>
        <button
          type="button"
          className="mt-6 px-8 py-3 bg-white text-gray-800 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition"
        >
          今すぐ応募する
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10 space-y-10">
        {/* About */}
        <section>
          <h2 className={`text-lg font-bold border-l-4 pl-3 mb-4 ${themeBorder}`}>
            クリニック紹介
          </h2>
          <p className="text-gray-700 mb-5 leading-relaxed">{data.description}</p>
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {features.map((f, i) => (
                <span key={i} className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${themeBadge}`}>
                  ✓ {f}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Director message */}
        {data.directorMessage && (
          <section className={`bg-gray-50 border ${themeDivider} rounded-2xl p-6`}>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">院長メッセージ</h2>
            <p className="text-gray-700 italic leading-relaxed">"{data.directorMessage}"</p>
          </section>
        )}

        {/* Gallery */}
        {images.length > 0 && (
          <section>
            <h2 className={`text-lg font-bold border-l-4 pl-3 mb-4 ${themeBorder}`}>クリニックの様子</h2>
            <div className="grid grid-cols-2 gap-3">
              {images.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`クリニック写真 ${i + 1}`}
                  className="w-full h-40 object-cover rounded-xl"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Job info */}
        <section>
          <h2 className={`text-lg font-bold border-l-4 pl-3 mb-4 ${themeBorder}`}>募集要項</h2>
          <div className={`border ${themeDivider} rounded-2xl overflow-hidden`}>
            {[
              { label: '職種', value: data.jobType },
              { label: '求人タイトル', value: data.jobTitle },
              { label: '給与', value: data.salaryRange },
              { label: '勤務時間', value: data.workingHours },
            ].filter((row) => row.value).map((row) => (
              <div key={row.label} className="grid grid-cols-3 border-b border-gray-100 last:border-0">
                <div className="bg-gray-50 px-5 py-3.5 text-sm font-semibold text-gray-500 flex items-center">{row.label}</div>
                <div className="col-span-2 px-5 py-3.5 text-sm text-gray-800">{row.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        {benefits.length > 0 && (
          <section>
            <h2 className={`text-lg font-bold border-l-4 pl-3 mb-4 ${themeBorder}`}>福利厚生</h2>
            <div className="grid grid-cols-2 gap-2">
              {benefits.map((b, i) => (
                <div key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium ${themeBadge}`}>
                  <span>✓</span> {b}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className={`border ${themeDivider} rounded-2xl p-6 space-y-3`}>
          <h2 className="text-lg font-bold mb-2">アクセス・お問い合わせ</h2>
          {data.address && (
            <p className="flex items-start gap-3 text-sm text-gray-700">
              <span className="text-lg shrink-0">📍</span> {data.address}
            </p>
          )}
          {data.access && (
            <p className="flex items-start gap-3 text-sm text-gray-700">
              <span className="text-lg shrink-0">🚉</span> {data.access}
            </p>
          )}
          {data.phone && (
            <p className="flex items-start gap-3 text-sm text-gray-700">
              <span className="text-lg shrink-0">📞</span> {data.phone}
            </p>
          )}
        </section>

        {/* CTA */}
        <div className="text-center py-6">
          <button type="button" className={`px-12 py-4 text-white font-bold text-base rounded-full ${themeBtn} shadow-lg transition`}>
            この求人に応募する
          </button>
          <p className="text-xs text-gray-400 mt-3">
            bluejobs.jp/clinics/{data.slug || 'your-clinic'}
          </p>
        </div>
      </div>
    </div>
  )
}
