import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <p className="text-white font-bold text-lg tracking-tight mb-4">
              stripe
            </p>
            <p className="text-sm max-w-xs">
              Financial infrastructure for the internet. News and stories
              from Stripe.
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-4">Newsroom</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/newsroom" className="hover:text-white transition-colors">
                  All stories
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-4">Company</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-4">Legal</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-xs">
          © {year} Stripe Newsroom. All rights reserved.
        </div>
      </div>
    </footer>
  )
}