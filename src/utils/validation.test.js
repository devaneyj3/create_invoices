import { describe, it, expect } from "vitest";
import {
	validateInvoiceNumber,
	validateAmount,
	validateForm,
} from "./validation";

describe("validateInvoiceNumber", () => {
	it("accepts valid invoice numbers", () => {
		expect(validateInvoiceNumber("INV-123")).toEqual({
			isValid: true,
			error: "",
		});
		expect(validateInvoiceNumber("A1B2C3")).toEqual({
			isValid: true,
			error: "",
		});
	});

	it("rejects empty or missing invoice numbers", () => {
		expect(validateInvoiceNumber("")).toEqual({
			isValid: false,
			error: "Invoice number is required",
		});
		expect(validateInvoiceNumber()).toEqual({
			isValid: false,
			error: "Invoice number is required",
		});
	});

	it("rejects invalid format", () => {
		expect(validateInvoiceNumber("!@#")).toEqual({
			isValid: false,
			error:
				"Invoice number must be 1-20 characters (letters, numbers, hyphens only)",
		});
		expect(validateInvoiceNumber("A".repeat(21))).toEqual({
			isValid: false,
			error:
				"Invoice number must be 1-20 characters (letters, numbers, hyphens only)",
		});
	});
});

describe("validateAmount", () => {
	it("accepts valid amounts", () => {
		expect(validateAmount("100")).toEqual({ isValid: true, error: "" });
		expect(validateAmount(50)).toEqual({ isValid: true, error: "" });
		expect(validateAmount("999999.99")).toEqual({ isValid: true, error: "" });
	});

	it("rejects empty or missing amounts", () => {
		expect(validateAmount("")).toEqual({
			isValid: false,
			error: "Amount is required",
		});
		expect(validateAmount()).toEqual({
			isValid: false,
			error: "Amount is required",
		});
	});

	it("rejects amounts over 1,000,000", () => {
		expect(validateAmount(1000001)).toEqual({
			isValid: false,
			error: "Amount cannot exceed $1,000,000",
		});
		expect(validateAmount("1000001")).toEqual({
			isValid: false,
			error: "Amount cannot exceed $1,000,000",
		});
	});
});

describe("validateForm", () => {
	it("returns isValid true for valid invoice number and amount", () => {
		expect(validateForm("INV-1", 100)).toEqual({
			isValid: true,
			errors: { invoiceNumber: "", amount: "" },
		});
	});

	it("returns errors for invalid invoice number and amount", () => {
		expect(validateForm("", "")).toEqual({
			isValid: false,
			errors: {
				invoiceNumber: "Invoice number is required",
				amount: "Amount is required",
			},
		});
	});

	it("returns errors for one invalid field", () => {
		expect(validateForm("INV-1", "")).toEqual({
			isValid: false,
			errors: {
				invoiceNumber: "",
				amount: "Amount is required",
			},
		});
		expect(validateForm("", 100)).toEqual({
			isValid: false,
			errors: {
				invoiceNumber: "Invoice number is required",
				amount: "",
			},
		});
	});
});
