"use client";
import React, { useActionState, useEffect, useState, useMemo } from "react";
import DownloadPdfButton from "../DownloadPDFButton/DownloadPdfButton";
import PDFPreview from "../PDFPreview/PDFPreview";
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
	const { formState, setFormState } = useInvoiceForm();
	const { signedInUser } = useAuth();
	const { selectedCompany } = useCompany();
	const { nextInvoiceNum, isLoading } = useInvoice();

	// Add local state to track form values in real-time
	const [formValues, setFormValues] = useState({
		invoiceNumber: nextInvoiceNum || "",
		amount: "",
		jobDescription: "",
	});

	const [state, action, pending] = useActionState(createInvoice, {
		invoiceNumber: nextInvoiceNum,
		amount: "",
		jobDescription: "",
		error: "",
		success: false,
	});

	// Update formValues when nextInvoiceNum changes
	useEffect(() => {
		if (nextInvoiceNum && typeof nextInvoiceNum === "number") {
			setFormValues(prev => ({
				...prev,
				invoiceNumber: nextInvoiceNum
			}));
		}
	}, [nextInvoiceNum]);

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
	if (isLoading || typeof nextInvoiceNum !== "number" || isNaN(nextInvoiceNum) || nextInvoiceNum < 1) {
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
					<PDFPreview {...invoiceData} disabled={!allFieldsFilled} />
					<DownloadPdfButton {...invoiceData} disabled={!allFieldsFilled} />
				</div>
			</form>
		</div>
	);
}