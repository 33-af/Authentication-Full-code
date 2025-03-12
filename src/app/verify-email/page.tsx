import VerifyEmail from '@/components/VerifyEmail/VerifyEmail';
import RedirectedAuthenticatedUser from '@/HOCs/RedirectedAuthenticatedUser';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Verify Email | Next App",
  description: "Verify your email address to complete the registration process and gain access to your Next App account.",
};

const VerifyEmailPage = () => {
  return (
    <RedirectedAuthenticatedUser>
    <section className="loginBg h-[100vh]">
      <div className="container flex items-center justify-center">
        <div className="flex justify-center self-center items-center rounded-3xl px-[92px] py-[215px]">
        <div className='bg-[#ffffff4d] px-7 py-8 rounded-3xl w-[658px]'>
            <h1 className='text-center text-[#F25019] font-bold text-3xl mb-2'>Verify your Email</h1>
            <p className='text-base text-black text-center mb-5'>We have sent the verification code to your email address</p>
            <div className="flex-between">
            <VerifyEmail/>
            </div>
          </div>
        </div>
      </div>
    </section >
    </RedirectedAuthenticatedUser>
  )
}

export default VerifyEmailPage
