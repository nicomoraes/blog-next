import Link from 'next/link';
import React from 'react';

import { formatDate } from '@/lib/formatDate';
import type { Post } from '@/models/post';

interface IHomePagePostArticleProps {
  post: Post;
}

const HomePagePostArticle: React.FC<IHomePagePostArticleProps> = ({
  post: { title, _createdAt, slug, tag },
}) => {
  return (
    <article className="my-4">
      <div className="flex items-end">
        <span className="font-sans text-xl font-bold">{tag.name}</span>
        <span className="ml-2 text-xl text-zinc-500">
          {formatDate(_createdAt)}
        </span>
      </div>
      <Link href={`/blog/posts/${slug}`}>
        <h2 className="mt-2 cursor-pointer text-xl font-medium hover:underline">
          {title}
        </h2>
      </Link>
    </article>
  );
};

export default HomePagePostArticle;
