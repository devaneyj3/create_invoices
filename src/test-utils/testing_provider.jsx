import React from 'react'
import {render} from '@testing-library/react'
import {InvoiceFormProvider } from '../context/InvoiceFormContext'


const AllTheProviders = ({children}) => {
    return (
      <InvoiceFormProvider>
        
          {children}
        </InvoiceFormProvider>
        
    )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"

export { customRender as render }