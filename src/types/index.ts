export type CategorySlug = 'react' | 'typescript' | 'nextjs' | 'cssdesign' | 'ai';

export interface Category {
  slug: CategorySlug;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
  postCount?: number;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  category: CategorySlug;
  excerpt: string;
  tags: string[];
  readingTime?: number;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
}

export interface Post extends PostMeta {
  content: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}
