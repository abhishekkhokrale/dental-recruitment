'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { EmploymentType, JobType } from '@/lib/types/job'

const employmentTypes: EmploymentType[] = ['正社員', 'パート・アルバイト', '契約社員', '派遣社員']
const jobTypes: JobType[] = ['歯科衛生士', '歯科医師', '歯科助手', '受付・事務', '歯科技工士']

const SALARY_MIN = 150000
const SALARY_MAX = 600000
const SALARY_STEP = 10000

function parseSalary(value: string | null, fallback: number): number {
  const n = parseInt(value ?? '', 10)
  return isNaN(n) ? fallback : n
}

function toWanLabel(yen: number): string {
  return `${Math.round(yen / 10000)}万円`
}

export default function JobSearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedEmployment, setSelectedEmployment] = useState<EmploymentType[]>(
    () => (searchParams.getAll('employment') as EmploymentType[]) ?? []
  )
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>(
    () => (searchParams.getAll('jobType') as JobType[]) ?? []
  )
  const [salaryMin, setSalaryMin] = useState(() =>
    parseSalary(searchParams.get('salaryMin'), SALARY_MIN)
  )
  const [salaryMax, setSalaryMax] = useState(() =>
    parseSalary(searchParams.get('salaryMax'), SALARY_MAX)
  )

  function toggleEmployment(type: EmploymentType) {
    setSelectedEmployment((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  function toggleJobType(type: JobType) {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  function handleApply() {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('employment')
    selectedEmployment.forEach((e) => params.append('employment', e))

    params.delete('jobType')
    selectedJobTypes.forEach((j) => params.append('jobType', j))

    if (salaryMin > SALARY_MIN) {
      params.set('salaryMin', String(salaryMin))
    } else {
      params.delete('salaryMin')
    }
    if (salaryMax < SALARY_MAX) {
      params.set('salaryMax', String(salaryMax))
    } else {
      params.delete('salaryMax')
    }

    // Preserve pagination reset
    params.delete('page')

    router.push('/jobs?' + params.toString())
  }

  function handleClear() {
    setSelectedEmployment([])
    setSelectedJobTypes([])
    setSalaryMin(SALARY_MIN)
    setSalaryMax(SALARY_MAX)

    const params = new URLSearchParams(searchParams.toString())
    params.delete('employment')
    params.delete('jobType')
    params.delete('salaryMin')
    params.delete('salaryMax')
    params.delete('page')
    router.push('/jobs?' + params.toString())
  }

  return (
    <aside className="bg-white rounded-xl shadow-sm p-5 space-y-6">
      <h2 className="text-base font-semibold text-gray-900">絞り込み</h2>

      {/* Employment type */}
      <section>
        <h3 className="text-sm font-medium text-gray-700 mb-3">雇用形態</h3>
        <div className="space-y-2">
          {employmentTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedEmployment.includes(type)}
                onChange={() => toggleEmployment(type)}
                className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Job type */}
      <section>
        <h3 className="text-sm font-medium text-gray-700 mb-3">職種</h3>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedJobTypes.includes(type)}
                onChange={() => toggleJobType(type)}
                className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Salary range */}
      <section>
        <h3 className="text-sm font-medium text-gray-700 mb-3">月給の目安</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{toWanLabel(salaryMin)}</span>
            <span>{toWanLabel(salaryMax)}</span>
          </div>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">最低</label>
              <input
                type="range"
                min={SALARY_MIN}
                max={SALARY_MAX}
                step={SALARY_STEP}
                value={salaryMin}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10)
                  setSalaryMin(Math.min(val, salaryMax - SALARY_STEP))
                }}
                className="w-full accent-cyan-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">最高</label>
              <input
                type="range"
                min={SALARY_MIN}
                max={SALARY_MAX}
                step={SALARY_STEP}
                value={salaryMax}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10)
                  setSalaryMax(Math.max(val, salaryMin + SALARY_STEP))
                }}
                className="w-full accent-cyan-600"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">
            {toWanLabel(SALARY_MIN)} 〜 {toWanLabel(SALARY_MAX)}
          </p>
        </div>
      </section>

      {/* Action buttons */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={handleApply}
          className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          絞り込む
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          クリア
        </button>
      </div>
    </aside>
  )
}
