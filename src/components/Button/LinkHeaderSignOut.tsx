'use client'

// icon
import { HiLogout } from "react-icons/hi";

// signOut next-auth
import { signOut } from 'next-auth/react'

// next components
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// react imports
import React from 'react'

export function LinkHeaderSignOut() {

    const router = useRouter()

    async function handleSignOut(){
        await signOut()
        router.push('/login')
    }

  return <Link onClick={() => handleSignOut()} className="hover:scale-110 duration-500 hover:text-red-500 transition-all" href={'/login'}><HiLogout size={25}/></Link>
}
