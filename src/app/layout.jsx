import Providers from "@/components/Providers";

import "./globals.css";

export const metadata = {
	title: "Create Your Invoice",
	description: "Create Your Invoice",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Providers>
				<body>{children}</body>
			</Providers>
		</html>
	);
}
