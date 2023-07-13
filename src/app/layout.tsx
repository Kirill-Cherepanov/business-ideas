import type { Metadata } from 'next';

import { Nav } from '@/components';
import { Provider } from '@/providers';

export const metadata: Metadata = {
  title: 'Business ideas sharing app',
  description: 'An app to share your business ideas built with with Next.js 13, MUI and Storybook',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
