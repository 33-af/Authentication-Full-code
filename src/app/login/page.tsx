import Image from 'next/image'
import Login from '@/components/Login/Login';
import { Metadata } from 'next';
import RedirectedAuthenticatedUser from '@/HOCs/RedirectedAuthenticatedUser';

export const metadata: Metadata = {
  title: "Login Page | Next App",
  description: "Log in to your Next App account securely.",
};


export default function LoginPage() {
  return (
    <RedirectedAuthenticatedUser>
    <section className="loginBg h-full pt-24 pb-24">
      <div className="container">
        <div className="flex justify-between items-center bg-white/30 rounded-3xl px-[92px] py-[86px]">
          <Login />
          <Image src='/image.png' alt='image' width={674} height={593} />
        </div>
      </div>
    </section>
    </RedirectedAuthenticatedUser>
  );
}


