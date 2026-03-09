'use client';
import { useState } from 'react';
import { useBank } from '@/lib/bank-context';

export default function SecurityPage(){
  const {state,setState}=useBank();
  const [pw,setPw]=useState(''); const [confirm,setConfirm]=useState(''); const [msg,setMsg]=useState('');
  return <div className='space-y-4'><div className='card'><h1 className='text-2xl font-semibold'>Security</h1><label className='mt-3 flex items-center gap-2'><input type='checkbox' checked={state.twoFactor} onChange={e=>setState(s=>({...s,twoFactor:e.target.checked}))}/>Two-factor authentication</label><label className='mt-2 flex items-center gap-2'><input type='checkbox' checked={state.alerts} onChange={e=>setState(s=>({...s,alerts:e.target.checked}))}/>Sign-in alerts</label></div><div className='card'><h3 className='font-semibold'>Change password</h3><input className='input mt-2' type='password' placeholder='New password' value={pw} onChange={e=>setPw(e.target.value)} /><input className='input mt-2' type='password' placeholder='Confirm password' value={confirm} onChange={e=>setConfirm(e.target.value)} /><button className='btn mt-2 border' onClick={()=>setMsg(pw.length>=8&&pw===confirm?'Password updated in mock state.':'Passwords must match and be at least 8 characters.')}>Update</button>{msg&&<p className='text-sm mt-2'>{msg}</p>}</div><div className='card'><h3 className='font-semibold'>Trusted devices</h3><p className='text-sm'>MacBook Pro • Seattle • Current session</p><p className='text-sm'>iPhone • Seattle • 2 days ago</p><h3 className='mt-3 font-semibold'>Security tips</h3><p className='text-sm text-slate-500'>Use a unique password and enable two-factor for stronger account protection.</p></div></div>
}
