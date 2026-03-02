import ContentCard from '@/components/Cards/ContentCard'

import { SelfStudyRecord } from '@/types/SelfStudy'
import { headers } from 'next/headers'

async function getSelfStudyData(baseUrl: string): Promise<SelfStudyRecord[]> {
  const res = await fetch(`${baseUrl}/api/self-study`, { cache: 'no-store' })
  if (!res.ok) return []
  const data = await res.json()
  return data.records || []
}

export default async function SelfStudyPage() {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const baseUrl = `${protocol}://${host}`
  const records = await getSelfStudyData(baseUrl)

  return (
    <div>
      {records.map(({ id, ...cardProps }) => (
        <ContentCard key={id} {...cardProps} />
      ))}
    </div>
  )
}
