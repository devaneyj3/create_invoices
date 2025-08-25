// src/components/DownloadPdfButton.js
import { useState } from "react";

import styles from "./DownloadPdf.module.scss";
import { useInvoice } from "@/context/InvoiceItemProvider";
import { generatePdf } from "@/lib/generatePDF";

export default function DownloadPdfButton({disabled, ...props}) {
	const [isGenerating, setIsGenerating] = useState(false);
	const { createInvoice } = useInvoice()

	const makeInvoice = async () => {
		const data = await createInvoice(props)
		console.log(data)
		generatePdf(setIsGenerating)
	}


	return (
		<button
			type="submit"
			data-testid="download_invoice"
			onClick={makeInvoice}
			disabled={disabled}
			className={`${styles.button} ${disabled ? styles.disabled : ''}`}>
			{isGenerating ? "Generating..." : "Download Invoice"}
		</button>
	);
}
