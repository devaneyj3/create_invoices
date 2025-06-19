// src/app/page.js
"use client";
import React, { useActionState, useState } from "react";
import DownloadPdfButton from "../DownloadPdfButton";
import PDFPreview from "../PDFPreview";
import styles from "./Form.module.scss";
import { createInvoice } from "@/app/lib/actions";

export default function Form() {
	const [optimisticData, setOptimisticData] = useState({
		invoiceNumber: "",
		amount: "",
	});

	const [state, action, pending] = useActionState(createInvoice, {
		invoiceNumber: "",
		amount: "",
		error: "",
		success: false,
		pdfData: "",
		filename: "",
	});

	const handleSubmit = async (formData) => {
		// Optimistic update - show preview immediately
		const invoiceNumber = formData.get("invoiceNumber");
		const amount = formData.get("amount");
		setOptimisticData({ invoiceNumber, amount });

		// Submit to server for validation and processing
		await action(formData);
	};

	const handleDownload = () => {
		if (state.pdfData) {
			try {
				// Convert base64 back to blob and download
				const binaryString = atob(state.pdfData);
				const bytes = new Uint8Array(binaryString.length);
				for (let i = 0; i < binaryString.length; i++) {
					bytes[i] = binaryString.charCodeAt(i);
				}
				const blob = new Blob([bytes], { type: "application/pdf" });

				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = state.filename || `invoice_${Date.now()}.pdf`;
				document.body.appendChild(link);
				link.click();
				link.remove();
				window.URL.revokeObjectURL(url);
			} catch (error) {
				console.error("Error downloading PDF:", error);
				alert("Failed to download PDF. Please try again.");
			}
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Create Professional Invoices</h1>

			<div className={styles.formCard}>
				<form action={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor="invoiceNumber" className={styles.label}>
							Invoice Number
						</label>
						<input
							type="text"
							name="invoiceNumber"
							id="invoiceNumber"
							className={styles.input}
							placeholder="Enter invoice number (e.g., INV-001)"
							required
							disabled={pending}
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="amount" className={styles.label}>
							Amount
						</label>
						<input
							type="number"
							name="amount"
							id="amount"
							className={styles.input}
							placeholder="Enter amount"
							step="0.01"
							min="0"
							required
							disabled={pending}
						/>
					</div>

					<div className={styles.buttonContainer}>
						<button
							type="submit"
							disabled={pending}
							className={styles.submitButton}>
							{pending ? "Generating..." : "Generate Invoice"}
						</button>

						{state.error && <p className={styles.error}>{state.error}</p>}

						{state.success && (
							<button
								type="button"
								onClick={handleDownload}
								className={styles.downloadButton}>
								Download PDF
							</button>
						)}
					</div>
				</form>

				{/* Show optimistic preview immediately */}
				{optimisticData.invoiceNumber && optimisticData.amount && (
					<div className={styles.previewSection}>
						<h3>Invoice Preview</h3>
						<PDFPreview
							invoiceNumber={optimisticData.invoiceNumber}
							amount={optimisticData.amount}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
