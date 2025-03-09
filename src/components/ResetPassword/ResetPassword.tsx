"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import Button from '../Button';
import Input from '../Input';

const ResetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <form className='bg-white/40 px-[30px] py-12 rounded-3xl'>
            <h1 className='text-5xl font-bold mb-4 text-[#F25019] text-center'>Reset Password</h1>
            <p className='text-center text-base font-medium mb-6'>Create a new password and confirm it to reset your access.</p>
            <div className="flex flex-col">
                <Input
                    className="reset-input mb-5"
                    type="email"
                    value={email}
                    name='email'
                    placeholder='Email Address'
                    onChange={handleEmailOnChange}
                    id='email'
                />


                <Input
                    className="reset-input mb-8"
                    type="password"
                    value={password}
                    name='password'
                    placeholder='Password'
                    onChange={handlePasswordOnChange}
                    id='password'
                />
            </div>


            <Button title='Set New Password' className='button w-full py-4 mb-4 ' />
            <p className="text-center">
                Don’t have an account?
                <Link href="/sign-up" className="text-[#AE4700] hover:underline text-base ml-1">
                    Sign up
                </Link>
            </p>

        </form>
    )
}

export default ResetPassword
