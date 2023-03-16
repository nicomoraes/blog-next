import HomePagePostArticle from '@/components/HomePagePostArticle';
import PortfolioAccordion from '@/components/PortfolioAccordion';
import SocialMediaLink from '@/components/SocialMediaLink';
import TechBrand from '@/components/TechBrand';
import { getData } from '@/lib/datocms/get_data';
import { IMetadata } from '@/models/metadata';
import { IHomePageQuery } from '@/models/pages/home_page';
import { HOMEPAGE_QUERY } from '@/queries/homepage_query';
import { METADATA_QUERY } from '@/queries/metadata_query';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { AiFillGithub, AiOutlineArrowRight } from 'react-icons/ai';

export default function Home() {
  const query: IHomePageQuery = use(getData(HOMEPAGE_QUERY));
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="mx-2 max-w-screen-lg md:mx-auto">
        <div className=" flex flex-col items-center justify-center">
          <Image
            className="mr-2 h-[174px] rounded-full border-2 border-zinc-500 bg-zinc-600"
            src={query.data.myinfo.photo.url}
            width={174}
            height={174}
            alt="Minha foto"
          />
          <div className="flex flex-col items-center text-center">
            <span className="flex flex-col font-serif text-4xl font-medium text-zinc-800">
              <span>Olá!</span>
              <span>Meu nome é</span>
              <span className="font-sans text-5xl font-bold text-zinc-800">
                Nicolas
              </span>
            </span>
            <span className="my-2 w-max rounded-md bg-zinc-800 p-2 text-2xl font-medium text-zinc-300 shadow-inner shadow-zinc-600">
              Desenvolvedor{' '}
              <span className="font-bold text-zinc-50">
                {query.data.myinfo.role}
              </span>
            </span>
            <p className="max-w-[500px] font-serif text-base font-medium text-zinc-900">
              {query.data.myinfo.phrase}
            </p>

            {/* Mídias Sociais */}
            <div className="mt-3 flex">
              {query.data.allSocialMds.map((social_media) => (
                <SocialMediaLink
                  key={social_media.id}
                  link={social_media.link}
                  logo_alt={social_media.logo.alt ?? 'Logo'}
                  logo_url={social_media.logo.url}
                  name={social_media.name}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-2 my-10 grid max-w-screen-lg grid-flow-col place-items-center gap-2 rounded-md bg-zinc-800 p-2 shadow-md shadow-black md:mx-auto">
        <TechBrand techs={query.data.allTechnologies} />
      </section>

      {/* Portfolio e Blog */}
      <section className="align-start mx-2 my-20 grid max-w-screen-lg grid-cols-6 gap-4 md:mx-auto md:grid-cols-12">
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
            {query.data.allRepositories.map((repository) => {
              return (
                <PortfolioAccordion key={repository.id} repo={repository} />
              );
            })}
          </ul>
          <a
            href="https://github.com/nicomoraes"
            className="mt-5 self-center"
            target={'_blank'}
          >
            <button className="flex w-max items-center rounded-full bg-zinc-900 py-2 px-28 text-base font-bold text-zinc-50 duration-200 hover:bg-zinc-700">
              Ver todos <AiFillGithub className="ml-2 text-zinc-50" size={35} />
            </button>
          </a>
        </div>

        <div className="col-span-full flex max-h-max flex-col self-start rounded-md border border-black py-4 px-4 shadow-md shadow-zinc-800  md:col-start-7 md:col-end-13">
          <h1 className="w-full text-center text-2xl font-bold text-zinc-800">
            Blog
          </h1>
          <p className="w-full text-center font-serif font-medium">
            "Algumas dicas e discussões sobre programação web moderna."
          </p>
          <ul className="flex h-full list-none flex-col justify-between">
            {query.data.allPosts.map((post) => {
              return <HomePagePostArticle key={post.id} post={post} />;
            })}
          </ul>
          <Link href="/blog" className="mt-5 self-center">
            <button className="flex w-max items-center rounded-full bg-zinc-900 py-3 px-28 text-base font-bold text-zinc-50 duration-200 hover:bg-zinc-700">
              Acessar blog{' '}
              <AiOutlineArrowRight className="ml-2 text-zinc-50" size={25} />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export async function generateMetadata() {
  const metadata: IMetadata = await getData(METADATA_QUERY('home'));

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
