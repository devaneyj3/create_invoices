"use server";

import { getUser } from "../../lib/getUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createInvoice(prevState, formData) {
	try {
		// Extract fields
		const fields = [
			"invoiceNumber",
			"amount",
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

export async function updateProfile(prevState, formData) {
	try {
		const fields = [
			"phone",
			"address",
			"addressCity",
			"addressState",
			"addressZip",
		];
		const data = Object.fromEntries(
			fields.map((key) => [key, formData.get(key)])
		);

		// Basic validation
		if (
			!data.phone ||
			!data.address ||
			!data.addressCity ||
			!data.addressState ||
			!data.addressZip
		) {
			return profileErrorResponse("Please fill in all fields", data);
		}

		return {
			success: true,
			error: "",
			...data,
		};
	} catch (error) {
		console.error("Error updating profile:", error);
		return profileErrorResponse(
			"Failed to update profile. Please try again.",
			{}
		);
	}
}

// 🔧 Reusable helper for returning consistent error responses
function errorResponse(message) {
	return {
		success: false,
		error: message,
		invoiceNumber: "",
		to: data.to,
		jobTitle: data.jobTitle,
		jobType: data.jobType,
		jobDescription: data.jobDescription,
		amount: "",
	};
}

function profileErrorResponse(message, data) {
	return {
		success: false,
		error: message,
		phone: data.phone || "",
		address: data.address || "",
		addressCity: data.addressCity || "",
		addressCity: data.addressState || "",
		addressZip: data.addressZip || "",
	};
}
