import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-zinc-800 py-4">
      <div className="mx-auto max-w-screen-lg">
        <div className="flex w-full items-center justify-center">
          <Image
            src="/logo.svg"
            width={30}
            height={30}
            alt={'Logo do website'}
          />
          <span className="ml-2 font-serif font-medium text-zinc-50">
            Nicolas Moraes
          </span>
        </div>
        <div className="flex min-w-max px-4 max-sm:items-center max-sm:justify-center">
          <ul className="mr-auto text-zinc-50">
            <h3 className="mb-2 text-lg font-bold">Páginas</h3>
            <li>
              <Link href={'/'} className="hover:text-zinc-500">
                Home
              </Link>
            </li>
            <li className="my-2">
              <Link href={'/'} className="hover:text-zinc-500">
                Blog
              </Link>
            </li>
            <li>
              <Link href={'/'} className="hover:text-zinc-500">
                Contato
              </Link>
            </li>
          </ul>
          <ul className="text-zinc-50 ">
            <h3 className="mb-2 text-lg font-bold">Redes Sociais</h3>
            <li>
              <a href="" className="flex items-center">
                <Image
                  src="https://www.datocms-assets.com/96227/1678798358-github.png"
                  width={30}
                  height={30}
                  alt={'Github logo'}
                  className={'mr-2'}
                />{' '}
                GitHub
              </a>
            </li>
            <li>
              <a href="" className="mt-4 flex items-center">
                <Image
                  src="https://www.datocms-assets.com/96227/1678798373-linkedin.png"
                  width={30}
                  height={30}
                  alt={'LinkedIn logo'}
                  className={'mr-2'}
                />{' '}
                LinkedIn
              </a>
            </li>
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
