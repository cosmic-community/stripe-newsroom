import Link from 'next/link'
import type { NewsroomArticle } from '@/types'
import { formatDate } from '@/lib/format'
import { getMetafieldValue } from '@/lib/cosmic'

interface FeaturedArticleProps {
  article: NewsroomArticle
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const image = article.metadata?.featured_image?.imgix_url || article.thumbnail
  const date = formatDate(article.metadata?.published_at || article.created_at)
  const description = getMetafieldValue(article.metadata?.seo_description)

  return (
    <Link
      href={`/newsroom/${article.slug}`}
      className="group grid md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-stripe-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {image && (
        <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-lightbg">
          <img
            src={`${image}?w=1200&h=900&fit=crop&auto=format,compress`}
            alt={article.title}
            width={1200}
            height={900}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}
      <div className="p-8 sm:p-12 flex flex-col justify-center">
        <span className="inline-block text-xs font-semibold tracking-wide uppercase text-blurple mb-4">
          Featured
        </span>
        {date && <p className="text-sm text-bodytext mb-3">{date}</p>}
        <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight leading-tight mb-4 group-hover:text-blurple transition-colors">
          {article.title}
        </h2>
        {description && (
          <p className="text-base text-bodytext line-clamp-3">{description}</p>
        )}
        <span className="inline-flex items-center gap-2 mt-6 text-blurple font-medium">
          Read more <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}