'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { PostMeta } from '@/types';
import CategoryTabs from '@/components/posts/CategoryTabs';
import PostCard from '@/components/posts/PostCard';
import { CATEGORY_MAP } from '@/lib/categories';
import { formatDateShort } from '@/lib/utils';

interface PostsSectionProps {
  posts: PostMeta[];
}

export default function PostsSection({ posts }: PostsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered =
    activeCategory === 'all'
      ? posts
      : posts.filter((p) => p.frontmatter.category === activeCategory);

  // 필터가 걸리지 않은 목록에서만 최신 글을 피처로 띄운다
  const showFeatured = activeCategory === 'all' && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  return (
    <section className="section" id="posts">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">글</h2>
          <p className="section-subtitle">
            총 {posts.length}편 · 성능, AI, 그리고 판단에 대하여
          </p>
        </div>

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        {featured && <FeaturedPost post={featured} />}

        <div className="posts-grid">
          {rest.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              index={showFeatured ? i + 2 : i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPost({ post }: { post: PostMeta }) {
  const { slug, frontmatter } = post;
  const category = CATEGORY_MAP[frontmatter.category];

  return (
    <Link href={`/posts/${slug}/`} className="featured-post">
      <div className="featured-top">
        <span className="post-index">01</span>
        <span className={`cat-mark ${frontmatter.category}`}>
          {category.label}
        </span>
      </div>

      <h3 className="featured-title">{frontmatter.title}</h3>
      <p className="featured-excerpt">{frontmatter.excerpt}</p>

      <div className="featured-foot">
        <span className="label">{formatDateShort(frontmatter.date)}</span>
        {frontmatter.readingTime && (
          <>
            <span className="dot-sep" aria-hidden="true" />
            <span className="label">{frontmatter.readingTime}분</span>
          </>
        )}
      </div>
    </Link>
  );
}
