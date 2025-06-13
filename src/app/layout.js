import "./globals.css";

export const metadata = {
	title: "Create Your Invoice",
	description: "Create Your Invoice",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
