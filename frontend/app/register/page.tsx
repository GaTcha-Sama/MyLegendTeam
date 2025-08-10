"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../lib/api';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const { token, user } = await registerUser(email, password, username);
      localStorage.setItem('token', token);
      if (user?.username) localStorage.setItem('username', user.username);
      router.push('/');
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl mb-4 font-bold text-black">Inscription</h1>
        {err && <div className="mb-3 text-red-600">{err}</div>}
        <label className="block mb-2">
          <span className="text-sm text-black">Email</span>
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                 className="w-full border p-2 rounded text-black" />
        </label>
        <label className="block mb-2">
          <span className="text-sm text-black">Username</span>
          <input type="text" required value={username} onChange={e=>setUsername(e.target.value)}
                 className="w-full border p-2 rounded text-black" />
        </label>
        <label className="block mb-4">
          <span className="text-sm text-black">Mot de passe</span>
          <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}
                 className="w-full border p-2 rounded text-black" />
        </label>
        <button disabled={loading} className="w-full bg-black text-white py-2 rounded cursor-pointer disabled:opacity-60">
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default Register;