'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const WelcomeMsg = (props: Props) => {
    const {user, isLoaded} = useUser()
  return (
    <div className='space-y-2 mb-4 p-8 bg-gradient-to-tr dark:from-[#1d976c] dark:to-[#93f9b9] from-[#666600] to-[#999966] h-52 flex justify-center flex-col items-center'>
        <h2 className='text-2xl lg:text-4xl text-white font-medium'>
            Welcome Back! {user?.firstName} 
        </h2>
        <p className='text-sm lg:text-base text-secondary/70'>
            This is your Financial Dashboard Report
        </p>
    </div>
  )
}

export default WelcomeMsg