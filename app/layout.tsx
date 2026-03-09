import './globals.css';
import { Providers } from '@/components/providers';

export const metadata = {
  title: 'Northstar Bank',
  description: 'Fictional mock online banking interface.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
