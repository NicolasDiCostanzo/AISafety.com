import ContentCard from '@/components/Cards/ContentCard'

import { headers } from 'next/headers'

async function getSelfStudyData(baseUrl: string) {
  const res = await fetch(`${baseUrl}/api/self-study`, { cache: 'no-store' })
  if (!res.ok) return []
  const data = await res.json()
  return data.records || []
}

export default async function SelfStudyPage() {
  const headersList = await headers()
  // In Next.js 14+, headers() returns a ReadonlyHeaders instance
  const host = headersList.get('host')
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const baseUrl = `${protocol}://${host}`
  const records = await getSelfStudyData(baseUrl)

  console.log(records.length)

  return (
    <div>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        records.map((record: any) => (
          <ContentCard
            key={record.id}
            title={record.title}
            description={record.description}
            category={record.category}
            createdBy={record.createdBy}
            url={record.url}
            logoUrl={record.logoUrl}
            status={record.status}
            showBookmark={!!record.showBookmark}
          />
        ))
      }
    </div>
  )
}
