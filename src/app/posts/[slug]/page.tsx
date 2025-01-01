import type { Metadata } from 'next';
import { getAllSlugs, getPostBySlug, getAdjacentPosts } from '@/lib/posts';
import { compileMDX } from '@/lib/mdx';
import { extractTocItems } from '@/lib/toc';
import PostHeader from '@/components/posts/PostHeader';
import PostBody from '@/components/posts/PostBody';
import PostNavigation from '@/components/posts/PostNavigation';
import TableOfContents from '@/components/posts/TableOfContents';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const { content } = await compileMDX(post.content);
  const { prev, next } = getAdjacentPosts(slug);
  const tocItems = extractTocItems(post.content);

  return (
    <div className="post-page">
      <PostHeader frontmatter={post.frontmatter} />

      <div className="post-page-body">
        <div className="container">
          <div className="post-layout">
            {/* Main Content */}
            <div>
              <PostBody content={content} tags={post.frontmatter.tags} />
              <PostNavigation prev={prev} next={next} />
            </div>

            {/* TOC Sidebar */}
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
