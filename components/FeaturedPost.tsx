import Link from "next/link";
import { format } from "date-fns";

interface FeaturedPostProps {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export default function FeaturedPost({
  slug,
  title,
  date,
  summary,
}: FeaturedPostProps) {
  return (
    <Link href={`/posts/${slug}`}>
      <article className="journal-card rounded-lg p-8 md:p-12 relative overflow-hidden">
        {/* Watercolor wash effect */}
        <div className="watercolor-wash absolute inset-0 opacity-50 pointer-events-none" />
        
        {/* Botanical sketch decoration */}
        <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-botanical-green">
            <path
              d="M50 10 Q30 30 40 50 Q50 70 70 50 Q80 30 60 10 Q50 10 50 10 M50 50 Q40 60 50 70 Q60 80 70 70 Q80 60 70 50 Q60 40 50 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-sepia font-body font-semibold">
              Featured
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-dark-ink font-bold mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-dark-ink/70 font-body text-base md:text-lg mb-6 leading-relaxed line-clamp-3">
            {summary}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-sepia font-body">
              {format(new Date(date), "MMMM d, yyyy")}
            </span>
            <span className="text-sm text-botanical-green font-body">
              Read article →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

