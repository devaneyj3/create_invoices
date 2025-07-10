"use client";
import React, { useActionState, useEffect, useState } from "react";
import DownloadPdfButton from "../DownloadPDFButton/DownloadPdfButton";
import PDFPreview from "../PDFPreview/PDFPreview";
import styles from "./Form.module.scss";
import { createInvoice } from "../../app/lib/actions";
import { useInvoiceForm } from "../../context/InvoiceFormContext";
import { useAuth } from "../../context/authContext";
import { useCompany } from "@/context/companyContext";
import { useInvoice } from "@/context/InvoiceItemProvider";

export default function Form() {

	const { formState, setFormState } = useInvoiceForm()
	//put form data emelents into an array to look over

	const { signedInUser } = useAuth()
	const { selectedCompany } = useCompany()
	const [invoiceData, setInvoiceData] = useState()

	//get the last invoice number and add one to it and add it to invoiceNumber input
	const { nextInvoiceNum, isLoading } = useInvoice()
	console.log(nextInvoiceNum)
	
	

	const [state, action, pending] = useActionState(createInvoice, {
		invoiceNumber: nextInvoiceNum,
		amount: "",
		jobDescription: "",
		error: "",
		success: false,
	});

useEffect(() => {
	if (state && (state.invoiceNumber || state.amount || state.jobTitle|| state.jobDescription)) {
		setFormState((prev) => ({
			...prev,
			...state,
		}));
		setInvoiceData((prev) => ({
			...signedInUser,
			...selectedCompany,
			...state
		}))
	}
}, [state, signedInUser]);

	// Check if all required fields are filled
	const allFieldsFilled = [
		"invoiceNumber",
		"amount",
		"jobDescription",
	].every((key) => !!state[key]);



	return (
		<>
			<div className={styles.background} />
			<div className={styles.container}>
				<div className={styles.landingCard}>
					<h1 className={styles.title}>Make your own invoice</h1>
					<p className={styles.subtitle}>Create, preview, and download beautiful invoices in seconds.</p>
					{typeof nextInvoiceNum !== "number" || isNaN(nextInvoiceNum) || nextInvoiceNum < 1 ? (
						<div>Loading...</div>
					) : (
						<form action={action} key={nextInvoiceNum}>
							{[
								{ name: "invoiceNumber", label: "Invoice Number", type: "text", defaultValue: nextInvoiceNum, placeholder: "Enter invoice number", required: true },
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
									<PDFPreview {...invoiceData} />
									<DownloadPdfButton {...invoiceData} />
								</div>
							)}
						</form>
					)}
				</div>
			</div>
		</>
	);
}
