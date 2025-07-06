'use client'
import React from "react";
import SignedInUser from "../SignedInUser/SignedInUser";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
	
	return (
		<div className={styles.dashboardContainer}>
		<SignedInUser />
		</div>
	);
}
