import React, { FunctionComponent } from 'react';

interface InputProps {
  type: string;
  value: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  textArea?: boolean;
  rows?:  number;
  maxLength?: number;
  id: string;
  required?: boolean;
  title?: string;
}

const Input: FunctionComponent<InputProps> = ({
  type, value, placeholder, onChange, className,
  textArea, rows, maxLength, id, required, title
}) => {
  if (textArea === true) return (
    <div>
      {title && (
        <label htmlFor={id} className='block mb-2 text-sm font-medium text-white
        text-opacity-80'>
          {title}
        </label>
      )}
      <textarea
        id={id}
        className={`border text-sm rounded-lg block w-full p-2.5 bg-black-700
        border-black-200/10 placeholder-black-400 text-white outline-none
      focus:ring-secondary-500 focus:border-secondary-500 disabled:opacity-50
      ${className}`}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange} />
    </div>
  );

  return (
    <div>
      {title && (
        <label htmlFor={id} className='block mb-2 text-sm font-medium text-black-900'>
          {title}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`border text-sm rounded-lg block w-full p-2.5 ${className}
        bg-black-100 border-black-200 placeholder-black-400 text-black-900
        focus:ring-secondary-500 outline-none focus:border-secondary-500
        disabled:opacity-50 border-2`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}/>
    </div>
  );
};

export default Input;
