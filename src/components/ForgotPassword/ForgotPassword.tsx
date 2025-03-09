"use client"
import React, { useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import Link from 'next/link';

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");

    const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    return (
        <form className='bg-white/40 px-[30px] py-12 rounded-3xl'>
            <h1 className='text-5xl font-bold mb-6 text-[#F25019] text-center'>Forgot Password?</h1>
            <p className="w-full text-center text-base text-black font-medium mb-5">
                Enter your email address and we will send you a link to reset your password.
            </p>

            <Input 
                className="block mb-4 w-[551px] rounded-[4px] bg-white px-4 py-3 border-2 border-gray-300 focus:border-[#F25019] focus:outline-none"
                type="email"
                placeholder="Email Address"
                id='email'
                value={email}
                name='email'
                onChange={handleEmailOnChange}
            />

            <Button title='Send Reset Link' className='button w-full py-4 mb-10' />
            <Link href="/login">
                <p className="text-[#AE4700] hover:underline text-base text-center">
                    Back to login
                </p>
            </Link>
        </form>
    )
}

export default ForgotPassword
