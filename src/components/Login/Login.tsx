"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import Button from '../Button';
import Input from '../Input';
import { useAuthStore } from '@/store/AuthStore';
import Loader from '../Loader';

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ email: string; password: string; }>({
        email: "",
        password: "",
    });
    const { login, isLoading } = useAuthStore();

    const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newError: { email: string; password: string } = {
            email: '',
            password: ''
        };

        if (!email.trim()) {
            newError.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = "Invalid email format";
        }

        if (!password.trim()) {
            newError.password = "Password is required";
        }
        setErrors(newError);


        await login(email, password)
    }

    return (
        <form className='bg-white/40 rounded-3xl px-[60px] py-12' onSubmit={handleLogin}>
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
            {errors && (
                <p className='text-red-700 font-extrabold text-base mb-2'>{errors.email}</p>
            )}

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
            {errors && (
                <p className='text-red-700 font-extrabold text-base mb-2'>{errors.password}</p>
            )}

            <div className='text-[#AE4700] mb-4 '>
                <Link href="/forgot-password">

                    <span className="text-[#AE4700] hover:underline text-base">

                        Forgot Password?</span>
                </Link>
            </div>

            <Button title='Login' className='button w-full py-4 mb-4 text-base h-14 ' type="submit" disabled={isLoading}>{isLoading ? (<Loader className='w-[]' />) : ("Login")}</Button>
            <p className="text-center">
                Don’t have an account?
                <Link href="/sign-up" className="text-[#AE4700] hover:underline text-base ml-1">
                    Sign up
                </Link>
            </p>

        </form>
    )
}

export default Login
