import Image from 'next/image'
import SignUp from '@/components/SignUp/SignUp';
import { Metadata } from 'next';
import RedirectedAuthenticatedUser from '@/HOCs/RedirectedAuthenticatedUser';

export const metadata: Metadata = {
  title: "Sign Up | Next App",
  description: "Create a new account and join our community in Next App.",
};



export default function SignUpPage() {
  return (
    <RedirectedAuthenticatedUser>
    <section className="loginBg h-full pt-24 pb-24">
      <div className="container">
        <div className="flex justify-between items-center bg-white/30 rounded-3xl px-[92px] py-[86px]">
          <SignUp/>
          <Image src='/image.png' alt='image' width={674} height={593} />
        </div>
      </div>
    </section >
    </RedirectedAuthenticatedUser>
  );
}
