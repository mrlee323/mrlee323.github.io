import type { PostFrontmatter } from '@/types';
import { CATEGORY_MAP } from '@/lib/categories';
import { formatDate } from '@/lib/utils';

interface PostHeaderProps {
  frontmatter: PostFrontmatter;
}

export default function PostHeader({ frontmatter }: PostHeaderProps) {
  const category = CATEGORY_MAP[frontmatter.category];

  return (
    <div className="post-page-header">
      <div className="container-narrow">
        <span className={`post-category ${frontmatter.category}`} style={{ marginBottom: '1rem', display: 'inline-flex' }}>
          {category.icon.startsWith('fa') ? (
            <i className={category.icon} />
          ) : (
            <span>{category.icon}</span>
          )}
          {' '}{category.label}
        </span>

        <h1 className="post-title" style={{ fontSize: '2rem', lineHeight: '1.3', marginBottom: '1.25rem' }}>
          {frontmatter.title}
        </h1>

        <div className="post-meta">
          <span className="post-meta-item">
            <i className="fa fa-calendar" />
            {formatDate(frontmatter.date)}
          </span>
          {frontmatter.readingTime && (
            <span className="post-meta-item">
              <i className="fa fa-clock" />
              {frontmatter.readingTime} min read
            </span>
          )}
          <span className="post-meta-item">
            <i className="fa fa-user" />
            이민이
          </span>
        </div>
      </div>
    </div>
  );
}
