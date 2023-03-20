'use client';

import emailjs from '@emailjs/browser';
import { FormEvent, useCallback, useRef, useState } from 'react';
import Input from './Input';

interface IFormData {
  name: string;
  email: string;
  subject: string;
  body: string;
}

interface IContactFormProps {
  email_service: {
    service_id: string;
    template_id: string;
    public_key: string;
  };
}

export const ContactForm: React.FC<IContactFormProps> = ({
  email_service: { service_id, public_key, template_id },
}) => {
  const [formData, setFormData] = useState<IFormData>({} as IFormData);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) {
      return;
    }
    try {
      await emailjs.sendForm(
        service_id,
        template_id,
        formRef.current,
        public_key
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFormInputData = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = event.currentTarget.name;
    const fieldValue = event.currentTarget.value;

    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  return (
    <form className="flex flex-col" onSubmit={handleFormSubmit} ref={formRef}>
      <h1 className="mb-2 self-center font-serif text-3xl font-bold">
        Contate-me
      </h1>
      <fieldset className="flex flex-col">
        <Input
          label="Nome"
          name="name"
          onChange={handleFormInputData}
          required
        />
        <Input
          label="E-mail"
          name="email"
          onChange={handleFormInputData}
          required
          type="email"
        />
        <Input
          label="Assunto"
          name="subject"
          onChange={handleFormInputData}
          required
        />
        <Input
          label="Descrição"
          name="body"
          onChange={handleFormInputData}
          required
          isTextArea
        />
      </fieldset>
      <button
        className="mt-5 items-center self-center rounded-full bg-zinc-900 py-4 px-28 text-base font-bold text-zinc-50 duration-200 hover:bg-zinc-700"
        type="submit"
        title="Enviar formulário"
      >
        Enviar
      </button>
    </form>
  );
};
