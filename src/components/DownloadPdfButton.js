// components/DownloadPdfButton.jsx

"use client";

import { getCurrentDateFormatted } from "@/utils/getDate";

export default function DownloadPdfButton({invoiceNumber}) {
	const downloadPdf = async () => {
		// Optionally, pass dynamic text as a query parameter
		const response = await fetch(
			"/api/modify-pdf?invoiceNumber=" + invoiceNumber,
		);
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `invoice_${getCurrentDateFormatted()}.pdf`;
		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	return <button onClick={downloadPdf}>Download Modified PDF</button>;
}
