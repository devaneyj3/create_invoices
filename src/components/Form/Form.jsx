"use client";
import React, { useActionState, useEffect } from "react";
import DownloadPdfButton from "../DownloadPDFButton/DownloadPdfButton";
import PDFPreview from "../PDFPreview/PDFPreview";
import styles from "./Form.module.scss";
import { createInvoice } from "../../app/lib/actions";
import { useInvoiceForm } from "../../context/InvoiceFormContext";

export default function Form() {

	const { formState, setFormState } = useInvoiceForm()
	//put form data emelents into an array to look over

	const [state, action, pending] = useActionState(createInvoice, {
		invoiceNumber: "",
		amount: "",
		to: "",
		jobTitle: "",
		jobType: "",
		jobDescription: "",
		error: "",
		success: false,
	});

useEffect(() => {
	if (state) {
		setFormState((prev) => ({
			...prev,
			...state,
		}));
	}
}, [state]);

	// Check if all required fields are filled
	const allFieldsFilled = [
		"invoiceNumber",
		"amount",
		"to",
		"jobTitle",
		"jobType",
		"jobDescription",
	].every((key) => !!state[key]);

	return (
		<>
			<div className={styles.background} />
			<div className={styles.container}>
				<div className={styles.landingCard}>
					<h1 className={styles.title}>Make your own invoice</h1>
					<p className={styles.subtitle}>Create, preview, and download beautiful invoices in seconds.</p>
					<form action={action}>
						{[
							{ name: "invoiceNumber", label: "Invoice Number", type: "text", placeholder: "Enter invoice number", required: true },
							{ name: "to", label: "To", type: "text", placeholder: "Invoice to (client name)" },
							{ name: "jobTitle", label: "Job Title", type: "text", placeholder: "Enter job title" },
							{ name: "jobType", label: "Job Type", type: "text", placeholder: "Enter job type" },
							{ name: "amount", label: "Amount", type: "number", placeholder: "Enter amount", required: true, min: 1, max: 100000000, step: 0.01 },
						].map(({ name, label, ...props }) => (
							<div key={name} className={styles.formGroup}>
								<label htmlFor={name} className={styles.label}>{label}</label>
								<input name={name} className={styles.input} {...props} />
							</div>
						))}

						<div className={styles.formGroup}>
							<label htmlFor="jobDescription" className={styles.label}>Job Description</label>
							<textarea
								name="jobDescription"
								className={styles.textarea}
								placeholder="Describe the job or work completed"
								rows={4}
							/>
						</div>

						<button
							type="submit"
							disabled={pending}
							className={styles.submitButton}
						>
							{pending ? "Generating..." : "Generate Invoice"}
						</button>

						{allFieldsFilled && (
							<div className={styles.buttonContainer}>
								<PDFPreview {...state} />
								<DownloadPdfButton/>
							</div>
						)}
					</form>
				</div>
			</div>
		</>
	);
}
