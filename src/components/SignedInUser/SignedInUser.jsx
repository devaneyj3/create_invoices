'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import styles from "./SignedInUser.module.scss";
import { useEffect } from 'react';
import { useAuth } from "../../context/authContext"

export default function SignedInUser() {
  const { data: session, status } = useSession();
  const { signedInUser,setSignedInUser, fetchUser } = useAuth();

  useEffect(() => {
    async function getUserData() {
      if (session?.user?.email) {
        const user = await fetchUser(session.user.email);
        setSignedInUser(user);
      } else {
        setSignedInUser(null);
      }
    }
    getUserData();
  }, [session, setSignedInUser]);
  	console.log('signed in user is,',signedInUser)

  if (session) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Welcome, {signedInUser?.name}!</h2>
        <p className={styles.email}>Email: {signedInUser?.email}</p>
        <p className={styles.email}>Phone: {signedInUser?.phone}</p>
        <p className={styles.email}>Address: {signedInUser?.address}</p>
        <p className={styles.email}>City: {signedInUser?.city}</p>
        <p className={styles.email}>State: {signedInUser?.state}</p>
        <p className={styles.email}>Zip: {signedInUser?.zip}</p>
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