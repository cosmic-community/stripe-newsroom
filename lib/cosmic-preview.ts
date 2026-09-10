import { cookies } from 'next/headers'
import { createBucketClient } from '@cosmicjs/sdk'

const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
const readKey = process.env.COSMIC_READ_KEY as string
const writeKey = process.env.COSMIC_WRITE_KEY as string

interface GetCosmicResult {
  cosmic: ReturnType<typeof createBucketClient>
  previewToken: string | undefined
}

/**
 * Read the `cosmic_preview` cookie without assuming a request scope exists.
 *
 * `cookies()` throws when it is called outside of a request, which happens
 * during static generation: `generateStaticParams`, `app/sitemap.ts` and any
 * build-time prerendering all run before a request exists. There is never a
 * preview cookie in those contexts, so treat the failure as "no preview".
 */
async function readPreviewToken(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies()
    return cookieStore.get('cosmic_preview')?.value
  } catch {
    return undefined
  }
}

export async function getCosmic(): Promise<GetCosmicResult> {
  const previewToken = await readPreviewToken()

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
