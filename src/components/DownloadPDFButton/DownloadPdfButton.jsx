// src/components/DownloadPdfButton.js
import { useState, useEffect } from "react";

import styles from "./DownloadPdf.module.scss";
import { useInvoice } from "@/context/InvoiceItemProvider";
import { generatePdf } from "@/lib/generatePDF";

export default function DownloadPdfButton({disabled, data}) {
	const [isGenerating, setIsGenerating] = useState(false);
	const { createInvoice, setInvoiceDialogOpen} = useInvoice()

	const makeInvoice = async () => {
		setIsGenerating(true)
		await createInvoice(data)
		setInvoiceDialogOpen(false)
		await generatePdf( data )
		setIsGenerating(false)
	}


	return (
		<button
			type="submit"
			data-testid="download_invoice"
			onClick={makeInvoice}
			disabled={disabled || isGenerating}
			className={`${styles.button} ${disabled || isGenerating ? styles.disabled : ''}`}>
			{isGenerating ? "Generating..." : "Download Invoice"}
		</button>
	);
}
