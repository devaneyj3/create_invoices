import React, { useActionState, useEffect } from "react";
import { updateProfile } from "../../app/lib/actions";
import styles from "./profile.module.scss";
import { useAuth } from '../../context/authContext'

export default function Profile() {
	const [state, action, pending] = useActionState(updateProfile, {
		phone: "",
		address: "",
		addressCity: "",
		addressState: "",
		addressZip: "",
		error: "",
		success: false,
	});
	const { signedInUser, update } = useAuth();

	useEffect(() => {
		if (state && signedInUser) {
			const updateData = async () => {
				const data = await update(
					signedInUser.id,
					state.address,
					state.addressCity,
					state.addressState,
					state.addressZip,
					state.phone
				);
				return data;
			};
			updateData();
		}
	}, [state, signedInUser]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Complete your profile</h1>
			<form action={action}>
				<div className={styles.formGroup}>
					<label htmlFor="phone" className={styles.label}>
						Phone
					</label>
					<input
						name="phone"
						type="tel"
						placeholder="Enter your phone number"
						defaultValue={state.phone}
						className={styles.input}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="address" className={styles.label}>
						Address
					</label>
					<input
						name="address"
						type="text"
						placeholder="Enter your address"
						defaultValue={state.address}
						className={styles.input}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="addressCity" className={styles.label}>
						City
					</label>
					<input
						name="addressCity"
						type="text"
						placeholder="Enter your city"
						defaultValue={state.addressCity}
						className={styles.input}
					/>
					<label htmlFor="addressState" className={styles.label}>
						State
					</label>
					<input
						name="addressState"
						type="text"
						placeholder="Enter your state"
						defaultValue={state.addressState}
						className={styles.input}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="addressZip" className={styles.label}>
						Zip
					</label>
					<input
						name="addressZip"
						type="number"
						placeholder="Enter your zip"
						defaultValue={state.addressZip}
						className={styles.input}
					/>
				</div>
				<button type="submit" disabled={pending} className={styles.button}>
					{pending ? "Updating..." : "Update Profile"}
				</button>
				{state.error && <div className={styles.error}>{state.error}</div>}
				{state.success && (
					<div className={styles.success}>Profile updated!</div>
				)}
			</form>
		</div>
	);
}
