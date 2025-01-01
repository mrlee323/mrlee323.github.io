import Link from 'next/link';
import type { PostMeta } from '@/types';
import { CATEGORY_MAP } from '@/lib/categories';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter } = post;
  const category = CATEGORY_MAP[frontmatter.category];

  return (
    <article className="post-card" data-category={frontmatter.category}>
      <div className="post-card-header">
        <span className={`post-category ${frontmatter.category}`}>
          {category.icon.startsWith('fa') ? (
            <i className={category.icon} />
          ) : (
            <span>{category.icon}</span>
          )}
          {' '}{category.label}
        </span>
        <span className="post-date">{formatDate(frontmatter.date)}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="post-title">
          <Link href={`/posts/${slug}/`}>{frontmatter.title}</Link>
        </h3>
        <p className="post-excerpt">{frontmatter.excerpt}</p>

        {frontmatter.tags.length > 0 && (
          <div className="post-tags">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="post-tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="post-card-footer">
        <Link href={`/posts/${slug}/`} className="read-more">
          Read Article
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        {frontmatter.readingTime && (
          <span className="read-time">{frontmatter.readingTime} min read</span>
        )}
      </div>
    </article>
  );
}
