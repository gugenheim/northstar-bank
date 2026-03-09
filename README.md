# Northstar Bank

Northstar Bank is a **fictional mock banking interface** built for portfolio, development, and testing use only. It is not a real financial institution, does not process real money, and uses seeded fake data stored locally.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- Local mock state + localStorage persistence

## Getting started
```bash
npm install
npm run dev
```
Then open `http://localhost:3000`.

## Mock login
Use either:
- Email: `olivia.parker@northstarbank.app`
- Username: `oparker`
- Password: `HarborLane42!`

Authentication is local-only and mock.

## Features
- Public landing and login pages
- Protected authenticated area (dashboard, accounts, transactions, transfers, cards, statements, profile/settings, security)
- Internal transfers that update balances and transaction history in local state
- Card freeze/unfreeze controls in local state
- Light/dark theme persistence

## Data & safety notice
All balances, transactions, accounts, cards, and statements are fictional seed data. No external banking APIs, payment rails, processors, or real customer data are used.

## Screenshots
_Add screenshots here after running locally._
