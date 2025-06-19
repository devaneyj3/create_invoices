/**
 * Client-side validation utilities for better UX
 * Note: Server-side validation is the source of truth
 */

export const validateInvoiceNumber = (invoiceNumber) => {
	if (!invoiceNumber || invoiceNumber.trim() === "") {
		return { isValid: false, error: "Invoice number is required" };
	}

	if (!/^[A-Za-z0-9-]{1,20}$/.test(invoiceNumber)) {
		return {
			isValid: false,
			error:
				"Invoice number must be 1-20 characters (letters, numbers, hyphens only)",
		};
	}

	return { isValid: true, error: "" };
};

export const validateAmount = (amount) => {
	if (!amount || amount === "") {
		return { isValid: false, error: "Amount is required" };
	}

	const numericAmount = parseFloat(amount);
	if (isNaN(numericAmount)) {
		return { isValid: false, error: "Amount must be a valid number" };
	}

	if (numericAmount <= 0) {
		return { isValid: false, error: "Amount must be greater than 0" };
	}

	if (numericAmount > 1000000) {
		return { isValid: false, error: "Amount cannot exceed $1,000,000" };
	}

	return { isValid: true, error: "" };
};

export const validateForm = (invoiceNumber, amount) => {
	const invoiceValidation = validateInvoiceNumber(invoiceNumber);
	const amountValidation = validateAmount(amount);

	return {
		isValid: invoiceValidation.isValid && amountValidation.isValid,
		errors: {
			invoiceNumber: invoiceValidation.error,
			amount: amountValidation.error,
		},
	};
};
