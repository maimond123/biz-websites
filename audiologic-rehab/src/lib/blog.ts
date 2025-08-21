import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type BlogFrontmatter = {
  title: string;
  slug: string;
  date: string; // ISO
  excerpt: string;
  author: string;
  tags?: string[];
  draft?: boolean;
};

export type BlogPost = BlogFrontmatter & {
  content: string;
  readingTimeMinutes: number;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => name.replace(/\.(md|mdx)$/i, ""));
}

export function loadPostBySlug(slug: string): BlogPost | null {
  const mdPathMd = path.join(BLOG_DIR, `${slug}.md`);
  const mdPathMdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const filePath = fs.existsSync(mdPathMd) ? mdPathMd : fs.existsSync(mdPathMdx) ? mdPathMdx : null;
  if (!filePath) return null;
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  const fm = data as Partial<BlogFrontmatter>;

  if (!fm.title || !fm.slug || !fm.date || !fm.excerpt || !fm.author) {
    throw new Error(`Missing required frontmatter fields in ${filePath}`);
  }

  const stats = readingTime(content);
  return {
    title: fm.title,
    slug: fm.slug,
    date: fm.date,
    excerpt: fm.excerpt,
    author: fm.author,
    tags: fm.tags ?? [],
    draft: fm.draft ?? false,
    content,
    readingTimeMinutes: Math.max(1, Math.round(stats.minutes)),
  };
}

export function loadAllPosts(includeDrafts = false): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts: BlogPost[] = [];
  for (const slug of slugs) {
    const post = loadPostBySlug(slug);
    if (!post) continue;
    if (!includeDrafts && post.draft) continue;
    posts.push(post);
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTags(includeDrafts = false): { tag: string; count: number }[] {
  const tally = new Map<string, number>();
  for (const post of loadAllPosts(includeDrafts)) {
    for (const tag of post.tags ?? []) {
      tally.set(tag, (tally.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(tally.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string, includeDrafts = false): BlogPost[] {
  return loadAllPosts(includeDrafts).filter((p) => (p.tags ?? []).includes(tag));
}


