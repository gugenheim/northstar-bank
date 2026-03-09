import Link from 'next/link';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-label="Northstar Bank logo">
        <rect x="1" y="1" width="38" height="38" rx="12" className="fill-brand-500" />
        <path d="M20 8l2.4 6.5H29l-5.3 4 2 6.5L20 21l-5.7 4 2-6.5-5.3-4h6.6L20 8z" className="fill-white" />
      </svg>
      {!compact && <span className="text-lg font-semibold tracking-tight">Northstar Bank</span>}
    </Link>
  );
}
