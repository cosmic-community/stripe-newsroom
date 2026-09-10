'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-32">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tightest text-navy mb-4">
        Something went wrong
      </h1>
      <p className="text-bodytext mb-8 max-w-md">
        We couldn&apos;t load this page. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-blurple text-white font-medium px-6 py-3 rounded-full shadow-stripe hover:shadow-stripe-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white text-blurple border border-blurple font-medium px-6 py-3 rounded-full hover:bg-lightbg transition-all duration-200"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}