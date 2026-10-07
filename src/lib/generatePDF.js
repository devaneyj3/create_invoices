import { formatDateForInvoice, getCurrentDateFormatted } from "../utils/getDate";

export const generatePdf = async (data, { email = true } = {}) => {
	try {
		const response = await fetch("/api/generate-pdf", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"X-Requested-With": "XMLHttpRequest",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error("Failed to generate PDF");
		}

		// Get the blob from the response
		const blob = await response.blob();

		if (email) {
			// Convert blob to base64 for sending via email
			const arrayBuffer = await blob.arrayBuffer();
			const base64String = btoa(
				String.fromCharCode(...new Uint8Array(arrayBuffer))
			);

			try {
				const emailResponse = await fetch("/api/send-email", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						pdfBuffer: base64String,
					}),
				});

				if (emailResponse.ok) {
					console.log("PDF sent to email successfully");
				} else {
					console.error("Failed to send PDF to email");
				}
			} catch (emailError) {
				console.error("Error sending PDF to email:", emailError);
			}
		}

		const fileDate = data.date
			? formatDateForInvoice(data.date)
			: getCurrentDateFormatted();

		// Create download link
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `invoice_${data.invoiceNumber || fileDate}.pdf`;
		document.body.appendChild(link);
		link.click();
		link.remove();

		// Clean up the URL
		window.URL.revokeObjectURL(url);

		return blob;
	} catch (error) {
		console.error("Error generating PDF:", error);
		alert("Failed to generate PDF. Please try again.");
	}
};
