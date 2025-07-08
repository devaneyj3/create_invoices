'use client';

import { SessionProvider } from 'next-auth/react';
import { InvoiceFormProvider } from "@/context/InvoiceFormContext";
import { AuthProvider } from '@/context/authContext';
import { CompanyProvider } from '@/context/companyContext';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CompanyProvider>
        <InvoiceFormProvider>
          {children}
        </InvoiceFormProvider>
        </CompanyProvider>
      </AuthProvider>
    </SessionProvider>
  );
} 