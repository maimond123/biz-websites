import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { getAllTags, getPostsByTag } from "@/lib/blog";

export const revalidate = 60;

type PageProps = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const tags = getAllTags(process.env.NODE_ENV !== "production");
  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const title = `Posts tagged “${tag}” • Audiologic Rehab of America`;
  return {
    title,
    description: `Articles tagged ${tag}.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag, process.env.NODE_ENV !== "production");
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Tag: {tag}</h1>
        <p className="mt-2 text-gray-600">
          <Link href="/blog/tags" className="text-cyan-700 hover:text-cyan-800 underline">View all tags</Link>
        </p>
      </header>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts for this tag yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug} className="border border-gray-200 rounded-lg p-5 hover:border-cyan-500 transition-colors">
              <h2 className="text-xl font-semibold text-gray-900">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-1 text-gray-600">{post.excerpt}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span>{format(new Date(post.date), "PPP")}</span>
                <span className="mx-2">•</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


