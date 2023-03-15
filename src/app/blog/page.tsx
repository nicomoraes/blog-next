import { use } from 'react';
import BlogPagePostArticle from '@/components/BlogPagePostArticle';
import { getData } from '@/lib/datocms/get_data';
import { IBlogPageQuery } from '@/models/blog_page';
import { BLOGPAGE_QUERY } from '@/queries/blogpage_query';

export const metadata = {
  title: 'Blog',
  description: 'Portfolio Website',
};

export default function Blog() {
  const posts: IBlogPageQuery = use(getData(BLOGPAGE_QUERY));
  return (
    <main className="mx-2 h-screen max-w-screen-md md:mx-auto">
      <h1 className="font-serif text-4xl md:mb-4">Todos as postagens</h1>
      <section>
        {posts.data.allPosts.map((post) => (
          <BlogPagePostArticle post={post} />
        ))}
      </section>
    </main>
  );
}
