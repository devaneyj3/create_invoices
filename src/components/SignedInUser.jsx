'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function SignedInUser() {
  const { data: session, status } = useSession();
  console.log(session)
  if (session) {
    return (
      <>
        <h2>Welcome, {session?.user?.name}!</h2>
        <p>Email: {session?.user?.email}</p>
        <p>Signed in as: {session?.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
} 