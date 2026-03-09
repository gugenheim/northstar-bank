'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { credentials } from '@/lib/mock-data';
import { useSession } from '@/lib/bank-context';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useSession();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 700));
    const validId = identifier === credentials.email || identifier === credentials.username;
    if (!validId || password !== credentials.password) {
      setError('We could not verify those credentials. Please check and try again.');
      setLoading(false);
      return;
    }
    if (!remember) sessionStorage.setItem('short_session', '1');
    login();
    router.push('/dashboard');
  };

  return <div className="flex min-h-screen items-center justify-center p-4"><form onSubmit={submit} className="card w-full max-w-md space-y-4"><div className="mb-2 flex justify-center"><Logo /></div><h1 className="text-center text-2xl font-semibold">Sign in to your account</h1><input className="input" placeholder="Email or username" value={identifier} onChange={e => setIdentifier(e.target.value)} required /><div className="relative"><input className="input pr-10" placeholder="Password" type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required /><button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-2.5">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></div><div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />Remember me</label><button type="button" className="text-brand-700">Forgot password?</button></div>{error && <p className="text-sm text-red-600">{error}</p>}<button className="btn w-full bg-brand-500 text-white" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button></form></div>;
}
