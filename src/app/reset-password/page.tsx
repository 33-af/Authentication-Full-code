import ResetPassword from '@/components/ResetPassword/ResetPassword';
import RedirectedAuthenticatedUser from '@/HOCs/RedirectedAuthenticatedUser';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Reset Password | Next App",
  description: "Reset your password to regain access to your Next App account.",
};

const ResetPasswordPage = () => {
  return (
    <RedirectedAuthenticatedUser>
      <section className="loginBg h-full pt-42 pb-42">
        <div className="container">
          <div className="flex justify-center items-center bg-white/30 rounded-3xl px-[92px] py-[86px]">
            <ResetPassword />
          </div>
        </div>
      </section >
    </RedirectedAuthenticatedUser>
  )
}

export default ResetPasswordPage
