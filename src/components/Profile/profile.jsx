import React, { useActionState, useEffect } from "react";
import { updateProfile } from "../../app/lib/actions";
import styles from "./profile.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import ProfileForm from "./ProfileForm";
import { useAuth } from "@/context/authContext";

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
	const { data: session } = useSession();
	const { update } = useAuth() 

	useEffect(() => {
		if (state && state.success && !session?.user?.profileComplete) {
			const updateData = async () => {
				await update(session?.user?.id, state.address, state.addressCity, state.addressState, state.addressZip, state.phone)
			};
			updateData();
			router.replace('/dashboard')
		}
	}, [state, session?.user?.id, session?.user?.profileComplete, update, router]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Complete your profile</h1>
			<ProfileForm state={state} pending={pending} onSubmit={action} />
		</div>
	);
}
