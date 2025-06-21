import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../Form";
import { describe, expect, test, vi } from "vitest";

import React from "react";

// Mock useActionState from React
vi.mock("react", async (importOriginal) => {
	const actual = await importOriginal();
	return {
		...actual,
		useActionState: () => [
			{ invoiceNumber: "", amount: "", error: "", success: false },
			vi.fn(), // mock action function
			false, // pending
		],
	};
});
describe("Form component", () => {
	test("renders the form title", () => {
		render(<Form />);
		expect(screen.getByText(/make your own invoice/i)).toBeInTheDocument();
	});

	test("renders invoice number and amount input fields", () => {
		render(<Form />);
		expect(
			screen.getByPlaceholderText(/enter invoice number/i)
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/enter amount/i)).toBeInTheDocument();
	});

	test("submit button is enabled by default", () => {
		render(<Form />);
		const button = screen.getByRole("button", { name: /generate invoice/i });
		expect(button).toBeEnabled();
	});

});
