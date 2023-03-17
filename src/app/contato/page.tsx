import Input from '@/components/Input';
import SocialMediaLink from '@/components/SocialMediaLink';
import { getData } from '@/lib/datocms/get_data';
import type { IContactPageQuery } from '@/models/pages/contact_page';
import { CONTACTPAGE_QUERY } from '@/queries/contact_query';
import React, { use } from 'react';

const Contato: React.FC = () => {
  const query: IContactPageQuery = use(getData(CONTACTPAGE_QUERY));

  return (
    <main className="mx-auto flex max-w-screen-lg">
      <div className="my-20 mx-auto grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col justify-center self-start rounded-md p-10">
          {query.data.allSocialMds.map((social_media) => (
            <SocialMediaLink
              key={social_media.id}
              link={social_media.link}
              logo_alt={social_media.logo.alt ?? 'Logo'}
              logo_url={social_media.logo.url}
              name={social_media.name}
              textStyle="text-zinc-50"
              showName
              style="my-5 bg-zinc-800 p-4 rounded-md hover:bg-zinc-900"
            />
          ))}
        </div>
        <form action="" className="flex flex-col">
          <div className="flex flex-col">
            <Input label="Nome" name="name" />
            <Input label="E-mail" name="email" type="email" />
            <Input label="Assunto" name="subject" />
            <Input label="Descrição" name="body" isTextArea />
          </div>
          <button
            type="submit"
            className="mt-5 items-center self-center rounded-full bg-zinc-900 py-4 px-28 text-base font-bold text-zinc-50 duration-200 hover:bg-zinc-700"
          >
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contato;
