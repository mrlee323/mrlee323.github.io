import Link from 'next/link';
import type { PostMeta } from '@/types';

interface PostNavigationProps {
  prev: PostMeta | null;
  next: PostMeta | null;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <div className="post-navigation">
      {prev ? (
        <Link href={`/posts/${prev.slug}/`} className="post-nav-item">
          <span className="post-nav-label">← 이전 글</span>
          <span className="post-nav-title">{prev.frontmatter.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link href={`/posts/${next.slug}/`} className="post-nav-item next">
          <span className="post-nav-label">다음 글 →</span>
          <span className="post-nav-title">{next.frontmatter.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
