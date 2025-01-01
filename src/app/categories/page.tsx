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
    <div style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <h1 className="section-title">Categories</h1>
          <p className="section-subtitle">주제별로 정리된 프론트엔드 개발 인사이트</p>
        </div>

        <div className="categories-grid">
          {categoriesWithCount.map((cat) => (
            <div
              key={cat.slug}
              className="category-card"
              style={{ borderColor: `rgba(${hexToRgb(cat.color)}, 0.15)` }}
            >
              <div className={`category-icon ${cat.slug}`}>
                {cat.icon.startsWith('fa') ? (
                  <i className={cat.icon} />
                ) : (
                  <span>{cat.icon}</span>
                )}
              </div>

              <h2 className="category-card-title">{cat.label}</h2>
              <p className="category-card-desc">{cat.description}</p>

              <span
                className="category-card-count"
                style={{
                  background: cat.bgColor,
                  color: cat.color,
                  border: `1px solid ${cat.borderColor}`,
                }}
              >
                {cat.postCount}개 포스트
              </span>

              {cat.recentPosts.length > 0 && (
                <ul style={{ marginTop: '1rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cat.recentPosts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/posts/${post.slug}/`}
                        style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}
                      >
                        → {post.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}
