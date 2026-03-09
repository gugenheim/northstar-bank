'use client';
import { useState } from 'react';
import { useBank } from '@/lib/bank-context';

export default function TransferPage(){
  const { state,setState }=useBank();
  const [from,setFrom]=useState('acc-checking'); const [to,setTo]=useState('acc-savings'); const [amount,setAmount]=useState(''); const [memo,setMemo]=useState(''); const [date,setDate]=useState(''); const [msg,setMsg]=useState('');
  const submit=(e:React.FormEvent)=>{e.preventDefault(); setMsg(''); const amt=Number(amount); const src=state.accounts.find(a=>a.id===from)!; if(amt<=0) return setMsg('Amount must be greater than zero.'); if(from===to) return setMsg('Choose different accounts.'); if(src.type==='checking' && amt>src.available) return setMsg('Insufficient available funds.');
    setState(s=>({
      ...s,
      accounts:s.accounts.map(a=>a.id===from?{...a,available:a.available-amt,current:a.current-amt}:a.id===to?{...a,available:a.available+amt,current:a.current+amt}:a),
      transactions:[{id:`txn-${Date.now()}`,accountId:from,merchant:'Internal Transfer Out',category:'Transfers',amount:amt,date:new Date().toISOString(),status:'posted',type:'debit',memo},{id:`txn-${Date.now()+1}`,accountId:to,merchant:'Internal Transfer In',category:'Transfers',amount:amt,date:new Date().toISOString(),status:'posted',type:'credit',memo},...s.transactions]
    }));
    setMsg(`Transfer of $${amt.toFixed(2)} scheduled ${date||'for today'} successfully.`); setAmount(''); setMemo('');
  };
  return <div className="card max-w-2xl"><h1 className="text-2xl font-semibold">Transfer money</h1><form className="mt-4 grid gap-3" onSubmit={submit}><select className='input' value={from} onChange={e=>setFrom(e.target.value)}>{state.accounts.filter(a=>a.type!=='credit').map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select><select className='input' value={to} onChange={e=>setTo(e.target.value)}>{state.accounts.filter(a=>a.type!=='credit').map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select><input className='input' value={amount} onChange={e=>setAmount(e.target.value)} type='number' step='0.01' placeholder='Amount' required/><input className='input' value={memo} onChange={e=>setMemo(e.target.value)} placeholder='Memo (optional)'/><input className='input' type='date' value={date} onChange={e=>setDate(e.target.value)}/><button className='btn bg-brand-500 text-white'>Submit transfer</button>{msg&&<p className='text-sm text-brand-700'>{msg}</p>}</form></div>
}
