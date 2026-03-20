'use client'

import { useState } from 'react'

interface ApplyButtonProps {
  jobId: string
  jobTitle: string
}

export default function ApplyButton({ jobId: _jobId, jobTitle }: ApplyButtonProps) {
  const [applied, setApplied] = useState(false)
  const [showModal, setShowModal] = useState(false)

  if (applied) {
    return (
      <button
        type="button"
        disabled
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl cursor-not-allowed opacity-90"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        応募済み
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
      >
        応募する
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>

      {/* Confirmation modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-50 rounded-full mb-4">
                <span className="text-2xl" aria-hidden="true">🦷</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">応募の確認</h2>
              <p className="text-sm text-gray-600">以下の求人に応募しますか？</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-gray-800 leading-relaxed">{jobTitle}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setApplied(true)
                  setShowModal(false)
                }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-colors"
              >
                応募する
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
