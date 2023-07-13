'use client';

import React from 'react';
import { MUIProvider } from './MUIProvider';
import { AuthProvider } from './AuthProvider';

type ProviderProps = {
  children: React.ReactNode;
};

export function Provider({ children }: ProviderProps) {
  return (
    <AuthProvider>
      <MUIProvider>{children}</MUIProvider>
    </AuthProvider>
  );
}
