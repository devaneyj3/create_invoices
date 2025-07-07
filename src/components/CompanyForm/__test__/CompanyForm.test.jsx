import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompanyForm from "../CompanyForm";
import { vi } from "vitest";

// Mock the server action instead of React
vi.mock("@/app/lib/actions", () => ({
  createCompany: vi.fn(),
}));

describe("CompanyForm component", () => {
  test("renders all input fields", () => {
    render(<CompanyForm />);
    expect(screen.getByPlaceholderText(/enter company name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter company address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter company city/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter company state/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter company zip/i)).toBeInTheDocument();
  });

  test("allows typing into all input fields", async () => {
    render(<CompanyForm />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/enter company name/i), "Test Co");
    await user.type(screen.getByPlaceholderText(/enter company address/i), "123 Main St");
    await user.type(screen.getByPlaceholderText(/enter company city/i), "Buffalo");
    await user.type(screen.getByPlaceholderText(/enter company state/i), "NY");
    await user.type(screen.getByPlaceholderText(/enter company zip/i), "12345");
    expect(screen.getByPlaceholderText(/enter company name/i)).toHaveValue("Test Co");
    expect(screen.getByPlaceholderText(/enter company address/i)).toHaveValue("123 Main St");
    expect(screen.getByPlaceholderText(/enter company city/i)).toHaveValue("Buffalo");
    expect(screen.getByPlaceholderText(/enter company state/i)).toHaveValue("NY");
    expect(screen.getByPlaceholderText(/enter company zip/i)).toHaveValue("12345");
  });

  test("renders submit button", () => {
    render(<CompanyForm />);
    expect(screen.getByRole("button", { name: /add company/i })).toBeInTheDocument();
  });
}); 