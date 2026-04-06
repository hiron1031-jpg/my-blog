import PostCard from "./PostCard";
import type { Post } from "@/types/post";

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-heading mb-5 flex items-center gap-2">
        <span className="w-1 h-6 bg-accent rounded-full inline-block" />
        関連記事
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
