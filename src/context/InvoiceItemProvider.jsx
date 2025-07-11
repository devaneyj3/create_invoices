'use client'

import { createContext, useContext, useState, useEffect, useMemo } from "react"

import { useSession } from "next-auth/react"

export const InvoiceItem = createContext({})

export const InvoiceItemProvider = ({ children }) => {
  const {data:session, status} = useSession()
  
  const [invoices, setInvoices] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] =useState(true)
  const [selectedInvoice, setSelectedInvoice] = useState({})
  const [nextInvoiceNum, setNextInvoiceNumber] = useState()
  
  useEffect(() => {
    const getInvoices = async () => {
      if (!session?.user?.id) {
        setInvoices([])
        setSelectedInvoice(null)
        setIsLoading(false)
        setError('No User session')
        return
      }
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/invoice?userId=${session.user.id}`)
        if (!res.ok) throw new Error("Failed to fetch invoices");
        const data = await res.json();
        setInvoices(data);
        if (data.length > 0) setSelectedInvoice(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (status === "authenticated") {
      getInvoices();
    }    
  }, [session?.user?.id, status])

  useEffect(() => {
    if (invoices && invoices.length > 0) {
      const sorted = [...invoices].sort((a, b) => Number(a.invoiceNumber) - Number(b.invoiceNumber));
      const lastInvoice = sorted[sorted.length - 1];
      setNextInvoiceNumber(Number(lastInvoice?.invoiceNumber || 0) + 1);
    } else if (invoices && invoices.length === 0) {
      setNextInvoiceNumber(1);
    }
  }, [invoices]);

  const createInvoice = async(data) => {
    const res = await fetch('/api/invoice', {
      method: 'POST',
      headers: {
        'ContentType': 'application/json'
      },
      body: JSON.stringify({ ...data, userId: session?.user.id })
    })
    const newInvoice = await res.json()
    setInvoices(prev => [...prev, newInvoice])
    setSelectedInvoice(newInvoice)
    if(!res.ok) throw new Error('Failed to save invoice to database')
    return newInvoice
  } 
  
  
  
  
    const values = useMemo(() => ({
      invoices,
      setInvoices,
      selectedInvoice,
      setSelectedInvoice,
      nextInvoiceNum,
      createInvoice,
      error,
      isLoading
  
    }), [invoices, selectedInvoice, nextInvoiceNum, error, isLoading]);
  return (
    <InvoiceItem.Provider value={values}>
      {children}
    </InvoiceItem.Provider>
  )
}

export const useInvoice = () => useContext(InvoiceItem) 