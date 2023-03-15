import React, { use } from 'react';
import { NextPage } from 'next';
import { getData } from '@/lib/datocms/get_data';
import {
  POSTPAGE_QUERY,
  STATIC_GEN_POSTPAGE_QUERY,
} from '@/queries/postpage_query';
import { IPostPageQuery, IStaticGenParams } from '@/models/pages/post_page';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { formatDate } from '@/lib/formatDate';
import 'highlight.js/styles/github-dark.css';

interface IPostPageProps {
  params: { slug: string };
}

const Posts: NextPage<IPostPageProps> = ({ params }) => {
  const { slug } = params;

  //Faz busca cacheada para cada post
  const post: IPostPageQuery = use(getData(POSTPAGE_QUERY(slug)));

  const {
    data: {
      post: { title, excerpt, body, _createdAt },
    },
  } = post;

  return (
    <main className="my-4 mx-auto w-full max-w-screen-sm overflow-hidden">
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
              children={body}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              className="pre-code:bg-transparent prose prose-zinc md:prose-lg prose-pre:shadow-sm prose-pre:shadow-zinc-800 "
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Posts;

//Nova forma de utilizar o getStaticPaths com Server Components
export async function generateStaticParams() {
  const posts: IStaticGenParams = await getData(STATIC_GEN_POSTPAGE_QUERY);
  return posts.data.allPosts.map((post) => ({
    slug: post.slug,
  }));
}

//Nova forma de carregar a metadata
export async function generateMetadata({ params: { slug } }: IPostPageProps) {
  const post: IPostPageQuery = await getData(POSTPAGE_QUERY(slug));

  const {
    data: {
      post: { title, excerpt },
    },
  } = post;

  return {
    title: title,
    description: excerpt,
    openGraph: {
      title: title,
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
