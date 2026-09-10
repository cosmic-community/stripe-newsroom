import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  year?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  year,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const buildHref = (page: number): string => {
    const params = new URLSearchParams()
    if (year) params.set('year', year)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return `/newsroom${qs ? `?${qs}` : ''}`
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 mt-16"
      aria-label="Pagination"
    >
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          currentPage === 1
            ? 'pointer-events-none text-gray-300'
            : 'text-navy hover:bg-lightbg'
        }`}
      >
        Previous
      </Link>
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {pages.map((page) => (
          <Link
            key={page}
            href={buildHref(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition ${
              page === currentPage
                ? 'bg-blurple text-white'
                : 'text-navy hover:bg-lightbg'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          currentPage === totalPages
            ? 'pointer-events-none text-gray-300'
            : 'text-navy hover:bg-lightbg'
        }`}
      >
        Next
      </Link>
    </nav>
  )
}