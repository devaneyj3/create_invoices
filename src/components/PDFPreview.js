// src/components/PDFPreview.js
import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { InvoicePDF } from "./InvoicePDF";
import styles from "./PDFPreview.module.scss";

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
