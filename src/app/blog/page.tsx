import { use } from 'react';
import { getData } from '@/lib/datocms/get_data';
import { IMetadata } from '@/models/metadata';
import { IBlogPageQuery } from '@/models/pages/blog_page';
import { BLOGPAGE_QUERY } from '@/queries/blogpage_query';
import { METADATA_QUERY } from '@/queries/metadata_query';
import BlogPagePostArticle from '@/components/BlogPagePostArticle';

export default function Blog() {
  const posts: IBlogPageQuery = use(getData(BLOGPAGE_QUERY));
  return (
    <main className="mx-2 h-screen max-w-screen-md md:mx-auto">
      <h1 className="font-serif text-4xl md:mb-4">Todos as postagens</h1>
      <section>
        {posts.data.allPosts.map((post) => (
          <BlogPagePostArticle post={post} key={post.id} />
        ))}
      </section>
    </main>
  );
}

export async function generateMetadata() {
  const post: IMetadata = await getData(METADATA_QUERY('blog'));

  const {
    data: {
      websiteInfo: {
        metatags: { description, image, title },
      },
    },
  } = post;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://nicolasmoraes.vercel.app/blog`,
      siteName: 'Nicolas Moraes',
      images: [
        {
          url: image.url,
          width: 800,
          height: 600,
        },
      ],
      locale: 'pt-BR',
      type: 'website',
    },
  };
}
