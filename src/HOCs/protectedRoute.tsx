"use client";

import Loader from '@/components/Loader';
import { useAuthStore } from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react';

interface IProtectedRoute {
  children: React.ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } 
   
  }, [isAuthenticated]);

  if (!isAuthenticated ) {
    return <div className='bg-[#FFD1B0] w-full h-screen  '><Loader className="w-[165px] h-[170px]  my-[300px]"/></div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
