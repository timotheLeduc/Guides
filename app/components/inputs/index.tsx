import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<any>;
  required?: boolean;
  errors: FieldErrors;
  multiline?: boolean;
  placeholder?: string; // Add the placeholder prop
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  errors,
  multiline,
  placeholder // Destructure the placeholder prop
}) => {
  return (
    <div className="w-full relative">
      <label className={`text-lg font-semibold ${errors[id] ? "text-rose-500" : "text-black-500"}`}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          disabled={disabled}
          {...register(id, { required, maxLength: 1000 })}
          className={`peer w-full p-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
            ${errors[id] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-neutral-700"}`}
          placeholder={placeholder}
          rows={5} // Adjust the number of rows as needed
        />
      ) : (
        <input
          id={id}
          type={type}
          disabled={disabled}
          {...register(id, { required })}
          className={`peer w-full p-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
            ${errors[id] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-neutral-700"}`}
          placeholder={placeholder}
        />
      )}
      {errors[id] && <p className="text-rose-500 text-sm mt-1">This field is required</p>}
      {multiline && (
        <p className="text-sm text-neutral-500 mt-2">
          {`Maximum 1000 characters. ${errors[id]?.message || ''}`}
        </p>
      )}
    </div>
  );
};

export default Input;
