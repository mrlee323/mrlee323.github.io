import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPostsMeta } from '@/lib/posts';
import { CATEGORY_MAP } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'Archives',
  description: '연도별 포스트 아카이브',
};

export default function ArchivesPage() {
  const allPosts = getAllPostsMeta();

  const grouped: Record<string, typeof allPosts> = {};
  allPosts.forEach((post) => {
    const year = post.frontmatter.date.slice(0, 4);
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(post);
  });

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="section">
      <div className="container">
        <div className="section-head">
          <h1 className="section-title">아카이브</h1>
          <p className="section-subtitle">총 {allPosts.length}편</p>
        </div>

        {years.map((year) => (
          <div key={year} className="archive-year">
            <h2 className="archive-year-title">{year}</h2>
            <ul className="archive-list">
              {grouped[year].map((post) => {
                const category = CATEGORY_MAP[post.frontmatter.category];
                return (
                  <li key={post.slug}>
                    <Link href={`/posts/${post.slug}/`} className="archive-item">
                      <span className="archive-item-date">
                        {post.frontmatter.date.slice(5).replace('-', '.')}
                      </span>
                      <span className={`cat-mark ${post.frontmatter.category}`}>
                        {category.label}
                      </span>
                      <span className="archive-item-title">
                        {post.frontmatter.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
