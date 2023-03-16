import { getData } from '@/lib/datocms/get_data';
import { formatDate } from '@/lib/formatDate';
import { IPostPageQuery, IStaticGenParams } from '@/models/pages/post_page';
import {
  POSTPAGE_QUERY,
  STATIC_GEN_POSTPAGE_QUERY,
} from '@/queries/postpage_query';
import 'highlight.js/styles/github-dark.css';
import { NextPage } from 'next';
import { use } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

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
              children={body}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              className="prose prose-zinc md:prose-lg  prose-pre:bg-[#0d1117] prose-pre:shadow-sm prose-pre:shadow-zinc-800 "
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

//Nova forma de carregar as metadatas
export async function generateMetadata({ params: { slug } }: IPostPageProps) {
  const post: IPostPageQuery = await getData(POSTPAGE_QUERY(slug));

  const {
    data: {
      post: { title, excerpt, tag },
    },
  } = post;

  return {
    title: title,
    description: excerpt,
    keywords: [tag.name],
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
