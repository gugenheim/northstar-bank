'use client';
import { useState } from 'react';
import { seedStatements } from '@/lib/mock-data';

export default function StatementsPage(){
  const [year,setYear]=useState('2025');
  const rows = seedStatements.filter(s=>String(s.year)===year);
  const download=(name:string)=>{const blob=new Blob([`Mock statement for ${name}`],{type:'text/plain'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`${name}.txt`; a.click(); URL.revokeObjectURL(url);};
  return <div className='card'><h1 className='text-2xl font-semibold'>Statements</h1><select className='input mt-3 max-w-xs' value={year} onChange={e=>setYear(e.target.value)}><option>2025</option><option>2024</option></select>{rows.length===0?<p className='mt-4 text-sm text-slate-500'>No statements available for this period.</p>:<ul className='mt-4 space-y-2'>{rows.map(r=><li key={r.id} className='flex items-center justify-between rounded-xl border p-3'><span>{r.month} {r.year}</span><button className='btn border' onClick={()=>download(`${r.month}-${r.year}`)}>Download</button></li>)}</ul>}</div>
}
