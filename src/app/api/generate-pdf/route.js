import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import { InvoicePDF } from "../../../components/InvoicePDF/InvoicePDF";
import { getCurrentDateFormatted } from "../../../utils/getDate";

export async function POST(request) {
	try {
		const formState = await request.json();

		// Validate inputs
		if (!formState.invoiceNumber || !formState.amount || !formState.name) {
			return NextResponse.json(
				{ error: "Invoice number, name and amount are required" },
				{ status: 400 }
			);
		}

		// Additional validation
		const numericAmount = parseFloat(formState.amount);
		if (isNaN(numericAmount) || numericAmount <= 0) {
			return NextResponse.json(
				{ error: "Amount must be a positive number" },
				{ status: 400 }
			);
		}

		// Generate PDF
		const blob = await pdf(<InvoicePDF {...formState} />).toBlob();

		// Convert to buffer
		const arrayBuffer = await blob.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// Return PDF as response with caching headers
		return new NextResponse(buffer, {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="invoice_${
					formState.invoiceNumber
				}_${getCurrentDateFormatted()}.pdf"`,
				"Cache-Control": "public, max-age=3600", // Cache for 1 hour
				"Content-Length": buffer.length.toString(),
			},
		});
	} catch (error) {
		console.error("Error generating PDF:", error);
		return NextResponse.json(
			{ error: "Failed to generate PDF. Please try again." },
			{ status: 500 }
		);
	}
}
