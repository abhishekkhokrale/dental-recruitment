'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { mockJobs } from '@/lib/mock-data/jobs'
import type { Job } from '@/lib/types/job'

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 'welcome' | 'upload' | 'analyzing' | 'results'
interface MatchedJob extends Job { score: number }

// ─── Job matching ─────────────────────────────────────────────────────────────

const KEYWORD_MAP: Array<{ type: Job['jobType']; keywords: string[] }> = [
  { type: '歯科衛生士', keywords: ['hygienist', 'dh', '衛生士', 'dental hygienist'] },
  { type: '歯科医師',   keywords: ['dentist', 'doctor', '医師', 'dds', 'dmd', 'dr'] },
  { type: '歯科助手',   keywords: ['assistant', '助手', 'dental assistant'] },
  { type: '歯科技工士', keywords: ['technician', '技工士', 'cdt'] },
  { type: '受付・事務', keywords: ['receptionist', 'reception', 'admin', '受付', '事務'] },
]

function detectJobType(filename: string): Job['jobType'] | null {
  const lower = filename.toLowerCase()
  for (const { type, keywords } of KEYWORD_MAP) {
    if (keywords.some(kw => lower.includes(kw) || filename.includes(kw))) return type
  }
  return null
}

function buildResults(filename: string) {
  const detectedType = detectJobType(filename)
  const base = detectedType ? mockJobs.filter(j => j.jobType === detectedType) : mockJobs
  const pool = base.length >= 3 ? base : mockJobs
  return {
    detectedType,
    jobs: pool.slice(0, 4).map((job, i) => ({ ...job, score: 98 - i * 5 })) as MatchedJob[],
  }
}

function formatSalary(job: Job) {
  const toUnit = (n: number) =>
    job.salaryType === '時給' ? `¥${n.toLocaleString()}` : `${Math.round(n / 10000)}万`
  return `${job.salaryType} ${toUnit(job.salaryMin)}〜${toUnit(job.salaryMax)}`
}

