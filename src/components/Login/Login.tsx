"use client"

import Link from 'next/link';
import React from 'react'
import Button from '../Button';
import Input from '../Input';
import { useAuthStore } from '@/store/AuthStore';
import Loader from '../Loader';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { EmailPattern } from '@/paterns/pattern';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, loginSchemaType } from '@/types/schema';

// type LoginType = {
//     email: string;
//     password: string;
// }

const Login = () => {
    const { login, isLoading } = useAuthStore();
    const { control, formState: { errors }, handleSubmit } = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            variant: 'login',
            email: '',
            password: ''
          },
    });
    const router = useRouter();

    const handleLogin: SubmitHandler<loginSchemaType> = async (data) => {
        try {
            await login(data.email, data.password);
            router.push("/")
        } catch (e) {
            toast.error(e instanceof Error  ? e.message : String(e))
        }
    }

    return (
        <form className='bg-white/40 rounded-3xl px-[60px] py-12' onSubmit={handleSubmit(handleLogin)}>
            <h1 className='text-5xl font-bold mb-6 text-[#F25019]'>Welcome Back</h1>
            <label className="block mb-2" htmlFor="email">Email</label>
            <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: EmailPattern,
                        message: "Invalid email format",
                    },
                }}
                render={({ field }) => (
                    <Input
                        className="w-[335px] input "
                        type="email"
                        placeholder='Email Address'
                        {...field}
                    />
                )}
            />

            {errors.email && (
                <p className='text-[#F25019] font-extrabold text-base mb-2'>{errors.email.message}</p>
            )}

            <label className="block mb-2" htmlFor="password">Password</label>
            <Controller
                name='password'
                control={control}
                defaultValue=''
                rules={{
                    required: "Password is required",
                }}
                render={({ field }) => (
                    <Input
                        className="w-[335px] input "
                        type="password"
                        placeholder='Password'
                        {...field}
                    />
                )}
            />
            {errors.password && (
                <p className='text-[#F25019] font-extrabold text-base mb-2'>{errors.password.message}</p>
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
