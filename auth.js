import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: "/",
		signOut: "/sign-out",
	},
	// NextAuth v5 uses JWT by default
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async jwt({ token, user, account }) {
			// This runs when user first signs in (user is defined)
			if (user) {
				// Store user data in JWT token
				token.id = user.id;
				token.phone = user.phone;
				token.address = user.address;
				token.city = user.city;
				token.state = user.state;
				token.zip = user.zip;
				token.jobTitle = user.jobTitle;

				// Calculate profile completion
				token.profileComplete = !!(
					user.jobTitle &&
					user.phone &&
					user.address &&
					user.city &&
					user.state &&
					user.zip
				);
			}
			return token;
		},
		async session({ session, token }) {
			// Pass token data to session
			if (token) {
				session.user.id = token.id;
				session.user.phone = token.phone;
				session.user.address = token.address;
				session.user.city = token.city;
				session.user.state = token.state;
				session.user.zip = token.zip;
				session.user.jobTitle = token.jobTitle;
				session.user.profileComplete = token.profileComplete;
			}
			return session;
		},
		async redirect({ url, baseUrl }) {
			// Let the client-side handle routing based on profile completion
			if (url.startsWith(baseUrl + "/api/auth/signin")) {
				return baseUrl + "/AddNewProfile";
			}
			return url;
		},
	},
});
