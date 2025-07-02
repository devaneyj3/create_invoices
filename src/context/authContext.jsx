"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const authContext = createContext({});

export function profileComplete(user) {
	return !!(
		user?.address &&
		user?.city &&
		user?.state &&
		user?.zip &&
		user?.phone
	);
}

export const AuthProvider = ({ children, overrides = {} }) => {
	const [signedInUser, setSignedInUser] = useState(null);
	const { data: session, status } = useSession();

	async function fetchUser(email) {
		const res = await fetch("/api/user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		});
		const user = await res.json();
		return user;
	}
	async function update(id, address, city, state, zip, phone) {
		const res = await fetch("/api/user", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id, address, city, state, zip, phone }),
		});
		const user = await res.json();
		return user;
	}

	useEffect(() => {
		async function fetchUserData() {
			if (session?.user?.email) {
				const user = await fetchUser(session.user.email);
				setSignedInUser(user);
			} else {
				setSignedInUser(null);
			}
		}
		fetchUserData();
	}, [session]);

	return (
		<authContext.Provider
			value={{
				signedInUser,
				setSignedInUser,
				update,
				fetchUser,
			}}>
			{children}
		</authContext.Provider>
	);
};
export const useAuth = () => {
	return useContext(authContext);
};
