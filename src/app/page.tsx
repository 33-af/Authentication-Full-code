import React from 'react'
import { Metadata } from 'next';
import DashBoard from '@/components/DashBoard/DashBoard';
import ProtectedRoute from '@/HOCs/protectedRoute';
import FlyingLeaves from '@/components/FlyingLeaves';

export const metadata: Metadata = {
  title: "Dashboard | Next App",
  description: "Access your personalized dashboard, manage your account settings, and view important data in your Next App.",
};

export default function Home() {
  return (
    <ProtectedRoute>
      <section className="loginBg h-full pt-24 pb-24 relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <FlyingLeaves />
        </div>
        <div className="container relative z-10">
          <div className="flex justify-center items-center bg-white/30 rounded-3xl px-[92px] py-[86px]">
            <DashBoard />
          </div>
        </div>
      </section >
    </ProtectedRoute>
  );
}
