"use client";
import { createContext, useContext, useState } from "react";

export const authContext = createContext({});

export const AuthProvider = ({ children, overrides = {} }) => {
	const [signedInUser, setSignedInUser] = useState(null);

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
