import Link from 'next/link';
import { ArrowRight, ShieldCheck, Bell, Wallet, CreditCard, BadgeDollarSign } from 'lucide-react';
import { Logo } from '@/components/logo';

const features = [
  ['Online Banking', 'Manage accounts with real-time balances.', Wallet],
  ['Cards', 'Control debit and credit cards instantly.', CreditCard],
  ['Smart Transfers', 'Move funds securely between accounts.', BadgeDollarSign],
  ['Alerts', 'Get proactive account and security notifications.', Bell],
  ['Security', 'Account protection settings in one place.', ShieldCheck]
];

export default function Home() {
  return (
    <div>
      <header className="mx-auto flex max-w-6xl items-center justify-between p-6"><Logo /><Link className="btn bg-brand-500 text-white" href="/login">Sign in</Link></header>
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h1 className="text-4xl font-semibold md:text-6xl">Banking that moves at your pace.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300">Experience a modern interface for accounts, cards, transfers, and financial insights.</p>
        <div className="mt-8 flex justify-center gap-3"><Link href="/login" className="btn bg-brand-500 text-white">Open your dashboard</Link><Link href="/dashboard" className="btn border">Preview account area <ArrowRight size={16} /></Link></div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 md:grid-cols-3">{features.map(([title, desc, Icon]) => <div key={title} className="card"><Icon className="text-brand-500" /><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{desc}</p></div>)}</section>
      <footer className="border-t border-slate-200 p-6 text-center text-xs text-slate-500 dark:border-slate-800">© Northstar Bank • Privacy • Security • Accessibility • Fictional portfolio interface</footer>
    </div>
  );
}
