import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/getPostBySlug";
import { useMDXComponents } from "@/components/MDXComponents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allSlugs = getAllPostSlugs();
  const currentIndex = allSlugs.indexOf(slug);
  const nextSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const prevSlug =
    currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  const components = useMDXComponents({});

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Botanical sketch decoration - left margin */}
      <div className="absolute left-0 top-1/4 w-16 h-16 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-botanical-green">
          <path
            d="M20 30 Q30 20 40 30 Q50 40 60 30 Q70 20 80 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif text-dark-ink font-bold mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-sepia font-body">
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMMM d, yyyy")}
          </time>
        </div>
      </header>

      {/* Content with drop cap */}
      <div className="prose prose-lg max-w-none">
        <div className="drop-cap">
          <MDXRemote source={post.content} components={components} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-16 pt-8 border-t border-sepia/20 flex justify-between items-center">
        {prevSlug ? (
          <Link
            href={`/posts/${prevSlug}`}
            className="text-botanical-green hover:text-sepia transition-colors font-body flex items-center gap-2"
          >
            ← Previous
          </Link>
        ) : (
          <div />
        )}
        <Link
          href="/"
          className="text-sepia hover:text-dark-ink transition-colors font-body"
        >
          Home
        </Link>
        {nextSlug ? (
          <Link
            href={`/posts/${nextSlug}`}
            className="text-botanical-green hover:text-sepia transition-colors font-body flex items-center gap-2"
          >
            Next →
          </Link>
        ) : (
          <div />
        )}
      </nav>

      {/* Botanical sketch decoration - right margin */}
      <div className="absolute right-0 top-1/2 w-16 h-16 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-botanical-green">
          <path
            d="M80 70 Q70 80 60 70 Q50 60 40 70 Q30 80 20 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </article>
  );
}

