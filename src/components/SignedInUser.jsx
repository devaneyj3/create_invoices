'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import styles from "./SignedInUser.module.scss";
import { useEffect } from 'react';
import { useAuth } from "@/context/authContext";
import { PrismaClient } from '@prisma/client';
import { getUser } from '@/lib/getUser';

export default function SignedInUser() {
  const { data: session, status } = useSession();
  const { setSignedInUser } = useAuth();


  useEffect(() => {
    const getData = async() => {

      if (session?.user) {
        const person = await getUser(session.user.email)
        console.log(person)
        setSignedInUser(session.user);
      } else {
        setSignedInUser(null);
      }
    }
    getData()
  }, [session, setSignedInUser]);
  if (session) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Welcome, {session?.user?.name}!</h2>
        <p className={styles.email}>Email: {session?.user?.email}</p>
        <p className={styles.signedInAs}>Signed in as: {session?.user?.email}</p>
        <button className={styles.button} onClick={() => signOut()}>Sign out</button>
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