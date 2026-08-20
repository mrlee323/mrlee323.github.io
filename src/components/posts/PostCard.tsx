import Link from 'next/link';
import type { PostMeta } from '@/types';
import { CATEGORY_MAP } from '@/lib/categories';
import { formatDateShort } from '@/lib/utils';

interface PostCardProps {
  post: PostMeta;
  index?: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  const { slug, frontmatter } = post;
  const category = CATEGORY_MAP[frontmatter.category];

  return (
    <article className="post-card" data-category={frontmatter.category}>
      <div className="post-card-top">
        {typeof index === 'number' && (
          <span className="post-index">{String(index).padStart(2, '0')}</span>
        )}
        <span className={`cat-mark ${frontmatter.category}`}>
          {category.label}
        </span>
      </div>

      <h3 className="post-title">
        <Link href={`/posts/${slug}/`}>{frontmatter.title}</Link>
      </h3>

      <p className="post-excerpt">{frontmatter.excerpt}</p>

      <div className="post-card-foot">
        <span className="label">{formatDateShort(frontmatter.date)}</span>
        {frontmatter.readingTime && (
          <>
            <span className="dot-sep" aria-hidden="true" />
            <span className="label">{frontmatter.readingTime}분</span>
          </>
        )}
      </div>
    </article>
  );
}
