import { forwardRef, HTMLAttributes, LegacyRef } from 'react';

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  isTextArea?: boolean;
  label: string;
  name: string;
  type?: 'email' | 'text';
}

type InputType<T extends HTMLInputElement | HTMLTextAreaElement> =
  T extends HTMLTextAreaElement ? HTMLTextAreaElement : HTMLTextAreaElement;

const Input = forwardRef<
  InputType<HTMLInputElement | HTMLTextAreaElement>,
  IInputProps
>(({ isTextArea = false, label, name, type = 'text' }, ref) => {
  return isTextArea ? (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        className="form-textarea my-2 rounded focus:border-zinc-900 focus:ring-zinc-900"
        ref={ref as LegacyRef<HTMLTextAreaElement>}
      />
    </>
  ) : (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className="form-input my-2 rounded focus:border-zinc-900 focus:ring-zinc-900"
        ref={ref as LegacyRef<HTMLInputElement>}
        autoComplete="none"
      />
    </>
  );
});

export default Input;
