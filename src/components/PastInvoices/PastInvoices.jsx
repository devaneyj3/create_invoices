import React from 'react'
import { useInvoice } from '@/context/InvoiceItemProvider'
import styles from './PastInvoices.module.scss'
import {  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption} from '../ui/table'

  const HEADERS = ['Invoice #','Date', 'To','Amount']
export default function PastInvoices() {
  const { invoices, isLoading, error } = useInvoice()

  if (isLoading) {
    return <div className={styles.loading}>Loading invoices...</div>
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>
  }

  if (!invoices.length) {
    return <div className={styles.empty}>No past invoices found.</div>
  }

  return (
    <div className='px-10 py-10'>
      <h2 className={styles.heading}>Past Invoices</h2>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {HEADERS.map((header) => (
              <th className={styles.th} key={header}>{header}</th>

            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td className={styles.td}>{inv.invoiceNumber}</td>
              <td className={styles.td}>{new Date(inv.date).toLocaleDateString()}</td>
              <td className={styles.td}>{inv.to}</td>
              <td className={styles.td}>${inv.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}