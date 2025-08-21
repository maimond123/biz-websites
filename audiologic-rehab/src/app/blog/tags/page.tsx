import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags } from "@/lib/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tags • Audiologic Rehab of America",
  description: "Browse blog posts by topic.",
  alternates: { canonical: "/blog/tags" },
};

export default function BlogTagsIndexPage() {
  const tags = getAllTags(process.env.NODE_ENV !== "production");
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Tags</h1>
      {tags.length === 0 ? (
        <p className="text-gray-600">No tags yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link href={`/blog/tag/${encodeURIComponent(tag)}`} className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 hover:border-cyan-500">
                <span className="text-sm text-gray-800">{tag}</span>
                <span className="text-xs text-gray-500">{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


