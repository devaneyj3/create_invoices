"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
const prisma = new PrismaClient();

export async function createInvoice(prevState, formData) {
	try {
		// Extract fields
		const fields = ["invoiceNumber", "amount", "jobDescription"];

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
			"jobTitle",
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
			(!data.jobTitle,
			!data.phone ||
				!data.address ||
				!data.addressCity ||
				!data.addressState ||
				!data.addressZip)
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

export async function addCompany(prevState, formData) {
	const session = await getServerSession(authOptions);
	try {
		// Extract and sanitize fields
		const fields = [
			"companyName",
			"companyAddress",
			"companyCity",
			"companyState",
			"companyZip",
		];
		const data = Object.fromEntries(
			fields.map((key) => [key, sanitizeInput(formData.get(key))])
		);

		// Validation
		if (
			!data.companyName ||
			!data.companyAddress ||
			!data.companyCity ||
			!data.companyState ||
			!data.companyZip
		) {
			return companyErrorResponse("Please fill in all fields", data);
		}
		if (data.companyName.length < 2 || data.companyName.length > 100) {
			return companyErrorResponse(
				"Company name must be 2-100 characters",
				data
			);
		}
		if (!/^[\w\s\-&.,']+$/.test(data.companyName)) {
			return companyErrorResponse(
				"Company name contains invalid characters",
				data
			);
		}
		if (
			data.companyZip.length < 3 ||
			data.companyZip.length > 10 ||
			!/^\d{3,10}$/.test(data.companyZip)
		) {
			return companyErrorResponse("Company zip must be 3-10 digits", data);
		}
		const userId = session?.user?.id;
		if (!userId) {
			return companyErrorResponse("User not authenticated", data);
		}

		return {
			success: true,
			error: "",
			...data,
		};
	} catch (error) {
		console.error("Error creating company:", error);
		return companyErrorResponse("Failed to add company. Please try again.", {});
	}
}

function sanitizeInput(str) {
	if (!str) return "";
	return String(str)
		.replace(/<[^>]*>?/gm, "")
		.trim();
}

function companyErrorResponse(message, data) {
	return {
		success: false,
		error: message,
		companyName: data.companyName || "",
		companyAddress: data.companyAddress || "",
		companyCity: data.companyCity || "",
		companyState: data.companyState || "",
		companyZip: data.companyZip || "",
	};
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
