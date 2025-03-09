import React from 'react'
import { Metadata } from 'next';
import DashBoard from '@/components/DashBoard/DashBoard';

export const metadata: Metadata = {
  title: "Dashboard | Next App",
  description: "Access your personalized dashboard, manage your account settings, and view important data in your Next App.",
};

export default function DashboardPage() {
  return (
    <section className="loginBg h-full pt-24 pb-24">
      <div className="container">
        <div className="flex justify-center items-center bg-white/30 rounded-3xl px-[92px] py-[86px]">
          <DashBoard/>
        </div>
      </div>
    </section >
  );
}
