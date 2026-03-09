'use client';
import { useBank } from '@/lib/bank-context';

export default function CardsPage(){
  const {state,setState}=useBank();
  return <div className="space-y-4"><h1 className="text-2xl font-semibold">Cards</h1><div className="grid gap-4 md:grid-cols-2">{state.cards.map(c=><div key={c.id} className="card bg-gradient-to-br from-slate-900 to-brand-700 text-white"><p className="text-sm opacity-90">{c.nickname}</p><p className="mt-6 text-2xl">•••• •••• •••• {c.last4}</p><p className="mt-2 text-xs">Status: {c.status}</p><div className="mt-4 flex gap-2"><button className="btn bg-white/20" onClick={()=>setState(s=>({...s,cards:s.cards.map(x=>x.id===c.id?{...x,status:x.status==='active'?'frozen':'active'}:x)}))}>{c.status==='active'?'Freeze':'Unfreeze'}</button><button className="btn bg-white/20">Replace card</button><button className="btn bg-white/20">Travel notice</button></div></div>)}</div>
  <div className="card"><h3 className='font-semibold'>Recent card activity</h3>{state.transactions.filter(t=>t.accountId==='acc-credit').slice(0,8).map(t=><div key={t.id} className='mt-2 flex justify-between text-sm'><span>{t.merchant}</span><span>${t.amount}</span></div>)}</div></div>
}
