import type { Metadata } from 'next';

import { Nav, Background } from '@/components';
import { Provider } from '@/providers';

import Container from '@mui/material/Container';

export const metadata: Metadata = {
  title: 'Business ideas sharing app',
  description: 'An app to share your business ideas built with with Next.js 13, MUI and Storybook',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Background />
          <Nav />
          <Container sx={{ zIndex: 10, position: 'relative' }} maxWidth="lg">
            {children}
          </Container>
        </Provider>
      </body>
    </html>
  );
}
