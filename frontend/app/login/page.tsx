"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../lib/api';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { token, user } = await loginUser(email, password);
      localStorage.setItem('token', token);
      if (user?.username) localStorage.setItem('username', user.username);
      router.push('/');
    } catch (e: unknown) {
      const error = e as { response?: { data?: { error?: string } } };
      setErr(error?.response?.data?.error || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url("/images/bg-login-register.webp")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full max-w-sm">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl mb-4 font-bold text-black flex justify-center font-[family-name:var(--font-title)]">Login</h1>
          {err && <div className="mb-3 text-red-600">{err}</div>}
          <label className="block mb-2">
            <span className="text-sm text-black font-[family-name:var(--font-title)]">Email address</span>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                   className="w-full border p-2 rounded text-black" />
          </label>
          <label className="block mb-4">
            <span className="text-sm text-black font-[family-name:var(--font-title)]">Password</span>
            <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}
                   className="w-full border p-2 rounded text-black" />
          </label>
          <button disabled={loading} className="w-full bg-black text-white py-2 rounded cursor-pointer disabled:opacity-60 font-[family-name:var(--font-title)]">
            {loading ? 'Connexion...' : 'Let\'s go !'}
          </button>
          <p className="text-sm text-black mt-4 flex justify-center font-[family-name:var(--font-title)]">Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:text-blue-700 ml-2">Register here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;