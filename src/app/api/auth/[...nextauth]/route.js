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
	secret: process.env.NEXTAUTH_SECRET,
	// Session configuration for production
	session: {
		strategy: "database",
		maxAge: 30 * 240 * 60, // 30 days
	},
	// finding if the user exists in the database, if it does creat new session properties with the existing database properties
	callbacks: {
		async session({ session, user }) {
			// On sign-in, user is defined. On subsequent requests, user is undefined.
			let dbUser = user;
			if (!dbUser && session.user?.email) {
				dbUser = await prisma.user.findUnique({
					where: { email: session.user.email },
				});
			}
			if (dbUser) {
				session.user.id = dbUser.id;
				session.user.jobTitle = dbUser.jobTitle;
				session.user.phone = dbUser.phone;
				session.user.address = dbUser.address;
				session.user.city = dbUser.city;
				session.user.state = dbUser.state;
				session.user.zip = dbUser.zip;
				session.user.profileComplete = !!(
					dbUser.jobTitle &&
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
			// Let the client-side handle routing based on profile completion
			// This prevents race conditions in production
			if (url.startsWith(baseUrl + "/api/auth/signin")) {
				return baseUrl + "/AddNewProfile";
			}
			return url;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
