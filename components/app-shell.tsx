'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LayoutDashboard, Landmark, ArrowRightLeft, CreditCard, FileText, Shield, Settings, ReceiptText, LogOut } from 'lucide-react';
import { useSession } from '@/lib/bank-context';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

const nav = [
  ['Dashboard', '/dashboard', LayoutDashboard], ['Accounts', '/accounts', Landmark], ['Transactions', '/transactions', ReceiptText], ['Transfer', '/transfer', ArrowRightLeft],
  ['Cards', '/cards', CreditCard], ['Statements', '/statements', FileText], ['Settings', '/settings', Settings], ['Security', '/security', Shield]
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { authed, logout } = useSession();
  useEffect(() => { if (!authed) router.push('/login'); }, [authed, router]);
  return (
    <div className="min-h-screen md:grid md:grid-cols-[250px_1fr]">
      <aside className="border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Logo />
        <nav className="mt-6 space-y-1">
          {nav.map(([label, href, Icon]) => (
            <Link key={href} href={href} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${pathname === href ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}><Icon size={16} />{label}</Link>
          ))}
        </nav>
      </aside>
      <main>
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm text-slate-500">Secure online banking portal</div>
          <div className="flex items-center gap-2"><ThemeToggle /><button className="btn border" onClick={() => { logout(); router.push('/login'); }}><LogOut size={16} />Logout</button></div>
        </header>
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
