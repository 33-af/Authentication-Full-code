"use client"
import React from 'react'

interface ITitle {
  title: string;
  className: string;
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
}

const Button = ({ title, className, onClick, disabled }: ITitle) => {
  return (
    <button className={className} type='submit' onClick={onClick} disabled={disabled}>
      {title}
    </button>
  )
}

export default Button
