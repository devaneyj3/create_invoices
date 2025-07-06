'use client';

import { SessionProvider } from 'next-auth/react';
import { InvoiceFormProvider } from "@/context/InvoiceFormContext";
import { AuthProvider } from '@/context/authContext';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <InvoiceFormProvider>
          {children}
        </InvoiceFormProvider>
      </AuthProvider>
    </SessionProvider>
  );
} 