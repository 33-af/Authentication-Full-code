"use client"
import React from 'react'

interface ITitle {
  title: string;
  className: string;
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  type: "submit" | "reset" | "button" | undefined;
  children?: React.ReactNode; 
}

const Button = ({ title, className, type, onClick, disabled, children }: ITitle) => {
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {children || title} 
    </button>
  )
}

export default Button
