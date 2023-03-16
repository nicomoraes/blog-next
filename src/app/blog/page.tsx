import BlogPagePostArticle from '@/components/BlogPagePostArticle';
import { getData } from '@/lib/datocms/get_data';
import { IMetadata } from '@/models/metadata';
import { IBlogPageQuery } from '@/models/pages/blog_page';
import { BLOGPAGE_QUERY } from '@/queries/blogpage_query';
import { METADATA_QUERY } from '@/queries/metadata_query';
import { use } from 'react';

export default function Blog() {
  const query: IBlogPageQuery = use(getData(BLOGPAGE_QUERY));
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

export async function generateMetadata() {
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
    title: title,
    description: description,
    keywords: keywordsArray,
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
