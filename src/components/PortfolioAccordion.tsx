'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';
import { BiLinkExternal } from 'react-icons/bi';
import { AllRepository } from '@/models/homepage';

interface IPortfolioAccordionProps {
  repo: AllRepository;
}

const PortfolioAccordion: React.FC<IPortfolioAccordionProps> = ({
  repo: { title, description, techs, link },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleExpandButton = () => [setIsOpen(!isOpen)];
  return (
    <li className={`my-4 max-h-max rounded-xl bg-zinc-800 p-4`}>
      <div className="flex w-full items-center">
        <h1 className="w-[34ch] truncate font-serif text-xl font-bold text-white">
          {title}
        </h1>
        <button
          className="text-zinc-200 hover:text-zinc-300"
          onClick={handleExpandButton}
        >
          {isOpen ? 'fechar' : 'expandir'}
        </button>
      </div>
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
              transition: { duration: 1, ease: 'easeOut' },
            },
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <h2 className="text-xl font-medium text-zinc-400">Descrição</h2>
          <p className="mt-2 text-justify text-zinc-200">{description}</p>
          <div className="my-3 flex max-md:flex-col">
            <div className="flex items-center">
              {techs.map((tech) => (
                <Image
                  key={tech.id + '_repo_tech_logo'}
                  src={tech.logo.url}
                  width={50}
                  height={50}
                  className="mx-2 h-8 w-8"
                  alt={'Tecnologia utilizada no projetos'}
                />
              ))}
            </div>
            {link != '' && (
              <button className="flex h-9 items-center justify-center rounded-full bg-zinc-50 py-2 px-4 font-sans font-bold text-zinc-900 shadow-zinc-500 duration-300 hover:bg-zinc-200 hover:shadow-md max-md:mt-4 md:ml-auto">
                Acessar <BiLinkExternal size={20} className="ml-1" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </li>
  );
};

export default PortfolioAccordion;