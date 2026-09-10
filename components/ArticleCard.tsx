import Link from 'next/link'
import type { NewsroomArticle } from '@/types'
import { formatDate } from '@/lib/format'
import { getMetafieldValue } from '@/lib/cosmic'

interface ArticleCardProps {
  article: NewsroomArticle
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const image = article.metadata?.featured_image?.imgix_url || article.thumbnail
  const date = formatDate(article.metadata?.published_at || article.created_at)
  const description = getMetafieldValue(article.metadata?.seo_description)

  return (
    <Link
      href={`/newsroom/${article.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-stripe hover:shadow-stripe-lg transition-all duration-300 hover:-translate-y-1"
    >
      {image && (
        <div className="aspect-[16/10] overflow-hidden bg-lightbg">
          <img
            src={`${image}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={article.title}
            width={800}
            height={500}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        {date && (
          <p className="text-sm text-blurple font-medium mb-2">{date}</p>
        )}
        <h3 className="text-lg font-semibold text-navy tracking-tight leading-snug mb-2 group-hover:text-blurple transition-colors">
          {article.title}
        </h3>
        {description && (
          <p className="text-sm text-bodytext line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}