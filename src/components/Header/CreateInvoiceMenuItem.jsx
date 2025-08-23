import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import styles from "./invoice.module.scss";
import Form from "../Form/Form";
import { Button } from "../ui/button";
import { PiggyBank } from "lucide-react";

export default function CreateInvoiceMenuItem() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost">
					<PiggyBank />
					Create Invoice
				</Button>
			</DialogTrigger>
			<DialogContent className="overflow-y-scroll max-h-screen">
				<DialogHeader>
					<DialogTitle className={styles.title}>
						Make Your Own Invoices
					</DialogTitle>
					<DialogDescription className={styles.subtitle}>
						Create, preview, and download beautiful invoices in seconds.
					</DialogDescription>
					<Form />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
