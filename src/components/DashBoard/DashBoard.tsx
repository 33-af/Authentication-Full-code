"use client"
import React from 'react'
import Button from '../Button'
import Image from 'next/image'
import { useAuthStore } from '@/store/AuthStore'
import { formatDate } from '@/utils/formatDate'

const DashBoard = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  }
  return (
    <div className='bg-white/40 px-[30px] py-7 rounded-3xl w-[455px]'>
      <h1 className='text-center text-[#F25019] font-bold text-3xl mb-7'>Dashboard</h1>

      <div className="flex items-start w-full justify-between mb-9">
        <div className="flex items-center">
          <Image src={'/profileIcon.png'} width={70} height={70} alt='profile image' />
          <div className="ml-4">
            <p className='text-base  left-6 font-medium'>{user?.name}</p>
            <p className='text-[#6B7280] leading-5 font-medium'>{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="border-style  mb-9">
        <div className="py-4 px-4 ">
          <h2 className='mb-[20px] font-bold text-[#F25019]  text-base leading-6'>Profile Information</h2>
          <div className="flex-between mb-5">
            <p className='text-base font-medium text-black'>Name:</p>
            <p className='text-[#4B5563] text-base'> {user?.name}</p>
          </div>
          <div className="flex-between">
            <p className='text-base font-medium text-black'>Email:</p>
            <p className='text-[#4B5563] text-base'>{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="border-style  mb-9">
        <div className="py-4 px-4">
          <h2 className='mb-[20px] font-bold text-[#F25019]  text-base leading-6'>Account Activity</h2>
          <div className="flex-between mb-5">
            <p className='text-base font-medium text-black'>Joined:</p>
            <p className='text-[#4B5563] text-base'>
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "No date available"}
            </p>
          </div>
          <div className="flex-between">
            <p className='text-base font-medium text-black'>Last login:</p>
            {user?.lastLogin ? formatDate(user.lastLogin) : "No last login available"}
          </div>
        </div>
      </div>

      <Button title='Logout' className='button w-[395px] py-4 font-bold  text-xl ' type="submit" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default DashBoard
