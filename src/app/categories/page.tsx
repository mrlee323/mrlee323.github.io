import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPostsMeta } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'Categories',
  description: '프론트엔드 개발 카테고리별 포스트 목록',
};

export default function CategoriesPage() {
  const allPosts = getAllPostsMeta();

  const categoriesWithCount = CATEGORIES.map((cat) => ({
    ...cat,
    postCount: allPosts.filter((p) => p.frontmatter.category === cat.slug).length,
    recentPosts: allPosts
      .filter((p) => p.frontmatter.category === cat.slug)
      .slice(0, 3),
  }));

  return (
    <div className="section">
      <div className="container">
        <div className="section-head">
          <h1 className="section-title">카테고리</h1>
          <p className="section-subtitle">주제별로 정리된 글</p>
        </div>

        <div className="categories-list">
          {categoriesWithCount.map((cat) => (
            <div key={cat.slug} className="category-row">
              <div>
                <span className={`cat-mark ${cat.slug}`}>{cat.label}</span>
                <h2 className="category-row-title">{cat.label}</h2>
              </div>

              <div>
                <p className="category-row-desc">{cat.description}</p>
                {cat.recentPosts.length > 0 && (
                  <ul className="category-recent">
                    {cat.recentPosts.map((post) => (
                      <li key={post.slug}>
                        <Link href={`/posts/${post.slug}/`}>
                          {post.frontmatter.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <span className="category-count">
                {String(cat.postCount).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
