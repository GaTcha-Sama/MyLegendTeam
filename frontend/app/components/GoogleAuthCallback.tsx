"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GoogleAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const username = searchParams.get('username');
    const email = searchParams.get('email');

    if (token && username && email) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      
      router.push('/');
    } else {
      router.push('/login?error=google_auth_failed');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p className="text-lg font-[family-name:var(--font-title)]">Connecting...</p>
      </div>
    </div>
  );
}