"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const authContext = createContext({});

export function profileComplete(user) {
  return !!(
    user?.phone &&
    user?.address &&
    user?.city &&
    user?.state &&
    user?.zip
  );
}

export const AuthProvider = ({ children }) => {
  const [signedInUser, setSignedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    if (session?.user) {
      // Use session data directly since NextAuth provides all user data
      setSignedInUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        phone: session.user.phone,
        address: session.user.address,
        city: session.user.city,
        state: session.user.state,
        zip: session.user.zip,
        image: session.user.image,
        profileComplete: session.user.profileComplete,
      });
    } else {
      setSignedInUser(null);
    }
    
    setIsLoading(false);
  }, [session, status]);

  async function update(id, address, city, state, zip, phone) {
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, address, city, state, zip, phone }),
    });
    const user = await res.json();
    
    // Update local state with new user data
    setSignedInUser(prev => ({
      ...prev,
      ...user,
      profileComplete: profileComplete(user),
    }));
    
    return user;
  }

  return (
    <authContext.Provider
      value={{
        signedInUser,
        setSignedInUser,
        update,
        isLoading,
        profileComplete: signedInUser ? profileComplete(signedInUser) : false,
      }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
}; 