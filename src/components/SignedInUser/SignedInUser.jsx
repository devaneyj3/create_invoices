'use client';

import { signIn, signOut } from 'next-auth/react';
import styles from "./SignedInUser.module.scss";
import { useAuth } from '@/context/authContext';
import CompanyForm from '../CompanyForm/CompanyForm';
import { useState } from 'react';
import { useCompany } from '@/context/companyContext';
import Companies from '../Companies/companies';

export default function SignedInUser() {
  const { signedInUser } = useAuth();
  const [showAddCompany, setShowAddCompany] = useState(false)
  const {companies} = useCompany()
  console.log(companies)
  if (signedInUser) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Welcome, {signedInUser.name}!</h2>
        <p className={styles.email}>Email: {signedInUser.email}</p>
        <p className={styles.email}>Phone: {signedInUser.phone || 'Not set'}</p>
        <p className={styles.email}>Address: {signedInUser.address || 'Not set'}</p>
        <p className={styles.email}>City: {signedInUser.city || 'Not set'}</p>
        <p className={styles.email}>State: {signedInUser.state || 'Not set'}</p>
        <p className={styles.email}>Zip: {signedInUser.zip || 'Not set'}</p>
        <button className={styles.button} onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
        <button className={styles.button} onClick={() => setShowAddCompany(true)}>Add Company</button>
        {showAddCompany && <CompanyForm setShowAddCompany={setShowAddCompany} />}
        <Companies/>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <span className={styles.notSignedIn}>Not signed in</span> <br />
      <button className={styles.button} onClick={() => signIn()}>Sign in</button>
    </div>
  )
} 