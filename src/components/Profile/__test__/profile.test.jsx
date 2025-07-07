import { render, screen } from '../../../test-utils/testing_provider';
import Profile from '../profile';
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock the server action instead of React
vi.mock("@/app/lib/actions", () => ({
	updateProfile: vi.fn(),
}));

// Mock useAuth and AuthProvider to prevent hanging on update
vi.mock("@/context/authContext", async () => {
  const actual = await vi.importActual("@/context/authContext");
  return {
    ...actual,
    useAuth: () => ({
      update: vi.fn().mockResolvedValue({}),
    }),
    AuthProvider: ({ children }) => children,
  };
});

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
			expect(input).toHaveValue(expected);
		}
	});

	test("renders submit button", () => {
		render(<Profile />);
		expect(screen.getByRole("button", { name: /update profile/i })).toBeInTheDocument();
	});
});

