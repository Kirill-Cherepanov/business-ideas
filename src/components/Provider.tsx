'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

type ProviderProps = {
  children: React.ReactNode;
  session?: Session;
};

export function Provider({ children, session }: ProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
