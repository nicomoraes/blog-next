import Link from 'next/link';
import React from 'react';

interface IProps {
  href: string;
  label: string;
}

const HeaderLink: React.FC<IProps> = ({ href, label }) => {
  return (
    <Link href={href} className="block font-serif max-md:py-4 md:mx-6">
      <span className="font-serif font-bold text-zinc-600 hover:text-zinc-900">
        {label}
      </span>
    </Link>
  );
};

export default HeaderLink;
