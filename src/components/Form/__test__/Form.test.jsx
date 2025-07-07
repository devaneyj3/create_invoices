import { render, screen } from '../../../test-utils/testing_provider';
import Form from "../Form";
import { describe, expect, test, vi } from "vitest";

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

// Mock the server action instead of React
vi.mock("@/app/lib/actions", () => ({
	createInvoice: vi.fn(),
}));

describe("Form component", () => {
	test("renders the form title", () => {
		render(<Form />);
		expect(screen.getByText(/make your own invoice/i)).toBeInTheDocument();
	});
});

