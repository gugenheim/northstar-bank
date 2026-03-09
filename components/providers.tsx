'use client';
import { BankProvider } from '@/lib/bank-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return <BankProvider>{children}</BankProvider>;
}
