'use client'

import { useAuth } from "@/context/authContext";
import styles from "./Landing.module.scss";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { signedInUser } = useAuth()

	useEffect(() => {
		if (status === 'authenticated' && session?.user?.profileComplete) {
			router.replace('/dashboard');
		} else if (status === 'authenticated' && !session?.user?.profileComplete) {
			router.replace('/profile');
		}
	}, [status, session]);
	
	if (status === 'loading') return <div>Loading...</div>;

	return (
		<div className={styles.container}>
			<div className={styles.hero}>
				<div className={styles.illustration}>
					{/* Simple SVG icon for invoices */}
					<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="10" y="10" width="60" height="60" rx="12" fill="#f093fb"/>
						<rect x="20" y="25" width="40" height="6" rx="3" fill="#fff"/>
						<rect x="20" y="38" width="28" height="6" rx="3" fill="#fff"/>
						<rect x="20" y="51" width="20" height="6" rx="3" fill="#fff"/>
					</svg>
				</div>
				<h1 className={styles.title}>Create Personal Payment Invoices</h1>
				<p className={styles.subtitle}>
					Effortlessly generate and manage invoices for your paychecks. Stay organized, get paid, and keep your records in one place.
				</p>
			
      <button className={styles.button} onClick={() => signIn()}>Signin to get started</button>
			</div>
		</div>
	);
}
