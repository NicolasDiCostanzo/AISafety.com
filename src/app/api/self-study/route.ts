import { NextResponse } from 'next/server'

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN
const BASE_ID = process.env.AIRTABLE_BASE_ID
const TABLE_ID = 'tblRNYJ0m1cmJXKKk'
const VIEW_ID = 'viwblgaia3x1gsqBo'

export async function GET() {
  if (!AIRTABLE_TOKEN || !BASE_ID) {
    return NextResponse.json(
      { error: 'Airtable credentials not configured' },
      { status: 500 }
    )
  }

  try {
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`)
    url.searchParams.set('view', VIEW_ID)

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(
        `Airtable API error: ${response.status} ${response.statusText}`,
        errorText
      )
      return NextResponse.json(
        { error: `Airtable API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Transform records to a clean array, extracting logo URL from attachment array
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const records = (data.records || []).map((record: any) => {
      let logoUrl = undefined
      if (Array.isArray(record.fields.Logo) && record.fields.Logo.length > 0) {
        logoUrl = record.fields.Logo[0].url
      }
      return {
        id: record.id,
        title: record.fields.Name,
        description: record.fields.Description,
        category: record.fields.Category,
        createdBy: record.fields['Created by'],
        url: record.fields.Link,
        logoUrl,
        status: record.fields.Status,
      }
    })

    return NextResponse.json({ records })
  } catch (error) {
    console.error('Error fetching self-study data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch self-study data' },
      { status: 500 }
    )
  }
}
