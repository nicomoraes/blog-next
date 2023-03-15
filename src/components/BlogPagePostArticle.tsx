import React from 'react';
import Link from 'next/link';
import { Post } from '@/models/post';
import { formatDate } from '@/lib/formatDate';

interface IBlogPagePostArticleProps {
  post: Post;
}

const BlogPagePostArticle: React.FC<IBlogPagePostArticleProps> = ({
  post: { slug, tag, title, excerpt, _createdAt },
}) => {
  return (
    <div className="md:my-8">
      <div>
        <span className="mr-2 text-lg  font-bold text-zinc-800 md:text-xl">
          {tag.name}
        </span>
        <span className="text-base font-medium text-zinc-400 md:text-lg">
          {formatDate(_createdAt)}
        </span>
      </div>
      <Link href={`/posts/${slug}`}>
        <div className="mt-1 cursor-pointer hover:underline">
          <h2 className="font-serif text-xl font-bold md:text-2xl">{title}</h2>
          <p className="mt-2 text-base font-normal text-zinc-600 md:text-lg">
            {excerpt}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BlogPagePostArticle;