// ─── Score badge ──────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 93 ? 'bg-orange-500 text-white' :   // green accent
    score >= 85 ? 'bg-cyan-600 text-white' :
                  'bg-cyan-100 text-cyan-800'
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${color}`}>
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
      {score}%
    </span>
  )
}

// ─── Dental assistant SVG character ──────────────────────────────────────────

function DentalAssistant({ size = 72 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* White coat / body */}
      <rect x="25" y="78" width="50" height="42" rx="8" fill="#f0f9ff" />
      {/* Coat lapels */}
      <path d="M50 78 L38 90 L50 88 L62 90 Z" fill="#e0f2fe" />
      {/* Scrub inner */}
      <rect x="42" y="78" width="16" height="14" rx="3" fill="#2ca9e1" opacity="0.3" />
      {/* Stethoscope */}
      <path d="M36 86 Q32 100 38 102 Q44 104 44 98" stroke="#1d8fc0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="44" cy="98" r="3.5" fill="#1d8fc0" />
      {/* Neck */}
      <rect x="43" y="68" width="14" height="12" rx="3" fill="#fcd5a0" />
      {/* Face */}
      <ellipse cx="50" cy="52" rx="23" ry="24" fill="#fcd5a0" />
      {/* Hair — dark navy to match brand */}
      <ellipse cx="50" cy="32" rx="23" ry="15" fill="#19448e" />
      <ellipse cx="27" cy="47" rx="7" ry="16" fill="#19448e" />
      <ellipse cx="73" cy="47" rx="7" ry="16" fill="#19448e" />
      {/* Hair highlight */}
      <path d="M32 28 Q50 20 68 28" stroke="#2ca9e1" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Ears */}
      <ellipse cx="27" cy="53" rx="4.5" ry="5.5" fill="#fcd5a0" />
      <ellipse cx="73" cy="53" rx="4.5" ry="5.5" fill="#fcd5a0" />
      {/* Eyes */}
      <ellipse cx="39" cy="54" rx="5.5" ry="6" fill="#fff" />
      <ellipse cx="61" cy="54" rx="5.5" ry="6" fill="#fff" />
      <circle cx="40" cy="55" r="3.5" fill="#19448e" />
      <circle cx="62" cy="55" r="3.5" fill="#19448e" />
      <circle cx="41.5" cy="53.5" r="1.5" fill="#fff" />
      <circle cx="63.5" cy="53.5" r="1.5" fill="#fff" />
      {/* Eyelashes */}
      <path d="M34 50 Q37 47 39 49" stroke="#19448e" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M56 50 Q59 47 61 49" stroke="#19448e" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <ellipse cx="32" cy="61" rx="6.5" ry="4" fill="#fca5a5" opacity="0.4" />
      <ellipse cx="68" cy="61" rx="6.5" ry="4" fill="#fca5a5" opacity="0.4" />
      {/* Smile */}
      <path d="M42 65 Q50 72 58 65" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Tooth small detail on coat pocket */}
      <text x="46" y="110" fontSize="10" textAnchor="middle">🦷</text>
    </svg>
  )
}

// ─── Step dots ────────────────────────────────────────────────────────────────

const STEPS: Step[] = ['welcome', 'upload', 'analyzing', 'results']

function StepDots({ step }: { step: Step }) {
  const idx = STEPS.indexOf(step)
  return (
    <div className="flex items-center justify-center gap-1.5">
      {STEPS.map((_, i) => (
        <div key={i} className={[
          'rounded-full transition-all duration-300',
          i === idx ? 'w-6 h-2 bg-white' :
          i < idx   ? 'w-2 h-2 bg-white/60' :
                      'w-2 h-2 bg-white/25',
        ].join(' ')} />
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AIJobMatchingPopup() {
  const [visible, setVisible]           = useState(false)
  const [step, setStep]                 = useState<Step>('welcome')
  const [file, setFile]                 = useState<File | null>(null)
  const [dragging, setDragging]         = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [results, setResults]           = useState<MatchedJob[]>([])
  const [detectedType, setDetectedType] = useState<Job['jobType'] | null>(null)
  const fileInputRef                    = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem('ai_popup_seen')) return
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (step !== 'analyzing') return
    setAnalysisStep(0)
    const t1 = setTimeout(() => setAnalysisStep(1), 700)
    const t2 = setTimeout(() => setAnalysisStep(2), 1400)
    const t3 = setTimeout(() => setAnalysisStep(3), 2100)
    const t4 = setTimeout(() => {
      const { jobs, detectedType: dt } = buildResults(file?.name ?? '')
      setResults(jobs)
      setDetectedType(dt)
      setStep('results')
    }, 2900)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [step, file])

  const close = useCallback(() => {
    sessionStorage.setItem('ai_popup_seen', '1')
    setVisible(false)
    setTimeout(() => { setStep('welcome'); setFile(null); setAnalysisStep(0) }, 300)
  }, [])

  const handleFile = useCallback((f: File) => setFile(f), [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [handleFile])

  if (!visible) return null

  const isWide = step === 'results'

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="ai-popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div className="absolute inset-0 bg-cyan-950/60 backdrop-blur-sm"
        onClick={step !== 'analyzing' ? close : undefined} aria-hidden="true" />

      {/* Modal */}
      <div className={[
        'relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden',
        'animate-[popIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)_both]',
        'transition-[max-width] duration-500 ease-in-out',
        isWide ? 'max-w-2xl' : 'max-w-sm',
      ].join(' ')}>

        {/* ── Coloured header band ─────────────────────────────────────── */}
        <div className="bg-linear-to-r from-cyan-700 to-cyan-800 px-6 pt-5 pb-4">
          <div className="flex items-center justify-between mb-3">
            {/* Brand pill */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">
                AI求人マッチング
              </span>
            </div>
            {step !== 'analyzing' && (
              <button onClick={close} aria-label="閉じる"
                className="w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <StepDots step={step} />
        </div>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="px-6 pt-5 pb-6">

          {/* ═══ STEP: welcome ═══════════════════════════════════════════ */}
          {step === 'welcome' && (
            <div>
              {/* Character row */}
              <div className="flex items-end gap-4 mb-5">
                {/* Avatar circle */}
                <div className="relative shrink-0">
                  <div className="w-22 h-22 rounded-full bg-linear-to-br from-cyan-50 to-cyan-100
                                  border-4 border-white shadow-lg ring-2 ring-cyan-200 overflow-hidden
                                  flex items-end justify-center">
                    <DentalAssistant size={82} />
                  </div>
                  {/* Green accent dot (orange-500 = #6eb92b in this theme) */}
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-orange-500 rounded-full
                                  flex items-center justify-center shadow-md border-2 border-white">
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                    </svg>
                  </div>
                </div>

                {/* Speech bubble */}
                <div className="relative flex-1 pb-2">
                  <div className="bg-cyan-600 text-white rounded-2xl rounded-bl-none px-4 py-3 shadow-md">
                    <p id="ai-popup-title" className="text-sm font-bold leading-snug">
                      最適なお仕事をお探<br />しします？
                    </p>
                  </div>
                  {/* Tail */}
                  <div className="absolute bottom-0 left-0 w-0 h-0
                                  border-r-14 border-r-cyan-600
                                  border-t-12 border-t-transparent" aria-hidden="true" />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                履歴書をアップロードするだけで、AIがスキル・資格・経験を分析して
                あなたに最適な歯科求人をマッチングします。
              </p>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  { icon: '✓', text: '無料・登録不要' },
                  { icon: '⚡', text: '約30秒で完了' },
                  { icon: '📄', text: 'PDF / Word 対応' },
                ].map(({ icon, text }) => (
                  <span key={text}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 text-cyan-700
                               text-xs font-medium rounded-full border border-cyan-200">
                    <span>{icon}</span>{text}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <button onClick={() => setStep('upload')}
                  className="flex items-center justify-center gap-2 w-full py-3 px-5
                             bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm
                             rounded-xl shadow-sm hover:shadow-md transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                  AIでお仕事検索を試す
                </button>
                <button onClick={close}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-5
                             text-gray-500 hover:text-gray-700 text-sm font-medium
                             border border-gray-200 hover:border-gray-300 rounded-xl
                             hover:bg-gray-50 transition-all">
                  スキップ
                </button>
              </div>
            </div>
          )}

          {/* ═══ STEP: upload ════════════════════════════════════════════ */}
          {step === 'upload' && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 overflow-hidden
                                flex items-end justify-center shrink-0">
                  <DentalAssistant size={36} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">履歴書・職務経歴書をアップロード</h2>
                  <p className="text-xs text-gray-400 mt-0.5">PDF・Word・テキスト形式に対応</p>
                </div>
              </div>

              {/* Drop zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={[
                  'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
                  dragging
                    ? 'border-cyan-400 bg-cyan-50'
                    : file
                    ? 'border-orange-400 bg-orange-50/40'
                    : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/40',
                ].join(' ')}
              >
                <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

                {file ? (
                  <>
                    <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                    <button onClick={e => { e.stopPropagation(); setFile(null) }}
                      className="mt-2 text-xs text-cyan-600 hover:text-cyan-700 underline">
                      別のファイルを選択
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">ドラッグ＆ドロップ</p>
                    <p className="text-xs text-gray-400 mt-1">または<span className="text-cyan-600 font-medium"> クリックして選択</span></p>
                    <p className="text-xs text-gray-300 mt-2.5 font-medium tracking-wider">PDF · DOC · DOCX · TXT</p>
                  </>
                )}
              </div>

              {/* Lock notice */}
              <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <p className="text-xs text-gray-400">ファイルはAI分析にのみ使用され、サーバーに保存されません</p>
              </div>

              {/* Footer buttons */}
              <div className="flex gap-2.5 mt-4">
                <button onClick={() => setStep('welcome')}
                  className="flex-1 py-2.5 text-sm font-medium text-gray-600
                             border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors">
                  戻る
                </button>
                <button onClick={() => file && setStep('analyzing')} disabled={!file}
                  className={[
                    'flex-2 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2',
                    file
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm hover:shadow-md'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed',
                  ].join(' ')}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                  AIで分析する
                </button>
              </div>
            </div>
          )}

          {/* ═══ STEP: analyzing ════════════════════════════════════════ */}
          {step === 'analyzing' && (
            <div className="py-2 text-center">
              {/* Pulsing avatar */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-cyan-200 animate-ping opacity-40" />
                <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-cyan-50 to-cyan-100
                                border-4 border-white shadow-lg ring-2 ring-cyan-300 overflow-hidden
                                flex items-end justify-center">
                  <DentalAssistant size={74} />
                </div>
              </div>

              <h2 className="text-base font-bold text-gray-900 mb-1">AIが分析しています…</h2>
              <p className="text-xs text-gray-400 mb-5 truncate px-4">{file?.name}</p>

              {/* Analysis steps */}
              <div className="space-y-2.5 max-w-xs mx-auto text-left">
                {[
                  { label: '履歴書を読み取り中',       icon: '📄' },
                  { label: 'スキル・資格を抽出中',     icon: '🧠' },
                  { label: '求人データとマッチング中', icon: '🔍' },
                ].map((s, i) => {
                  const done    = analysisStep > i
                  const current = analysisStep === i
                  return (
                    <div key={s.label} className={[
                      'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-500',
                      done ? 'bg-cyan-50 border border-cyan-100' :
                      current ? 'bg-cyan-50/60 border border-cyan-100/60' :
                               'bg-gray-50 border border-transparent',
                    ].join(' ')}>
                      <span className="text-base">{s.icon}</span>
                      <span className={[
                        'text-sm font-medium flex-1 transition-colors duration-300',
                        done || current ? 'text-cyan-800' : 'text-gray-400',
                      ].join(' ')}>
                        {s.label}
                      </span>
                      {done ? (
                        <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      ) : current ? (
                        <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200 shrink-0" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ═══ STEP: results ═══════════════════════════════════════════ */}
          {step === 'results' && (
            <div>
              {/* Result header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 overflow-hidden
                                flex items-end justify-center shrink-0">
                  <DentalAssistant size={44} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-gray-900">マッチング完了！</h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 bg-orange-500 text-white
                                     text-xs font-bold rounded-full">
                      {results.length}件
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {detectedType
                      ? `「${detectedType}」の求人を中心にマッチングしました`
                      : 'あなたの経験に合う求人が見つかりました'}
                  </p>
                </div>
              </div>

              {/* Job cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {results.map((job) => (
                  <Link key={job.id} href={`/jobs/${job.id}`} onClick={close}
                    className="group block bg-white border border-gray-200 hover:border-cyan-300
                               hover:shadow-md rounded-xl p-4 transition-all">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0 text-sm">
                          🦷
                        </div>
                        <span className="text-xs text-gray-400 truncate">{job.clinicName}</span>
                      </div>
                      <ScoreBadge score={job.score} />
                    </div>

                    {/* Title */}
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-cyan-700
                                  leading-snug line-clamp-2 mb-3 transition-colors">
                      {job.title}
                    </p>

                    {/* Meta */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {job.prefecture} {job.city}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
                        <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {formatSalary(job)}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <span className="inline-flex items-center px-2 py-0.5 bg-cyan-50 text-cyan-700
                                       text-xs font-medium rounded-full border border-cyan-200">
                        {job.jobType}
                      </span>
                      <span className="text-xs font-medium text-cyan-600 group-hover:text-cyan-700 transition-colors">
                        詳細を見る →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Footer actions */}
              <div className="flex gap-2.5 pt-1">
                <button onClick={() => { setStep('upload'); setFile(null) }}
                  className="flex-1 py-2.5 text-sm font-medium text-gray-600
                             border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors">
                  再分析する
                </button>
                <Link href="/jobs" onClick={close}
                  className="flex-2 flex items-center justify-center gap-2 py-2.5 text-sm font-bold
                             bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl
                             shadow-sm hover:shadow-md transition-all">
                  全求人を見る
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
