"use server";

export async function createInvoice(prevState, formData) {
	try {
		const invoiceNumber = formData.get("invoiceNumber");
		const amount = formData.get("amount");

		// Server-side validation
		if (!invoiceNumber || !amount) {
			return {
				error: "Please fill in all fields",
				success: false,
				invoiceNumber: "",
				amount: "",
			};
		}

		// Validate invoice number format
		if (!/^[A-Za-z0-9-]{1,20}$/.test(invoiceNumber)) {
			return {
				error:
					"Invoice number must be 1-20 characters (letters, numbers, hyphens only)",
				success: false,
				invoiceNumber: "",
				amount: "",
			};
		}

		// Validate amount
		const numericAmount = parseFloat(amount);
		if (isNaN(numericAmount) || numericAmount <= 0) {
			return {
				error: "Amount must be a positive number",
				success: false,
				invoiceNumber: "",
				amount: "",
			};
		}

		if (numericAmount > 1000000) {
			return {
				error: "Amount cannot exceed $1,000,000",
				success: false,
				invoiceNumber: "",
				amount: "",
			};
		}

		// Return success with validated data
		return {
			success: true,
			invoiceNumber,
			amount,
			error: "",
		};
	} catch (error) {
		console.error("Error creating invoice:", error);
		return {
			error: "Failed to process invoice. Please try again.",
			success: false,
			invoiceNumber: "",
			amount: "",
		};
	}
}
