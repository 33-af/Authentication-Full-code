"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import Button from '../Button';
import Input from '../Input';

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <form className='bg-white/40 rounded-3xl px-[60px] py-12'>
            <h1 className='text-5xl font-bold mb-6 text-[#F25019]'>Welcome Back</h1>
            <label className="block mb-2" htmlFor="email">Email</label>
            <Input
                className="block rounded-[4px] bg-white mb-4 w-[335px] px-4 py-3"
                type="email"
                value={email}
                name='email'
                placeholder='Email Address'
                onChange={handleEmailOnChange}
                id='email'
            />

            <label className="block mb-2" htmlFor="password">Password</label>
            <Input
                className="block rounded-[4px] bg-white mb-4 w-[335px] px-4 py-3"
                type="password"
                value={password}
                name='password'
                placeholder='Password'
                onChange={handlePasswordOnChange}
                id='password'
            />

            <div className='text-[#AE4700] mb-4 text-end'>
                <Link href="/forgot-password">
                    <span className="text-[#AE4700] hover:underline text-base">Forgot Password?</span>
                </Link>
            </div>

            <Button title='Login' className='button w-full py-4 mb-4 '  />
            <p className="text-center">
                Don’t have an account?  
                  <Link href="/sign-up"  className="text-[#AE4700] hover:underline text-base ml-1">
                        Sign up
                  </Link>
            </p>

        </form>
    )
}

export default Login
