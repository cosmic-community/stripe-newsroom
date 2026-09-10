import { cookies } from 'next/headers'
import { createBucketClient } from '@cosmicjs/sdk'

const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
const readKey = process.env.COSMIC_READ_KEY as string
const writeKey = process.env.COSMIC_WRITE_KEY as string

interface GetCosmicResult {
  cosmic: ReturnType<typeof createBucketClient>
  previewToken: string | undefined
}

export async function getCosmic(): Promise<GetCosmicResult> {
  const cookieStore = await cookies()
  const previewToken = cookieStore.get('cosmic_preview')?.value

  const cosmic = previewToken
    ? createBucketClient({
        bucketSlug,
        readKey,
        writeKey,
        previewToken,
      } as Parameters<typeof createBucketClient>[0])
    : createBucketClient({
        bucketSlug,
        readKey,
        writeKey,
      })

  return { cosmic, previewToken }
}