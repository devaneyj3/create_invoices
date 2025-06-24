import { InvoiceFormProvider } from "@/context/InvoiceFormContext";
import "./globals.css";

export const metadata = {
	title: "Create Your Invoice",
	description: "Create Your Invoice",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<InvoiceFormProvider>
				<body>{children}</body>
			</InvoiceFormProvider>
		</html>
	);
}
