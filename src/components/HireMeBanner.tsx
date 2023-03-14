import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';

const HireMeBanner: React.FC = () => {
  return (
    <div className="flex h-10 w-full items-center justify-center bg-zinc-900">
      <a href="" className="flex  text-zinc-50 underline">
        Procuro vaga de Desenvolvedor React Jr{' '}
        <BiLinkExternal size={20} className="ml-1 text-zinc-50" />
      </a>
    </div>
  );
};

export default HireMeBanner;
