import { render, screen } from '../../../test-utils/testing_provider';
import Profile from '../profile';
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import React from "react";

// --- Placeholder matchers ---
const placeholders = {
	phone: /enter your phone number/i,
	address: /enter your address/i,
	city: /enter your city/i,
	state: /enter your state/i,
	zip: /enter your zip/i,
};

// --- Corresponding input values ---
const typedValues = {
	phone: "12345",
	address: "444 Chicago St",
	city: "Chicago",
	state: "IL",
	zip: "48410",
};

// --- Mock useActionState to simulate form submission ---
let submittedState = {
	...typedValues,
	error: "",
	success: false,
};

const mockAction = vi.fn((formData) => {
	submittedState = {
		phone: formData.get("phone"),
		address: formData.get("address"),
		city: formData.get("city"),
		state: formData.get("state"),
		zip: formData.get("zip"),
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

describe("Profile component", () => {
	test("renders the profile title", () => {
		render(<Profile />);
		expect(screen.getByText(/Complete your profile/i)).toBeInTheDocument();
	});

	test("renders all input fields by placeholder", () => {
		render(<Profile />);
		Object.values(placeholders).forEach((placeholder) => {
			expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
		});
	});

	test("submit button is enabled by default", () => {
		render(<Profile />);
		const button = screen.getByRole("button", { name: /update profile/i });
		expect(button).toBeEnabled();
	});

	test("allows typing into all input fields", async () => {
    render(<Profile/>);
		const user = userEvent.setup();

		for (const key of Object.keys(placeholders)) {
			const input = screen.getByPlaceholderText(placeholders[key]);
      await user.clear(input);
      await user.type(input, typedValues[key]);
      const expected = key === 'zip' ? parseFloat(typedValues[key]) : typedValues[key];
      console.log(expected)
			expect(input).toHaveValue(expected);
		}
	});
});
test("update button works after submitting all fields", async () => {
	// Reset state to simulate a fresh form load
	submittedState = {
		phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
		error: "",
		success: false,
	};

	render(<Profile />);
	const user = userEvent.setup();

	// Fill out all fields
	for (const key of Object.keys(placeholders)) {
		const input = screen.getByPlaceholderText(placeholders[key]);
		await user.type(input, typedValues[key]);
	}

	// Submit form
	const button = screen.getByRole("button", { name: /update profile/i });
	await user.click(button);

	// Rerender to simulate updated state
	render(<Profile />);

	// Assert the Download button appears
	expect(screen.getByText("Profile updated!")).toBeInTheDocument();
});

