'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => (
  <SessionProvider>
    {children}
  </SessionProvider>
);
