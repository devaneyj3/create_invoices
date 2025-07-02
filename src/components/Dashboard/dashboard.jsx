'use client'
import React, { useEffect } from "react";
import SignedInUser from "../SignedInUser/SignedInUser";
import styles from "./dashboard.module.scss";
import Profile from "../Profile/profile";
import { useAuth, profileComplete } from "../../context/authContext"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
	const { data: session } = useSession();
	const { signedInUser } = useAuth()
	const router = useRouter();
	
	return (
		<div className={styles.dashboardContainer}>
		<SignedInUser />
		</div>
	);
}
