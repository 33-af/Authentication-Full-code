"use client"
import React from 'react'

interface IInput {
  type: string;
  placeholder?: string;
  id?: string;
  value: string;
  name?: string;
  className: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  inputMode?: "text" | "numeric" | "tel" | "email" | "decimal";
  ref?: React.Ref<HTMLInputElement> | null
}

const Input = ({ type, placeholder, id, value, name, className, onChange, onKeyDown, maxLength, inputMode, ref }: IInput) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      id={id}
      value={value}
      name={name}
      className={className}
      onChange={onChange}
      onKeyDown={onKeyDown}
      maxLength={maxLength}
      inputMode={inputMode}  

    />
  );
};

export default Input;