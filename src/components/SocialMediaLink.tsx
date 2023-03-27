'use client';

import Image from 'next/image';
import React, { useRef } from 'react';

import type { SocialMedia } from '@/models/social_media';

interface ISocialMediaLinkProps extends SocialMedia {
  showName?: boolean;
  style?: string;
  textStyle?: string;
}

const SocialMediaLink: React.FC<ISocialMediaLinkProps> = ({
  islink = true,
  link,
  logo,
  name,
  showName = false,
  style = '',
  textStyle = '',
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleSpanClick = (newSpanText: string) => {
    if (spanRef.current?.textContent) {
      spanRef.current.textContent = newSpanText;
    }
    setTimeout(() => {
      if (spanRef.current?.textContent) {
        spanRef.current.textContent = name;
      }
    }, 1000);
  };

  function handleCopyText() {
    const textToCopy = spanRef.current?.innerText;
    navigator.clipboard
      .writeText(textToCopy as string)
      .then(() => {
        handleSpanClick('Copiado');
      })
      .catch((error) => {
        handleSpanClick(`Erro ao copiar texto ${error}`);
      });
  }

  return islink === true ? (
    <a
      href={link}
      className={`${
        showName
          ? `mt-4 flex items-center ${style}`
          : `mx-2 rounded-md bg-zinc-800 p-1 shadow-sm shadow-zinc-500 duration-300 hover:scale-110 hover:bg-zinc-900  ${style}`
      }`}
      target={'_blank'}
    >
      <button
        className="flex h-full w-full items-center max-md:justify-center"
        type="button"
        title={`Abrir nova aba com ${name} de Nicolas`}
      >
        <Image
          alt={logo.alt ?? 'Logo'}
          className={`${showName ? 'mr-2' : null}`}
          height={30}
          src={logo.url}
          width={30}
        />
        {showName && (
          <span
            className={`${
              textStyle || 'font-sans text-zinc-50 hover:text-zinc-500'
            }`}
          >
            {name}
          </span>
        )}
      </button>
    </a>
  ) : (
    <button
      className=" my-5 flex w-[305px] cursor-pointer items-center rounded-md bg-zinc-800 p-4"
      title="Copiar para área de tranferência"
    >
      <Image
        alt={logo.alt ?? 'Logo'}
        className="mr-2"
        height={30}
        src={logo.url}
        width={30}
      />
      <span className="text-zinc-50" onClick={handleCopyText} ref={spanRef}>
        {name}
      </span>
    </button>
  );
};

export default SocialMediaLink;
