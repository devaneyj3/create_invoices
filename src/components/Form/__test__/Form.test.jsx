import { render, screen } from "@testing-library/react";
import Form from "../Form";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import React from "react";

// --- Placeholder matchers ---
const placeholders = {
	invoiceNumber: /enter invoice number/i,
	amount: /enter amount/i,
	name: /enter your name/i,
	phone: /enter your phone number/i,
	address: /enter your address/i,
	addressCity: /enter your city/i,
	addressZip: /enter your zip/i,
	to: /invoice to \(client name\)/i,
	jobTitle: /enter job title/i,
	jobType: /enter job type/i,
	jobDescription: /describe the job or work completed/i,
};

// --- Corresponding input values ---
const typedValues = {
	invoiceNumber: "12345",
	amount: "678.91",
	name: "Jordan",
	phone: "555-1234",
	address: "123 Web St.",
	addressCity: "Brighton",
	addressZip: "49199",
	to: "Client Co.",
	jobTitle: "Freelance Dev",
	jobType: "Contract",
	jobDescription: "Built a custom invoice tool",
};

// --- Mock useActionState to simulate form submission ---
let submittedState = {
	...typedValues,
	error: "",
	success: false,
};

const mockAction = vi.fn((formData) => {
	submittedState = {
		invoiceNumber: formData.get("invoiceNumber"),
		amount: formData.get("amount"),
		name: formData.get("name"),
		phone: formData.get("phone"),
		address: formData.get("address"),
		addressCity: formData.get("addressCity"),
		addressZip: formData.get("addressZip"),
		to: formData.get("to"),
		jobTitle: formData.get("jobTitle"),
		jobType: formData.get("jobType"),
		jobDescription: formData.get("jobDescription"),
		error: "",
		success: true,
	};
});

vi.mock("react", async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		useActionState: () => [
			submittedState,
			(e) => {
				mockAction(e);
			},
			false,
		],
	};
});

describe("Form component", () => {
	test("renders the form title", () => {
		render(<Form />);
		expect(screen.getByText(/make your own invoice/i)).toBeInTheDocument();
	});

	test("renders all input fields by placeholder", () => {
		render(<Form />);
		Object.values(placeholders).forEach((placeholder) => {
			expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
		});
	});

	test("submit button is enabled by default", () => {
		render(<Form />);
		const button = screen.getByRole("button", { name: /generate invoice/i });
		expect(button).toBeEnabled();
	});

	test("allows typing into all input fields", async () => {
		render(<Form />);
		const user = userEvent.setup();

		for (const key of Object.keys(placeholders)) {
			const input = screen.getByPlaceholderText(placeholders[key]);
			await user.type(input, typedValues[key]);
			const expected = key === "amount" || key==='addressZip' ? parseFloat(typedValues[key]) : typedValues[key];
			expect(input).toHaveValue(expected);
		}
	});
});
test("shows Download Invoice button after submitting all fields", async () => {
	// Reset state to simulate a fresh form load
	submittedState = {
		invoiceNumber: "",
		amount: "",
		name: "",
		phone: "",
		address: "",
		addressCity: "",
		addressZip: "",
		to: "",
		jobTitle: "",
		jobType: "",
		jobDescription: "",
		error: "",
		success: false,
	};

	render(<Form />);
	const user = userEvent.setup();

	// Fill out all fields
	for (const key of Object.keys(placeholders)) {
		const input = screen.getByPlaceholderText(placeholders[key]);
		await user.type(input, typedValues[key]);
	}

	// Submit form
	const button = screen.getByRole("button", { name: /generate invoice/i });
	await user.click(button);

	// Rerender to simulate updated state
	render(<Form />);

	// Assert the Download button appears
	expect(screen.getByTestId("download_invoice")).toBeInTheDocument();
});

