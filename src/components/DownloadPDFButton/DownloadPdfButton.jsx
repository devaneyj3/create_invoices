// src/components/DownloadPdfButton.js
import { useState } from "react";

import styles from "./DownloadPdf.module.scss";
import { getCurrentDateFormatted } from "../../utils/getDate";
import { useInvoiceForm } from "../../context/InvoiceFormContext"

export default function DownloadPdfButton() {
	const [isGenerating, setIsGenerating] = useState(false);
	const {formState} = useInvoiceForm()

	
	const downloadPdf = async () => {
		setIsGenerating(true);
		try {
			const response = await fetch("/api/generate-pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  },
				},
				body: JSON.stringify(formState),
			});
	if (!response.ok) {
				throw new Error("Failed to generate PDF");
			}

			// Get the blob from the response
			const blob = await response.blob();

			// Create download link
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `invoice_${getCurrentDateFormatted()}.pdf`;
			document.body.appendChild(link);
			link.click();
			link.remove();

			// Clean up the URL
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error generating PDF:", error);
			alert("Failed to generate PDF. Please try again.");
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<button
			type="submit"
			data-testid="download_invoice"
			onClick={downloadPdf}
			disabled={isGenerating}
			className={styles.button}>
			{isGenerating ? "Generating..." : "Download Invoice"}
		</button>
	);
}
