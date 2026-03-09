export type AccountType = 'checking' | 'savings' | 'credit';
export type TxStatus = 'pending' | 'posted';

export interface User {
  name: string;
  email: string;
  username: string;
  location: string;
  customerSince: string;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  available: number;
  current: number;
  maskedAccount: string;
  maskedRouting: string;
  apy?: number;
  holder: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  status: TxStatus;
  type: 'debit' | 'credit';
  memo?: string;
}

export interface Card {
  id: string;
  nickname: string;
  network: string;
  last4: string;
  status: 'active' | 'frozen';
  linkedAccountId: string;
}

export interface Statement {
  id: string;
  accountId: string;
  month: string;
  year: number;
}
