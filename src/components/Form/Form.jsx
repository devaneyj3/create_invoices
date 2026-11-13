"use client";
import React, { useActionState, useEffect, useState, useMemo } from "react";
import DownloadPdfButton from "../DownloadPDFButton/DownloadPdfButton";
import styles from "./Form.module.scss";
import { createInvoice } from "../../app/lib/actions";
import { useInvoiceForm } from "../../context/InvoiceFormContext";
import { useAuth } from "../../context/authContext";
import { useCompany } from "@/context/companyContext";
import { useInvoice } from "@/context/InvoiceItemProvider";
// Move form configuration outside component for better maintainability
const FORM_FIELDS = [
	{
		name: "invoiceNumber",
		label: "Invoice Number",
		type: "text",
		placeholder: "Enter invoice number",
		required: true,
	},
	{
		name: "amount",
		label: "Amount",
		type: "number",
		placeholder: "Enter amount",
		required: true,
		min: 1,
		max: 100000000,
		step: 0.01,
	},
];

export default function Form() {
	const { setFormState } = useInvoiceForm();
	const { signedInUser } = useAuth();
	const { selectedCompany } = useCompany();
	const { invoices,nextInvoiceNum, isLoading } = useInvoice();

	const lastInvoice = invoices.length > 0 ? invoices[invoices.length - 1] : null;

	// Add local state to track form values in real-time
	const [formValues, setFormValues] = useState({
		invoiceNumber: nextInvoiceNum || "",
		amount: lastInvoice?.amount ?? "",
		jobDescription: lastInvoice?.description ?? "",
	});

	const [state, action] = useActionState(createInvoice, {
		invoiceNumber: nextInvoiceNum,
		amount: lastInvoice?.amount ?? "",
		jobDescription: lastInvoice?.description ?? "",
		error: "",
		success: false,
	});

	// Prefill when invoices / next number load
	useEffect(() => {
		setFormValues((prev) => ({
			...prev,
			invoiceNumber: nextInvoiceNum || prev.invoiceNumber,
			amount: prev.amount || lastInvoice?.amount || "",
			jobDescription: prev.jobDescription || lastInvoice?.description || "",
		}));
	}, [nextInvoiceNum, lastInvoice?.amount, lastInvoice?.description]);

	// Handle input changes in real-time
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues(prev => ({
			...prev,
			[name]: value
		}));
	};

	// Memoize invoice data to prevent unnecessary recalculations
	const invoiceData = useMemo(() => {
		if (!signedInUser || !selectedCompany) return null;
		
		return {
			...signedInUser,
			...selectedCompany,
			...formValues, // Use formValues instead of state for real-time updates
		};
	}, [signedInUser, selectedCompany, formValues]);

	// Simplified useEffect with clearer logic
	useEffect(() => {
		if (state && (state.invoiceNumber || state.amount || state.jobDescription)) {
			setFormState((prev) => ({
				...prev,
				...state,
			}));
		}
	}, [state, setFormState]);

	// Check if all required fields are filled using formValues for real-time updates
	const allFieldsFilled = useMemo(() => {
		return ["invoiceNumber", "amount", "jobDescription"].every(
			(key) => !!formValues[key] && formValues[key].toString().trim() !== ""
		);
	}, [formValues]);
	// Show loading state
	if (isLoading ) {

		return (
			<div className={styles.landingCard}>
				<div>Loading...</div>
			</div>
		);
	}

	// Show error if exists
	if (state?.error) {
		return (
			<div className={styles.landingCard}>
				<div className={styles.error}>Error: {state.error}</div>
			</div>
		);
	}

	return (
		<div className={styles.landingCard}>
			<form action={action} key={nextInvoiceNum}>
				{/* Render form fields dynamically */}
				{FORM_FIELDS.map(({ name, label, ...props }) => (
					<div key={name} className={styles.formGroup}>
						<label htmlFor={name} className={styles.label}>
							{label}
						</label>
						<input 
							name={name} 
							className={styles.input} 
							value={formValues[name]}
							onChange={handleInputChange}
							{...props} 
						/>
					</div>
				))}

				<div className={styles.formGroup}>
					<label htmlFor="jobDescription" className={styles.label}>
						Job Description
					</label>
					<textarea
						name="jobDescription"
						className={styles.input}
						placeholder="Describe the job or work completed"
						rows={4}
						required
						value={formValues.jobDescription}
						onChange={handleInputChange}
					/>
				</div>
				
				<div className={styles.buttonContainer}>
					<DownloadPdfButton data={invoiceData} disabled={!allFieldsFilled} />
				</div>
			</form>
		</div>
	);
}