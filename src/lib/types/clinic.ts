export interface Clinic {
  id: string
  name: string
  logo?: string
  description: string
  directorMessage?: string
  prefecture: string
  city: string
  address: string
  phone: string
  website?: string
  establishedYear: number
  staffCount: number
  features: string[]
  images?: string[]
  createdAt: string
}
