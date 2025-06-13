// components/DownloadPdfButton.jsx

"use client";

import { getCurrentDateFormatted } from "@/utils/getDate";
import axios from "axios";

export default function DownloadPdfButton({ invoiceNum, amount }) {
	const downloadPdf = async () => {
		try {
			// Using POST method with request body
			const response = await axios.post(
				"/api/modify-pdf",
				{
					invoiceNum,
					amount,
				},
				{
					responseType: "blob", // Important for handling PDF files
				}
			);

			// Create blob URL and trigger download
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.download = `invoice_${getCurrentDateFormatted()}.pdf`;
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Error downloading PDF:", error);
			alert("Failed to generate PDF. Please try again.");
		}
	};

	return <button onClick={downloadPdf}>Create Invoice</button>;
}
