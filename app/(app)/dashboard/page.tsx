'use client';

import Link from 'next/link';
import { useBank } from '@/lib/bank-context';
import { mockUser } from '@/lib/mock-data';
import { CashFlowChart, SpendingChart } from '@/components/charts';

export default function DashboardPage() {
  const { state } = useBank();
  const recent = state.transactions.slice(0, 6);
  return <div className="space-y-5"><h1 className="text-2xl font-semibold">Welcome back, {mockUser.name.split(' ')[0]}</h1>
    <div className="grid gap-4 md:grid-cols-3">{state.accounts.map(a => <div key={a.id} className="card"><p className="text-sm text-slate-500">{a.name}</p><p className="mt-2 text-2xl font-semibold">${a.current.toLocaleString()}</p></div>)}</div>
    <div className="grid gap-4 lg:grid-cols-2"><SpendingChart /><CashFlowChart /></div>
    <div className="grid gap-4 lg:grid-cols-2"><div className="card"><h3 className="font-semibold">Recent transactions</h3><ul className="mt-3 space-y-2">{recent.map(t => <li key={t.id} className="flex justify-between text-sm"><span>{t.merchant}</span><span className={t.type === 'credit' ? 'text-green-600' : ''}>{t.type === 'debit' ? '-' : '+'}${t.amount}</span></li>)}</ul></div>
    <div className="card"><h3 className="font-semibold">Quick actions</h3><div className="mt-3 grid grid-cols-2 gap-2">{[['Transfer money','/transfer'],['View statements','/statements'],['Lock card','/cards'],['View transactions','/transactions']].map(([l,h]) => <Link key={h} href={h} className="btn border">{l}</Link>)}</div><h4 className="mt-4 font-medium">Upcoming payments</h4><p className="text-sm text-slate-500">Electric utility - $124.10 due in 3 days</p><h4 className="mt-3 font-medium">Alert center</h4><p className="text-sm text-slate-500">1 pending transfer requires review.</p></div></div></div>;
}
