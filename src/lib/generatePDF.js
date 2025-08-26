import { getCurrentDateFormatted } from "../utils/getDate";

export const generatePdf = async (setIsGenerating, data) => {
	setIsGenerating(true);
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

		// Convert blob to base64 for sending via email
		const arrayBuffer = await blob.arrayBuffer();
		const base64String = btoa(
			String.fromCharCode(...new Uint8Array(arrayBuffer))
		);

		// Send PDF to email endpoint
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

		// Create download link
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `invoice_${getCurrentDateFormatted()}.pdf`;
		document.body.appendChild(link);
		link.click();
		link.remove();

		// Clean up the URL
		window.URL.revokeObjectURL(url);

		return blob;
	} catch (error) {
		console.error("Error generating PDF:", error);
		alert("Failed to generate PDF. Please try again.");
	} finally {
		setIsGenerating(false);
	}
};
