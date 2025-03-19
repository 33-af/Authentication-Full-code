"use client"
import React, { useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import Link from 'next/link';
import { useAuthStore } from '@/store/AuthStore';
import Loader from '../Loader';

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const { isLoading, forgotPassword } = useAuthStore();

    const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true)
    };

    return (
        <>
            {!isSubmitted ? (
                <form className='bg-white/40 px-[30px] py-12 rounded-3xl ' onSubmit={handleSubmit}>
                    <h1 className='text-5xl font-bold mb-6 text-[#F25019] text-center'>Forgot Password?</h1>
                    <p className="w-full text-center text-base text-black font-medium mb-5">
                        Enter your email address and we will send you a link to reset your password.
                    </p>

                    <Input
                        className="input w-[551px]"
                        type="email"
                        placeholder="Email Address"
                        id='email'
                        value={email}
                        name='email'
                        onChange={handleEmailOnChange}
                    />

                    <Button title='Send Reset Link' className='button w-full py-4 mb-10 ' type="submit" >
                        {isLoading ? (
                            <Loader className="" />
                        ) : (
                            "Send Reset Link"
                        )}
                    </Button>
                    <Link href="/login">
                        <p className="text-[#AE4700] hover:underline text-base text-center">
                            Back to login
                        </p>
                    </Link>
                </form>
            ) : (
                <div className="text-center">
                    <p className="text-gray-300 mb-6">
                        If an account exists for {email}, you will receive a password
                        reset link shortly.
                    </p>
                </div>
            )}
        </>
    );

}

export default ForgotPassword
