'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Account, Card, Transaction } from '@/types/bank';
import { seedAccounts, seedCards, seedTransactions, mockUser } from '@/lib/mock-data';
import { storageKeys } from '@/lib/storage';

type BankState = { accounts: Account[]; transactions: Transaction[]; cards: Card[]; twoFactor: boolean; alerts: boolean; paperless: boolean };

const initial: BankState = { accounts: seedAccounts, transactions: seedTransactions, cards: seedCards, twoFactor: true, alerts: true, paperless: true };

const Ctx = createContext<{ state: BankState; setState: React.Dispatch<React.SetStateAction<BankState>> } | null>(null);

export function BankProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BankState>(initial);
  useEffect(() => {
    const raw = localStorage.getItem(storageKeys.bankState);
    if (raw) setState(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem(storageKeys.bankState, JSON.stringify(state));
  }, [state]);
  const value = useMemo(() => ({ state, setState }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBank() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useBank must be within provider');
  return ctx;
}

export function useSession() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    setAuthed(localStorage.getItem(storageKeys.session) === '1');
  }, []);
  const login = () => {
    localStorage.setItem(storageKeys.session, '1');
    setAuthed(true);
  };
  const logout = () => {
    localStorage.removeItem(storageKeys.session);
    setAuthed(false);
  };
  return { authed, login, logout, user: mockUser };
}
