import React from "react";
import SignedInUser from "../SignedInUser";
import Form from "../Form/Form";
import styles from "./dashboard.module.scss";
import Profile from "../Profile/profile";

export default function Dashboard() {
	return (
		<div className={styles.dashboardContainer}>
			<div className={styles.sidebar}>
				<SignedInUser />
			</div>
			<div className={styles.main}>
				<Profile />
			</div>
		</div>
	);
}
