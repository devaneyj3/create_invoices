"use client";

import styles from "./Landing.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		console.log("Session status:", status);
		console.log("Session data:", session);

		if (status === "authenticated" && session?.user?.profileComplete) {
			router.replace("/dashboard/");
		} else if (status === "authenticated" && !session?.user?.profileComplete) {
			router.replace("/AddNewProfile");
		}
	}, [status, session]);

	const handleSignIn = async () => {
		try {
			console.log("Attempting to sign in...");
			const result = await signIn("google", { callbackUrl: "/" });
			console.log("Sign in result:", result);
		} catch (error) {
			console.error("Sign in error:", error);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.hero}>
				<div className={styles.illustration}>
					{/* Simple SVG icon for invoices */}
					<svg
						width="80"
						height="80"
						viewBox="0 0 80 80"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect x="10" y="10" width="60" height="60" rx="12" fill="#f093fb" />
						<rect x="20" y="25" width="40" height="6" rx="3" fill="#fff" />
						<rect x="20" y="38" width="28" height="6" rx="3" fill="#fff" />
						<rect x="20" y="51" width="20" height="6" rx="3" fill="#fff" />
					</svg>
				</div>
				<h1 className={styles.title}>Create Personal Payment Invoices</h1>
				<p className={styles.subtitle}>
					Effortlessly generate and manage invoices for your paychecks. Stay
					organized, get paid, and keep your records in one place.
				</p>

				<button className={styles.button} onClick={handleSignIn}>
					Signin to get started
				</button>
			</div>
		</div>
	);
}
