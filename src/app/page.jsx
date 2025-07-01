'use client'
import SignedInUser from "@/components/SignedInUser";
import styles from "./Landing.module.scss";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Dashboard from "@/components/Dashboard/dashboard";


export default function Home() {
	const router = useRouter();
	const { data: session, status } = useSession();
	console.log(session)

	useEffect(() => {
		if (status === 'authenticated') {
			router.replace('/');
    }
  }, [status, router]);
	
	if (status === 'loading') return <div>Loading...</div>;

	if(session) {
		return <Dashboard/>
	}

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
