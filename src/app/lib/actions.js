"use server";

export async function createInvoice(prevState, formData) {
	try {
		// Extract fields
		const fields = [
			"invoiceNumber",
			"amount",
			"name",
			"phone",
			"address",
			"addressCity",
			"addressZip",
			"to",
			"jobTitle",
			"jobType",
			"jobDescription",
		];

		const data = Object.fromEntries(
			fields.map((key) => [key, formData.get(key)])
		);

		// Basic validation
		if (!data.invoiceNumber || !data.amount) {
			return errorResponse("Please fill in all fields");
		}

		if (!/^[A-Za-z0-9-]{1,20}$/.test(data.invoiceNumber)) {
			return errorResponse(
				"Invoice number must be 1–20 characters (letters, numbers, hyphens only)"
			);
		}

		const numericAmount = parseFloat(data.amount);
		if (isNaN(numericAmount) || numericAmount <= 0) {
			return errorResponse("Amount must be a positive number");
		}
		if (numericAmount > 1_000_000) {
			return errorResponse("Amount cannot exceed $1,000,000");
		}

		// Success response
		return {
			success: true,
			error: "",
			invoiceNumber: data.invoiceNumber,
			name: data.name,
			phone: data.phone,
			address: data.address,
			addressCity: data.addressCity,
			addressZip: data.addressZip,
			to: data.to,
			jobTitle: data.jobTitle,
			jobType: data.jobType,
			jobDescription: data.jobDescription,
			amount: data.amount,
		};
	} catch (error) {
		console.error("Error creating invoice:", error);
		return errorResponse("Failed to process invoice. Please try again.");
	}
}

// 🔧 Reusable helper for returning consistent error responses
function errorResponse(message) {
	return {
		success: false,
		error: message,
		invoiceNumber: "",
		name: "",
		phone: data.phone,
		address: data.address,
		addressCity: data.addressCity,
		addressZip: data.addressZip,
		to: data.to,
		jobTitle: data.jobTitle,
		jobType: data.jobType,
		jobDescription: data.jobDescription,
		amount: "",
	};
}
