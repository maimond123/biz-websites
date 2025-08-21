import { notFound } from "next/navigation";
import { Metadata } from "next";
import { loadPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = loadPostBySlug(slug);
  if (!post || (process.env.NODE_ENV === "production" && post.draft)) {
    return {};
  }
  const title = `${post.title} • Audiologic Rehab of America`;
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary",
      title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = loadPostBySlug(slug);
  if (!post || (process.env.NODE_ENV === "production" && post.draft)) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-semibold text-gray-900">{post.title}</h1>
        <div className="mt-2 text-sm text-gray-600">
          <span>{format(new Date(post.date), "PPP")}</span>
          <span className="mx-2">•</span>
          <span>{post.readingTimeMinutes} min read</span>
          <span className="mx-2">•</span>
          <span>By {post.author}</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full border border-gray-200">{t}</span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-gray max-w-none">
        <ReactMarkdown rehypePlugins={[[rehypeSlug], [rehypeAutolinkHeadings, { behavior: "wrap" }]]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}


