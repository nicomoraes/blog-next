import { ContactForm } from '@/components/ContactForm';
import SocialMediaLink from '@/components/SocialMediaLink';
import { getData } from '@/lib/datocms/get_data';
import type { IMetadata } from '@/models/metadata';
import type { IContactPageQuery } from '@/models/pages/contact_page';
import { CONTACTPAGE_QUERY } from '@/queries/contactpage_query';
import { METADATA_QUERY } from '@/queries/metadata_query';
import type { Metadata } from 'next';
import { use } from 'react';

export default function Contact() {
  const query: IContactPageQuery = use(getData(CONTACTPAGE_QUERY));

  const email_service = {
    service_id: process.env.EMAILJS_SERVICE_ID as string,
    template_id: process.env.EMAILJS_TEMPLATE_ID as string,
    public_key: process.env.EMAILJS_PUBLIC_KEY as string,
  };

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
        <ContactForm email_service={email_service} />
      </div>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata: IMetadata = await getData(METADATA_QUERY('contact'));

  const {
    data: {
      websiteInfo: {
        metatags: { description, image, title },
      },
    },
  } = metadata;

  return {
    title: title,
    description: description,
    keywords: ['contato', 'contact'],
    openGraph: {
      title: title,
      description: description,
      url: `https://nicolasmoraes.vercel.app/contato`,
      siteName: 'Nicolas Moraes',
      images: [
        {
          url: image.url,
          width: 800,
          height: 600,
        },
      ],
      locale: 'pt-BR',
      type: 'website',
    },
  };
}
