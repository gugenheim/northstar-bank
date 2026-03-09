'use client';
import { useMemo, useState } from 'react';
import { useBank } from '@/lib/bank-context';

export default function TransactionsPage(){
  const { state } = useBank();
  const [q,setQ]=useState(''); const [type,setType]=useState('all'); const [sort,setSort]=useState('newest'); const [page,setPage]=useState(1);
  const data = useMemo(()=>{
    let d = state.transactions.filter(t=>t.merchant.toLowerCase().includes(q.toLowerCase()));
    if(type!=='all') d=d.filter(t=>t.status===type);
    d=d.sort((a,b)=> sort==='highest'? b.amount-a.amount : sort==='oldest'? +new Date(a.date)-+new Date(b.date) : +new Date(b.date)-+new Date(a.date));
    return d;
  },[state.transactions,q,type,sort]);
  const rows=data.slice((page-1)*12,page*12);
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">Transactions</h1><div className="card"><div className="grid gap-2 md:grid-cols-4"><input className="input" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} /><select className="input" value={type} onChange={e=>setType(e.target.value)}><option value='all'>All statuses</option><option value='pending'>Pending</option><option value='posted'>Posted</option></select><select className="input" value={sort} onChange={e=>setSort(e.target.value)}><option value='newest'>Newest</option><option value='oldest'>Oldest</option><option value='highest'>Highest amount</option></select><button className="btn border">Export CSV</button></div>
  <table className="mt-4 w-full text-sm"><thead><tr className="text-left"><th>Merchant</th><th>Category</th><th>Status</th><th>Date</th><th className='text-right'>Amount</th></tr></thead><tbody>{rows.map(t=><tr key={t.id} className="border-t"><td>{t.merchant}</td><td>{t.category}</td><td><span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{t.status}</span></td><td>{new Date(t.date).toLocaleDateString()}</td><td className={`text-right ${t.type==='credit'?'text-green-600':''}`}>{t.type==='debit'?'-':'+'}${t.amount}</td></tr>)}</tbody></table>
  <div className="mt-3 flex gap-2"><button className="btn border" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Prev</button><button className="btn border" onClick={()=>setPage(p=>p+1)} disabled={page*12>=data.length}>Next</button></div></div></div>
}
