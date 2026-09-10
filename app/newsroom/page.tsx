import type { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import YearFilter from '@/components/YearFilter'
import { getAllArticles, getArticleYears } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'Browse all news, announcements, and stories from Stripe.',
}

export const revalidate = 60

const PER_PAGE = 12

interface NewsroomPageProps {
  searchParams: Promise<{ page?: string; year?: string }>
}

export default async function NewsroomPage({
  searchParams,
}: NewsroomPageProps) {
  const params = await searchParams
  const year = params.year
  const requestedPage = Math.max(1, parseInt(params.page || '1', 10) || 1)

  const allArticles = await getAllArticles()
  const years = getArticleYears(allArticles)

  const filtered = year
    ? allArticles.filter((article) => {
        const dateStr = article.metadata?.published_at || article.created_at
        const date = new Date(dateStr)
        return !isNaN(date.getTime()) && String(date.getFullYear()) === year
      })
    : allArticles

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(requestedPage, totalPages)
  const pageItems = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  )

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 sm:pt-40 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tightest text-navy mb-4">
          Newsroom
        </h1>
        <p className="text-lg text-bodytext max-w-2xl">
          All the latest news, announcements, and stories from Stripe.
        </p>
      </div>

      <YearFilter years={years} activeYear={year} />

      {pageItems.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageItems.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-bodytext">No stories found.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        year={year}
      />
    </div>
  )
}