// src/components/PDFPreview.js
import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./PDFPreview.module.scss";
import { formatMoney } from "@/utils/formatMoney";
import { getCurrentDateFormatted } from "@/utils/getDate";

// Dynamically import PDFViewer with no SSR to avoid crypto issues
const PDFViewer = dynamic(
	() => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
	{
		ssr: false,
		loading: () => <div>Loading PDF viewer...</div>,
	}
);

// Dynamically import InvoicePDF with no SSR
const InvoicePDF = dynamic(
	() => import("./InvoicePDF").then((mod) => mod.InvoicePDF),
	{
		ssr: false,
	}
);

export default function PDFPreview({ invoiceNumber, amount }) {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

	if (!isPreviewOpen) {
		return (
			<button
				onClick={() => setIsPreviewOpen(true)}
				className={styles.previewButton}>
				Preview Invoice
			</button>
		);
	}

	return (
		<div className={styles.previewContainer}>
			<div className={styles.previewHeader}>
				<h3>Invoice Preview</h3>
				<button
					onClick={() => setIsPreviewOpen(false)}
					className={styles.closeButton}>
					Close Preview
				</button>
			</div>
			<div className={styles.pdfViewer}>
				<PDFViewer width="100%" height="600px">
					<InvoicePDF invoiceNumber={invoiceNumber} amount={amount} />
				</PDFViewer>
			</div>
		</div>
	);
}
