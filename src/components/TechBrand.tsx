import Image from 'next/image';

import type { Technology } from '@/models/technology';

interface IProps {
  techs: Technology[];
}

const TechBrand: React.FC<IProps> = ({ techs }) => {
  return (
    <>
      {techs.map((tech) => (
        <span
          key={tech.id}
          className="flex items-center duration-500 hover:scale-110"
        >
          <Image
            src={tech.logo.url}
            width={32}
            height={32}
            alt="Logo"
            className="h-8 w-8 md:h-10 md:w-10"
          />
        </span>
      ))}
    </>
  );
};

export default TechBrand;
