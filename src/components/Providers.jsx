'use client';

import { SessionProvider } from 'next-auth/react';
import { InvoiceFormProvider } from "@/context/InvoiceFormContext";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <InvoiceFormProvider>
        {children}
      </InvoiceFormProvider>
    </SessionProvider>
  );
} 