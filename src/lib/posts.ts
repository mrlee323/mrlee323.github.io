import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostMeta, PostFrontmatter, CategorySlug } from '@/types';
import { calculateReadingTime } from './utils';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  if (!frontmatter.readingTime) {
    frontmatter.readingTime = calculateReadingTime(content);
  }
  return { slug, frontmatter, content };
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(raw);
      const frontmatter = data as PostFrontmatter;
      if (!frontmatter.readingTime) {
        frontmatter.readingTime = calculateReadingTime(content);
      }
      return { slug, frontmatter };
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getPostsByCategory(category: CategorySlug): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.frontmatter.category === category);
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const all = getAllPostsMeta();
  const idx = all.findIndex((p) => p.slug === slug);
  return {
    prev: idx < all.length - 1 ? all[idx + 1] : null,
    next: idx > 0 ? all[idx - 1] : null,
  };
}
