import React from 'react'
import { useInvoice } from '@/context/InvoiceItemProvider'
import styles from './PastInvoices.module.scss'

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
      
      {/* Mobile/Tablet View - Cards */}
      <div className={styles.mobileView}>
        {invoices.map(inv => (
          <div key={inv.id} className={styles.invoiceCard}>
            <div className={styles.cardHeader}>
              <span className={styles.invoiceNumber}>#{inv.invoiceNumber}</span>
              <span className={styles.amount}>${inv.amount}</span>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardRow}>
                <span className={styles.label}>Date:</span>
                <span className={styles.value}>{new Date(inv.date).toLocaleDateString()}</span>
              </div>
              <div className={styles.cardRow}>
                <span className={styles.label}>To:</span>
                <span className={styles.value}>{inv.to}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className={styles.desktopView}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Invoice #</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>To</th>
              <th className={styles.th}>Amount</th>
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
    </div>
  )
}