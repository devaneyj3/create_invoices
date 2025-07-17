'use client';

import { signIn } from 'next-auth/react';
import styles from "./SignedInUser.module.scss";
import { useAuth } from '@/context/authContext';
import CompanyForm from '../CompanyForm/CompanyForm';
import { useState } from 'react';

export default function SignedInUser() {
  const { signedInUser } = useAuth();
  const [showAddCompany, setShowAddCompany] = useState(false)

  if (signedInUser) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 px-10 py-10'>
        <h2 className={styles.title}>Welcome, {signedInUser.name}!</h2>
        <p className={styles.email}>Email: {signedInUser.email}</p>
        <p className={styles.email}>Phone: {signedInUser.phone || 'Not set'}</p>
        <p className={styles.email}>Address: {signedInUser.address || 'Not set'}</p>
        <p className={styles.email}>City: {signedInUser.city || 'Not set'}</p>
        <p className={styles.email}>State: {signedInUser.state || 'Not set'}</p>
        <p className={styles.email}>Zip: {signedInUser.zip || 'Not set'}</p>
        <button className={styles.button} onClick={() => setShowAddCompany(true)}>Add Company</button>
        {showAddCompany && <CompanyForm setShowAddCompany={setShowAddCompany} />}
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