"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import Button from '../Button';
import Input from '../Input';
import { useAuthStore } from '@/store/AuthStore';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, isLoading, message } = useAuthStore();
    const [errors, setErrors] = useState<{ newPassword: string; confirmNewPassword: string }>({
        newPassword: "",
        confirmNewPassword: ""
    });
    
    const { token } = useParams();
    const router = useRouter();


    const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const tokenString = Array.isArray(token) ? token[0] : token;

        if (!tokenString) {
            toast.error("Token is missing");
            return;
        }

        const newError: { newPassword: string; confirmNewPassword: string } = {
            newPassword: "",
            confirmNewPassword: ""
        };

        if (!password.trim()) {
            newError.newPassword = "Password is required";
        }

        setErrors(newError);

        try {
            await resetPassword(tokenString, password);
            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Error resetting password")
            } else {
                console.log("Error resetting password");
            }
        }
    };

    return (
        <form className='bg-white/40 px-[30px] py-12 rounded-3xl' onSubmit={handleSubmit}>
            <h1 className='text-5xl font-bold mb-4 text-[#F25019] text-center'>Reset Password</h1>
            {message && <p className='text-red-500'>{message}</p>}
            <p className='text-center text-base font-medium mb-6'>Create a new password and confirm it to reset your access.</p>
            <div className="flex flex-col">
                <Input
                    className="input w-[551px]"
                    type="password"
                    value={password}
                    name='password'
                    placeholder='New password'
                    onChange={handlePasswordOnChange}
                    id='email'
                />
                {errors && (
                    <p className='text-red-700 font-extrabold text-base mb-2'>{errors.newPassword}</p>
                )}

                <Input
                  className="input w-[551px]"
                    type="password"
                    value={confirmPassword}
                    name='password'
                    placeholder='Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id='password'
                />
                {errors && (
                    <p className='text-red-700 font-extrabold text-base mb-2'>{errors.confirmNewPassword}</p>
                )}
            </div>

            <Button title='Set New Password' className='button w-full py-4 mb-4' type="submit"  disabled={isLoading}>{isLoading ? "Resetting..." : "Set New Password"}</Button>
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
