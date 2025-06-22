import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PDFPreview from "../PDFPreview";
import { vi } from "vitest";

describe("PDFPreview", () => {
  beforeEach(() => {
    // Mock createObjectURL and revokeObjectURL
    global.URL.createObjectURL = vi.fn(() => "blob:mock-url");
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders Preview Invoice button and shows PDF preview on click", async () => {
    // Mock fetch to return a blob
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        blob: () => Promise.resolve(new Blob(["dummy"], { type: "application/pdf" })),
      })
    );

    render(<PDFPreview invoiceNumber="123" amount="456" />);
    const user = userEvent.setup();

    // Preview button is present
    const previewBtn = screen.getByRole("button", { name: /preview invoice/i });
    expect(previewBtn).toBeInTheDocument();

    // Click the button
    await user.click(previewBtn);

    // Wait for the iframe to appear
    await waitFor(() => {
      expect(screen.getByTitle("Invoice Preview")).toBeInTheDocument();
    });

    // Close the preview
    const closeBtn = screen.getByRole("button", { name: /close preview/i });
    await user.click(closeBtn);

    // The preview should be closed (iframe not in the document)
    expect(screen.queryByTitle("Invoice Preview")).not.toBeInTheDocument();
  });
});