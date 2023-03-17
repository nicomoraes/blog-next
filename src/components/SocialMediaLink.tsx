import Image from 'next/image';
import React from 'react';

interface ISocialMediaLinkProps {
  link: string;
  logo_alt: string;
  logo_url: string;
  name: string;
  showName?: boolean;
  style?: string;
  textStyle?: string;
}

const SocialMediaLink: React.FC<ISocialMediaLinkProps> = ({
  link,
  logo_alt,
  logo_url,
  name,
  showName = false,
  style = '',
  textStyle = '',
}) => {
  return (
    <a
      href={link}
      className={`${
        showName
          ? `mt-4 flex items-center  ${style}`
          : `mx-2 rounded-md bg-zinc-800 p-1 shadow-sm shadow-zinc-500 duration-300 hover:scale-110 hover:bg-zinc-900  ${style}`
      }`}
      target={'_blank'}
    >
      <Image
        src={logo_url}
        width={30}
        height={30}
        alt={logo_alt}
        className={`${showName ? 'mr-2' : null}`}
      />{' '}
      {showName && (
        <span
          className={`${
            textStyle ? textStyle : 'font-sans text-zinc-50 hover:text-zinc-500'
          }`}
        >
          {name}
        </span>
      )}
    </a>
  );
};

export default SocialMediaLink;
