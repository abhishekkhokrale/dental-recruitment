export type ApplicationStatus =
  | '書類選考中'
  | '面接調整中'
  | '一次面接'
  | '二次面接'
  | '最終面接'
  | '内定'
  | '不採用'
  | '辞退'

export interface Application {
  id: string
  jobId: string
  clinicId: string
  seekerId: string
  jobTitle: string
  clinicName: string
  status: ApplicationStatus
  appliedAt: string
  updatedAt: string
  memo?: string
  interviewDate?: string
}
