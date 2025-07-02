import React, { useActionState, useEffect } from "react";
import { updateProfile } from "../../app/lib/actions";
import styles from "./profile.module.scss";
import { useAuth } from '../../context/authContext'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import ProfileForm from "./ProfileForm";

export default function ProfileContainer() {
	const [state, action, pending] = useActionState(updateProfile, {
		phone: "",
		address: "",
		addressCity: "",
		addressState: "",
		addressZip: "",
		error: "",
		success: false,
	});
	const router = useRouter();
	const { signedInUser, update, setSignedInUser, fetchUser } = useAuth();
	const { data: session } = useSession();

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
	}, []);

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
				setSignedInUser({ ...signedInUser, data });
			};
			updateData();
			router.push('/dashboard')
		}
	}, [state, setSignedInUser]);
	
	

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Complete your profile</h1>
			<ProfileForm state={state} pending={pending} onSubmit={action} />
		</div>
	);
}
