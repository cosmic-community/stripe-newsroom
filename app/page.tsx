import type { Metadata } from 'next'
import Link from 'next/link'
import HeroGradient from '@/components/HeroGradient'
import FeaturedArticle from '@/components/FeaturedArticle'
import ArticleCard from '@/components/ArticleCard'
import { getAllArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Stripe Newsroom',
  description: 'The latest news, announcements, and stories from Stripe.',
}

export const revalidate = 60

export default async function HomePage() {
  const articles = await getAllArticles()
  const featured = articles[0]
  const recent = articles.slice(1, 7)

  return (
    <>
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-x-[-15%] -top-32 -bottom-40 -skew-y-6 origin-top-right">
          <HeroGradient />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 pt-40 pb-48 sm:pt-48 sm:pb-64 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tightest text-white leading-[1.05] mb-6">
            Stripe Newsroom
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            News, announcements, and stories from Stripe — building the
            economic infrastructure for the internet.
          </p>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 -mt-32 sm:-mt-40 pb-24">
        {featured && <FeaturedArticle article={featured} />}
      </section>

      {recent.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
              Recent stories
            </h2>
            <Link
              href="/newsroom"
              className="text-blurple font-medium hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recent.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}