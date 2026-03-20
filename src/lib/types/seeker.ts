export type Qualification = '歯科衛生士' | '歯科医師' | '歯科助手' | '歯科技工士' | 'なし'

export interface SeekerProfile {
  id: string
  name: string
  email: string
  phone?: string
  prefecture?: string
  age?: number
  qualification: Qualification[]
  experienceYears: number
  specialties: string[]
  preferredPrefectures: string[]
  preferredEmploymentType: string[]
  desiredSalaryMin?: number
  bio?: string
  isPublic: boolean
  createdAt: string
}
