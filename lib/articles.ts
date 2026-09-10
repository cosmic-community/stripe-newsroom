import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus } from '@/lib/cosmic'
import type { NewsroomArticle } from '@/types'

const ARTICLE_PROPS = [
  'id',
  'slug',
  'title',
  'metadata',
  'thumbnail',
  'created_at',
  'modified_at',
]

function sortByPublishedDate(articles: NewsroomArticle[]): NewsroomArticle[] {
  return [...articles].sort((a, b) => {
    const dateA = new Date(a.metadata?.published_at || a.created_at).getTime()
    const dateB = new Date(b.metadata?.published_at || b.created_at).getTime()
    return dateB - dateA
  })
}

export async function getAllArticles(): Promise<NewsroomArticle[]> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects
      .find({ type: 'newsroom' })
      .props(ARTICLE_PROPS)
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return sortByPublishedDate(response.objects as NewsroomArticle[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch newsroom articles')
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<NewsroomArticle | null> {
  const { cosmic, previewToken } = await getCosmic()
  try {
    const query = cosmic.objects
      .findOne({ type: 'newsroom', slug })
      .props([...ARTICLE_PROPS, 'content'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object as NewsroomArticle) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch newsroom article')
  }
}

export async function getRelatedArticles(
  excludeSlug: string,
  limit = 3
): Promise<NewsroomArticle[]> {
  const all = await getAllArticles()
  return all.filter((article) => article.slug !== excludeSlug).slice(0, limit)
}

export function getArticleYears(articles: NewsroomArticle[]): number[] {
  const years = new Set<number>()
  articles.forEach((article) => {
    const dateStr = article.metadata?.published_at || article.created_at
    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      years.add(date.getFullYear())
    }
  })
  return Array.from(years).sort((a, b) => b - a)
}