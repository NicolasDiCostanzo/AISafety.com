interface AirtableAttachment {
  url: string
  [key: string]: unknown
}

export interface AirtableRecord {
  id: string
  fields: {
    Name: string
    Description: string
    Category: string
    'Created by': string
    Link: string
    Logo?: AirtableAttachment[]
    [key: string]: unknown
  }
}
