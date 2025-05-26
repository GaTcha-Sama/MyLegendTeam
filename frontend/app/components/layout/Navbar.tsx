import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export const Navbar = () => {
  return (
    <div className="bg-[#191713] py-4">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
                <div>
                    <Link href="/">
                        <Image src="/favicon.ico" alt="My Legend Team" width={100} height={100} />
                    </Link>
                </div>
                <h1 className="text-5xl font-bold text-yellow-500">My Legend Team</h1>
                <div className="flex space-x-4">
                    <Link href="/" className="text-yellow-500 hover:text-gray-500">Home</Link>
                    <Link href="/login" className="text-yellow-500 hover:text-gray-500">Login</Link>
                    <Link href="/register" className="text-yellow-500 hover:text-gray-500">Register</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

