import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { loadAllPosts } from "@/lib/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog • Audiologic Rehab of America",
  description: "Articles on hearing health, rehab strategies, and technology.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog • Audiologic Rehab of America",
    description: "Articles on hearing health, rehab strategies, and technology.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary",
    title: "Blog • Audiologic Rehab of America",
    description: "Articles on hearing health, rehab strategies, and technology.",
  },
};

export default function BlogIndexPage() {
  const posts = loadAllPosts(process.env.NODE_ENV !== "production");
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Blog</h1>
        <p className="mt-2 text-gray-600">Insights on communication, support, and technology.</p>
      </header>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border border-gray-200 rounded-lg p-5 hover:border-cyan-500 transition-colors">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-1 text-gray-600">{post.excerpt}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <span>{format(new Date(post.date), "PPP")}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readingTimeMinutes} min read</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <Link key={t} href={`/blog/tag/${encodeURIComponent(t)}`} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200 hover:border-cyan-500">
                        {t}
                      </Link>
                    ))}
                    <Link href="/blog/tags" className="text-xs underline text-gray-600 ml-1">All tags</Link>
                  </div>
                )}
              </div>
              <div>
                <Link href={`/blog/${post.slug}`} className="text-cyan-700 hover:text-cyan-800 font-medium">Read</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


