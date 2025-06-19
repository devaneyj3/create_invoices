// src/components/PDFPreview.js
import { useState } from "react";
import styles from "./PDFPreview.module.scss";

export default function PDFPreview({ invoiceNumber, amount }) {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [pdfUrl, setPdfUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const openPreview = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/generate-pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ invoiceNumber, amount }),
			});

			if (!response.ok) {
				throw new Error("Failed to generate PDF");
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			setPdfUrl(url);
			setIsPreviewOpen(true);
		} catch (error) {
			console.error("Error generating PDF preview:", error);
			alert("Failed to generate PDF preview. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const closePreview = () => {
		setIsPreviewOpen(false);
		if (pdfUrl) {
			window.URL.revokeObjectURL(pdfUrl);
			setPdfUrl(null);
		}
	};

	if (!isPreviewOpen) {
		return (
			<button
				onClick={openPreview}
				disabled={isLoading}
				className={styles.previewButton}>
				{isLoading ? "Loading..." : "Preview Invoice"}
			</button>
		);
	}

	return (
		<div className={styles.previewContainer}>
			<div className={styles.previewHeader}>
				<h3>Invoice Preview</h3>
				<button onClick={closePreview} className={styles.closeButton}>
					Close Preview
				</button>
			</div>
			<div className={styles.pdfViewer}>
				{pdfUrl && (
					<iframe
						src={pdfUrl}
						width="100%"
						height="600px"
						title="Invoice Preview"
						style={{ border: "none" }}
					/>
				)}
			</div>
		</div>
	);
}
