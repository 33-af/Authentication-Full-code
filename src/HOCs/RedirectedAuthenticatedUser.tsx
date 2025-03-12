"use client"

import { useAuthStore } from '@/store/AuthStore'
import { useRouter } from 'next/navigation';
import React, {useEffect } from 'react'

interface IRedirectedAuthenticatedUser {
    children: React.ReactNode
}

const RedirectedAuthenticatedUser = ({ children }: IRedirectedAuthenticatedUser) => {
    const { isAuthenticated, user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && user){
            router.replace("/");
        }
    }, [isAuthenticated, router,user])
    return (
        <>
            {children}
        </>
    )
}

export default RedirectedAuthenticatedUser
