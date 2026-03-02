export interface ContentCardProps {
  title: string
  description: string
  category: string
  createdBy: string
  url: string
  logoUrl?: string
  showBookmark?: boolean
}

export interface SelfStudyRecord extends ContentCardProps {
  id: string
}
