import React, { use } from 'react';
import { NextPage } from 'next';
import { getData } from '@/lib/datocms/get_data';
import {
  POSTPAGE_QUERY,
  STATIC_GEN_POSTPAGE_QUERY,
} from '@/queries/postpage_query';
import { IPostPageQuery, IStaticGenParams } from '@/models/pages/post_page';

interface IPostPageProps {
  params: { slug: string };
}

const Posts: NextPage<IPostPageProps> = ({ params }) => {
  const { slug } = params;

  //Faz busca cacheada para cada post
  const post: IPostPageQuery = use(getData(POSTPAGE_QUERY(slug)));

  const {
    data: {
      post: { title, excerpt },
    },
  } = post;

  return (
    <main className="mx-auto my-4 w-full max-w-screen-md">
      <div className="max-md:mx-3">
        <h1 className="text-left text-5xl">{title}</h1>
        <p className="my-4 text-left text-xl text-zinc-500">{excerpt}</p>
      </div>
      <div></div>
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
