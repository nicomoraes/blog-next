import { AllPost } from '@/models/homepage';
import Link from 'next/link';
import React from 'react';

interface IHomePageBlogArticleProps {
  post: AllPost;
}

const HomePageBlogArticle: React.FC<IHomePageBlogArticleProps> = ({
  post: { title, _createdAt, slug, tag },
}) => {
  function formatDate(string: string) {
    const month = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const date = new Date(string);

    const dd = date.getDate(); // retorna o dia do mês (14)
    const mm = date.getMonth(); // retorna o mês (2, onde 0 = janeiro, 1 = fevereiro, etc)
    const yyyy = date.getFullYear(); // retorna o ano (2023)
    return `${dd} de ${month[mm]} de ${yyyy}}`;
  }

  return (
    <article className="my-4">
      <div className="flex items-end">
        <span className="font-sans text-xl font-bold">{tag.name}</span>
        <span className="ml-2 text-xl text-zinc-500">
          {formatDate(_createdAt)}
        </span>
      </div>
      <Link href={`/posts/${slug}`}>
        <h2 className="mt-2 cursor-pointer text-xl font-medium hover:underline">
          {title}
        </h2>
      </Link>
    </article>
  );
};

export default HomePageBlogArticle;
