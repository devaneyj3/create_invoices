// src/components/DownloadPdfButton.js
import { useState } from "react";

import styles from "./DownloadPdf.module.scss";
import { getCurrentDateFormatted } from "../../utils/getDate";
import { useInvoice } from "@/context/InvoiceItemProvider";

export default function DownloadPdfButton(props) {
	const [isGenerating, setIsGenerating] = useState(false);
	const { createInvoice } = useInvoice()

	const makeInvoice = async () => {
		const data = await createInvoice(props)
		downloadPdf()
	}
	const downloadPdf = async () => {
		setIsGenerating(true);
		try {
			const response = await fetch("/api/generate-pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json", 
    			"X-Requested-With": "XMLHttpRequest"
				},
				body: JSON.stringify(props),
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
			onClick={makeInvoice}
			disabled={isGenerating}
			className={styles.button}>
			{isGenerating ? "Generating..." : "Download Invoice"}
		</button>
	);
}
