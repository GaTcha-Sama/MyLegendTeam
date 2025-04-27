import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export const Navbar = () => {
  return (
    <div className="bg-black py-4">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
                <div className="text-gray-600">
                    <Link href="/">
                        <Image src="/favicon.ico" alt="My Legend Team" width={100} height={100} />
                    </Link>
                </div>
                <h1 className="text-2xl font-bold text-gold-800">My Legend Team</h1>
                <div className="flex space-x-4">
                    <Link href="/" className="text-gray-600 hover:text-gold-800">Home</Link>
                    <Link href="/login" className="text-gray-600 hover:text-gold-800">Login</Link>
                    <Link href="/register" className="text-gray-600 hover:text-gold-800">Register</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

