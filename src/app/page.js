"use client";
// app/page.jsx
import React, {useState} from "react";

import DownloadPdfButton from "../components/DownloadPdfButton";

export default function Home() {
	const [invoiceNumber, setInvoiceNumber] = useState("");
	return (
		<div>
			<h1>Dynamic PDF Editor with pdf-lib and Next.js App Router</h1>
			<p>Select an invoice number:</p><input type="text" id="invoiceNumber"
			 onChange={(e) => setInvoiceNumber(e.target.value)} placeholder="Enter invoice number" required />
			<DownloadPdfButton invoiceNumber={invoiceNumber} />
		</div>
	);
}
