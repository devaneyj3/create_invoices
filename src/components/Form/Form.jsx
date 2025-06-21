// src/app/page.js
"use client";
import React, { useActionState, useState } from "react";
import DownloadPdfButton from "../DownloadPdfButton";
import PDFPreview from "../PDFPreview";
import styles from "./Form.module.scss";
import { createInvoice } from "../../app/lib/actions";

export default function Form() {
	const [state, action, pending] = useActionState(createInvoice, {
		invoiceNumber: "",
		amount: "",
		error: "",
		success: false,
	});

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Make your own invoice</h1>

			<form action={action}>
				<div className={styles.formGroup}>
					<label htmlFor="invoiceNumber" className={styles.label}>
						Invoice Number
					</label>
					<input
						type="text"
						name="invoiceNumber"
						className={styles.input}
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
						name="amount"
						className={styles.input}
						placeholder="Enter amount"
						max={100000000}
						min={1}
						step={0.01}
						required
					/>
				</div>
				<button
					type="submit"
					disabled={pending}
					className={styles.submitButton}>
					{pending ? "Generating..." : "Generate Invoice"}
				</button>

				<div className={styles.buttonContainer}>
					{state.invoiceNumber && state.amount && (
						<>
							<PDFPreview
								invoiceNumber={state.invoiceNumber}
								amount={state.amount}
							/>
							<DownloadPdfButton
								invoiceNumber={state.invoiceNumber}
								amount={state.amount}
							/>
						</>
					)}
				</div>
			</form>
		</div>
	);
}
