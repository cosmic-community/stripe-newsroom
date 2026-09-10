'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const transparent = isHome && !scrolled
  const textColor = transparent ? 'text-white' : 'text-navy'
  const linkColor = transparent
    ? 'text-white/90 hover:text-white'
    : 'text-bodytext hover:text-navy'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 sm:h-20">
        <Link href="/" className={`text-xl font-bold tracking-tight ${textColor}`}>
          stripe
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          <Link href="/newsroom" className={`text-sm font-medium transition-colors ${linkColor}`}>
            Newsroom
          </Link>
          <Link href="/#about" className={`text-sm font-medium transition-colors ${linkColor}`}>
            About
          </Link>
          <Link href="/#contact" className={`text-sm font-medium transition-colors ${linkColor}`}>
            Contact
          </Link>
          <Link
            href="/newsroom"
            className="bg-blurple text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-stripe hover:shadow-stripe-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Read the news
          </Link>
        </nav>
      </div>
    </header>
  )
}