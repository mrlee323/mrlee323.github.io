import React from 'react';

interface PostBodyProps {
  content: React.ReactNode;
  tags: string[];
}

export default function PostBody({ content, tags }: PostBodyProps) {
  return (
    <div>
      <div className="prose-blog">
        {content}
      </div>

      {tags.length > 0 && (
        <div className="post-tags" style={{ marginTop: '2rem' }}>
          {tags.map((tag) => (
            <span key={tag} className="post-tag">#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
