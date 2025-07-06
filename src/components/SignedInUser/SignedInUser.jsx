'use client';

import { signIn, signOut } from 'next-auth/react';
import styles from "./SignedInUser.module.scss";
import { useAuth } from '@/context/authContext';

export default function SignedInUser() {
  const { signedInUser } = useAuth();
  console.log(signedInUser)
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