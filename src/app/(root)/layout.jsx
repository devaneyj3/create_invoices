import Header from "@/components/Header/Header";
import Providers from "@/components/Providers";

export default function RootLayout({ children }) {
	return (
		<Providers>
			<div className="flex h-screen flex-col">
				<Header />
				<main className="flex-1 wrapper">{children}</main>
			</div>
		</Providers>
	);
}
