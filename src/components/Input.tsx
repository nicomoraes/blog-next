import { forwardRef, HTMLAttributes, LegacyRef } from 'react';

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
  isTextArea?: boolean;
  label: string;
  name: string;
  required?: boolean;
  type?: 'email' | 'text';
}

type InputType<T extends HTMLInputElement | HTMLTextAreaElement> =
  T extends HTMLTextAreaElement ? HTMLTextAreaElement : HTMLTextAreaElement;

const Input = forwardRef<
  InputType<HTMLInputElement | HTMLTextAreaElement>,
  IInputProps
>(
  (
    {
      isTextArea = false,
      label,
      name,
      required = false,
      type = 'text',
      ...rest
    },
    ref
  ) => {
    return isTextArea ? (
      <>
        <label htmlFor={name}>{label}</label>
        <textarea
          className="form-textarea my-2 rounded focus:border-zinc-900 focus:ring-zinc-900"
          name={name}
          required={required}
          ref={ref as LegacyRef<HTMLTextAreaElement>}
          {...(rest as HTMLAttributes<HTMLTextAreaElement>)}
        />
      </>
    ) : (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          autoComplete="none"
          className="form-input my-2 rounded focus:border-zinc-900 focus:ring-zinc-900"
          name={name}
          required={required}
          ref={ref as LegacyRef<HTMLInputElement>}
          type={type}
          {...rest}
        />
      </>
    );
  }
);

export default Input;
