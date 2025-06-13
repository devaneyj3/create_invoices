// src/components/DownloadPdfButton.js
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { InvoicePDF } from "./InvoicePDF";
import { getCurrentDateFormatted } from "@/utils/getDate";
import styles from "./DownloadPdf.module.scss";

export default function DownloadPdfButton({ invoiceNumber, amount }) {
	const [isGenerating, setIsGenerating] = useState(false);

	const downloadPdf = async () => {
		if (!invoiceNumber || !amount) {
			alert("Please fill in all fields");
			return;
		}

		setIsGenerating(true);
		try {
			const blob = await pdf(
				<InvoicePDF invoiceNumber={invoiceNumber} amount={amount} />
			).toBlob();

			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `invoice_${getCurrentDateFormatted()}.pdf`;
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Error generating PDF:", error);
			alert("Failed to generate PDF. Please try again.");
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<button
			onClick={downloadPdf}
			disabled={isGenerating}
			className={styles.button}>
			{isGenerating ? "Generating..." : "Download Invoice"}
		</button>
	);
}
