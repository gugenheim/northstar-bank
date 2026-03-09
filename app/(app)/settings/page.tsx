'use client';
import { useState } from 'react';
import { mockUser } from '@/lib/mock-data';
import { useBank } from '@/lib/bank-context';

export default function SettingsPage(){
  const {state,setState}=useBank();
  const [name,setName]=useState(mockUser.name); const [email,setEmail]=useState(mockUser.email); const [toast,setToast]=useState('');
  return <div className='card max-w-2xl space-y-3'><h1 className='text-2xl font-semibold'>Profile & settings</h1><input className='input' value={name} onChange={e=>setName(e.target.value)} /><input className='input' value={email} onChange={e=>setEmail(e.target.value)} /><label className='flex items-center gap-2'><input type='checkbox' checked={state.paperless} onChange={e=>setState(s=>({...s,paperless:e.target.checked}))}/>Paperless statements</label><select className='input'><option>English (US)</option></select><button className='btn bg-brand-500 text-white' onClick={()=>{setToast('Preferences saved successfully.'); setTimeout(()=>setToast(''),2000);}}>Save changes</button>{toast&&<p className='text-sm text-green-600'>{toast}</p>}</div>
}
