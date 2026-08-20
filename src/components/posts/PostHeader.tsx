import type { PostFrontmatter } from '@/types';
import { CATEGORY_MAP } from '@/lib/categories';
import { formatDate } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/config';

interface PostHeaderProps {
  frontmatter: PostFrontmatter;
}

export default function PostHeader({ frontmatter }: PostHeaderProps) {
  const category = CATEGORY_MAP[frontmatter.category];

  return (
    <div className="post-page-header">
      <div className="container-narrow">
        <span className={`cat-mark ${frontmatter.category}`}>
          {category.label}
        </span>

        <h1 className="post-page-title">{frontmatter.title}</h1>

        <div className="post-meta">
          <span className="post-meta-item">{SITE_CONFIG.author.name}</span>
          <span className="dot-sep" aria-hidden="true" />
          <span className="post-meta-item">{formatDate(frontmatter.date)}</span>
          {frontmatter.readingTime && (
            <>
              <span className="dot-sep" aria-hidden="true" />
              <span className="post-meta-item">
                {frontmatter.readingTime}분 읽기
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
