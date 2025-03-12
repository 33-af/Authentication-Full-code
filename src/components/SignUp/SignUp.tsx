"use client"

import React, { useState } from 'react'
import Button from '../Button'
import Link from 'next/link'
import Input from '../Input'
import { useAuthStore } from '@/store/AuthStore'
import { useRouter } from 'next/navigation'
import Loader from '../Loader'

const SignUp = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { signUp, isLoading } = useAuthStore();
    const [errors, setErrors] = useState<{ email: string; password: string; name: string }>({
        email: "",
        password: "",
        name: "",
    });

    const router = useRouter();

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newError: { email: string; password: string; name: string } = {
            email: '',
            password: '',
            name: "",
        };

        if (!name.trim()) {
            newError.name = "Name is required";
        }
        if (!email.trim()) {
            newError.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = "Invalid email format";
        }

        if (!password.trim()) {
            newError.password = "Password is required";
        }

        setErrors(newError);

        try {
            await signUp(name, email, password);
            router.push("/verify-email");
        } catch (e: unknown) {
            console.log(e);
        }
    }

    return (
        <form className='bg-white/40 px-[60px] py-12 rounded-3xl' onSubmit={handleSignUp}>
            <h1 className='text-5xl font-bold mb-6 text-[#F25019]'>Create Account</h1>
            <label className="block mb-2" htmlFor="name">Full Name</label>
            <Input
                className="block rounded-[4px] bg-white mb-4 w-[335px] px-4 py-3"
                type="text"
                id="name"
                name='name'
                placeholder='Full Name'
                value={name}
                onChange={onChangeName}
            />
            {errors && (
                <p className='text-red-700 font-extrabold text-base mb-2'>{errors.name}</p>
            )}

            <label className="block mb-2" htmlFor="email">Email</label>
            <Input
                className="block rounded-[4px] bg-white mb-4 w-[335px] px-4 py-3"
                type="email"
                id="email"
                placeholder='Email Address'
                value={email}
                onChange={onChangeEmail}
            />
            {errors && (
                <p className='text-red-700 font-extrabold text-base mb-2'>{errors.email}</p>
            )}

            <label className="block mb-2" htmlFor="password">Password</label>
            <Input
                className="block rounded-[4px] bg-white mb-4 w-[335px] px-4 py-3"
                type="password"
                id="password"
                placeholder='Password'
                value={password}
                onChange={onChangePassword}
            />
            {errors && (
                <p className='text-yellow-700 font-extrabold text-base mb-4 '>{errors.password}</p>
            )}

            <Button title='Sign Up' className='button w-full py-4 mb-4 ' type="submit" disabled={isLoading} >{isLoading ? <Loader /> : "Sign Up"}</Button>
            <p className='text-center'>Already have an account? <Link href={'/login'} className='text-[#AE4700] hover:underline text-base ml-1'>  Login</Link></p>
        </form>
    )
}

export default SignUp
