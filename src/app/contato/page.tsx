import type { Metadata } from 'next';
import { use } from 'react';

import { ContactForm } from '@/components/ContactForm';
import SocialMediaLink from '@/components/SocialMediaLink';
import { getData } from '@/lib/datocms/get_data';
import type { IMetadata } from '@/models/metadata';
import type { IContactPageQuery } from '@/models/pages/contact_page';
import { CONTACTPAGE_QUERY } from '@/queries/contactpage_query';
import { METADATA_QUERY } from '@/queries/metadata_query';

export default function Contact() {
  const query: IContactPageQuery = use(
    getData(CONTACTPAGE_QUERY, { next: { revalidate: 60 * 60 * 24 * 7 } })
  );

  const emailService = {
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
              islink={social_media.islink}
              link={social_media.link}
              logo={social_media.logo}
              name={social_media.name}
              textStyle="text-zinc-50"
              showName
              style="my-5 bg-zinc-800 p-4 rounded-md hover:bg-zinc-900"
            />
          ))}
        </div>
        <ContactForm email_service={emailService} />
      </div>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata: IMetadata = await getData(METADATA_QUERY('contact'), {
    next: { revalidate: 60 * 60 * 24 * 7 },
  });

  const {
    data: {
      websiteInfo: {
        metatags: { description, image, title },
      },
    },
  } = metadata;

  return {
    title,
    description,
    keywords: ['contato', 'contact'],
    openGraph: {
      title,
      description,
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
