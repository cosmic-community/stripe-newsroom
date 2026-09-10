import type { NewsroomArticle } from '@/types'
import ArticleCard from '@/components/ArticleCard'

interface RelatedArticlesProps {
  articles: NewsroomArticle[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null

  return (
    <section className="mt-20 pt-16 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-navy tracking-tight mb-8">
        More news
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}