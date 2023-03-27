import Link from 'next/link';
import React, { use } from 'react';

import { getData } from '@/lib/datocms/get_data';
import type { SocialMedia } from '@/models/social_media';

import SocialMediaLink from './SocialMediaLink';

export const FOOTER_SOCIALMEDIAS_QUERY = `query MySocialMedias {
  allSocialMds(filter: {visibleInFooter: {eq: "true"}}) {
    id
    name
    link
    logo {
      url
    }
  }
}
`;

export interface IFooterPageQuery {
  data: {
    allSocialMds: SocialMedia[];
  };
}

const Footer: React.FC = () => {
  const query: IFooterPageQuery = use(
    getData(FOOTER_SOCIALMEDIAS_QUERY, {
      next: { revalidate: 60 * 60 * 24 * 7 },
    })
  );

  return (
    <footer className="w-full bg-zinc-800 py-4">
      <div className="mx-auto max-w-screen-lg">
        <div className="flex min-w-max px-4 max-sm:items-center max-sm:justify-center">
          <ul className="mr-auto text-zinc-50">
            <h3 className="mb-2 text-lg font-bold">Páginas</h3>
            <li>
              <Link href={'/'} className="hover:text-zinc-500">
                Home
              </Link>
            </li>
            <li className="my-2">
              <Link href={'/blog'} className="hover:text-zinc-500">
                Blog
              </Link>
            </li>
            <li>
              <Link href={'/contato'} className="hover:text-zinc-500">
                Contato
              </Link>
            </li>
          </ul>
          <ul className="text-zinc-50 ">
            <h3 className="mb-2 text-lg font-bold">Redes Sociais</h3>
            {query.data.allSocialMds.map((social_media) => (
              <li key={social_media.id}>
                <SocialMediaLink
                  link={social_media.link}
                  logo={social_media.logo}
                  name={social_media.name}
                  showName={true}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col items-center justify-center text-zinc-50">
        <strong>Powered by Vercel</strong>
        <span>Copyright © 2023 Nicolas Moraes</span>
      </div>
    </footer>
  );
};

export default Footer;
