/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		// Handle crypto polyfill for client-side
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				crypto: false,
				stream: false,
				util: false,
			};
		}

		// Handle PDF libraries
		config.externals = [...(config.externals || []), "canvas", "jsdom"];

		return config;
	},
	// Disable server-side rendering for PDF components
	experimental: {
		esmExternals: "loose",
	},
};

export default nextConfig;
