import { Account, Card, Statement, Transaction, User } from '@/types/bank';

export const mockUser: User = {
  name: 'Olivia Parker',
  email: 'olivia.parker@northstarbank.app',
  username: 'oparker',
  location: 'Seattle, WA',
  customerSince: '2021'
};

export const credentials = {
  email: 'olivia.parker@northstarbank.app',
  username: 'oparker',
  password: 'HarborLane42!'
};

export const seedAccounts: Account[] = [
  { id: 'acc-checking', name: 'Everyday Checking', type: 'checking', available: 8420.13, current: 8557.32, maskedAccount: '•••• 4809', maskedRouting: '•••• 2190', holder: mockUser.name },
  { id: 'acc-savings', name: 'High Yield Savings', type: 'savings', available: 26750.42, current: 26750.42, maskedAccount: '•••• 7781', maskedRouting: '•••• 2190', apy: 4.1, holder: mockUser.name },
  { id: 'acc-credit', name: 'Northstar Signature Card', type: 'credit', available: 8950.12, current: 1049.88, maskedAccount: '•••• 5521', maskedRouting: '•••• 0000', holder: mockUser.name }
];

const merchants = [
  ['Blue Harbor Market', 'Groceries'], ['Emerald Transit', 'Transport'], ['Cloudline Mobile', 'Utilities'], ['Payflow Payroll', 'Income'], ['Aster Coffee Roasters', 'Dining'],
  ['Nimble Fitness', 'Health'], ['Silver Screen+', 'Subscriptions'], ['Harbor Fuel', 'Transport'], ['Starlight Utilities', 'Utilities'], ['Northtrail Books', 'Shopping'],
  ['Metro ATM', 'Cash'], ['Lumen Internet', 'Utilities'], ['Pacific Rent Co.', 'Housing'], ['Willow Pharmacy', 'Health'], ['Maple Bistro', 'Dining']
];

export const seedTransactions: Transaction[] = Array.from({ length: 45 }).map((_, i) => {
  const [merchant, category] = merchants[i % merchants.length];
  const isCredit = merchant === 'Payflow Payroll' || (i % 17 === 0);
  const amount = Number((isCredit ? 1200 + (i % 3) * 250 : 8 + (i % 8) * 17.35).toFixed(2));
  const accountId = i % 7 === 0 ? 'acc-savings' : i % 5 === 0 ? 'acc-credit' : 'acc-checking';
  return {
    id: `txn-${i + 1}`,
    accountId,
    merchant,
    category,
    amount,
    date: new Date(Date.now() - i * 86400000).toISOString(),
    status: i < 6 ? 'pending' : 'posted',
    type: isCredit ? 'credit' : 'debit',
    memo: i % 4 === 0 ? 'Monthly household activity' : undefined
  };
});

export const seedCards: Card[] = [
  { id: 'card-debit', nickname: 'Daily Debit', network: 'Debit', last4: '4809', status: 'active', linkedAccountId: 'acc-checking' },
  { id: 'card-credit', nickname: 'Travel Rewards', network: 'Credit', last4: '5521', status: 'active', linkedAccountId: 'acc-credit' }
];

export const seedStatements: Statement[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `st-${i + 1}`,
  accountId: i % 2 === 0 ? 'acc-checking' : 'acc-savings',
  month: new Date(2025, i % 12, 1).toLocaleString('en-US', { month: 'long' }),
  year: 2025 - Math.floor(i / 10)
}));
