import Image from 'next/image';
import { use } from 'react';
import { getData } from '@/lib/datocms/get_data';
import { HOMEPAGE_QUERY } from '@/queries/homepage_query';
import { IHomePageQuery } from '@/models/pages/home_page';
import PortfolioAccordion from '@/components/PortfolioAccordion';
import TechBrand from '@/components/TechBrand';
import HomePagePostArticle from '@/components/HomePagePostArticle';
import { METADATA_QUERY } from '@/queries/metadata_query';
import { IMetadata } from '@/models/metadata';

export default function Home() {
  const myInfo: IHomePageQuery = use(getData(HOMEPAGE_QUERY));
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="mx-2 max-w-screen-lg md:mx-auto">
        <div className=" flex flex-col items-center justify-center">
          <Image
            className="mr-2 h-[174px] rounded-full border-2 border-zinc-500 bg-zinc-600"
            src={myInfo.data.myinfo.photo.url}
            width={174}
            height={174}
            alt="Minha foto"
          />
          <div className="flex flex-col items-center text-center">
            <span className="flex flex-col font-serif text-4xl font-medium text-zinc-800">
              <span>Olá!</span>
              <span>Meu nome é</span>
              <span className="font-sans font-bold text-zinc-900">Nicolas</span>
            </span>
            <span className="my-2 w-max rounded-md bg-zinc-800 p-2 text-2xl font-medium text-zinc-300 shadow-inner shadow-zinc-600">
              Desenvolvedor{' '}
              <span className="font-bold text-zinc-50">
                {myInfo.data.myinfo.role}
              </span>
            </span>
            <p className="max-w-[500px] font-serif text-base font-medium text-zinc-900">
              {myInfo.data.myinfo.phrase}
            </p>

            {/* Mídias Sociais */}
            <div className="mt-3 flex">
              {myInfo.data.allSocialMds.map((social_media) => {
                return (
                  <a
                    href={social_media.link}
                    target="_blank"
                    className="mx-2 rounded-md bg-zinc-800 p-1 shadow-sm shadow-zinc-500 duration-300 hover:scale-110 hover:bg-zinc-900"
                    key={social_media.id}
                  >
                    <Image
                      src={social_media.logo.url}
                      width={30}
                      height={30}
                      alt="Logo da mídia social"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-2 my-10 grid max-w-screen-lg grid-flow-col place-items-center gap-2 rounded-md bg-zinc-800 p-2 shadow-md shadow-black md:mx-auto">
        <TechBrand techs={myInfo.data.allTechnologies} />
      </section>

      {/* Portfolio e Blog */}
      <section className="align-start mx-2 my-4 grid max-w-screen-lg grid-cols-6 gap-4 md:mx-auto md:grid-cols-12">
        <div className="col-span-full flex flex-col self-start rounded-md border border-black py-4 px-4 shadow-md shadow-zinc-800 md:col-start-1 md:col-end-7">
          <h1 className="w-full text-center text-2xl font-bold text-zinc-800">
            Portfólio
          </h1>
          <p className="w-full text-center font-serif font-medium">
            "Alguns projetos que desenvolvi durante os últimos anos visando o
            aprendizado e aprimoramento sobre novas e modernas tecnologias de
            prograação web."
          </p>
          <ul className="list-none">
            {myInfo.data.allRepositories.map((repository) => {
              return (
                <PortfolioAccordion key={repository.id} repo={repository} />
              );
            })}
          </ul>
        </div>
        <div className="col-span-full flex max-h-max flex-col self-start rounded-md border border-black py-4 px-4 shadow-md shadow-zinc-800  md:col-start-7 md:col-end-13">
          <h1 className="w-full text-center text-2xl font-bold text-zinc-800">
            Blog
          </h1>
          <p className="w-full text-center font-serif font-medium">
            "Algumas dicas e discussões sobre programação web moderna."
          </p>
          <ul className="flex h-full list-none flex-col justify-between">
            {myInfo.data.allPosts.map((post) => {
              return <HomePagePostArticle key={post.id} post={post} />;
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata() {
  const post: IMetadata = await getData(METADATA_QUERY('home'));

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
