import type { Metadata } from 'next';
import { use } from 'react';

import BlogPagePostArticle from '@/components/BlogPagePostArticle';
import { getData } from '@/lib/datocms/get_data';
import type { IMetadata } from '@/models/metadata';
import type { IBlogPageQuery } from '@/models/pages/blog_page';
import { BLOGPAGE_QUERY } from '@/queries/blogpage_query';
import { METADATA_QUERY } from '@/queries/metadata_query';

export default function Blog() {
  const query: IBlogPageQuery = use(
    getData(BLOGPAGE_QUERY, { next: { revalidate: 60 * 60 * 24 } })
  );
  return (
    <main className="mx-2 h-screen max-w-screen-md md:mx-auto">
      <h1 className="font-serif text-4xl md:mb-4">Todos as postagens</h1>
      <section>
        {query.data.allPosts.map((post) => (
          <BlogPagePostArticle post={post} key={post.id} />
        ))}
      </section>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata: IMetadata = await getData(METADATA_QUERY('blog'));

  const {
    data: {
      websiteInfo: {
        metatags: { description, image, title },
        keyword,
      },
    },
  } = metadata;

  const keywordsArray = keyword.map((keywordObj) => keywordObj.name);

  return {
    title,
    description,
    keywords: keywordsArray,
    openGraph: {
      title,
      description,
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
