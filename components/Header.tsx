import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-sepia/20 bg-parchment/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <h1 className="text-3xl font-serif text-dark-ink font-bold tracking-tight">
              Field Notes
            </h1>
            <p className="text-sm font-accent text-sepia mt-0.5">
              A Journal of Thoughts
            </p>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-dark-ink/70 hover:text-dark-ink transition-colors font-body"
            >
              Home
            </Link>
            <Link
              href="/admin"
              className="text-dark-ink/70 hover:text-dark-ink transition-colors font-body"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

