import Header from "@/components/Header/Header";
import Providers from "@/components/Providers";

export default function RootLayout({ children }) {
	return (
		<Providers>
			<Header />
			<div className="flex-1 wrapper">{children}</div>
		</Providers>
	);
}
