'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import { useBank } from '@/lib/bank-context';

export function SpendingChart() {
  const { state } = useBank();
  const grouped = state.transactions.filter(t => t.type === 'debit').reduce<Record<string, number>>((a, t) => ({ ...a, [t.category]: (a[t.category] || 0) + t.amount }), {});
  const data = Object.entries(grouped).slice(0, 6).map(([name, value]) => ({ name, value }));
  const colors = ['#3563e9', '#50a2ff', '#7f8cf6', '#00b8d9', '#65a30d', '#eab308'];
  return <div className="card h-72"><h3 className="mb-4 font-semibold">Spending by Category</h3><ResponsiveContainer width="100%" height="85%"><PieChart><Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>{data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>;
}

export function CashFlowChart() {
  const { state } = useBank();
  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(Date.now() - (6 - i) * 86400000).toDateString();
    const tx = state.transactions.filter(t => new Date(t.date).toDateString() === day);
    return { day: day.slice(0, 3), in: tx.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0), out: tx.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0) };
  });
  return <div className="card h-72"><h3 className="mb-4 font-semibold">Cash Flow</h3><ResponsiveContainer width="100%" height="85%"><BarChart data={last7}><XAxis dataKey="day" /><YAxis /><Tooltip /><Bar dataKey="in" fill="#65a30d" /><Bar dataKey="out" fill="#3563e9" /></BarChart></ResponsiveContainer></div>;
}
