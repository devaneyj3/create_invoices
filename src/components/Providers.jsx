'use client';

import { SessionProvider } from 'next-auth/react';
import { InvoiceFormProvider } from "@/context/InvoiceFormContext";
import { AuthProvider } from '@/context/authContext';
import { CompanyProvider } from '@/context/companyContext';
import { InvoiceItemProvider } from '@/context/InvoiceItemProvider';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CompanyProvider>
          <InvoiceFormProvider>
            <InvoiceItemProvider>
                {children}
              </InvoiceItemProvider>
          </InvoiceFormProvider>
        </CompanyProvider>
      </AuthProvider>
    </SessionProvider>
  );
} 