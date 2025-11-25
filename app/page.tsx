import { getPosts } from "@/lib/getPosts";
import FeaturedPost from "@/components/FeaturedPost";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getPosts();
  const featuredPost = posts[0];
  const latestPosts = posts.slice(1, 7);

  return (
    <div className="relative">
      {/* Botanical sketch decoration - top left */}
      <div className="absolute top-8 left-8 w-24 h-24 opacity-5 pointer-events-none hidden md:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-botanical-green">
          <path
            d="M20 30 Q30 20 40 30 Q50 40 60 30 Q70 20 80 30 Q85 35 80 40 Q75 45 70 40 Q60 50 50 40 Q40 50 30 40 Q25 45 20 40 Q15 35 20 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Title with watercolor wash */}
        <div className="relative mb-16 text-center">
          <div className="watercolor-wash absolute inset-0 rounded-lg -mx-8 -my-4" />
          <div className="relative z-10 py-8">
            <h1 className="text-5xl md:text-7xl font-serif text-dark-ink font-bold mb-4">
              Field Notes
            </h1>
            <p className="text-xl md:text-2xl font-accent text-sepia">
              A Journal of Thoughts & Discoveries
            </p>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <FeaturedPost
              slug={featuredPost.slug}
              title={featuredPost.title}
              date={featuredPost.date}
              summary={featuredPost.summary}
            />
          </section>
        )}

        {/* Latest Posts Grid */}
        {latestPosts.length > 0 && (
          <section>
            <h2 className="text-3xl font-serif text-dark-ink font-bold mb-8">
              Latest Entries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  summary={post.summary}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl font-body text-dark-ink/60 mb-4">
              No posts yet. Check back soon!
            </p>
            <p className="text-sm font-body text-sepia">
              Posts will appear here once published.
            </p>
          </div>
        )}
      </div>

      {/* Botanical sketch decoration - bottom right */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none hidden md:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-botanical-green">
          <path
            d="M50 10 Q30 30 40 50 Q50 70 70 50 Q80 30 60 10 Q50 10 50 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M50 50 Q40 60 50 70 Q60 80 70 70 Q80 60 70 50 Q60 40 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}
