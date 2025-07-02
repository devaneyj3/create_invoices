import React from 'react'
import {render} from '@testing-library/react'
import {InvoiceFormProvider } from '../context/InvoiceFormContext'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../context/authContext'


const AllTheProviders = ({children}) => {
  return (
      <SessionProvider>
      <AuthProvider>

      <InvoiceFormProvider>
        
          {children}
        </InvoiceFormProvider>
      </AuthProvider>
      </SessionProvider>
        
    )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"

export { customRender as render }