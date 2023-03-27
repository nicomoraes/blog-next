'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { SlArrowDown } from 'react-icons/sl';

import type { Repository } from '@/models/repository';

interface IPortfolioAccordionProps {
  repo: Repository;
}

const PortfolioAccordion: React.FC<IPortfolioAccordionProps> = ({
  repo: { title, description, techs, link },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleExpandButton = () => [setIsOpen(!isOpen)];
  return (
    <li className={`my-4 max-h-max w-full rounded-xl bg-zinc-800 p-4`}>
      <div className="flex w-full items-center">
        <h1 className="w-full truncate font-serif  text-lg font-bold text-zinc-50 md:text-xl">
          {title}
        </h1>
        <button
          className="text-zinc-200 underline hover:text-zinc-400"
          onClick={handleExpandButton}
        >
          <SlArrowDown
            size={25}
            className={`${isOpen ? 'rotate-180' : 'rotate-0'} duration-500`}
          />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="my-2 flex flex-col overflow-hidden"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: {
                opacity: 0,
                height: 0,
              },
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <h2 className="text-xl font-medium text-zinc-500">Descrição</h2>
            <p className="mt-2 text-zinc-50">{description}</p>
            <div className="my-3 flex max-md:flex-col">
              <div className="flex items-center">
                {techs.map((tech) => (
                  <Image
                    key={`${tech.id}_repo_tech_logo`}
                    src={tech.logo.url}
                    width={50}
                    height={50}
                    className="mx-2 h-8 w-8"
                    alt={'Tecnologia utilizada no projetos'}
                  />
                ))}
              </div>
              {link !== '' && (
                <a
                  href={link}
                  className="flex h-9 items-center justify-center rounded-full bg-zinc-50 py-2 px-4 font-sans font-bold text-zinc-900 shadow-zinc-500 duration-300 hover:bg-zinc-200 hover:shadow-md max-md:mt-4 md:ml-auto"
                  target={'_blank'}
                >
                  Acessar <BiLinkExternal size={20} className="ml-1" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default PortfolioAccordion;
