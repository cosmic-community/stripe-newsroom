import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-32">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tightest text-navy mb-4">
        Page not found
      </h1>
      <p className="text-bodytext mb-8 max-w-md">
        The story you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/newsroom"
        className="inline-flex items-center gap-2 bg-blurple text-white font-medium px-6 py-3 rounded-full shadow-stripe hover:shadow-stripe-lg hover:-translate-y-0.5 transition-all duration-200"
      >
        Back to Newsroom
      </Link>
    </div>
  )
}