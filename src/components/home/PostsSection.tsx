'use client';

import { useState } from 'react';
import type { PostMeta } from '@/types';
import CategoryTabs from '@/components/posts/CategoryTabs';
import PostCard from '@/components/posts/PostCard';

interface PostsSectionProps {
  posts: PostMeta[];
}

export default function PostsSection({ posts }: PostsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered =
    activeCategory === 'all'
      ? posts
      : posts.filter((p) => p.frontmatter.category === activeCategory);

  return (
    <section className="section" id="posts">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Latest Posts</h2>
          <p className="section-subtitle">프론트엔드 개발 인사이트와 기술 가이드</p>
        </div>

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        <div className="posts-grid">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
