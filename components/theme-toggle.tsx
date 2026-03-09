'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { storageKeys } from '@/lib/storage';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem(storageKeys.theme);
    const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
    setDark(isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem(storageKeys.theme, next ? 'dark' : 'light');
  };
  return <button className="btn border border-slate-300 dark:border-slate-700" onClick={toggle}>{dark ? <Sun size={16} /> : <Moon size={16} />}</button>;
}
