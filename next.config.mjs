/** @type {import(next).NextConfig} */
const nextConfig = {
	// Ensure proper output for Vercel
	output: "standalone",

	// Handle experimental features
	experimental: {
		// Disable if causing issues
		serverComponentsExternalPackages: ["@prisma/client"],
	},

	// Ensure proper handling of route groups
	trailingSlash: false,

	// Optimize for production
	swcMinify: true,
};

export default nextConfig;
