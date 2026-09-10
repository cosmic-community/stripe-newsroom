import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  const articles = await getAllArticles()

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/newsroom/${article.slug}`,
    lastModified: article.modified_at || article.created_at,
  }))

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/newsroom`, lastModified: new Date() },
    ...articleUrls,
  ]
}