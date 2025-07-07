import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import React from "react";
import DownloadPdfButton from "../DownloadPdfButton";

describe("DownloadPDFButton component", () => {
	test("renders Download Button", async() => {
		render(<DownloadPdfButton invoiceNumber='888' amount='999'/>);

		const button = await screen.findByTestId("download_invoice")
		expect(button).toBeInTheDocument();
	});


});
