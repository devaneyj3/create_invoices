import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import InvoicePDF from "../InvoicePDF"; // Assuming your component is named InvoicePDF
import { formatMoney } from "../../../utils/formatMoney";
import { getCurrentDateFormatted } from "../../../utils/getDate";

// Mock the utilities used by the component
vi.mock("../../../utils/formatMoney", () => ({
	formatMoney: vi.fn((amount) => `$${amount}`),
}));
vi.mock("../../../utils/getDate", () => ({
	getCurrentDateFormatted: vi.fn(() => "2025-06-21"),
}));

describe("InvoicePDF", () => {
	it("should render the invoice details correctly", () => {
		const state = {
			invoiceNumber: "INV-123",
			amount: 100,
			name: "Jordan", 
			phone: "810-772-0086", 
			address: "122 Random Ln", 
			addressCity: "Buffalo", 
			addressZip: "8888888", 
			to: "GM", 
			jobTitle: "Software Engineer", 
			jobType: "Consulting", 
			jobDescription: "PHP"
		};

		render(<InvoicePDF {...state} />);

		expect(screen.getByTestId("document")).toBeInTheDocument();
	});
});
