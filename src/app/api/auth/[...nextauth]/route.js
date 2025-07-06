import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	adapter: PrismaAdapter(prisma),
	// finding if the user exists in the database, if it does creat new session properties with the existing database properties
	callbacks: {
		async session({ session, token }) {
			// Fetch fresh user data from database
			const dbUser = await prisma.user.findUnique({
				where: { email: session.user?.email || "" },
			});

			if (dbUser) {
				// Add user ID to session
				session.user.id = dbUser.id;

				// Add all profile fields to session
				session.user.phone = dbUser.phone;
				session.user.address = dbUser.address;
				session.user.city = dbUser.city;
				session.user.state = dbUser.state;
				session.user.zip = dbUser.zip;

				// Add profile completion status to session
				session.user.profileComplete = !!(
					dbUser.phone &&
					dbUser.address &&
					dbUser.city &&
					dbUser.state &&
					dbUser.zip
				);
			}

			return session;
		},

		async redirect({ url, baseUrl }) {
			// After sign in, redirect based on profile completion
			if (url.startsWith(baseUrl + "/api/auth/signin")) {
				return baseUrl + "/profile"; // Always go to profile first
			}
			return url;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
