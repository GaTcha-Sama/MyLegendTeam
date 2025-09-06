"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getMe } from '@/lib/api';
import { useRouter, usePathname } from 'next/navigation';

export const Navbar = () => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    const stored = localStorage.getItem('username');

    if (token && stored) {
      setUsername(stored);
      return;
    }

    if (token && !stored) {
      getMe().then(u => {
        if (u?.username) {
          setUsername(u.username);
          localStorage.setItem('username', u.username);
        }
      }).catch(() => {
        setUsername(null);
      });
      return;
    }

    setUsername(null);
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
    setUsername(null);
    router.push('/login');
  };

  return (
    <div className="bg-[#191713] py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            {isAuthPage ? (
              <Image src="/favicon.ico" alt="My Legend Team" width={100} height={100} />
            ) : (
              <Link href="/" aria-label="Accueil">
                <Image src="/favicon.ico" alt="My Legend Team" width={100} height={100} />
              </Link>
            )}
          </div>
          <h1 className="text-5xl font-bold text-yellow-500">My Legend Team</h1>
          <div className="flex space-x-4 items-center">
            {username ? (
              <>
                <span className="text-yellow-500">Welcome {username}</span>
                <button onClick={handleLogout} className="text-yellow-500 hover:text-gray-500 cursor-pointer">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-yellow-500 hover:text-gray-500 cursor-pointer">Login</Link>
                <Link href="/register" className="text-yellow-500 hover:text-gray-500 cursor-pointer">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};