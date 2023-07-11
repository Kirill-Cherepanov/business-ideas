import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Task management app',
  description: 'Task management app with Next.js 13, MUI and Storybook',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
