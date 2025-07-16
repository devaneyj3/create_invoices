import { useCompany } from '@/context/companyContext'
import React from 'react'
import styles from './Companies.module.scss'

export default function Companies() {
  const { companies, isLoading, error } = useCompany()

  if (isLoading) {
    return <div className={styles.loading}>Loading companies...</div>
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>
  }

  if (!companies.length) {
    return <div className={styles.empty}>No companies found.</div>
  }

  return (
    <div className='px-10 py-10'>
      <h2 className={styles.heading}>Your Companies</h2>
      <div className={styles.list}>
        {companies.map(company => (
          <div key={company.id} className={styles.card}>
            <div className={styles.companyName}>{company.companyName}</div>
            <div className={styles.address}>{company.companyAddress}</div>
            <div className={styles.address}>
              {company.companyCity}, {company.companyState} {company.companyZip}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
