'use client';
import React, { useState } from 'react';
import HeaderLink from './HeaderLink';
import Image from 'next/image';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuStateChange = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full">
      <div className="flex w-full items-center py-4 px-2">
        {/* Main */}
        <div className="mr-auto flex cursor-pointer items-center">
          <Image
            src="/logo.svg"
            width={30}
            height={30}
            alt={'Logo do website'}
          />
          <span className="ml-2 font-serif font-medium text-zinc-800 ">
            Nicolas Moraes
          </span>
        </div>
        <nav className="hidden md:flex">
          <HeaderLink href={'/'} label={'Início'} />
          <HeaderLink href={'/blog'} label={'Blog'} />
          <HeaderLink href={'/contato'} label={'Contato'} />
        </nav>

        {/* Mobile button */}
        <button
          className="flex cursor-pointer md:hidden"
          onClick={handleMenuStateChange}
        >
          {isMenuOpen ? (
            <AiOutlineClose size={30} />
          ) : (
            <AiOutlineMenu size={30} />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <nav className="w-full bg-zinc-200 px-4">
          <HeaderLink href={'/'} label={'Início'} />
          <HeaderLink href={'/blog'} label={'Blog'} />
          <HeaderLink href={'/contato'} label={'Contato'} />
        </nav>
      )}
    </header>
  );
};

export default Header;
