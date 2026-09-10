import Link from 'next/link'

interface YearFilterProps {
  years: number[]
  activeYear?: string
}

export default function YearFilter({ years, activeYear }: YearFilterProps) {
  if (years.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-10">
      <Link
        href="/newsroom"
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          !activeYear
            ? 'bg-navy text-white'
            : 'bg-lightbg text-bodytext hover:bg-gray-200'
        }`}
      >
        All years
      </Link>
      {years.map((year) => (
        <Link
          key={year}
          href={`/newsroom?year=${year}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            activeYear === String(year)
              ? 'bg-navy text-white'
              : 'bg-lightbg text-bodytext hover:bg-gray-200'
          }`}
        >
          {year}
        </Link>
      ))}
    </div>
  )
}