import Link from "next/link";
import { format } from "date-fns";

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export default function PostCard({ slug, title, date, summary }: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`}>
      <article className="journal-card rounded-lg p-6 h-full">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-serif text-dark-ink font-semibold line-clamp-2">
            {title}
          </h2>
          <span className="text-xs text-sepia font-body ml-4 flex-shrink-0">
            {format(new Date(date), "MMM d, yyyy")}
          </span>
        </div>
        <p className="text-dark-ink/70 font-body text-sm line-clamp-3 leading-relaxed">
          {summary}
        </p>
        <div className="mt-4 pt-4 border-t border-sepia/20">
          <span className="text-xs text-botanical-green font-body">
            Read more →
          </span>
        </div>
      </article>
    </Link>
  );
}

