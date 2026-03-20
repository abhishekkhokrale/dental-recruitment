export default function JobsLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="h-12 bg-gray-100 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar skeleton */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-5 space-y-5">
              <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </aside>

          {/* Results skeleton */}
          <div className="flex-1 min-w-0">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-5 space-y-3">
                  {/* Clinic row */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse shrink-0" />
                    <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                  </div>
                  {/* Title */}
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                  </div>
                  {/* Badges */}
                  <div className="flex gap-2">
                    <div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                  </div>
                  {/* Location */}
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  {/* Salary */}
                  <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
                  {/* Footer */}
                  <div className="pt-3 border-t border-gray-100 flex justify-between">
                    <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
