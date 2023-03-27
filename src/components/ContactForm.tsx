'use client';

import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import type { FormEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import Input from './Input';

interface IFormData {
  name: string;
  email: string;
  subject: string;
  body: string;
}

interface IFormState {
  loading?: boolean;
  message: string;
  status: 'hidden' | 'error' | 'success';
  subMessage: string;
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
  const [formState, setFormState] = useState<IFormState>({
    loading: false,
    status: 'hidden',
    message: '',
    subMessage: '',
  });

  const handleFormSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) {
      return;
    }

    try {
      setFormState({ ...formState, loading: true });

      await emailjs.sendForm(
        service_id,
        template_id,
        formRef.current,
        public_key
      );

      setFormState({
        status: 'success',
        message: 'Formulário enviado com sucesso!',
        subMessage:
          'Muito obrigado por entrar em contato, em breve você receberá uma resposta! :)',
      });
    } catch (error) {
      setFormState({
        status: 'error',
        message: 'Desculpe, ocorreu um erro ao enviar o formulário.',
        subMessage: 'Por favor, tente enviar novamente!',
      });
    } finally {
      setTimeout(() => {
        setFormState({
          status: 'hidden',
          message: '',
          subMessage: '',
          loading: false,
        });
      }, 5000);
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
      <fieldset className="flex flex-col max-sm:mx-2">
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
        disabled={formState.loading}
      >
        {formState.loading ? (
          <ImSpinner2 className="animate-spin text-zinc-50" size={25} />
        ) : (
          'Enviar'
        )}
      </button>
      <AnimatePresence>
        {formState.status !== 'hidden' && (
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <FormSubmitMessageModal form={formState} />
        )}
      </AnimatePresence>
    </form>
  );
};

const FormSubmitMessageModal: React.FC<{ form: IFormState }> = ({
  form: { message, status, subMessage },
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-1/2 flex h-20 flex-col items-center justify-center self-center rounded-md bg-zinc-800 p-3 shadow-md shadow-zinc-700"
    >
      <span
        className={`font-sans text-xl ${
          status === 'error' ? 'text-red-500' : 'text-green-500'
        }`}
      >
        {message}
      </span>
      <span
        className={`font-sans text-base ${
          status === 'error' ? 'text-red-400' : 'text-green-400'
        }`}
      >
        {subMessage}
      </span>
    </motion.div>
  );
};
