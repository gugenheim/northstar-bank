'use client';

import { useMemo, useState } from 'react';
import { useBank } from '@/lib/bank-context';

export default function AccountsPage() {
  const { state } = useBank();
  const [active, setActive] = useState('acc-checking');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const account = state.accounts.find(a => a.id === active)!;
  const txns = useMemo(() => state.transactions.filter(t => t.accountId === active && t.merchant.toLowerCase().includes(query.toLowerCase())), [state.transactions, active, query]);
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">Accounts</h1>
    <div className="grid gap-3 md:grid-cols-3">{state.accounts.filter(a=>a.type!=='credit').map(a => <button key={a.id} onClick={() => setActive(a.id)} className={`card text-left ${a.id===active?'ring-2 ring-brand-500':''}`}><p className="text-sm">{a.name}</p><p className="text-xl font-semibold">${a.current.toLocaleString()}</p></button>)}</div>
    <div className="card"><div className="flex items-center justify-between"><div><h3 className="font-semibold">{account.name}</h3><p className="text-sm text-slate-500">Available ${account.available.toLocaleString()} • Current ${account.current.toLocaleString()}</p></div><button className="btn border" onClick={()=>setOpen(true)}>View account details</button></div>
      <div className="mt-3 flex gap-2 text-sm"><button className="btn border" onClick={()=>navigator.clipboard.writeText(account.maskedAccount)}>Copy account</button><button className="btn border" onClick={()=>navigator.clipboard.writeText(account.maskedRouting)}>Copy routing</button><button className="btn border">Download statement</button></div>
      <input className="input mt-4" placeholder="Search transactions" value={query} onChange={e=>setQuery(e.target.value)} />
      <h4 className="mt-4 font-medium">Pending</h4>{txns.filter(t=>t.status==='pending').map(t=><div key={t.id} className="mt-2 flex justify-between text-sm"><span>{t.merchant} • {t.category}</span><span>-${t.amount}</span></div>)}
      <h4 className="mt-4 font-medium">Posted</h4>{txns.filter(t=>t.status==='posted').slice(0,10).map(t=><div key={t.id} className="mt-2 flex justify-between text-sm"><span>{t.merchant} • {t.category}</span><span className={t.type==='credit'?'text-green-600':''}>{t.type==='debit'?'-':'+'}${t.amount}</span></div>)}
    </div>
    {open && <div className="fixed inset-0 grid place-items-center bg-black/50 p-4"><div className="card max-w-md"><h3 className="font-semibold">Account details</h3><p className="text-sm">Holder: {account.holder}</p><p className="text-sm">Type: {account.type}</p><p className="text-sm">Account: {account.maskedAccount}</p><p className="text-sm">Routing: {account.maskedRouting}</p>{account.apy && <p className="text-sm">APY: {account.apy}%</p>}<button className="btn mt-3 border" onClick={()=>setOpen(false)}>Close</button></div></div>}
  </div>;
}
