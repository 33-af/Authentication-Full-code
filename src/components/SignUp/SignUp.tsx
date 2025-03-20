"use client"

import React from 'react'
import Button from '../Button'
import Link from 'next/link'
import Input from '../Input'
import { useAuthStore } from '@/store/AuthStore'
import { useRouter } from 'next/navigation'
import Loader from '../Loader'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, SignUpSchemaType } from '@/types/schema'
import { toast } from 'react-toastify'


const SignUp = () => {
    const { signUp, isLoading } = useAuthStore();
    const { control, formState: { errors }, handleSubmit } = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            variant: 'signUp',
            name: '',
            email: '',
            password: '',
            createdAt: new Date(),
            isVerified: false,
        },

    });
    const router = useRouter();

    const handleSignUp: SubmitHandler<SignUpSchemaType> = async (data) => {
        try {
            await signUp(data.email, data.password, data.name );
            router.push("/login");
            console.log("User state in SignUp component:", useAuthStore.getState().user)
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : String(e))
        }
    }

    return (
        <form className='bg-white/40 px-[60px] py-12 rounded-3xl' onSubmit={handleSubmit(handleSignUp)}>
            <h1 className='text-5xl font-bold mb-6 text-[#F25019]'>Create Account</h1>
            <label className="block mb-2" htmlFor="name">Full Name</label>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        className="w-[335px] input"
                        type="text"
                        placeholder="Full Name"
                        {...field}
                    />
                )}
            />
            {errors.name && (
                <p className="text-[#F25019] font-extrabold text-base mb-2">{errors.name.message}</p>
            )}

            <label className="block mb-2" htmlFor="email">Email</label>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        className="w-[335px] input"
                        type="email"
                        placeholder="Email Address"
                        {...field}
                    />
                )}
            />
            {errors.email && (
                <p className="text-[#F25019] font-extrabold text-base mb-2">{errors.email.message}</p>
            )}

            <label className="block mb-2" htmlFor="password">Password</label>
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        className="w-[335px] input"
                        type="password"
                        placeholder="Password"
                        {...field}
                    />
                )}
            />

            {errors.password && (
                <p className="text-[#F25019] font-extrabold text-base mb-4">{errors.password.message}</p>
            )}

            <Button title='Sign Up' className='button w-[335px] py-4 mb-4 h-[53px] ' type="submit" disabled={isLoading} >{isLoading ? <Loader className='w-6 h-6' /> : "Sign Up"}</Button>
            <p className='text-center'>Already have an account? <Link href={'/login'} className='text-[#AE4700] hover:underline text-base ml-1'>  Login</Link></p>
        </form>
    )
}

export default SignUp
