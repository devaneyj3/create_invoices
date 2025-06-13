// src/app/page.js
"use client";
import React, { useState } from "react";
import DownloadPdfButton from "../components/DownloadPdfButton";
import PDFPreview from "../components/PDFPreview";
import styles from "./page.module.scss";

export default function Home() {
	const [invoiceNumber, setInvoiceNumber] = useState("");
	const [amount, setAmount] = useState("");

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Make your own invoice</h1>

			<div className={styles.formGroup}>
				<label htmlFor="invoiceNumber" className={styles.label}>
					Invoice Number
				</label>
				<input
					type="text"
					id="invoiceNumber"
					className={styles.input}
					value={invoiceNumber}
					onChange={(e) => setInvoiceNumber(e.target.value)}
					placeholder="Enter invoice number"
					required
				/>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="amount" className={styles.label}>
					Amount
				</label>
				<input
					type="number"
					id="amount"
					className={styles.input}
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					placeholder="Enter amount"
					required
				/>
			</div>

			<div className={styles.buttonContainer}>
				<PDFPreview invoiceNumber={invoiceNumber} amount={amount} />
				<DownloadPdfButton invoiceNumber={invoiceNumber} amount={amount} />
			</div>
		</div>
	);
}
