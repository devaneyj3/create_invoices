// src/components/PDFPreview.js
import { useState } from "react";
import styles from "./PDFPreview.module.scss"
import { generatePdf } from "@/lib/generatePDF";

export default function PDFPreview({ disabled, ...props }) {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [pdfUrl, setPdfUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const openPreview = async () => {
		// Prevent opening preview if disabled
		if (disabled) return;
		
		generatePdf(setIsLoading)
	}
	
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
				disabled={disabled}
				data-testid="loading"
				className={`${styles.previewButton} ${disabled ? styles.disabled : ''}`}>
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