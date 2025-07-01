"use client";
import { createContext, useContext, useState } from "react";

export const authContext = createContext({});

export const AuthProvider = ({ children, overrides = {} }) => {
	const [signedInUser, setSignedInUser] = useState(null);

	return (
		<authContext.Provider
			value={{
				signedInUser,
				setSignedInUser,
			}}>
			{children}
		</authContext.Provider>
	);
};
export const useAuth = () => {
	return useContext(authContext);
};
