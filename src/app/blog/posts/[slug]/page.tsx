// eslint-disable-next-line import/no-extraneous-dependencies
import 'highlight.js/styles/github-dark.css';

import type { Metadata } from 'next';
import { use } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { getData } from '@/lib/datocms/get_data';
import { formatDate } from '@/lib/formatDate';
import type {
  IPostPageQuery,
  IStaticGenParams,
} from '@/models/pages/post_page';
import {
  POSTPAGE_QUERY,
  STATIC_GEN_POSTPAGE_QUERY,
} from '@/queries/postpage_query';

interface IPostPageProps {
  params: { slug: string };
}

export default function Posts({ params }: IPostPageProps) {
  const { slug } = params;

  // Faz busca cacheada para cada post
  const query: IPostPageQuery = use(
    getData(POSTPAGE_QUERY(slug), { next: { revalidate: 60 * 60 * 12 } })
  );

  const {
    data: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      post: { title, excerpt, body, _createdAt },
    },
  } = query;

  return (
    <main className="mx-auto mt-4 mb-40 w-full max-w-screen-sm overflow-hidden">
      <div className="mx-2 md:mx-auto">
        <div className="mb-8 flex flex-col max-md:mx-3 max-md:items-center ">
          <h1 className="font-serif text-4xl max-md:text-center md:text-5xl">
            {title}
          </h1>
          <p className="my-4 text-lg text-zinc-600 max-md:text-center md:text-xl">
            {excerpt}
          </p>
          <span className="w-full text-zinc-500 max-md:text-center">
            {formatDate(_createdAt)}
          </span>
          <hr className="my-4" />
        </div>
        <div>
          {body && (
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              className="prose prose-zinc md:prose-lg  prose-pre:bg-[#0d1117] prose-pre:shadow-sm prose-pre:shadow-zinc-800 "
            >
              {body}
            </Markdown>
          )}
        </div>
      </div>
    </main>
  );
}

// Nova forma de utilizar o getStaticPaths com Server Components
export async function generateStaticParams() {
  const posts: IStaticGenParams = await getData(STATIC_GEN_POSTPAGE_QUERY, {
    next: { revalidate: 60 * 60 * 12 },
  });

  return posts.data.allPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Nova forma de carregar as metadatas
export async function generateMetadata({
  params: { slug },
}: IPostPageProps): Promise<Metadata> {
  const post: IPostPageQuery = await getData(POSTPAGE_QUERY(slug), {
    next: { revalidate: 60 * 60 * 24 * 7 },
  });

  const {
    data: {
      post: { title, excerpt, tag },
    },
  } = post;

  return {
    title,
    description: excerpt,
    keywords: [tag.name],
    openGraph: {
      title,
      description: excerpt,
      url: `https://nicolasmoraes.vercel.app/blog/posts/${slug}`,
      siteName: 'Nicolas Moraes',
      images: [
        {
          url: 'https://www.datocms-assets.com/96227/1678893233-opengraph.png',
          width: 800,
          height: 600,
        },
      ],
      locale: 'pt-BR',
      type: 'article',
    },
  };
}
