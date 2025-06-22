// src/components/DownloadPdfButton.js
import { useState } from "react";

import styles from "./DownloadPdf.module.scss";
import { getCurrentDateFormatted } from "../../utils/getDate";

export default function DownloadPdfButton(props) {
	const [isGenerating, setIsGenerating] = useState(false);

	const { invoiceNumber, amount, name, phone, address, addressCity, addressZip, to, jobTitle, jobType, jobDescription } = props
	const downloadPdf = async () => {
		setIsGenerating(true);
		try {
			const response = await fetch("/api/generate-pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ invoiceNumber, amount, name, phone, address, addressCity, addressZip, to, jobTitle, jobType, jobDescription }),
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
