"use client"

import React, { useState } from 'react'
import Button from '../Button'
import Link from 'next/link'
import Input from '../Input'

const SignUp = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <form className='bg-white/40 px-[30px] py-12 rounded-3xl'>
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

            <label className="block mb-2" htmlFor="email">Email</label>
            <Input
                className="block rounded-[4px] bg-white mb-4 w-[335px] px-4 py-3"
                type="email"
                id="email"
                placeholder='Email Address'
                value={email}
                onChange={onChangeEmail}
              
            />

            <label className="block mb-2" htmlFor="password">Password</label>
            <Input
                className="block rounded-[4px] bg-white mb-6 w-[335px] px-4 py-3"
                type="password"
                id="password"
                placeholder='Password'
                value={password}
                onChange={onChangePassword}
            />

            <Button title='Sign Up' className='button w-full py-4 mb-4 ' />
            <p className='text-center'>Already have an account? <Link href={'/login'} className='text-[#AE4700] hover:underline text-base ml-1'>  Login</Link></p>

        </form>
    )
}

export default SignUp
