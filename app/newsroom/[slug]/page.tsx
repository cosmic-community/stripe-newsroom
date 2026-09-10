// app/newsroom/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MarkdownContent from '@/components/MarkdownContent'
import RelatedArticles from '@/components/RelatedArticles'
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/articles'
import { formatDate } from '@/lib/format'
import { getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: 'Story not found' }
  }

  const title = getMetafieldValue(article.metadata?.seo_title) || article.title
  const description = getMetafieldValue(article.metadata?.seo_description)
  const image = article.metadata?.featured_image?.imgix_url || article.thumbnail

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image
        ? [`${image}?w=1200&h=630&fit=crop&auto=format,compress`]
        : undefined,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const related = await getRelatedArticles(slug, 3)
  const image = article.metadata?.featured_image?.imgix_url || article.thumbnail
  const date = formatDate(article.metadata?.published_at || article.created_at)
  const content = getMetafieldValue(article.metadata?.content)

  return (
    <article className="pt-32 sm:pt-40 pb-24">
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <Link
          href="/newsroom"
          className="inline-flex items-center gap-2 text-blurple font-medium hover:underline mb-8"
        >
          ← Back to Newsroom
        </Link>
        {date && <p className="text-sm text-bodytext mb-4">{date}</p>}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tightest text-navy leading-tight">
          {article.title}
        </h1>
      </div>

      {image && (
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-stripe-lg">
            <img
              src={`${image}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={article.title}
              width={1600}
              height={900}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6">
        {content ? (
          <MarkdownContent content={content} />
        ) : (
          <p className="text-bodytext">No content available for this story.</p>
        )}

        <RelatedArticles articles={related} />
      </div>
    </article>
  )
}