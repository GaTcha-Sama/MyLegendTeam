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
                <span className="text-yellow-500 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
                  Welcome {username}</span>
                <button onClick={handleLogout} className="bg-yellow-500 gap-2 text-black hover:bg-yellow-700 rounded-md px-2 py-1 cursor-pointer flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                    </svg>
                      Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-yellow-500 gap-2 hover:bg-yellow-700 rounded-md px-2 py-1 cursor-pointer flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                    Login
                </Link>
                <Link href="/register" className="text-yellow-500 gap-2 hover:bg-yellow-700 rounded-md px-2 py-1 cursor-pointer flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                  </svg>
                    Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};